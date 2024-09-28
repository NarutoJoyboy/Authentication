import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const BookingCard = ({ booking, onPress }) => {
  const { colors } = useTheme();

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <View style={styles.header}>
          <Text style={[styles.eventName, { color: colors.text }]}>{booking.eventName}</Text>
          <View style={[styles.badge, { backgroundColor: colors.primary }]}>
            <Text style={styles.badgeText}>{booking.tickets} {booking.tickets > 1 ? 'Tickets' : 'Ticket'}</Text>
          </View>
        </View>
        
        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Ionicons name="calendar-outline" size={18} color={colors.text} />
            <Text style={[styles.detailText, { color: colors.text }]}>
              {`${booking.month} ${booking.day}`}
            </Text>
          </View>
          
          <View style={styles.detailRow}>
            <Ionicons name="time-outline" size={18} color={colors.text} />
            <Text style={[styles.detailText, { color: colors.text }]}>{booking.time}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Ionicons name="person-outline" size={18} color={colors.text} />
            <Text style={[styles.detailText, { color: colors.text }]}>{booking.name}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Ionicons name="mail-outline" size={18} color={colors.text} />
            <Text style={[styles.detailText, { color: colors.text }]}>{booking.email}</Text>
          </View>
        </View>
        
        <View style={styles.footer}>
          <Ionicons name="time" size={14} color={colors.text} style={styles.footerIcon} />
          <Text style={[styles.footerText, { color: colors.text }]}>
            Booked on {formatDate(booking.date)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  detailsContainer: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    marginLeft: 8,
    fontSize: 14,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  footerIcon: {
    marginRight: 4,
  },
  footerText: {
    fontSize: 12,
    fontStyle: 'italic',
  },
});

export default BookingCard;