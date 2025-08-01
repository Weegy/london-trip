// London Royal & Historic Itinerary App with PDF Integration

// Global state
let currentTab = 'tickets';
let completedItems = JSON.parse(localStorage.getItem('london-itinerary-progress') || '{}');
let outstandingCosts = {
    templeChurch: 5,
    royalMews: 17,
    westminsterAbbey: 29
};

// PDF ticket mapping
const pdfTickets = {
    'voucher-st-pauls.pdf': {
        name: 'St Paul\'s Cathedral',
        bookingId: '26413685',
        codes: ['PRIO5395795262887237', 'PRIO5395795262867420'],
        instructions: 'Print this PDF and bring with government ID'
    },
    'buckingham-palace-6475088.pdf': {
        name: 'Buckingham Palace State Rooms',
        orderNumber: '6475088',
        codes: ['HH 61 (99000009096717040947)', 'HH 60 (99000009096717040948)'],
        instructions: 'Print, sign, and bring to Gate C'
    },
    'tower-london.pdf': {
        name: 'Tower of London + Crown Jewels',
        bookingId: '26413686',
        codes: ['DVTX841L78S5S', 'DVTXS21SJJFK7'],
        instructions: 'Show mobile PDF with QR codes on phone'
    }
};

// Initialize app
document.addEventListener('DOMContentLoaded', function () {
    initializeApp();
});

function initializeApp() {
    console.log('London Itinerary App with PDF Tickets initialized');
    setupTabNavigation();
    setupProgressTracking();
    updateCostCalculator();
    restoreProgress();
    switchTab(currentTab);
    setupKeyboardShortcuts();
}

// Tab navigation
function setupTabNavigation() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            switchTab(e.target.getAttribute('data-tab'));
        });
    });

    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            switchTab(e.currentTarget.getAttribute('data-tab'));
        });
    });
}

function switchTab(tabName) {
    currentTab = tabName;

    // Update active states
    document.querySelectorAll('.tab-btn, .nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    document.querySelectorAll(`[data-tab="${tabName}"]`).forEach(btn => {
        btn.classList.add('active');
    });

    // Show/hide content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });

    const activeContent = document.getElementById(`${tabName}-tab`);
    if (activeContent) {
        activeContent.classList.add('active');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Progress tracking
function setupProgressTracking() {
    document.querySelectorAll('.progress-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const itemId = e.target.id;
            const isCompleted = e.target.checked;

            completedItems[itemId] = isCompleted;
            localStorage.setItem('london-itinerary-progress', JSON.stringify(completedItems));
            updateItemVisualState(itemId, isCompleted);
            updateCostCalculator();

            if (isCompleted) {
                showNotification('✅ Marked as completed!');
            }
        });
    });
}

function updateItemVisualState(itemId, isCompleted) {
    const checkbox = document.getElementById(itemId);
    if (!checkbox) return;

    const card = checkbox.closest('.itinerary-card');
    if (!card) return;

    if (isCompleted) {
        card.style.opacity = '0.6';
        card.style.backgroundColor = '#F3F4F6';
    } else {
        card.style.opacity = '1';
        card.style.backgroundColor = '';
    }
}

function restoreProgress() {
    Object.entries(completedItems).forEach(([itemId, isCompleted]) => {
        const checkbox = document.getElementById(itemId);
        if (checkbox) {
            checkbox.checked = isCompleted;
            updateItemVisualState(itemId, isCompleted);
        }
    });
}

// Cost calculator
function updateCostCalculator() {
    let totalCost = 0;

    if (!completedItems['temple-church']) totalCost += outstandingCosts.templeChurch;
    if (!completedItems['royal-mews']) totalCost += outstandingCosts.royalMews;
    if (!completedItems['westminster-abbey']) totalCost += outstandingCosts.westminsterAbbey;

    const costElement = document.getElementById('cost-amount');
    if (costElement) {
        costElement.textContent = `£${totalCost}`;
    }

    if (totalCost === 0) {
        const costBar = document.querySelector('.cost-bar');
        if (costBar) {
            costBar.style.background = '#10B981';
            costBar.style.color = '#FFFFFF';
            const detailElement = costBar.querySelector('.cost-detail');
            if (detailElement) {
                detailElement.textContent = 'All expenses covered! 🎉';
            }
        }
    }
}

// Maps integration
function openAppleMaps(location) {
    const encodedLocation = encodeURIComponent(location);
    const mapsUrl = `https://maps.apple.com/?q=${encodedLocation}`;
    showNotification('🗺️ Opening Apple Maps...');
    window.open(mapsUrl, '_blank');
}

// PDF functions
function viewPDF(pdfFileName) {
    const ticket = pdfTickets[pdfFileName];
    if (!ticket) {
        showNotification('❌ PDF ticket not found');
        return;
    }

    window.open(pdfFileName, '_blank');
}

function downloadPDF(pdfFileName) {
    showNotification('📄 Please replace placeholder with actual PDF ticket');
    showPDFModal(pdfTickets[pdfFileName], pdfFileName);
}

function showPDFModal(ticket, pdfFileName) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(0, 0, 0, 0.8); display: flex;
        align-items: center; justify-content: center;
        z-index: 1000; padding: 20px;
    `;

    const content = document.createElement('div');
    content.style.cssText = `
        background: white; border-radius: 12px; padding: 24px;
        max-width: 500px; width: 100%; max-height: 80vh; overflow-y: auto;
    `;

    content.innerHTML = `
        <h2 style="color: #EF4444; margin-bottom: 16px;">📄 ${ticket.name}</h2>
        <div style="background: #FEF2F2; border: 2px solid #EF4444; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
            <h3 style="color: #EF4444; margin-bottom: 8px;">PDF Required</h3>
            <p>Replace the placeholder file with your actual PDF ticket:</p>
            <code style="background: #F3F4F6; padding: 4px 8px; border-radius: 4px; display: block; margin: 8px 0;">tickets/${pdfFileName}</code>
        </div>
        <div style="background: #F9FAFC; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
            <p><strong>Booking:</strong> ${ticket.bookingId || ticket.orderNumber}</p>
            <p><strong>Ticket Codes:</strong></p>
            ${ticket.codes.map(code => `<code style="display: block; background: #E5E7EB; padding: 4px 8px; margin: 4px 0; border-radius: 4px;">${code}</code>`).join('')}
        </div>
        <p style="margin-bottom: 16px;"><strong>Instructions:</strong> ${ticket.instructions}</p>
        <button onclick="this.parentNode.parentNode.remove()" style="
            background: #0033A0; color: white; border: none;
            padding: 12px 24px; border-radius: 6px; cursor: pointer; width: 100%;
        ">Close</button>
    `;

    modal.appendChild(content);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });

    document.body.appendChild(modal);
    setTimeout(() => modal.remove(), 15000);
}

// Utility functions
function showNotification(message) {
    const existing = document.querySelectorAll('.notification');
    existing.forEach(n => n.remove());

    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed; top: 80px; left: 50%; transform: translateX(-50%);
        background: #1F2937; color: white; padding: 12px 20px;
        border-radius: 8px; z-index: 1000; font-weight: 500;
        max-width: 300px; text-align: center; animation: slideDown 0.3s ease;
    `;

    document.body.appendChild(notification);
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideUp 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 3000);
}

function shareItinerary() {
    if (navigator.share) {
        navigator.share({
            title: 'London Royal & Historic 48-Hour Itinerary',
            text: 'Check out this amazing London itinerary with confirmed PDF tickets!',
            url: window.location.href
        }).catch(() => fallbackShare());
    } else {
        fallbackShare();
    }
}

function fallbackShare() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        showNotification('🔗 Link copied to clipboard!');
    }).catch(() => {
        const textArea = document.createElement('textarea');
        textArea.value = window.location.href;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('🔗 Link copied to clipboard!');
    });
}

// Keyboard shortcuts
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        if (e.altKey) {
            const keyMap = { '1': 'tickets', '2': 'friday', '3': 'saturday', '4': 'food', '5': 'info' };
            if (keyMap[e.key]) {
                e.preventDefault();
                switchTab(keyMap[e.key]);
            }
        }
    });
}

// Add animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes slideDown {
        from { transform: translate(-50%, -100%); opacity: 0; }
        to { transform: translate(-50%, 0); opacity: 1; }
    }
    @keyframes slideUp {
        from { transform: translate(-50%, 0); opacity: 1; }
        to { transform: translate(-50%, -100%); opacity: 0; }
    }
`;
document.head.appendChild(styleSheet);

// Export for global access
window.LondonItinerary = {
    switchTab, openAppleMaps, shareItinerary, showNotification, viewPDF, downloadPDF
};

console.log('🎫 London Itinerary App with PDF Tickets loaded! 🇬🇧');