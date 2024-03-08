import {View, Text, StyleSheet} from 'react-native';
import React, { useState } from 'react';
import colors from '../redux/constants/colors';
import {Image} from 'react-native-animatable';
import axios from 'axios';
const Blog = () => {
  const [blognews,setblognews]=useState([])
  return (
    <View style={styles.container}>
      <View style={styles.blogcontainer}>
        <View style={styles.blogimage}>
          <Image
            source={{
              uri: 'https://www.hindustantimes.com/ht-img/img/2024/03/08/1600x900/Congress_first_list_2024_elections_1709908460661_1709908488506.jpg',
              width: 120,
              height: 120,
            }}
            style={styles.blogimage}
          />
        </View>
        <View style={styles.blogtext}>
          <Text style={{fontSize:20,color:"#fff",fontWeight:"800",height:"80%"}}>
          Bhupesh Baghel, KC Venugopal among Cong candidates for LS polls. Check full list - Hindustan Times
          </Text>
          <Text style={styles.bloginnertext}>Blog section</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.screenbg,
  },
  text: {
    fontSize: 100,
    fontStyle: 'italic',
  },
  blogcontainer:{
    display:"flex",
    flexDirection:"row",
    height:120,
    width:"auto"
  },
  blogimage:{
    flex:2,
    justifyContent:"center",
    alignItems:"center",
    objectFit:"cover",
    borderRadius:10
  },
  blogtext:{
    flex:3,
    justifyContent:"space-between",
    // alignItems:"center",
    color:colors.white,
  },
  bloginnertext:{
    color:colors.white
  }

});
export default Blog;
