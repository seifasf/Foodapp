/**
 * Database Schema for PriceCheck Kuwait
 * 
 * This file defines the complete database structure for the crowdsourced
 * food price comparison app, including all tables, relationships, and indexes.
 */

// ============================================================================
// CORE TABLES
// ============================================================================

export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  profile_image_url?: string;
  join_date: Date;
  last_active: Date;
  is_verified: boolean;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  location: string;
  address: string;
  latitude?: number;
  longitude?: number;
  phone?: string;
  website?: string;
  image_url?: string;
  is_active: boolean;
  delivery_radius_km?: number;
  average_rating?: number;
  total_reviews?: number;
  created_at: Date;
  updated_at: Date;
}

export interface DeliveryApp {
  id: number;
  name: string;
  display_name: string;
  logo_url?: string;
  website_url?: string;
  is_active: boolean;
  service_fee_percentage?: number;
  delivery_fee_base?: number;
  created_at: Date;
  updated_at: Date;
}

export interface MenuItem {
  id: number;
  restaurant_id: number;
  name: string;
  description?: string;
  base_price?: number; // Restaurant's listed price
  category?: string;
  image_url?: string;
  is_vegetarian: boolean;
  is_halal: boolean;
  allergens?: string[];
  calories?: number;
  is_available: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface PriceSubmission {
  id: number;
  menu_item_id: number;
  delivery_app_id: number;
  user_id: number;
  price_value: number; // Price in KWD
  timestamp: Date;
  is_offer: boolean;
  offer_description?: string;
  screenshot_url?: string;
  is_verified: boolean;
  verification_count: number;
  dispute_count: number;
  created_at: Date;
  updated_at: Date;
}

// ============================================================================
// USER REPUTATION SYSTEM
// ============================================================================

export interface UserReputation {
  id: number;
  user_id: number;
  total_points: number;
  trust_score: number; // 0-100
  submission_count: number;
  verified_submission_count: number;
  dispute_count: number;
  badge_count: number;
  level: number;
  last_updated: Date;
}

export interface UserBadge {
  id: number;
  user_id: number;
  badge_type: BadgeType;
  badge_name: string;
  badge_description: string;
  earned_at: Date;
  is_active: boolean;
}

export enum BadgeType {
  FIRST_SUBMISSION = 'first_submission',
  TOP_CONTRIBUTOR = 'top_contributor',
  VERIFIED_CONTRIBUTOR = 'verified_contributor',
  PRICE_HUNTER = 'price_hunter',
  COMMUNITY_HELPER = 'community_helper',
  ACCURACY_MASTER = 'accuracy_master',
  WEEKLY_CHAMPION = 'weekly_champion',
  MONTHLY_CHAMPION = 'monthly_champion',
  PRICE_VERIFIER = 'price_verifier',
  DISPUTE_RESOLVER = 'dispute_resolver'
}

export interface UserPoints {
  id: number;
  user_id: number;
  points: number;
  action_type: PointAction;
  description: string;
  reference_id?: number; // ID of related submission, verification, etc.
  created_at: Date;
}

export enum PointAction {
  PRICE_SUBMISSION = 'price_submission',
  PRICE_VERIFICATION = 'price_verification',
  DISPUTE_RESOLUTION = 'dispute_resolution',
  ACCURATE_SUBMISSION = 'accurate_submission',
  WEEKLY_TOP_CONTRIBUTOR = 'weekly_top_contributor',
  MONTHLY_TOP_CONTRIBUTOR = 'monthly_top_contributor',
  BONUS_POINTS = 'bonus_points'
}

// ============================================================================
// VERIFICATION & DISPUTE SYSTEM
// ============================================================================

export interface PriceVerification {
  id: number;
  price_submission_id: number;
  verifier_user_id: number;
  is_accurate: boolean;
  verification_notes?: string;
  created_at: Date;
}

export interface PriceDispute {
  id: number;
  price_submission_id: number;
  disputer_user_id: number;
  dispute_reason: string;
  suggested_price?: number;
  evidence_url?: string;
  status: DisputeStatus;
  resolution_notes?: string;
  resolved_by?: number;
  resolved_at?: Date;
  created_at: Date;
  updated_at: Date;
}

export enum DisputeStatus {
  PENDING = 'pending',
  UNDER_REVIEW = 'under_review',
  RESOLVED_ACCEPTED = 'resolved_accepted',
  RESOLVED_REJECTED = 'resolved_rejected',
  DISMISSED = 'dismissed'
}

// ============================================================================
// GAMIFICATION & LEADERBOARDS
// ============================================================================

export interface Leaderboard {
  id: number;
  period_type: LeaderboardPeriod;
  start_date: Date;
  end_date: Date;
  is_active: boolean;
  created_at: Date;
}

export enum LeaderboardPeriod {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  ALL_TIME = 'all_time'
}

export interface LeaderboardEntry {
  id: number;
  leaderboard_id: number;
  user_id: number;
  position: number;
  points: number;
  submission_count: number;
  verification_count: number;
  updated_at: Date;
}

// ============================================================================
// ANALYTICS & REPORTING
// ============================================================================

export interface PriceAnalytics {
  id: number;
  menu_item_id: number;
  delivery_app_id: number;
  average_price: number;
  min_price: number;
  max_price: number;
  price_variance: number;
  submission_count: number;
  last_updated: Date;
  trend_direction: PriceTrend;
  confidence_score: number; // 0-100
}

export enum PriceTrend {
  STABLE = 'stable',
  INCREASING = 'increasing',
  DECREASING = 'decreasing',
  VOLATILE = 'volatile'
}

// ============================================================================
// DATABASE QUERIES & FUNCTIONS
// ============================================================================

export interface PriceComparisonResult {
  delivery_app: DeliveryApp;
  total_price: number;
  delivery_fee: number;
  service_fee: number;
  estimated_total: number;
  confidence_score: number;
  last_updated: Date;
  item_prices: MenuItemPrice[];
}

export interface MenuItemPrice {
  menu_item: MenuItem;
  price: number;
  is_offer: boolean;
  offer_description?: string;
  confidence_score: number;
  last_updated: Date;
}

// ============================================================================
// DATABASE CONSTRAINTS & VALIDATION
// ============================================================================

export const DATABASE_CONSTRAINTS = {
  MAX_PRICE_VALUE: 1000, // Maximum price in KWD
  MIN_PRICE_VALUE: 0.1,  // Minimum price in KWD
  MAX_TRUST_SCORE: 100,
  MIN_TRUST_SCORE: 0,
  MAX_POINTS_PER_ACTION: 1000,
  MIN_POINTS_PER_ACTION: 1,
  MAX_DISPUTE_REASON_LENGTH: 500,
  MAX_VERIFICATION_NOTES_LENGTH: 200
} as const;

export const REPUTATION_RULES = {
  POINTS_FOR_SUBMISSION: 10,
  POINTS_FOR_VERIFICATION: 5,
  POINTS_FOR_ACCURATE_SUBMISSION: 15,
  POINTS_FOR_DISPUTE_RESOLUTION: 20,
  BONUS_POINTS_THRESHOLD: 100,
  TRUST_SCORE_DECAY_DAYS: 30,
  VERIFICATION_THRESHOLD: 3, // Min verifications for trusted status
  DISPUTE_PENALTY_POINTS: 5
} as const;

// ============================================================================
// INDEXES FOR PERFORMANCE
// ============================================================================

export const DATABASE_INDEXES = [
  // Price submissions - most critical for performance
  'CREATE INDEX idx_prices_menu_item_app ON price_submissions(menu_item_id, delivery_app_id)',
  'CREATE INDEX idx_prices_timestamp ON price_submissions(timestamp DESC)',
  'CREATE INDEX idx_prices_user ON price_submissions(user_id)',
  'CREATE INDEX idx_prices_verified ON price_submissions(is_verified)',
  
  // Menu items
  'CREATE INDEX idx_menu_items_restaurant ON menu_items(restaurant_id)',
  'CREATE INDEX idx_menu_items_available ON menu_items(is_available)',
  
  // User reputation
  'CREATE INDEX idx_user_reputation_points ON user_reputation(total_points DESC)',
  'CREATE INDEX idx_user_reputation_trust ON user_reputation(trust_score DESC)',
  
  // Leaderboards
  'CREATE INDEX idx_leaderboard_entries_position ON leaderboard_entries(leaderboard_id, position)',
  'CREATE INDEX idx_leaderboard_entries_points ON leaderboard_entries(leaderboard_id, points DESC)',
  
  // Verifications and disputes
  'CREATE INDEX idx_verifications_submission ON price_verifications(price_submission_id)',
  'CREATE INDEX idx_disputes_submission ON price_disputes(price_submission_id)',
  'CREATE INDEX idx_disputes_status ON price_disputes(status)'
] as const;
