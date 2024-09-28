import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
  Alert,
  Modal,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get('window');

export default function EventDetailScreen({route, navigation}) {
  const {colors} = useTheme();
  const {data} = route.params;

  const [showBookingForm, setShowBookingForm] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [tickets, setTickets] = useState('1');

  const handleBooking = async () => {
    if (!name || !email || !tickets) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const bookingDetails = {
      eventId: data.id,
      eventName: data.name,
      name,
      email,
      tickets: parseInt(tickets),
      date: new Date().toISOString(),
    };

    try {
      const existingBookings = await AsyncStorage.getItem('bookings');
      const bookings = existingBookings ? JSON.parse(existingBookings) : [];
      bookings.push(bookingDetails);
      await AsyncStorage.setItem('bookings', JSON.stringify(bookings));

      Alert.alert(
        'Booking Confirmed',
        `Thank you, ${name}! Your booking for ${tickets} ticket(s) to ${data.name} has been confirmed.`,
        [{text: 'OK', onPress: () => setShowBookingForm(false)}],
      );
      setName('')
      setEmail("")
      setTickets("")
    } catch (error) {
      console.error('Error saving booking:', error);
      Alert.alert(
        'Error',
        'There was a problem saving your booking. Please try again.',
      );
    }
  };

  return (
    <ScrollView
      style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={styles.imageContainer}>
        <Image source={{uri: data.imageUrl}} style={styles.image} />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.gradient}
        />
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.background} />
        </TouchableOpacity>
        <View style={styles.imageOverlay}>
          <Text style={styles.eventName}>{data.name}</Text>
          <View style={styles.dateTimeContainer}>
            <Ionicons
              name="calendar-outline"
              size={20}
              color={colors.background}
            />
            <Text
              style={
                styles.dateTimeText
              }>{`${data.month} ${data.day} at ${data.time}`}</Text>
          </View>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.infoSection}>
          <Ionicons name="location-outline" size={24} color={colors.text} />
          <Text style={[styles.infoText, {color: colors.text}]}>
            {data.location}
          </Text>
        </View>

        <View style={styles.infoSection}>
          <Ionicons name="pricetag-outline" size={24} color={colors.text} />
          <Text style={[styles.infoText, {color: colors.text}]}>
            {data.price}
          </Text>
        </View>

        <Text style={[styles.sectionTitle, {color: colors.text}]}>
          About the Event
        </Text>
        <Text style={[styles.descriptionText, {color: colors.text}]}>
          {data.description}
        </Text>

        <Text style={[styles.sectionTitle, {color: colors.text}]}>
          Organizer
        </Text>
        <View style={styles.organizerSection}>
          <Image
            source={{uri: data.organizer.imageUrl}}
            style={styles.organizerImage}
          />
          <View>
            <Text style={[styles.organizerName, {color: colors.text}]}>
              {data.organizer.name}
            </Text>
            <Text style={[styles.organizerInfo, {color: colors.text}]}>
              {data.organizer.info}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.bookButton, {backgroundColor: colors.secondary}]}
          onPress={() => setShowBookingForm(true)}>
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
        {showBookingForm && (
          <Modal>
            <View style={styles.bookingForm}>
              <Text style={[styles.sectionTitle, {color: colors.text}]}>
                Booking Form
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {color: colors.text, borderColor: colors.border},
                ]}
                placeholder="Your Name"
                placeholderTextColor={colors.text}
                value={name}
                onChangeText={setName}
              />
              <TextInput
                style={[
                  styles.input,
                  {color: colors.text, borderColor: colors.border},
                ]}
                placeholder="Your Email"
                placeholderTextColor={colors.text}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
              <TextInput
                style={[
                  styles.input,
                  {color: colors.text, borderColor: colors.border},
                ]}
                placeholder="Number of Tickets"
                placeholderTextColor={colors.text}
                value={tickets}
                onChangeText={setTickets}
                keyboardType="numeric"
              />
              <TouchableOpacity
                style={[styles.bookButton, {backgroundColor: colors.secondary}]}
                onPress={handleBooking}>
                <Text style={styles.bookButtonText}>Confirm Booking</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    height: height * 0.4,
    width: width,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  eventName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateTimeText: {
    color: 'white',
    marginLeft: 5,
    fontSize: 16,
  },
  detailsContainer: {
    padding: 20,
  },
  infoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoText: {
    fontSize: 16,
    marginLeft: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
  },
  organizerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  organizerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  organizerName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  organizerInfo: {
    fontSize: 14,
  },
  bookButton: {
    marginTop: 30,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  bookButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bookingForm: {
    margin: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
});
