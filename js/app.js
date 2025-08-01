// London Royal & Historic Itinerary App
// Mobile-first, fully functional web app

// Global state
let currentTab = 'bookings';
let completedItems = JSON.parse(localStorage.getItem('london-itinerary-progress') || '{}');
let outstandingCosts = {
    templeChurch: 5,
    royalMews: 17,
    westminsterAbbey: 29
};

// Initialize app when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    console.log('London Itinerary App initialized');

    // Set up event listeners
    setupTabNavigation();
    setupProgressTracking();
    updateCostCalculator();

    // Restore progress from localStorage
    restoreProgress();

    // Set active tab
    switchTab(currentTab);
}

// Tab navigation
function setupTabNavigation() {
    // Desktop tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tab = e.target.getAttribute('data-tab');
            switchTab(tab);
        });
    });

    // Mobile navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tab = e.currentTarget.getAttribute('data-tab');
            switchTab(tab);
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

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Progress tracking
function setupProgressTracking() {
    document.querySelectorAll('.progress-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const itemId = e.target.id;
            const isCompleted = e.target.checked;

            // Update state
            completedItems[itemId] = isCompleted;

            // Save to localStorage
            localStorage.setItem('london-itinerary-progress', JSON.stringify(completedItems));

            // Update visual state
            updateItemVisualState(itemId, isCompleted);

            // Update cost calculator
            updateCostCalculator();
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

    // Add costs for incomplete items
    if (!completedItems['temple-church']) {
        totalCost += outstandingCosts.templeChurch;
    }
    if (!completedItems['royal-mews']) {
        totalCost += outstandingCosts.royalMews;
    }
    if (!completedItems['westminster-abbey']) {
        totalCost += outstandingCosts.westminsterAbbey;
    }

    // Update display
    const costElement = document.getElementById('cost-amount');
    if (costElement) {
        costElement.textContent = `£${totalCost}`;
    }

    // Update detail text
    const costBar = document.querySelector('.cost-bar');
    if (costBar && totalCost === 0) {
        costBar.style.background = '#10B981';
        costBar.querySelector('.cost-detail').textContent = 'All paid up!';
    }
}

// Apple Maps navigation
function openAppleMaps(location) {
    const encodedLocation = encodeURIComponent(location);
    const mapsUrl = `https://maps.apple.com/?q=${encodedLocation}`;

    // Show loading feedback
    showNotification('Opening Apple Maps...');

    // Open in new tab
    window.open(mapsUrl, '_blank');
}

// Utility functions
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        left: 50%;
        transform: translateX(-50%);
        background: #1F2937;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        z-index: 1000;
        font-weight: 500;
    `;

    document.body.appendChild(notification);

    // Remove after 2 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 2000);
}

function shareItinerary() {
    if (navigator.share) {
        navigator.share({
            title: 'London Royal & Historic 48-Hour Itinerary',
            text: 'Check out this amazing London itinerary!',
            url: window.location.href
        }).catch(err => {
            console.log('Error sharing:', err);
            fallbackShare();
        });
    } else {
        fallbackShare();
    }
}

function fallbackShare() {
    // Copy URL to clipboard
    navigator.clipboard.writeText(window.location.href).then(() => {
        showNotification('Link copied to clipboard!');
    }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = window.location.href;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('Link copied to clipboard!');
    });
}

// Service Worker registration for offline support
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.altKey) {
        switch(e.key) {
            case '1':
                e.preventDefault();
                switchTab('bookings');
                break;
            case '2':
                e.preventDefault();
                switchTab('friday');
                break;
            case '3':
                e.preventDefault();
                switchTab('saturday');
                break;
            case '4':
                e.preventDefault();
                switchTab('food');
                break;
            case '5':
                e.preventDefault();
                switchTab('info');
                break;
        }
    }
});

// Handle back button
window.addEventListener('popstate', () => {
    // Could implement URL-based routing here if needed
});

// Export for global access
window.LondonItinerary = {
    switchTab,
    openAppleMaps,
    shareItinerary,
    showNotification
};

console.log('London Itinerary App loaded successfully! 🇬🇧');