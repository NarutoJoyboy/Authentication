import {View, Text, Image, Dimensions} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const {width, height} = Dimensions.get('screen');
export default function EventCard() {
  const {colors} = useTheme();
  return (
    <View style={{alignSelf: 'center', borderRadius: 20}}>
      <Image
        source={require('./Images/image1.png')}
        style={{
          width: width / 1.1,
          height: height / 4,
          borderRadius: 20,
          opacity: 0.9,
        }}
      />
      <View style={{position:'absolute', bottom:40}}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          position: 'absolute',
          bottom: 60,
          color: colors.background,
        }}>
        Event's Name
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text>Mon, 26th Sep</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Ionicons name="location-outline" color={'black'} size={27} />
          <Text>Vadodara</Text>
        </View>
      </View>
      </View>
    </View>
  );
}
