# User Data System - PriceCheck Kuwait

## Overview

The PriceCheck Kuwait app implements a comprehensive crowdsourced data system that allows users to submit, verify, and maintain accurate food prices across multiple delivery platforms. This system ensures data accuracy through community verification, reputation scoring, and gamification.

## 🏗️ Database Schema

### Core Tables

#### 1. Users Table
```sql
users (
  id: Primary Key
  name: User's display name
  email: User's email address
  phone: Optional phone number
  profile_image_url: Optional profile picture
  join_date: When user joined
  last_active: Last activity timestamp
  is_verified: Account verification status
  is_active: Account status
)
```

#### 2. Restaurants Table
```sql
restaurants (
  id: Primary Key
  name: Restaurant name
  cuisine: Type of cuisine
  location: Restaurant location
  address: Full address
  latitude/longitude: GPS coordinates
  phone: Contact number
  website: Restaurant website
  image_url: Restaurant logo/image
  is_active: Availability status
  delivery_radius_km: Delivery range
  average_rating: Community rating
  total_reviews: Number of reviews
)
```

#### 3. Delivery Apps Table
```sql
delivery_apps (
  id: Primary Key
  name: App identifier (talabat, jahez, etc.)
  display_name: User-friendly name
  logo_url: App logo
  website_url: App website
  is_active: Availability status
  service_fee_percentage: Service fee rate
  delivery_fee_base: Base delivery fee
)
```

#### 4. Menu Items Table
```sql
menu_items (
  id: Primary Key
  restaurant_id: Foreign Key to restaurants
  name: Item name
  description: Item description
  base_price: Restaurant's listed price
  category: Food category
  image_url: Item image
  is_vegetarian: Vegetarian flag
  is_halal: Halal certification
  allergens: Allergen information
  calories: Nutritional info
  is_available: Availability status
)
```

#### 5. Price Submissions Table (Core)
```sql
price_submissions (
  id: Primary Key
  menu_item_id: Foreign Key to menu_items
  delivery_app_id: Foreign Key to delivery_apps
  user_id: Foreign Key to users
  price_value: Price in KWD
  timestamp: When price was submitted
  is_offer: Special offer flag
  offer_description: Offer details
  screenshot_url: Verification image
  is_verified: Community verification status
  verification_count: Number of verifications
  dispute_count: Number of disputes
)
```

## 🎯 User Reputation System

### Trust Score Calculation
The trust score (0-100) is calculated based on:
- **Verification Count**: +10 points per verification
- **Submission Count**: +2 points per submission
- **Dispute Count**: -5 points per dispute
- **Time Decay**: Recent activity weighted higher

### Badge System
Users earn badges for various achievements:

| Badge | Requirement | Points Awarded |
|-------|-------------|----------------|
| 🎯 First Submission | Submit first price | 10 points |
| 🏆 Top Contributor | 50+ submissions | 15 points |
| ✅ Verified Contributor | 80+ trust score | 20 points |
| 🔍 Price Hunter | 100+ submissions | 25 points |
| 🤝 Community Helper | 50+ verifications | 30 points |
| 🎯 Accuracy Master | 95+ trust score | 40 points |
| ⭐ Weekly Champion | Top weekly contributor | 50 points |
| 👑 Monthly Champion | Top monthly contributor | 100 points |
| 🔍 Price Verifier | 100+ verifications | 35 points |
| ⚖️ Dispute Resolver | 20+ dispute resolutions | 45 points |

### Points System
Users earn points for various actions:

| Action | Points | Description |
|--------|--------|-------------|
| Price Submission | 10 | Submit a new price |
| Price Verification | 5 | Verify another user's submission |
| Accurate Submission | 15 | Submission matches others |
| Dispute Resolution | 20 | Successfully resolve a dispute |
| Weekly Top Contributor | 50 | Top contributor for the week |
| Monthly Top Contributor | 100 | Top contributor for the month |

## 🔍 Data Accuracy & Verification

### Timestamp-Based Trust
- **Fresh Data Priority**: Recent submissions (within 24 hours) get +30 confidence points
- **Weekly Data**: 1-7 days old gets +20 confidence points
- **Monthly Data**: 1-30 days old gets +10 confidence points
- **Older Data**: 30+ days old gets base confidence

### Community Verification
1. **User Verification**: Other users can verify submitted prices
2. **Verification Threshold**: 3+ verifications mark submission as "verified"
3. **Dispute System**: Users can dispute incorrect prices
4. **Evidence Support**: Screenshots and receipts can be attached

### Confidence Scoring
Each price submission gets a confidence score (0-100) based on:
- **Recency**: How recent the submission is
- **Verification Status**: Verified submissions get +20 points
- **Verification Count**: +5 points per verification (max +20)
- **Dispute Count**: -10 points per dispute
- **User Trust Score**: Higher trust users' submissions weighted more

## 🏆 Gamification Features

### Leaderboards
- **Daily**: Top contributors for the day
- **Weekly**: Top contributors for the week
- **Monthly**: Top contributors for the month
- **All Time**: Overall top contributors

### User Levels
Users progress through levels based on total points:
- **Level 1**: 0-99 points
- **Level 2**: 100-199 points
- **Level 3**: 200-299 points
- And so on...

### Community Impact
The app tracks community-wide statistics:
- Total submissions across all users
- Total verifications performed
- Active user count
- Average points per user

## 🚀 How It Works

### 1. Price Submission Flow
```
User sees price on delivery app
    ↓
Opens PriceCheck Kuwait app
    ↓
Selects restaurant and menu item
    ↓
Selects delivery app
    ↓
Enters price and optional offer details
    ↓
Submits with optional screenshot
    ↓
Earns 10 points + potential bonuses
    ↓
Price appears in comparison results
```

### 2. Verification Flow
```
User sees unverified price submission
    ↓
Reviews price and evidence
    ↓
Clicks "Verify" or "Dispute"
    ↓
If verify: +5 points, increases verification count
    ↓
If dispute: Creates dispute ticket for review
    ↓
Community moderators review disputes
```

### 3. Price Comparison Flow
```
User builds cart with menu items
    ↓
App queries latest prices for each item
    ↓
Groups prices by delivery app
    ↓
Calculates totals with fees
    ↓
Sorts by estimated total cost
    ↓
Shows confidence scores for each price
```

## 📊 Data Quality Assurance

### Automatic Quality Checks
- **Price Validation**: Prices must be within reasonable range (0.1-1000 KWD)
- **Duplicate Detection**: Prevents multiple submissions of same price
- **Spam Prevention**: Rate limiting on submissions per user
- **Screenshot Verification**: Optional image evidence for verification

### Community Moderation
- **Dispute Resolution**: Community can flag incorrect prices
- **Trust Score Decay**: Inactive users' trust scores decrease over time
- **Reputation Recovery**: Users can improve reputation through accurate submissions

### Data Freshness
- **Automatic Cleanup**: Old, unverified prices are flagged
- **Update Prompts**: Users are encouraged to update old prices
- **Trend Analysis**: Price trends are analyzed for accuracy

## 🎯 Key Features Implemented

### ✅ Completed Features
1. **Complete Database Schema** - All tables and relationships defined
2. **User Reputation System** - Trust scoring and badge system
3. **Price Submission Interface** - Easy-to-use submission form
4. **Community Verification** - Verify and dispute system
5. **Leaderboard System** - Daily, weekly, monthly rankings
6. **Gamification** - Points, badges, levels, and rewards
7. **Data Accuracy Logic** - Timestamp-based trust and confidence scoring
8. **User Profile** - Comprehensive user statistics and achievements
9. **Enhanced Navigation** - Easy access to all features

### 🔄 Future Enhancements
1. **Machine Learning** - AI-powered price validation
2. **Push Notifications** - Alerts for price updates and achievements
3. **Social Features** - User following and social sharing
4. **Advanced Analytics** - Detailed price trend analysis
5. **API Integration** - Real-time price fetching from delivery apps
6. **Offline Support** - Submit prices when offline, sync when online

## 🛠️ Technical Implementation

### Database Service
- **MockDatabase**: In-memory database for development
- **CRUD Operations**: Complete create, read, update, delete operations
- **Query Optimization**: Indexed queries for performance
- **Data Validation**: Input validation and constraint checking

### User Interface
- **React Native Screens**: Native mobile interface
- **Real-time Updates**: Live leaderboard and statistics
- **Responsive Design**: Works on all screen sizes
- **Accessibility**: Screen reader support and high contrast

### Performance
- **Efficient Queries**: Optimized database queries
- **Caching**: Smart caching for frequently accessed data
- **Lazy Loading**: Load data as needed
- **Background Sync**: Update data in background

## 📈 Success Metrics

### User Engagement
- **Daily Active Users**: Users submitting/verifying daily
- **Submission Rate**: Average submissions per user
- **Verification Rate**: Percentage of submissions verified
- **Retention Rate**: Users returning to the app

### Data Quality
- **Accuracy Rate**: Percentage of verified vs disputed prices
- **Freshness Score**: Average age of price data
- **Coverage**: Percentage of menu items with recent prices
- **Trust Score Distribution**: Distribution of user trust scores

### Community Health
- **Dispute Resolution Time**: Average time to resolve disputes
- **Badge Distribution**: Percentage of users earning badges
- **Leaderboard Participation**: Active leaderboard users
- **Community Growth**: New user signups and retention

This comprehensive user data system ensures that PriceCheck Kuwait maintains the most accurate, up-to-date food price database through community-driven verification and gamification, making it the go-to app for price comparison in Kuwait.
