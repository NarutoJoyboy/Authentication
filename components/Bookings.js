import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Header from './Header'

export default function Bookings() {
  return (
    <View style={styles.container}>
      <Header/>
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
        margin:16,
    },
})