# مسح الغداء الكويتي - Kuwaiti Food Price Comparison App

A comprehensive mobile application for Kuwait that helps users compare food delivery prices across multiple apps (Talabat, Deliveroo, Carriage, Zomato, Uber Eats) to find the best deals and save money on their food orders.

## Features

### Core Features
- **Restaurant Price Comparison**: Compare prices across all major food delivery apps
- **Real-time Price Updates**: Live pricing data from Talabat, Deliveroo, Carriage, Zomato, and Uber Eats
- **Best Deal Finder**: Automatically identify the cheapest option for each menu item
- **Restaurant Information**: Detailed restaurant profiles with ratings, delivery times, and fees
- **Menu Item Details**: Complete nutritional information and allergen warnings
- **Halal Status**: Clear indicators for Halal certification status
- **Bilingual Support**: Full Arabic and English language support

### Health & Nutrition
- **Health Scoring**: A-E rating system based on nutritional content
- **Dietary Compatibility**: Personalized recommendations based on user preferences
- **Allergen Alerts**: Prominent warnings for user-specified allergies
- **Nutritional Analysis**: Comprehensive breakdown of calories, macronutrients, and vitamins

### Price Comparison & Savings
- **Multi-App Comparison**: Compare prices across 5+ food delivery apps simultaneously
- **Delivery Fee Calculator**: See total cost including delivery and service fees
- **Savings Calculator**: Calculate potential savings for each order
- **Price Alerts**: Get notified when prices drop for your favorite items
- **Restaurant Integration**: Support for major Kuwaiti restaurants (McDonald's, KFC, Pizza Hut, etc.)

## Technology Stack

- **Frontend**: React Native (Cross-platform)
- **Navigation**: React Navigation 6
- **UI Components**: React Native Paper
- **Camera**: React Native Camera
- **State Management**: React Hooks
- **TypeScript**: Full type safety
- **Styling**: Custom theme system with Kuwaiti branding

## Prerequisites

Before running the application, ensure you have:

- Node.js (v16 or higher)
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development)
- Java Development Kit (JDK 11 or higher)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd foodapp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **iOS Setup** (macOS only)
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Android Setup**
   - Open Android Studio
   - Configure Android SDK
   - Set up Android emulator or connect physical device

## Running the Application

### Development Mode

1. **Start Metro bundler**
   ```bash
   npm start
   ```

2. **Run on Android**
   ```bash
   npm run android
   ```

3. **Run on iOS**
   ```bash
   npm run ios
   ```

### Production Build

1. **Android APK**
   ```bash
   cd android
   ./gradlew assembleRelease
   ```

2. **iOS App**
   - Open `ios/KuwaitiFoodScanner.xcworkspace` in Xcode
   - Configure signing and build for release

## Project Structure

```
src/
├── components/          # Reusable UI components
├── screens/            # Application screens
│   ├── HomeScreen.tsx
│   ├── ScannerScreen.tsx
│   ├── ProductScreen.tsx
│   ├── ProfileScreen.tsx
│   ├── PricingScreen.tsx
│   └── OnboardingScreen.tsx
├── styles/             # Theme and styling
│   └── theme.ts
├── types/              # TypeScript type definitions
│   └── index.ts
├── utils/              # Utility functions
└── services/           # API and data services
```

## Key Screens

### 1. Onboarding Screen
- User registration and profile setup
- Health goals and dietary preferences selection
- Allergy and dietary restriction configuration

### 2. Home Screen
- Quick access to scanner
- Recent products and favorites
- Health tips and statistics
- Quick action buttons

### 3. Scanner Screen
- Barcode scanning with camera
- Real-time scanning feedback
- Flash and camera controls
- Product not found handling

### 4. Product Screen
- Detailed product information
- Nutritional facts and health score
- Ingredient list and allergen warnings
- Halal status verification
- Price comparison integration

### 5. Profile Screen
- User information and preferences
- Health goals and dietary restrictions
- App settings and notifications
- Statistics and activity history

### 6. Pricing Screen
- Price comparison across stores
- Price submission and verification
- Historical pricing data
- Store-specific pricing

## Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
API_BASE_URL=https://api.kuwaitifoodscanner.com
GOOGLE_MAPS_API_KEY=your_google_maps_key
CAMERA_PERMISSION_MESSAGE=This app needs camera access to scan barcodes
```

### Theme Customization
The app uses a custom theme system located in `src/styles/theme.ts`. You can customize:
- Colors (Kuwaiti flag inspired)
- Typography
- Spacing and layout
- Component styles

## API Integration

The app is designed to integrate with a backend API for:
- Product database management
- User authentication and profiles
- Price submission and verification
- Health score calculations
- Halal certification verification

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Email: support@kuwaitifoodscanner.com
- Website: https://kuwaitifoodscanner.com
- Documentation: https://docs.kuwaitifoodscanner.com

## Roadmap

### Phase 1 (Current)
- ✅ Basic barcode scanning
- ✅ Product information display
- ✅ User profile management
- ✅ Price comparison interface

### Phase 2 (Upcoming)
- [ ] Backend API integration
- [ ] Real-time price updates
- [ ] Push notifications
- [ ] Advanced health analytics

### Phase 3 (Future)
- [ ] Recipe suggestions
- [ ] Shopping list integration
- [ ] Store layout optimization
- [ ] Social features and sharing

## Acknowledgments

- Kuwaiti flag colors and cultural considerations
- React Native community
- Open source barcode scanning libraries
- Kuwaiti food retailers for partnership opportunities

---

**مسح الغداء الكويتي** - Making healthy food choices easier for Kuwaiti families
