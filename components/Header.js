import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation, useTheme } from '@react-navigation/native'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'


export default function Header() {
    const navigation = useNavigation();
    const {colors} = useTheme();
  return (
    <View style={styles.header}>
    <TouchableOpacity
      style={styles.iconButton}
      onPress={() => navigation.toggleDrawer()}>
      <Feather name="menu" size={24} color={colors.text} />
    </TouchableOpacity>
    <TouchableOpacity style={styles.locationButton}>
      <Ionicons name="location-outline" color={colors.text} size={24} />
      <Text style={[styles.locationText, {color: colors.text}]}>
        Vadodara
      </Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.iconButton}>
      <Ionicons name="person-circle-outline" color={colors.text} size={28} />
    </TouchableOpacity>
  </View>
  )
}

const styles = {
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
}