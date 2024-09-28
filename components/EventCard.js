import React from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('screen');

export default function EventCard({data}) {
  const {colors} = useTheme();
  const navigation = useNavigation();
  // const {name, category, day, location, month, time} = data;

  // {"data": {"category": "MUSIC", "day": "15", "description": "Join us for a night of amazing music under the stars...", "id": "1", "imageUrl": "https://example.com/event-image.jpg", "location": "Central Park, New York", "month": "JUL", "name": "Summer Music Festival", "organizer": {"imageUrl": "https://example.com/organizer-image.jpg", "info": "Premier event organizers in New York", "name": "NYC Events Co."}, "price": "$50", "time": "7:00 PM"}}

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.container}
      onPress={() => navigation.navigate('EventsDetailScreen',{ data})}>
      <ImageBackground
        source={require('./Images/image1.png')}
        style={styles.backgroundImage}
        imageStyle={styles.imageStyle}>
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.gradient}
        />
        <View style={styles.contentContainer}>
          <View
            style={[styles.dateContainer, {backgroundColor: colors.primary}]}>
            <Text style={[styles.monthText, {color: colors.text}]}>
              {data.month.slice(0, 3)}
            </Text>
            <Text style={[styles.dayText, {color: colors.text}]}>
              {data.day}
            </Text>
          </View>
          <View style={styles.eventInfoContainer}>
            <Text style={styles.eventName}>{data.name}</Text>
            <View style={styles.detailsContainer}>
              <View style={styles.timeContainer}>
                <Ionicons
                  name="time-outline"
                  color={colors.background}
                  size={16}
                />
                <Text style={styles.detailText}>{data.time}</Text>
              </View>
              <View style={styles.locationContainer}>
                <Ionicons
                  name="location-outline"
                  color={colors.background}
                  size={16}
                />
                <Text style={styles.detailText}>{data.location}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryText}>{data.category}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    marginVertical: 15,
    borderRadius: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
  },
  backgroundImage: {
    width: width * 0.9,
    height: height * 0.25,
    justifyContent: 'flex-end',
  },
  imageStyle: {
    borderRadius: 20,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 20,
  },
  contentContainer: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'flex-end',
  },
  dateContainer: {
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    marginRight: 15,
    elevation: 5,
  },
  monthText: {
    fontSize: 14,
    fontWeight: '600',
  },
  dayText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  eventInfoContainer: {
    flex: 1,
  },
  eventName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 5,
  },
  categoryContainer: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  categoryText: {
    color: '#333',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
