import {View, Text, Image, Dimensions} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';

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
      <Text></Text>
    </View>
  );
}
