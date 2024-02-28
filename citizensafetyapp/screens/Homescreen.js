import { View, Text, StyleSheet, Dimensions, TouchableOpacity, PermissionsAndroid, DeviceEventEmitter, Alert, NativeEventEmitter } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Lottie from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { removeItem } from '../utils/asyncStorage';
const { width, height } = Dimensions.get('window');
import SmsListener from 'react-native-android-sms-listener'
import Contacts from 'react-native-contacts';
import  {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Mainpage from './Mainpage';
import Sos from './Sos';
import Others from './Others';
import Infopage from './Infopage';
import Blog from './Blog';

const Tab = createBottomTabNavigator()

export default function HomeScreen() {
  const navigation = useNavigation();
  const eventEmitter = new NativeEventEmitter();
  const handleReset = async () => {
    await removeItem('onboarded');
    navigation.push('Onboarding');
  }

  const [receiveSmsPermission, setReceiveSmsPermission] = useState('');

  const requestSmsPermission = async () => {
    try {
      const permission = await PermissionsAndroid
        .requestMultiple(
          [PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.RECEIVE_SMS]
        );
        console.log(permission)
      setReceiveSmsPermission(permission);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    requestSmsPermission();
  }, []);

  useEffect(() => {

    SmsListener.addListener(message => {
      console.info(message)
      Alert.alert(message.body)
    })
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: 'Contacts',
      message: 'This app would like to view your contacts.',
      buttonPositive: 'Please accept bare mortal',
  })
      .then((res) => {
          console.log('Permission: ', res);
          Contacts.getAll()
              .then((contacts) => {
                  // work with contacts
                  const data = contacts.map((contact)=>{
                    return contact.phoneNumbers
                  })
                  console.log(data)
              })
              .catch((e) => {
                  console.log(e);
              });
      })
      .catch((error) => {
          console.error('Permission error: ', error);
      });
    if (receiveSmsPermission === PermissionsAndroid.RESULTS.GRANTED) {

      let subscriber = DeviceEventEmitter.addListener(
        'NOTIFY',
        message => {
          console.log(message)
          const { messageBody, senderPhoneNumber } = JSON.parse(message);

          Alert.alert(
            'SMS received',
            `Message Body: ${messageBody} & sender number: ${senderPhoneNumber}`,
          );
        },
      );
      console.log(subscriber)
      return () => {
        subscriber.remove();
      };
    }
  }, [receiveSmsPermission]);

  return (
    <Tab.Navigator  >
      <Tab.Group
      screenOptions={{headerShown:false,}}
      >
        <Tab.Screen name='homemain' component={Mainpage}/>
        <Tab.Screen name='sos' component={Sos}/>
        <Tab.Screen name='others' component={Others}/>
        <Tab.Screen name='infopage' component={Infopage}/>
        <Tab.Screen name='blog' component={Blog}/>
      </Tab.Group>
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  lottie: {
    width: width * 0.9,
    height: width
  },
  text: {
    fontSize: width * 0.09,
    marginBottom: 20
  },
  resetButton: {
    backgroundColor: '#34d399',
    padding: 10,
    borderRadius: 10
  }
})