import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  ScrollView,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import EventCard from './EventCard';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Call} from './APi';
import {useStore} from './Zustand';
import {useNavigation} from '@react-navigation/native';
import Header from './Header';

const {width, height} = Dimensions.get('screen');

export default function Home() {
  const {colors} = useTheme();
  const details = useStore(state => state.details);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const []
  useEffect(() => {
    console.log("It's running");
    Call();
    console.log(details);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.container, {backgroundColor: colors.background}]}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={colors.background}
        />
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Header />
          <View
            style={[styles.searchContainer, {backgroundColor: colors.card}]}>
            <TextInput
              placeholder="Search events, creators, etc"
              placeholderTextColor={colors.text}
              style={[styles.searchInput, {color: colors.text}]}
            />
            <TouchableOpacity style={styles.searchButton}>
              <Ionicons name="search" color={colors.text} size={24} />
            </TouchableOpacity>
          </View>
          <Text style={[styles.sectionTitle, {color: colors.text}]}>
            Upcoming Events
          </Text>
          {loading ? (
            <View style={styles.loadingIndicator}>
              <ActivityIndicator color={'black'} size={50} />
            </View>
          ) : details !== undefined ? (
            details.map((data, key) => {
              return (
                <View key={key}>
                  <EventCard data={data} />
                </View>
              );
            })
          ) : (
            <View style={styles.loadingIndicator}>
              <Text style={[styles.undefined, {color: colors.text}]}>
                No Data load
              </Text>
              <TouchableOpacity>
                <Text>Reload</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconButton: {
    padding: 8,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  locationText: {
    marginLeft: 4,
    fontSize: 16,
    fontWeight: '500',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    paddingHorizontal: 16,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
  },
  searchButton: {
    padding: 8,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  loadingIndicator: {
    marginTop: height / 4,
  },
  undefined: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
