import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTheme} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function BookingsScreen({navigation}) {
  const [bookings, setBookings] = useState([]);
  const {colors} = useTheme();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const storedBookings = await AsyncStorage.getItem('bookings');
        if (storedBookings !== null) {
          setBookings(JSON.parse(storedBookings));
        }
      } catch (error) {
        console.error('Error fetching bookings:', error);
        Alert.alert('Error', 'Unable to fetch bookings. Please try again.');
      }
    };

    fetchBookings();
    const unsubscribe = navigation.addListener('focus', fetchBookings);

    return unsubscribe;
  }, [navigation]);

  const formatDate = dateString => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const renderBookingItem = ({item}) => (
    <View style={[styles.bookingItem, {backgroundColor: colors.card}]}>
      <Text style={[styles.eventName, {color: colors.text}]}>
        {item.eventName}
      </Text>
      <Text style={[styles.bookingDetails, {color: colors.text}]}>
        Tickets: {item.tickets}
      </Text>
      <Text style={[styles.bookingDetails, {color: colors.text}]}>
        Booked by: {item.name}
      </Text>
      <Text style={[styles.bookingDetails, {color: colors.text}]}>
        Email: {item.email}
      </Text>
      <Text style={[styles.bookingDate, {color: colors.text}]}>
        Booked on: {formatDate(item.date)}
      </Text>
    </View>
  );

  const clearAllBookings = async () => {
    Alert.alert(
      'Clear All Bookings',
      'Are you sure you want to clear all bookings? This action cannot be undone.',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('bookings');
              setBookings([]);
              Alert.alert('Success', 'All bookings have been cleared.');
            } catch (error) {
              console.error('Error clearing bookings:', error);
              Alert.alert(
                'Error',
                'Unable to clear bookings. Please try again.',
              );
            }
          },
        },
      ],
    );
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <Text style={[styles.title, {color: colors.text}]}>Your Bookings</Text>
      {bookings.length > 0 ? (
        <>
          <FlatList
            data={bookings}
            renderItem={renderBookingItem}
            keyExtractor={(item, index) => `booking-${index}`}
            contentContainerStyle={styles.listContainer}
          />
          <TouchableOpacity
            style={[styles.clearButton, {backgroundColor: colors.secondary}]}
            onPress={clearAllBookings}>
            <Text style={styles.clearButtonText}>Clear All Bookings</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.emptyStateContainer}>
          <Ionicons name="calendar-outline" size={64} color={colors.text} />
          <Text style={[styles.emptyStateText, {color: colors.text}]}>
            You haven't made any bookings yet.
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  listContainer: {
    flexGrow: 1,
  },
  bookingItem: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bookingDetails: {
    fontSize: 16,
    marginBottom: 3,
  },
  bookingDate: {
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: 5,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  clearButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  clearButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
