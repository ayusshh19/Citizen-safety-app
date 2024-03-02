import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import colors from '../../redux/constants/colors'

export default function Urlfraud() {
  return (
    <View style={styles.component}>
      <Text>Urlfraud</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  component:{
    flex:1,
    backgroundColor:colors.screenbg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textstyles:{
    fontSize:20,
  }
})