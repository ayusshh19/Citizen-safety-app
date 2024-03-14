import {View, Text, StyleSheet, ScrollView, Linking, TouchableOpacity} from 'react-native';
import React from 'react';
import colors from '../redux/constants/colors';
import VideoPlayer from 'react-native-video-player';
// import { ScrollView } from 'react-native-gesture-handler';.

export default function Innerdetail(props) {
  const {data} = props.route.params;
  // console.log(data);
  return (
    <>
      <VideoPlayer
        video={{
          uri: data.videourl,
        }}
        videoWidth={1600}
        videoHeight={900}
        thumbnail={{uri: 'https://i.picsum.photos/id/866/1600/900.jpg'}}
        autoplay={true}
      />
      <ScrollView style={styles.maincontained}>
        <View style={styles.container}>
          <Text style={{fontSize:30,marginTop:10,color:colors.white,fontWeight:"bold"}}>
            OTP FRAUD
          </Text>
          <Text style={{textAlign:"justify",marginVertical:10,marginHorizontal:20}}>
            {data.desc}
          </Text>
          <View style={{marginVertical: 20}}>
            <View
              style={{
                width: 320,
                backgroundColor: colors.buttonbg,
                padding: 15,
              }}>
              <Text>Important Websites to Raise complaints</Text>
            </View>
            {data &&
              data.website.map((data, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      width: 320,
                      borderWidth: 2,
                      padding: 10,
                      borderColor: colors.buttonbg,
                    }}>
                    <Text onPress={()=>Linking.openURL(data)}>{data}</Text>
                  </TouchableOpacity>
                );
              })}
          </View>
          <View style={{marginVertical: 20}}>
            <View
              style={{
                width: 320,
                backgroundColor: colors.buttonbg,
                padding: 15,
              }}>
              <Text >Complaint call</Text>
            </View>
            {data &&
              data.importantnumbers.map((data, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      width: 320,
                      borderWidth: 2,
                      padding: 10,
                      borderColor: colors.buttonbg,
                    }}>
                    <Text onPress={()=>Linking.openURL(`tel:${data}`)}>{data}</Text>
                  </TouchableOpacity>
                );
              })}
          </View>
          <View style={{marginTop:10,marginBottom:80}}>
            <View
              style={{
                width: 320,
                backgroundColor: colors.buttonbg,
                padding: 15,
              }}>
              <Text>What laws we have?</Text>
            </View>
            {data &&
              data.lawsforthis.map((data, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      width: 320,
                      borderWidth: 2,
                      padding: 10,
                      borderColor: colors.buttonbg,
                    }}>
                    <Text>{data}</Text>
                  </View>
                );
              })}
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  maincontained: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: colors.screenbg,
  },
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: colors.screenbg,
  },
});
