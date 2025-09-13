# PriceCheck Kuwait - Food Price Comparison App

A comprehensive food price comparison platform for Kuwait, featuring both a mobile app and website.

## 📱 Mobile App (`pricecheck-kuwait-app/`)

React Native mobile application for iOS and Android that allows users to:
- Compare food prices across multiple delivery apps
- Build virtual shopping carts
- Submit and verify price data
- Browse restaurant menus

### Features
- **Price Comparison**: Compare prices across Talabat, Jahez, Deliveroo, Carriage, and Zomato
- **Smart Cart**: Build your order once and see total costs instantly
- **Crowd-Sourced Data**: Real menus and prices submitted by users
- **Grayscale UI**: Clean, minimal design for Phase 1 MVP

### Getting Started
```bash
cd pricecheck-kuwait-app
npm install
npx react-native run-ios    # For iOS
npx react-native run-android # For Android
```

## 🌐 Website (`pricecheck-kuwait-website/`)

Static website showcasing the mobile app with download links and information.

### Features
- **Responsive Design**: Works on all devices
- **Grayscale Theme**: Consistent with app design
- **Download Links**: Direct links to app stores
- **Simple Navigation**: One-page scroll design

### Getting Started
```bash
cd pricecheck-kuwait-website
python3 -m http.server 8000
# Open http://localhost:8000
```

## 🏗️ Project Structure

```
Foodapp/
├── pricecheck-kuwait-app/          # React Native Mobile App
│   ├── src/
│   │   ├── screens/                # App screens
│   │   ├── contexts/               # React contexts
│   │   ├── data/                   # Dummy data
│   │   ├── styles/                 # Theme and styling
│   │   └── types/                  # TypeScript types
│   ├── android/                    # Android specific files
│   ├── ios/                        # iOS specific files
│   └── package.json
├── pricecheck-kuwait-website/      # Static Website
│   ├── index.html                  # Main page
│   ├── styles.css                  # Styling
│   ├── script.js                   # JavaScript
│   ├── images/                     # Assets
│   └── package.json
└── README.md                       # This file
```

## 🚀 Quick Start

1. **Test the Website**:
   ```bash
   cd pricecheck-kuwait-website
   python3 -m http.server 8000
   open http://localhost:8000
   ```

2. **Run the Mobile App**:
   ```bash
   cd pricecheck-kuwait-app
   npm install
   npx react-native start
   # In another terminal:
   npx react-native run-ios
   ```

## 📋 Phase 1 MVP Features

- ✅ Clean grayscale UI
- ✅ Price comparison functionality
- ✅ Shopping cart system
- ✅ Restaurant browsing
- ✅ Price submission system
- ✅ Responsive website
- ✅ TypeScript support
- ✅ Error-free compilation

## 🛠️ Technology Stack

**Mobile App:**
- React Native 0.72.6
- TypeScript
- React Navigation
- React Native Paper
- React Native Camera

**Website:**
- HTML5
- CSS3
- JavaScript
- Responsive Design

## 📄 License

This project is part of the PriceCheck Kuwait development initiative.