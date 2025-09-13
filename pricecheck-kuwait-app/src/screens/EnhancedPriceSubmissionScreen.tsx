/**
 * Enhanced Price Submission Screen
 * 
 * Allows users to submit prices with verification, disputes, and community features
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
  TextInput
} from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  TextInput as PaperTextInput,
  Button,
  Chip,
  List,
  Avatar,
  Badge,
  Divider,
  RadioButton,
  Checkbox
} from 'react-native-paper';
import { DatabaseService } from '../services/databaseService';
import { 
  MenuItem, 
  DeliveryApp, 
  PriceSubmission, 
  DisputeStatus,
  PointAction 
} from '../data/databaseSchema';

interface PriceSubmissionData {
  menuItemId: number;
  deliveryAppId: number;
  priceValue: string;
  isOffer: boolean;
  offerDescription: string;
  screenshotUrl: string;
}

const EnhancedPriceSubmissionScreen: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [deliveryApps, setDeliveryApps] = useState<DeliveryApp[]>([]);
  const [submissionData, setSubmissionData] = useState<PriceSubmissionData>({
    menuItemId: 0,
    deliveryAppId: 0,
    priceValue: '',
    isOffer: false,
    offerDescription: '',
    screenshotUrl: ''
  });
  const [loading, setLoading] = useState(false);
  const [recentSubmissions, setRecentSubmissions] = useState<PriceSubmission[]>([]);

  // Mock user ID - in real app, get from authentication
  const userId = 1;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // In a real app, load from database
      const mockMenuItems: MenuItem[] = [
        {
          id: 1,
          restaurant_id: 1,
          name: 'Chicken Biryani',
          description: 'Spicy rice with chicken',
          base_price: 3.5,
          category: 'Main Course',
          is_vegetarian: false,
          is_halal: true,
          is_available: true,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 2,
          restaurant_id: 1,
          name: 'Mutton Mandi',
          description: 'Traditional Yemeni rice dish',
          base_price: 4.0,
          category: 'Main Course',
          is_vegetarian: false,
          is_halal: true,
          is_available: true,
          created_at: new Date(),
          updated_at: new Date()
        }
      ];

      const mockDeliveryApps: DeliveryApp[] = [
        {
          id: 1,
          name: 'talabat',
          display_name: 'Talabat',
          is_active: true,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 2,
          name: 'jahez',
          display_name: 'Jahez',
          is_active: true,
          created_at: new Date(),
          updated_at: new Date()
        }
      ];

      setMenuItems(mockMenuItems);
      setDeliveryApps(mockDeliveryApps);
    } catch (error) {
      Alert.alert('Error', 'Failed to load data');
      console.error('Error loading data:', error);
    }
  };

  const handleSubmitPrice = async () => {
    if (!submissionData.menuItemId || !submissionData.deliveryAppId || !submissionData.priceValue) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const price = parseFloat(submissionData.priceValue);
    if (isNaN(price) || price <= 0) {
      Alert.alert('Error', 'Please enter a valid price');
      return;
    }

    try {
      setLoading(true);
      
      const submission = await DatabaseService.submitPrice(
        submissionData.menuItemId,
        submissionData.deliveryAppId,
        userId,
        price,
        submissionData.isOffer,
        submissionData.offerDescription || undefined,
        submissionData.screenshotUrl || undefined
      );

      Alert.alert(
        'Success!', 
        `Price submitted successfully! You earned 10 points.`,
        [
          {
            text: 'OK',
            onPress: () => {
              // Reset form
              setSubmissionData({
                menuItemId: 0,
                deliveryAppId: 0,
                priceValue: '',
                isOffer: false,
                offerDescription: '',
                screenshotUrl: ''
              });
              loadRecentSubmissions();
            }
          }
        ]
      );

    } catch (error) {
      Alert.alert('Error', 'Failed to submit price');
      console.error('Error submitting price:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadRecentSubmissions = async () => {
    try {
      // In a real app, load from database
      const mockSubmissions: PriceSubmission[] = [
        {
          id: 1,
          menu_item_id: 1,
          delivery_app_id: 1,
          user_id: userId,
          price_value: 3.5,
          timestamp: new Date(),
          is_offer: false,
          is_verified: true,
          verification_count: 3,
          dispute_count: 0,
          created_at: new Date(),
          updated_at: new Date()
        }
      ];
      setRecentSubmissions(mockSubmissions);
    } catch (error) {
      console.error('Error loading recent submissions:', error);
    }
  };

  const handleVerifyPrice = async (submissionId: number) => {
    try {
      await DatabaseService.verifyPrice(submissionId, userId, true, 'Verified by user');
      Alert.alert('Success', 'Price verified successfully! You earned 5 points.');
      loadRecentSubmissions();
    } catch (error) {
      Alert.alert('Error', 'Failed to verify price');
    }
  };

  const handleDisputePrice = async (submissionId: number) => {
    Alert.prompt(
      'Dispute Price',
      'Please explain why you think this price is incorrect:',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Submit Dispute',
          onPress: async (reason) => {
            if (reason) {
              try {
                await DatabaseService.disputePrice(submissionId, userId, reason);
                Alert.alert('Success', 'Dispute submitted successfully!');
                loadRecentSubmissions();
              } catch (error) {
                Alert.alert('Error', 'Failed to submit dispute');
              }
            }
          }
        }
      ]
    );
  };

  const selectedMenuItem = menuItems.find(item => item.id === submissionData.menuItemId);
  const selectedDeliveryApp = deliveryApps.find(app => app.id === submissionData.deliveryAppId);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Card style={styles.headerCard}>
        <Card.Content>
          <Title>Submit Price</Title>
          <Paragraph>
            Help the community by submitting accurate prices from delivery apps
          </Paragraph>
        </Card.Content>
      </Card>

      {/* Price Submission Form */}
      <Card style={styles.formCard}>
        <Card.Content>
          <Title>Price Information</Title>
          
          {/* Menu Item Selection */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Select Menu Item *</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {menuItems.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.menuItemChip,
                    submissionData.menuItemId === item.id && styles.selectedChip
                  ]}
                  onPress={() => setSubmissionData({...submissionData, menuItemId: item.id})}
                >
                  <Text style={[
                    styles.chipText,
                    submissionData.menuItemId === item.id && styles.selectedChipText
                  ]}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Delivery App Selection */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Select Delivery App *</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {deliveryApps.map((app) => (
                <TouchableOpacity
                  key={app.id}
                  style={[
                    styles.deliveryAppChip,
                    submissionData.deliveryAppId === app.id && styles.selectedChip
                  ]}
                  onPress={() => setSubmissionData({...submissionData, deliveryAppId: app.id})}
                >
                  <Text style={[
                    styles.chipText,
                    submissionData.deliveryAppId === app.id && styles.selectedChipText
                  ]}>
                    {app.display_name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Price Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Price (KWD) *</Text>
            <PaperTextInput
              mode="outlined"
              value={submissionData.priceValue}
              onChangeText={(text) => setSubmissionData({...submissionData, priceValue: text})}
              placeholder="Enter price in KWD"
              keyboardType="numeric"
              style={styles.textInput}
            />
          </View>

          {/* Offer Checkbox */}
          <View style={styles.checkboxGroup}>
            <Checkbox
              status={submissionData.isOffer ? 'checked' : 'unchecked'}
              onPress={() => setSubmissionData({...submissionData, isOffer: !submissionData.isOffer})}
            />
            <Text style={styles.checkboxLabel}>This is a special offer</Text>
          </View>

          {/* Offer Description */}
          {submissionData.isOffer && (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Offer Description</Text>
              <PaperTextInput
                mode="outlined"
                value={submissionData.offerDescription}
                onChangeText={(text) => setSubmissionData({...submissionData, offerDescription: text})}
                placeholder="Describe the offer (e.g., 20% off, Buy 1 Get 1)"
                multiline
                style={styles.textInput}
              />
            </View>
          )}

          {/* Screenshot URL */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Screenshot URL (Optional)</Text>
            <PaperTextInput
              mode="outlined"
              value={submissionData.screenshotUrl}
              onChangeText={(text) => setSubmissionData({...submissionData, screenshotUrl: text})}
              placeholder="Paste screenshot URL for verification"
              style={styles.textInput}
            />
          </View>

          {/* Submit Button */}
          <Button
            mode="contained"
            onPress={handleSubmitPrice}
            loading={loading}
            disabled={loading}
            style={styles.submitButton}
          >
            Submit Price
          </Button>
        </Card.Content>
      </Card>

      {/* Recent Submissions */}
      <Card style={styles.submissionsCard}>
        <Card.Content>
          <Title>Recent Submissions</Title>
          <Paragraph>Help verify prices submitted by other users</Paragraph>
          
          {recentSubmissions.length > 0 ? (
            <List.Section>
              {recentSubmissions.map((submission, index) => (
                <View key={index}>
                  <List.Item
                    title={`${submission.price_value} KWD`}
                    description={`${selectedMenuItem?.name || 'Menu Item'} on ${selectedDeliveryApp?.display_name || 'Delivery App'}`}
                    left={() => (
                      <List.Icon 
                        icon={submission.is_verified ? "check-circle" : "clock-outline"} 
                        color={submission.is_verified ? "#4CAF50" : "#FF9800"}
                      />
                    )}
                    right={() => (
                      <View style={styles.submissionActions}>
                        <Badge style={styles.verificationBadge}>
                          {submission.verification_count} verifications
                        </Badge>
                        <View style={styles.actionButtons}>
                          <TouchableOpacity
                            style={styles.verifyButton}
                            onPress={() => handleVerifyPrice(submission.id)}
                          >
                            <Text style={styles.buttonText}>Verify</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={styles.disputeButton}
                            onPress={() => handleDisputePrice(submission.id)}
                          >
                            <Text style={styles.buttonText}>Dispute</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                  />
                  {index < recentSubmissions.length - 1 && <Divider />}
                </View>
              ))}
            </List.Section>
          ) : (
            <Text style={styles.noSubmissionsText}>
              No recent submissions to verify
            </Text>
          )}
        </Card.Content>
      </Card>

      {/* Community Guidelines */}
      <Card style={styles.guidelinesCard}>
        <Card.Content>
          <Title>Community Guidelines</Title>
          <List.Section>
            <List.Item
              title="Be Accurate"
              description="Submit prices you see on the delivery app"
              left={() => <List.Icon icon="check-circle" color="#4CAF50" />}
            />
            <List.Item
              title="Include Screenshots"
              description="Screenshots help verify your submissions"
              left={() => <List.Icon icon="camera" color="#2196F3" />}
            />
            <List.Item
              title="Verify Others"
              description="Help verify prices submitted by other users"
              left={() => <List.Icon icon="account-check" color="#FF9800" />}
            />
            <List.Item
              title="Report Issues"
              description="Dispute prices that seem incorrect"
              left={() => <List.Icon icon="flag" color="#F44336" />}
            />
          </List.Section>
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
  headerCard: {
    margin: 16,
    elevation: 2,
  },
  formCard: {
    margin: 16,
    marginTop: 0,
    elevation: 2,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#424242',
  },
  textInput: {
    backgroundColor: 'white',
  },
  menuItemChip: {
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  deliveryAppChip: {
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  selectedChip: {
    backgroundColor: '#424242',
  },
  chipText: {
    color: '#424242',
    fontWeight: '500',
  },
  selectedChipText: {
    color: 'white',
  },
  checkboxGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: '#424242',
  },
  submitButton: {
    marginTop: 16,
    backgroundColor: '#424242',
  },
  submissionsCard: {
    margin: 16,
    marginTop: 0,
    elevation: 2,
  },
  submissionActions: {
    alignItems: 'flex-end',
  },
  verificationBadge: {
    backgroundColor: '#4CAF50',
    marginBottom: 8,
  },
  actionButtons: {
    flexDirection: 'row',
  },
  verifyButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginRight: 8,
  },
  disputeButton: {
    backgroundColor: '#F44336',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  noSubmissionsText: {
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic',
    marginTop: 16,
  },
  guidelinesCard: {
    margin: 16,
    marginTop: 0,
    elevation: 2,
  },
});

export default EnhancedPriceSubmissionScreen;
