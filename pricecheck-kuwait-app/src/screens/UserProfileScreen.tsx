/**
 * User Profile Screen
 * 
 * Displays user statistics, reputation, badges, and recent activity
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  RefreshControl
} from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  Chip,
  ProgressBar,
  Divider,
  List,
  Avatar,
  Badge
} from 'react-native-paper';
import { DatabaseService } from '../services/databaseService';
import { UserReputation, UserBadge, PriceSubmission, BadgeType } from '../data/databaseSchema';

interface UserStats {
  reputation: UserReputation | null;
  badges: UserBadge[];
  recentSubmissions: PriceSubmission[];
  totalPoints: number;
  rank: number;
}

const UserProfileScreen: React.FC = () => {
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Mock user ID - in real app, get from authentication
  const userId = 1;

  useEffect(() => {
    loadUserStats();
  }, []);

  const loadUserStats = async () => {
    try {
      setLoading(true);
      const stats = await DatabaseService.getUserStats(userId);
      setUserStats(stats);
    } catch (error) {
      Alert.alert('Error', 'Failed to load user statistics');
      console.error('Error loading user stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadUserStats();
    setRefreshing(false);
  };

  const getBadgeIcon = (badgeType: BadgeType): string => {
    switch (badgeType) {
      case BadgeType.FIRST_SUBMISSION:
        return '🎯';
      case BadgeType.TOP_CONTRIBUTOR:
        return '🏆';
      case BadgeType.VERIFIED_CONTRIBUTOR:
        return '✅';
      case BadgeType.PRICE_HUNTER:
        return '🔍';
      case BadgeType.COMMUNITY_HELPER:
        return '🤝';
      case BadgeType.ACCURACY_MASTER:
        return '🎯';
      case BadgeType.WEEKLY_CHAMPION:
        return '⭐';
      case BadgeType.MONTHLY_CHAMPION:
        return '👑';
      case BadgeType.PRICE_VERIFIER:
        return '🔍';
      case BadgeType.DISPUTE_RESOLVER:
        return '⚖️';
      default:
        return '🏅';
    }
  };

  const getTrustLevel = (trustScore: number): { level: string; color: string } => {
    if (trustScore >= 90) return { level: 'Elite', color: '#4CAF50' };
    if (trustScore >= 80) return { level: 'Trusted', color: '#2196F3' };
    if (trustScore >= 70) return { level: 'Reliable', color: '#FF9800' };
    if (trustScore >= 60) return { level: 'Good', color: '#9C27B0' };
    return { level: 'New', color: '#607D8B' };
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading profile...</Text>
      </View>
    );
  }

  if (!userStats) {
    return (
      <View style={styles.errorContainer}>
        <Text>Failed to load profile data</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadUserStats}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const { reputation, badges, recentSubmissions, totalPoints, rank } = userStats;
  const trustLevel = reputation ? getTrustLevel(reputation.trust_score) : { level: 'New', color: '#607D8B' };

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* User Header */}
      <Card style={styles.headerCard}>
        <Card.Content>
          <View style={styles.headerContent}>
            <Avatar.Text 
              size={60} 
              label="U" 
              style={[styles.avatar, { backgroundColor: trustLevel.color }]}
            />
            <View style={styles.headerInfo}>
              <Title style={styles.userName}>User {userId}</Title>
              <Chip 
                mode="outlined" 
                style={[styles.trustChip, { borderColor: trustLevel.color }]}
                textStyle={{ color: trustLevel.color }}
              >
                {trustLevel.level} ({reputation?.trust_score || 0})
              </Chip>
              <Text style={styles.rankText}>Rank #{rank}</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Stats Overview */}
      <Card style={styles.statsCard}>
        <Card.Content>
          <Title>Statistics</Title>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{totalPoints}</Text>
              <Text style={styles.statLabel}>Total Points</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{reputation?.submission_count || 0}</Text>
              <Text style={styles.statLabel}>Submissions</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{reputation?.verified_submission_count || 0}</Text>
              <Text style={styles.statLabel}>Verified</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{badges.length}</Text>
              <Text style={styles.statLabel}>Badges</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Trust Score Progress */}
      {reputation && (
        <Card style={styles.progressCard}>
          <Card.Content>
            <View style={styles.progressHeader}>
              <Title>Trust Score</Title>
              <Text style={styles.progressValue}>{reputation.trust_score}/100</Text>
            </View>
            <ProgressBar 
              progress={reputation.trust_score / 100} 
              color={trustLevel.color}
              style={styles.progressBar}
            />
            <Text style={styles.progressDescription}>
              Higher trust scores give your submissions more weight in price comparisons
            </Text>
          </Card.Content>
        </Card>
      )}

      {/* Badges */}
      <Card style={styles.badgesCard}>
        <Card.Content>
          <Title>Badges ({badges.length})</Title>
          {badges.length > 0 ? (
            <View style={styles.badgesGrid}>
              {badges.map((badge, index) => (
                <View key={index} style={styles.badgeItem}>
                  <Text style={styles.badgeIcon}>{getBadgeIcon(badge.badge_type)}</Text>
                  <Text style={styles.badgeName}>{badge.badge_name}</Text>
                  <Text style={styles.badgeDescription}>{badge.badge_description}</Text>
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.noBadgesText}>
              Submit your first price to earn a badge! 🎯
            </Text>
          )}
        </Card.Content>
      </Card>

      {/* Recent Submissions */}
      <Card style={styles.submissionsCard}>
        <Card.Content>
          <Title>Recent Submissions</Title>
          {recentSubmissions.length > 0 ? (
            <List.Section>
              {recentSubmissions.slice(0, 5).map((submission, index) => (
                <List.Item
                  key={index}
                  title={`${submission.price_value} KWD`}
                  description={`${submission.timestamp.toLocaleDateString()} - ${submission.is_offer ? 'Special Offer' : 'Regular Price'}`}
                  left={() => (
                    <List.Icon 
                      icon={submission.is_verified ? "check-circle" : "clock-outline"} 
                      color={submission.is_verified ? "#4CAF50" : "#FF9800"}
                    />
                  )}
                  right={() => (
                    <View style={styles.submissionMeta}>
                      {submission.is_offer && (
                        <Badge style={styles.offerBadge}>Offer</Badge>
                      )}
                      <Text style={styles.verificationCount}>
                        {submission.verification_count} verifications
                      </Text>
                    </View>
                  )}
                />
              ))}
            </List.Section>
          ) : (
            <Text style={styles.noSubmissionsText}>
              No submissions yet. Start contributing to the community! 🚀
            </Text>
          )}
        </Card.Content>
      </Card>

      {/* Level Progress */}
      {reputation && (
        <Card style={styles.levelCard}>
          <Card.Content>
            <Title>Level {reputation.level}</Title>
            <Text style={styles.levelDescription}>
              {100 - (totalPoints % 100)} points until next level
            </Text>
            <ProgressBar 
              progress={(totalPoints % 100) / 100} 
              color="#4CAF50"
              style={styles.levelProgressBar}
            />
          </Card.Content>
        </Card>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  retryButton: {
    backgroundColor: '#424242',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  retryButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  headerCard: {
    margin: 16,
    elevation: 2,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    marginRight: 16,
  },
  headerInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  trustChip: {
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  rankText: {
    fontSize: 14,
    color: '#666',
  },
  statsCard: {
    margin: 16,
    marginTop: 0,
    elevation: 2,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#424242',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  progressCard: {
    margin: 16,
    marginTop: 0,
    elevation: 2,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#424242',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginVertical: 8,
  },
  progressDescription: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
  },
  badgesCard: {
    margin: 16,
    marginTop: 0,
    elevation: 2,
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
  },
  badgeItem: {
    width: '50%',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  badgeIcon: {
    fontSize: 32,
    marginBottom: 4,
  },
  badgeName: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 2,
  },
  badgeDescription: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
  },
  noBadgesText: {
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic',
    marginTop: 16,
  },
  submissionsCard: {
    margin: 16,
    marginTop: 0,
    elevation: 2,
  },
  submissionMeta: {
    alignItems: 'flex-end',
  },
  offerBadge: {
    backgroundColor: '#FF9800',
    marginBottom: 4,
  },
  verificationCount: {
    fontSize: 10,
    color: '#666',
  },
  noSubmissionsText: {
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic',
    marginTop: 16,
  },
  levelCard: {
    margin: 16,
    marginTop: 0,
    elevation: 2,
  },
  levelDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  levelProgressBar: {
    height: 6,
    borderRadius: 3,
  },
});

export default UserProfileScreen;
