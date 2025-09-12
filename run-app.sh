#!/bin/bash

echo "🚀 Starting Kuwaiti Food Scanner App..."
echo "======================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if React Native CLI is installed
if ! command -v react-native &> /dev/null; then
    echo "📦 Installing React Native CLI..."
    npm install -g react-native-cli
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# For iOS, install pods
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "🍎 Installing iOS dependencies..."
    cd ios && pod install && cd ..
fi

echo ""
echo "✅ Setup complete! Choose your platform:"
echo ""
echo "For Android:"
echo "  npm run android"
echo ""
echo "For iOS (macOS only):"
echo "  npm run ios"
echo ""
echo "To start Metro bundler:"
echo "  npm start"
echo ""
echo "📱 Test barcodes to scan:"
echo "  - 1234567890123 (Almarai Milk)"
echo "  - 2345678901234 (Sunbake Bread)"
echo "  - 3456789012345 (Kraft Cheese)"
echo "  - 4567890123456 (Coca-Cola)"
echo "  - 5678901234567 (Fresh Bananas)"
echo ""
echo "🎉 Happy testing!"
