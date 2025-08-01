# London Royal & Historic 48-Hour Itinerary

A complete progressive web app for your London royal and historic journey, featuring confirmed tickets with PDF integration, Apple Maps, and mobile-first design.

## 🎫 Your Confirmed Tickets with PDF Integration

- **St Paul's Cathedral** - Booking ID: 26413685 (Friday, Aug 1)
  - PDF: `Voucher.pdf` → rename to `voucher-st-pauls.pdf`
- **Buckingham Palace State Rooms** - Order: 6475088 (Friday, Aug 1)  
  - PDF: `6475088.pdf` → rename to `buckingham-palace-6475088.pdf`
- **Tower of London + Crown Jewels** - Booking ID: 26413686 (Saturday, Aug 2)
  - PDF: `TowerLondon.pdf` → rename to `tower-london.pdf`
- **Savoy Grill Dinner** - Reservation confirmed (Friday, Aug 1)

## 📄 PDF Setup Instructions

To enable PDF viewing and downloading in the app:

1. **Place your PDF tickets** in the `tickets/` folder
2. **Rename them** to match the expected filenames:
   - `Voucher.pdf` → `voucher-st-pauls.pdf`
   - `6475088.pdf` → `buckingham-palace-6475088.pdf`
   - `TowerLondon.pdf` → `tower-london.pdf`
3. **Deploy** - PDFs will be viewable and downloadable from the app

The PDFs contain essential QR codes and barcodes needed for venue entry.

## ✨ Features

- **📱 Mobile-First Design** - Optimized for phones and tablets
- **🎫 PDF Ticket Integration** - View and download your actual tickets with QR codes
- **🗺️ Apple Maps Integration** - One-tap navigation to every location
- **✅ Progress Tracking** - Check off locations as you visit
- **💰 Cost Calculator** - Track outstanding expenses
- **🔄 Offline Support** - Works without internet after initial load
- **📤 Share Feature** - Send itinerary to travel companions

## 🚀 Quick Start

### Option 1: Deploy to Vercel (Recommended)
1. Clone this repository
2. **Add your PDF tickets** to the `tickets/` folder (renamed as above)
3. Go to [vercel.com](https://vercel.com)
4. Connect your GitHub account
5. Import this repository
6. Deploy with one click!

### Option 2: Local Development
```bash
git clone https://github.com/Weegy/london-trip.git
cd london-trip
# Add your PDF files to tickets/ folder
# Open index.html in your browser
```

### Option 3: GitHub Pages
1. Go to repository Settings
2. Navigate to Pages
3. Select "Deploy from a branch"
4. Choose "main" branch
5. Your app will be live at: `https://yourusername.github.io/london-trip`

## 📱 Mobile App Features

- **PDF ticket viewing** - Tap to view full tickets with QR codes
- **Touch-friendly buttons** for Apple Maps
- **Offline ticket access** - save tickets to home screen
- **Progress tracking** persists between sessions
- **Download PDFs** directly to device

## 🗓️ Your Complete Itinerary

### Friday: Royal London
- **14:30-20:30** • 3.2 miles walking • 3 confirmed bookings
- St Paul's Cathedral → Temple Church → Royal Mews → Buckingham Palace → Savoy Grill

### Saturday: Historic London  
- **09:00-16:30** • 4.8 miles walking • 1 confirmed booking
- Tower of London → Borough Market → Westminster Abbey → Platform 9¾

## 📞 Emergency Support

- **Headout Tickets**: +44 117 325 5305 (24/7)
- **Royal Collection Trust**: rct.uk
- **The Savoy Hotel**: +44 20 7836 4343
- **Emergency Services**: 999

## 🔧 Technical Details

- **Framework**: Vanilla HTML, CSS, JavaScript
- **PDF Integration**: Direct PDF viewing and downloading
- **PWA Ready**: Installable on mobile devices
- **Responsive**: Works on all screen sizes
- **Offline**: Service worker for offline functionality
- **Modern**: ES6+ JavaScript with local storage

## 📄 License

This project is for personal use. Ticket information and PDFs are confidential.

---

**Have an amazing London adventure! 🇬🇧👑**

*Note: Remember to add your actual PDF tickets to the tickets/ folder for full functionality.*
