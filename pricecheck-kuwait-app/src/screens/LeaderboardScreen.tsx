/**
 * Leaderboard Screen
 * 
 * Displays top contributors, weekly/monthly champions, and community rankings
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl
} from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  Chip,
  Avatar,
  List,
  Divider,
  Badge,
  ProgressBar
} from 'react-native-paper';
import { DatabaseService } from '../services/databaseService';
import { LeaderboardEntry, LeaderboardPeriod, UserReputation, BadgeType } from '../data/databaseSchema';

interface LeaderboardData {
  entries: LeaderboardEntry[];
  period: LeaderboardPeriod;
  userRank: number;
  userPoints: number;
}

const LeaderboardScreen: React.FC = () => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardData | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<LeaderboardPeriod>(LeaderboardPeriod.WEEKLY);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Mock user ID - in real app, get from authentication
  const userId = 1;

  useEffect(() => {
    loadLeaderboard();
  }, [selectedPeriod]);

  const loadLeaderboard = async () => {
    try {
      setLoading(true);
      
      // In a real app, load from database
      const mockEntries: LeaderboardEntry[] = [
        {
          id: 1,
          leaderboard_id: 1,
          user_id: 1,
          position: 1,
          points: 1250,
          submission_count: 45,
          verification_count: 23,
          updated_at: new Date()
        },
        {
          id: 2,
          leaderboard_id: 1,
          user_id: 2,
          position: 2,
          points: 1100,
          submission_count: 38,
          verification_count: 19,
          updated_at: new Date()
        },
        {
          id: 3,
          leaderboard_id: 1,
          user_id: 3,
          position: 3,
          points: 950,
          submission_count: 32,
          verification_count: 15,
          updated_at: new Date()
        },
        {
          id: 4,
          leaderboard_id: 1,
          user_id: 4,
          position: 4,
          points: 800,
          submission_count: 28,
          verification_count: 12,
          updated_at: new Date()
        },
        {
          id: 5,
          leaderboard_id: 1,
          user_id: 5,
          position: 5,
          points: 720,
          submission_count: 25,
          verification_count: 10,
          updated_at: new Date()
        }
      ];

      const userEntry = mockEntries.find(entry => entry.user_id === userId);
      
      setLeaderboardData({
        entries: mockEntries,
        period: selectedPeriod,
        userRank: userEntry?.position || 0,
        userPoints: userEntry?.points || 0
      });

    } catch (error) {
      console.error('Error loading leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadLeaderboard();
    setRefreshing(false);
  };

  const getPeriodTitle = (period: LeaderboardPeriod): string => {
    switch (period) {
      case LeaderboardPeriod.DAILY:
        return 'Daily';
      case LeaderboardPeriod.WEEKLY:
        return 'Weekly';
      case LeaderboardPeriod.MONTHLY:
        return 'Monthly';
      case LeaderboardPeriod.ALL_TIME:
        return 'All Time';
      default:
        return 'Weekly';
    }
  };

  const getRankIcon = (position: number): string => {
    switch (position) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return '🏅';
    }
  };

  const getRankColor = (position: number): string => {
    switch (position) {
      case 1:
        return '#FFD700';
      case 2:
        return '#C0C0C0';
      case 3:
        return '#CD7F32';
      default:
        return '#424242';
    }
  };

  const getBadgeForPosition = (position: number): BadgeType | null => {
    switch (position) {
      case 1:
        return BadgeType.WEEKLY_CHAMPION;
      case 2:
      case 3:
        return BadgeType.TOP_CONTRIBUTOR;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading leaderboard...</Text>
      </View>
    );
  }

  if (!leaderboardData) {
    return (
      <View style={styles.errorContainer}>
        <Text>Failed to load leaderboard</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadLeaderboard}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const { entries, period, userRank, userPoints } = leaderboardData;

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Header */}
      <Card style={styles.headerCard}>
        <Card.Content>
          <Title>Community Leaderboard</Title>
          <Paragraph>
            Top contributors helping build the most accurate price database
          </Paragraph>
        </Card.Content>
      </Card>

      {/* Period Selection */}
      <Card style={styles.periodCard}>
        <Card.Content>
          <Text style={styles.periodLabel}>Time Period</Text>
          <View style={styles.periodChips}>
            {Object.values(LeaderboardPeriod).map((periodOption) => (
              <TouchableOpacity
                key={periodOption}
                style={[
                  styles.periodChip,
                  selectedPeriod === periodOption && styles.selectedPeriodChip
                ]}
                onPress={() => setSelectedPeriod(periodOption)}
              >
                <Text style={[
                  styles.periodChipText,
                  selectedPeriod === periodOption && styles.selectedPeriodChipText
                ]}>
                  {getPeriodTitle(periodOption)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card.Content>
      </Card>

      {/* User's Current Status */}
      <Card style={styles.userStatusCard}>
        <Card.Content>
          <View style={styles.userStatusHeader}>
            <Avatar.Text 
              size={50} 
              label="U" 
              style={styles.userAvatar}
            />
            <View style={styles.userStatusInfo}>
              <Title style={styles.userStatusTitle}>Your Ranking</Title>
              <Text style={styles.userRankText}>
                #{userRank} • {userPoints} points
              </Text>
            </View>
          </View>
          
          {userRank > 0 && (
            <View style={styles.userProgress}>
              <Text style={styles.progressLabel}>
                {userRank <= 3 ? 'Congratulations! 🎉' : 'Keep going! 💪'}
              </Text>
              <ProgressBar 
                progress={Math.min(1, userPoints / 1000)} 
                color="#4CAF50"
                style={styles.progressBar}
              />
              <Text style={styles.progressDescription}>
                {userRank <= 3 
                  ? 'You\'re in the top 3! Amazing work!'
                  : `Submit more prices to climb the leaderboard`
                }
              </Text>
            </View>
          )}
        </Card.Content>
      </Card>

      {/* Top Contributors */}
      <Card style={styles.leaderboardCard}>
        <Card.Content>
          <Title>{getPeriodTitle(period)} Top Contributors</Title>
          
          {entries.length > 0 ? (
            <List.Section>
              {entries.slice(0, 10).map((entry, index) => (
                <View key={entry.id}>
                  <List.Item
                    title={`User ${entry.user_id}`}
                    description={`${entry.submission_count} submissions • ${entry.verification_count} verifications`}
                    left={() => (
                      <View style={styles.rankContainer}>
                        <Text style={styles.rankIcon}>
                          {getRankIcon(entry.position)}
                        </Text>
                        <Text style={[
                          styles.rankNumber,
                          { color: getRankColor(entry.position) }
                        ]}>
                          #{entry.position}
                        </Text>
                      </View>
                    )}
                    right={() => (
                      <View style={styles.pointsContainer}>
                        <Text style={styles.pointsText}>{entry.points}</Text>
                        <Text style={styles.pointsLabel}>points</Text>
                        {getBadgeForPosition(entry.position) && (
                          <Badge style={styles.championBadge}>
                            Champion
                          </Badge>
                        )}
                      </View>
                    )}
                  />
                  {index < Math.min(entries.length, 10) - 1 && <Divider />}
                </View>
              ))}
            </List.Section>
          ) : (
            <Text style={styles.noDataText}>
              No data available for this period
            </Text>
          )}
        </Card.Content>
      </Card>

      {/* Rewards & Incentives */}
      <Card style={styles.rewardsCard}>
        <Card.Content>
          <Title>Rewards & Incentives</Title>
          <List.Section>
            <List.Item
              title="Weekly Champion"
              description="Top contributor each week gets special recognition"
              left={() => <List.Icon icon="trophy" color="#FFD700" />}
            />
            <List.Item
              title="Monthly Champion"
              description="Top contributor each month gets exclusive badge"
              left={() => <List.Icon icon="crown" color="#FFD700" />}
            />
            <List.Item
              title="Verification Bonus"
              description="Earn extra points for verifying other users' submissions"
              left={() => <List.Icon icon="check-circle" color="#4CAF50" />}
            />
            <List.Item
              title="Accuracy Rewards"
              description="Get bonus points for highly accurate submissions"
              left={() => <List.Icon icon="target" color="#2196F3" />}
            />
          </List.Section>
        </Card.Content>
      </Card>

      {/* Community Stats */}
      <Card style={styles.statsCard}>
        <Card.Content>
          <Title>Community Impact</Title>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {entries.reduce((sum, entry) => sum + entry.submission_count, 0)}
              </Text>
              <Text style={styles.statLabel}>Total Submissions</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {entries.reduce((sum, entry) => sum + entry.verification_count, 0)}
              </Text>
              <Text style={styles.statLabel}>Verifications</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {entries.length}
              </Text>
              <Text style={styles.statLabel}>Active Users</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {Math.round(entries.reduce((sum, entry) => sum + entry.points, 0) / entries.length)}
              </Text>
              <Text style={styles.statLabel}>Avg Points</Text>
            </View>
          </View>
        </Card.Content>
      </Card>
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
  periodCard: {
    margin: 16,
    marginTop: 0,
    elevation: 2,
  },
  periodLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#424242',
  },
  periodChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  periodChip: {
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedPeriodChip: {
    backgroundColor: '#424242',
  },
  periodChipText: {
    color: '#424242',
    fontWeight: '500',
  },
  selectedPeriodChipText: {
    color: 'white',
  },
  userStatusCard: {
    margin: 16,
    marginTop: 0,
    elevation: 2,
  },
  userStatusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  userAvatar: {
    marginRight: 16,
  },
  userStatusInfo: {
    flex: 1,
  },
  userStatusTitle: {
    fontSize: 18,
    marginBottom: 4,
  },
  userRankText: {
    fontSize: 16,
    color: '#666',
  },
  userProgress: {
    marginTop: 16,
  },
  progressLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#424242',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  progressDescription: {
    fontSize: 12,
    color: '#666',
  },
  leaderboardCard: {
    margin: 16,
    marginTop: 0,
    elevation: 2,
  },
  rankContainer: {
    alignItems: 'center',
    marginRight: 16,
  },
  rankIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  rankNumber: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  pointsContainer: {
    alignItems: 'flex-end',
  },
  pointsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#424242',
  },
  pointsLabel: {
    fontSize: 12,
    color: '#666',
  },
  championBadge: {
    backgroundColor: '#FFD700',
    marginTop: 4,
  },
  noDataText: {
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic',
    marginTop: 16,
  },
  rewardsCard: {
    margin: 16,
    marginTop: 0,
    elevation: 2,
  },
  statsCard: {
    margin: 16,
    marginTop: 0,
    elevation: 2,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  statItem: {
    alignItems: 'center',
    width: '50%',
    marginBottom: 16,
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
    textAlign: 'center',
  },
});

export default LeaderboardScreen;
