import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions
} from 'react-native';
import React from 'react';
import {MyTheme} from './Themes/MyTheme';
import {useTheme} from '@react-navigation/native';
import EventCard from './EventCard';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

    const {width, height}= Dimensions.get('screen')

export default function Home() {
  const {colors} = useTheme();

  const Header = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <TouchableOpacity>
          <Feather name="menu" size={27} color={'black'} />
        </TouchableOpacity>

        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
          <Ionicons name="location-outline" color={'black'} size={27} />
          <Text>Vadodara</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons name="person-circle-outline" color={'black'} size={30} />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}
     >
      <View  style={{backgroundColor: colors.primary, flex: 1, padding: 10}}>
        <Header />
        <View
          style={{
            backgroundColor: colors.background,
            borderWidth: 1,
            borderRadius: 20,
            marginVertical: 20,
            paddingHorizontal: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TextInput
            placeholder="search events, creators, etc"
            placeholderTextColor={colors.tertiary}
            style={{fontSize: 17, width:width/1.4, color:colors.secondary}}
          />
          <Ionicons name="search" color={'black'} size={27} />
        </View>
        <EventCard/>
      </View>
    </TouchableWithoutFeedback>
  );
}
