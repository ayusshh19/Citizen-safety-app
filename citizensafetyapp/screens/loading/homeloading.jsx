import React, { useRef, useEffect } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
function Homeloading({navigation}) {
    const animation = useRef(null);
    setTimeout(()=>{
      navigation.replace('Onboarding')
  },2500  )
  return (
    <View className="flex-1 items-center justify-center bg-[#F9F07A]">
      <LottieView
        autoPlay
        ref={animation}
        style={{
          width: 400,
          height: 400,
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require("../../assets/loadinganimation.json")}
      />
    </View>
  );
}

export default Homeloading;
