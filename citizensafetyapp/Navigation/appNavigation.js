import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/Homescreen.js';
import OnboardingScreen from '../screens/Onboardingscreen.jsx';
import { getItem } from '../utils/asyncStorage.js';
import Homeloading from '../screens/loading/homeloading.jsx';


const Stack = createNativeStackNavigator();


export default function AppNavigation() {

  const [showOnboarding, setShowOnboarding] = useState(null);
  useEffect(() => {
    checkIfAlreadyOnboarded();
  }, [])

  const checkIfAlreadyOnboarded = async () => {
    let onboarded = await getItem('onboarded');
    if (onboarded == 1) {
      // hide onboarding
      setShowOnboarding(false);
    } else {
      // show onboarding
      setShowOnboarding(true);
    }
  }

  if (showOnboarding == null) {
    return null;
  }


  if (showOnboarding) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='splash'>
          <Stack.Screen name="splash" options={{ headerShown: false }} component={Homeloading} />
          <Stack.Screen name="Onboarding" options={{ headerShown: false }} component={OnboardingScreen} />
          <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator  initialRouteName='splash'>
          <Stack.Screen name="splash" options={{ headerShown: false }} component={Homeloading} />
          <Stack.Screen name="Onboarding" options={{ headerShown: false }} component={OnboardingScreen} />
          <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }


}