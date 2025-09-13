/**
 * Database Service for PriceCheck Kuwait
 *
 * This service handles all database operations including:
 * - Price submissions and retrieval
 * - User reputation management
 * - Verification and dispute handling
 * - Leaderboard calculations
 * - Data accuracy and trust scoring
 */

import {
  User,
  Restaurant,
  DeliveryApp,
  MenuItem,
  PriceSubmission,
  UserReputation,
  UserBadge,
  UserPoints,
  PointAction,
  BadgeType,
  PriceVerification,
  PriceDispute,
  DisputeStatus,
  Leaderboard,
  LeaderboardEntry,
  LeaderboardPeriod,
  PriceAnalytics,
  PriceComparisonResult,
  MenuItemPrice,
  DATABASE_CONSTRAINTS,
  REPUTATION_RULES,
} from '../data/databaseSchema';

// ============================================================================
// MOCK DATABASE (Replace with real database in production)
// ============================================================================

class MockDatabase {
  private users: Map<number, User> = new Map();
  private restaurants: Map<number, Restaurant> = new Map();
  private deliveryApps: Map<number, DeliveryApp> = new Map();
  private menuItems: Map<number, MenuItem> = new Map();
  private priceSubmissions: Map<number, PriceSubmission> = new Map();
  private userReputations: Map<number, UserReputation> = new Map();
  private userBadges: Map<number, UserBadge> = new Map();
  private userPoints: Map<number, UserPoints> = new Map();
  private priceVerifications: Map<number, PriceVerification> = new Map();
  private priceDisputes: Map<number, PriceDispute> = new Map();
  private leaderboards: Map<number, Leaderboard> = new Map();
  private leaderboardEntries: Map<number, LeaderboardEntry> = new Map();
  private priceAnalytics: Map<number, PriceAnalytics> = new Map();

  private nextId = 1;

  // Initialize with sample data
  constructor() {
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Sample delivery apps
    const apps = [
      {id: 1, name: 'talabat', display_name: 'Talabat', is_active: true},
      {id: 2, name: 'jahez', display_name: 'Jahez', is_active: true},
      {id: 3, name: 'deliveroo', display_name: 'Deliveroo', is_active: true},
      {id: 4, name: 'carriage', display_name: 'Carriage', is_active: true},
      {id: 5, name: 'vthru', display_name: 'V-Thru', is_active: true},
    ];

    apps.forEach(app => {
      this.deliveryApps.set(app.id, {
        ...app,
        created_at: new Date(),
        updated_at: new Date(),
      });
    });
  }

  // Generic CRUD operations
  create<T>(table: string, data: Omit<T, 'id'>): T {
    const id = this.nextId++;
    const record = {...data, id} as T;
    (this as any)[table].set(id, record);
    return record;
  }

  findById<T>(table: string, id: number): T | undefined {
    return (this as any)[table].get(id);
  }

  findAll<T>(table: string): T[] {
    return Array.from((this as any)[table].values());
  }

  update<T>(table: string, id: number, data: Partial<T>): T | undefined {
    const existing = (this as any)[table].get(id);
    if (!existing) {
      return undefined;
    }

    const updated = {...existing, ...data, updated_at: new Date()};
    (this as any)[table].set(id, updated);
    return updated;
  }

  delete(table: string, id: number): boolean {
    return (this as any)[table].delete(id);
  }
}

const db = new MockDatabase();

// ============================================================================
// CORE DATABASE SERVICE
// ============================================================================

export class DatabaseService {
  
  // ============================================================================
  // PRICE SUBMISSION OPERATIONS
  // ============================================================================

  /**
   * Submit a new price for a menu item on a delivery app
   */
  static async submitPrice(
    menuItemId: number,
    deliveryAppId: number,
    userId: number,
    priceValue: number,
    isOffer: boolean = false,
    offerDescription?: string,
    screenshotUrl?: string,
  ): Promise<PriceSubmission> {
    // Validate price
    if (
      priceValue < DATABASE_CONSTRAINTS.MIN_PRICE_VALUE ||
      priceValue > DATABASE_CONSTRAINTS.MAX_PRICE_VALUE
    ) {
      throw new Error('Invalid price value');
    }

    // Create price submission
    const submission = db.create<PriceSubmission>('priceSubmissions', {
      menu_item_id: menuItemId,
      delivery_app_id: deliveryAppId,
      user_id: userId,
      price_value: priceValue,
      timestamp: new Date(),
      is_offer: isOffer,
      offer_description: offerDescription,
      screenshot_url: screenshotUrl,
      is_verified: false,
      verification_count: 0,
      dispute_count: 0,
      created_at: new Date(),
      updated_at: new Date(),
    });

    // Award points to user
    await this.awardPoints(
      userId,
      REPUTATION_RULES.POINTS_FOR_SUBMISSION,
      PointAction.PRICE_SUBMISSION,
      `Price submission for menu item ${menuItemId}`,
    );

    // Update user reputation
    await this.updateUserReputation(userId);

    // Check for badges
    await this.checkAndAwardBadges(userId);

    return submission;
  }

  /**
   * Get the most recent price for a menu item on a specific delivery app
   */
  static async getLatestPrice(
    menuItemId: number,
    deliveryAppId: number,
  ): Promise<PriceSubmission | null> {
    const allSubmissions = db.findAll<PriceSubmission>('priceSubmissions');

    const latestSubmission = allSubmissions
      .filter(
        sub =>
          sub.menu_item_id === menuItemId &&
          sub.delivery_app_id === deliveryAppId &&
          sub.is_verified !== false, // Prioritize verified submissions
      )
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())[0];

    return latestSubmission || null;
  }

  /**
   * Get all prices for a menu item across all delivery apps
   */
  static async getPricesForMenuItem(
    menuItemId: number,
  ): Promise<PriceSubmission[]> {
    const allSubmissions = db.findAll<PriceSubmission>('priceSubmissions');

    return allSubmissions
      .filter(sub => sub.menu_item_id === menuItemId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  // ============================================================================
  // PRICE COMPARISON OPERATIONS
  // ============================================================================

  /**
   * Compare prices for a cart across all delivery apps
   */
  static async comparePricesForCart(
    menuItemIds: number[],
  ): Promise<PriceComparisonResult[]> {
    const deliveryApps = db.findAll<DeliveryApp>('deliveryApps');
    const results: PriceComparisonResult[] = [];

    for (const app of deliveryApps) {
      if (!app.is_active) {
        continue;
      }

      const itemPrices: MenuItemPrice[] = [];
      let totalPrice = 0;
      let confidenceScore = 100;

      for (const menuItemId of menuItemIds) {
        const latestPrice = await this.getLatestPrice(menuItemId, app.id);

        if (latestPrice) {
          const menuItem = db.findById<MenuItem>('menuItems', menuItemId);
          if (menuItem) {
            itemPrices.push({
              menu_item: menuItem,
              price: latestPrice.price_value,
              is_offer: latestPrice.is_offer,
              offer_description: latestPrice.offer_description,
              confidence_score: this.calculateConfidenceScore(latestPrice),
              last_updated: latestPrice.timestamp,
            });

            totalPrice += latestPrice.price_value;
            confidenceScore = Math.min(
              confidenceScore,
              this.calculateConfidenceScore(latestPrice),
            );
          }
        }
      }

      if (itemPrices.length > 0) {
        results.push({
          delivery_app: app,
          total_price: totalPrice,
          delivery_fee: app.delivery_fee_base || 0,
          service_fee: (totalPrice * (app.service_fee_percentage || 0)) / 100,
          estimated_total:
            totalPrice +
            (app.delivery_fee_base || 0) +
            (totalPrice * (app.service_fee_percentage || 0)) / 100,
          confidence_score: confidenceScore,
          last_updated: new Date(
            Math.max(...itemPrices.map(ip => ip.last_updated.getTime())),
          ),
          item_prices: itemPrices,
        });
      }
    }

    return results.sort((a, b) => a.estimated_total - b.estimated_total);
  }

  // ============================================================================
  // USER REPUTATION SYSTEM
  // ============================================================================

  /**
   * Award points to a user for an action
   */
  static async awardPoints(
    userId: number,
    points: number,
    actionType: PointAction,
    description: string,
    referenceId?: number,
  ): Promise<void> {
    db.create<UserPoints>('userPoints', {
      user_id: userId,
      points,
      action_type: actionType,
      description,
      reference_id: referenceId,
      created_at: new Date(),
    });

    // Update user reputation
    await this.updateUserReputation(userId);
  }

  /**
   * Update user reputation based on their activity
   */
  static async updateUserReputation(userId: number): Promise<UserReputation> {
    const userPoints = db
      .findAll<UserPoints>('userPoints')
      .filter(p => p.user_id === userId);

    const totalPoints = userPoints.reduce((sum, p) => sum + p.points, 0);
    const submissionCount = userPoints.filter(
      p => p.action_type === PointAction.PRICE_SUBMISSION,
    ).length;
    const verifiedCount = userPoints.filter(
      p => p.action_type === PointAction.PRICE_VERIFICATION,
    ).length;
    const disputeCount = userPoints.filter(
      p => p.action_type === PointAction.DISPUTE_RESOLUTION,
    ).length;

    // Calculate trust score (0-100)
    const trustScore = Math.min(
      100,
      Math.max(0, verifiedCount * 10 + submissionCount * 2 - disputeCount * 5),
    );

    // Calculate level based on total points
    const level = Math.floor(totalPoints / 100) + 1;

    const existingReputation = db.findById<UserReputation>(
      'userReputations',
      userId,
    );

    if (existingReputation) {
      return db.update<UserReputation>('userReputations', userId, {
        total_points: totalPoints,
        trust_score: trustScore,
        submission_count: submissionCount,
        verified_submission_count: verifiedCount,
        dispute_count: disputeCount,
        level,
        last_updated: new Date(),
      })!;
    } else {
      return db.create<UserReputation>('userReputations', {
        user_id: userId,
        total_points: totalPoints,
        trust_score: trustScore,
        submission_count: submissionCount,
        verified_submission_count: verifiedCount,
        dispute_count: disputeCount,
        badge_count: 0,
        level,
        last_updated: new Date(),
      });
    }
  }

  /**
   * Check and award badges to a user
   */
  static async checkAndAwardBadges(userId: number): Promise<UserBadge[]> {
    const reputation = db.findById<UserReputation>('userReputations', userId);
    if (!reputation) {
      return [];
    }

    const existingBadges = db
      .findAll<UserBadge>('userBadges')
      .filter(b => b.user_id === userId && b.is_active);

    const newBadges: UserBadge[] = [];

    // First submission badge
    if (
      reputation.submission_count >= 1 &&
      !existingBadges.some(b => b.badge_type === BadgeType.FIRST_SUBMISSION)
    ) {
      newBadges.push(
        await this.awardBadge(
          userId,
          BadgeType.FIRST_SUBMISSION,
          'First Submission',
          'Submitted your first price!',
        ),
      );
    }

    // Top contributor badge
    if (
      reputation.submission_count >= 50 &&
      !existingBadges.some(b => b.badge_type === BadgeType.TOP_CONTRIBUTOR)
    ) {
      newBadges.push(
        await this.awardBadge(
          userId,
          BadgeType.TOP_CONTRIBUTOR,
          'Top Contributor',
          'Submitted 50+ prices!',
        ),
      );
    }

    // Verified contributor badge
    if (
      reputation.trust_score >= 80 &&
      !existingBadges.some(b => b.badge_type === BadgeType.VERIFIED_CONTRIBUTOR)
    ) {
      newBadges.push(
        await this.awardBadge(
          userId,
          BadgeType.VERIFIED_CONTRIBUTOR,
          'Verified Contributor',
          'High trust score achieved!',
        ),
      );
    }

    return newBadges;
  }

  /**
   * Award a badge to a user
   */
  static async awardBadge(
    userId: number,
    badgeType: BadgeType,
    badgeName: string,
    badgeDescription: string,
  ): Promise<UserBadge> {
    const badge = db.create<UserBadge>('userBadges', {
      user_id: userId,
      badge_type: badgeType,
      badge_name: badgeName,
      badge_description: badgeDescription,
      earned_at: new Date(),
      is_active: true,
    });

    // Update badge count in reputation
    const reputation = db.findById<UserReputation>('userReputations', userId);
    if (reputation) {
      db.update<UserReputation>('userReputations', userId, {
        badge_count: reputation.badge_count + 1,
      });
    }

    return badge;
  }

  // ============================================================================
  // VERIFICATION & DISPUTE SYSTEM
  // ============================================================================

  /**
   * Verify a price submission
   */
  static async verifyPrice(
    priceSubmissionId: number,
    verifierUserId: number,
    isAccurate: boolean,
    verificationNotes?: string,
  ): Promise<PriceVerification> {
    const verification = db.create<PriceVerification>('priceVerifications', {
      price_submission_id: priceSubmissionId,
      verifier_user_id: verifierUserId,
      is_accurate: isAccurate,
      verification_notes: verificationNotes,
      created_at: new Date(),
    });

    // Update verification count on submission
    const submission = db.findById<PriceSubmission>(
      'priceSubmissions',
      priceSubmissionId,
    );
    if (submission) {
      db.update<PriceSubmission>('priceSubmissions', priceSubmissionId, {
        verification_count: submission.verification_count + 1,
        is_verified:
          submission.verification_count + 1 >=
          REPUTATION_RULES.VERIFICATION_THRESHOLD,
      });
    }

    // Award points to verifier
    await this.awardPoints(
      verifierUserId,
      REPUTATION_RULES.POINTS_FOR_VERIFICATION,
      PointAction.PRICE_VERIFICATION,
      `Verified price submission ${priceSubmissionId}`,
      priceSubmissionId,
    );

    return verification;
  }

  /**
   * Dispute a price submission
   */
  static async disputePrice(
    priceSubmissionId: number,
    disputerUserId: number,
    disputeReason: string,
    suggestedPrice?: number,
    evidenceUrl?: string,
  ): Promise<PriceDispute> {
    const dispute = db.create<PriceDispute>('priceDisputes', {
      price_submission_id: priceSubmissionId,
      disputer_user_id: disputerUserId,
      dispute_reason: disputeReason,
      suggested_price: suggestedPrice,
      evidence_url: evidenceUrl,
      status: DisputeStatus.PENDING,
      created_at: new Date(),
      updated_at: new Date(),
    });

    // Update dispute count on submission
    const submission = db.findById<PriceSubmission>(
      'priceSubmissions',
      priceSubmissionId,
    );
    if (submission) {
      db.update<PriceSubmission>('priceSubmissions', priceSubmissionId, {
        dispute_count: submission.dispute_count + 1,
      });
    }

    return dispute;
  }

  // ============================================================================
  // LEADERBOARD OPERATIONS
  // ============================================================================

  /**
   * Get leaderboard for a specific period
   */
  static async getLeaderboard(
    _period: LeaderboardPeriod,
  ): Promise<LeaderboardEntry[]> {
    const allEntries = db.findAll<LeaderboardEntry>('leaderboardEntries');

    // Filter by period and sort by points
    return allEntries
      .sort((a, b) => b.points - a.points)
      .map((entry, index) => ({
        ...entry,
        position: index + 1,
      }));
  }

  /**
   * Update leaderboard entries
   */
  static async updateLeaderboard(): Promise<void> {
    const allUsers = db.findAll<User>('users');

    for (const user of allUsers) {
      const reputation = db.findById<UserReputation>(
        'userReputations',
        user.id,
      );
      if (!reputation) {
        continue;
      }

      // Update or create leaderboard entry
      const existingEntry = db
        .findAll<LeaderboardEntry>('leaderboardEntries')
        .find(entry => entry.user_id === user.id);

      if (existingEntry) {
        db.update<LeaderboardEntry>('leaderboardEntries', existingEntry.id, {
          points: reputation.total_points,
          submission_count: reputation.submission_count,
          verification_count: reputation.verified_submission_count,
        });
      } else {
        db.create<LeaderboardEntry>('leaderboardEntries', {
          leaderboard_id: 1, // Default leaderboard
          user_id: user.id,
          position: 0, // Will be updated when sorted
          points: reputation.total_points,
          submission_count: reputation.submission_count,
          verification_count: reputation.verified_submission_count,
          updated_at: new Date(),
        });
      }
    }
  }

  // ============================================================================
  // UTILITY FUNCTIONS
  // ============================================================================

  /**
   * Calculate confidence score for a price submission
   */
  private static calculateConfidenceScore(submission: PriceSubmission): number {
    let score = 50; // Base score

    // Recent submissions get higher scores
    const hoursSinceSubmission =
      (Date.now() - submission.timestamp.getTime()) / (1000 * 60 * 60);
    if (hoursSinceSubmission < 24) {
      score += 30;
    } else if (hoursSinceSubmission < 168) {
      score += 20; // 1 week
    } else if (hoursSinceSubmission < 720) {
      score += 10; // 1 month
    }

    // Verified submissions get higher scores
    if (submission.is_verified) {
      score += 20;
    }

    // More verifications = higher confidence
    score += Math.min(20, submission.verification_count * 5);

    // Disputes reduce confidence
    score -= submission.dispute_count * 10;

    return Math.max(0, Math.min(100, score));
  }

  /**
   * Get user statistics
   */
  static async getUserStats(userId: number): Promise<{
    reputation: UserReputation | null;
    badges: UserBadge[];
    recentSubmissions: PriceSubmission[];
    totalPoints: number;
    rank: number;
  }> {
    const reputation = db.findById<UserReputation>('userReputations', userId);
    const badges = db
      .findAll<UserBadge>('userBadges')
      .filter(b => b.user_id === userId && b.is_active);
    const recentSubmissions = db
      .findAll<PriceSubmission>('priceSubmissions')
      .filter(s => s.user_id === userId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, 10);

    // Calculate rank
    const allEntries = await this.getLeaderboard(LeaderboardPeriod.ALL_TIME);
    const userEntry = allEntries.find(entry => entry.user_id === userId);
    const rank = userEntry ? userEntry.position : 0;

    return {
      reputation: reputation || null,
      badges,
      recentSubmissions,
      totalPoints: reputation?.total_points || 0,
      rank,
    };
  }
}
