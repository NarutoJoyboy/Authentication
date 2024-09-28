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
  const [reload, setReload] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);
  
  useEffect(() => {
    console.log("It's running");
    Call();
    console.log(details);

    setTimeout(() => {
      setLoading(false);
      setReload(false);
      setFilteredEvents(details);
    }, 2000);
  }, [reload]);

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text) {
      const filtered = details.filter(event => 
        event.name.toLowerCase().includes(text.toLowerCase()) ||
        event.category.toLowerCase().includes(text.toLowerCase()) ||
        event.location.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents(details);
    }
  };

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
              value={searchQuery}
              onChangeText={handleSearch}
            />
            <TouchableOpacity style={styles.searchButton}>
              <Ionicons name="search" color={colors.text} size={24} />
            </TouchableOpacity>
          </View>
          <Text style={[styles.sectionTitle, {color: colors.text}]}>
            {searchQuery ? 'Search Results' : 'Upcoming Events'}
          </Text>
          {loading ? (
            <View style={styles.loadingIndicator}>
              <ActivityIndicator color={'black'} size={50} />
            </View>
          ) : filteredEvents && filteredEvents.length ? (
            filteredEvents.map((data, key) => {
              return (
                <View key={key}>
                  <EventCard data={data} />
                </View>
              );
            })
          ) : (
            <View style={styles.loadingIndicator}>
              <Text style={[styles.undefined, {color: colors.text}]}>
                {searchQuery ? 'No matching events found' : 'No events available'}
              </Text>
              <TouchableOpacity
                style={[
                  styles.reloadButton,
                  {backgroundColor: colors.secondary},
                ]}
                onPress={() => {
                  setReload(true);
                  setLoading(true);
                  setSearchQuery('');
                }}>
                <Text style={{color: colors.background, fontSize: 20}}>
                  Reload
                </Text>
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
    alignSelf: 'center',
  },
  undefined: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  reloadButton: {
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    alignSelf: 'center',
    width: width / 3.2,
    alignItems: 'center',
  },
});
