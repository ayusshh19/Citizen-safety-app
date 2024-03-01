import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import colors from '../redux/constants/colors'

const Infopage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Infopage</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container :{
    flex:1,
    justifyContent: 'center',
    alignItems:"center",
    backgroundColor:colors.screenbg
  },
  text:{
    fontSize:100,
    fontStyle:"italic"
    
  }

})
export default Infopage