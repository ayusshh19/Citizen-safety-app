import { View, Text, StyleSheet, Dimensions, TouchableOpacity, PermissionsAndroid, DeviceEventEmitter, Alert, NativeEventEmitter } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Lottie from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { removeItem } from '../utils/asyncStorage';
const { width, height } = Dimensions.get('window');
import SmsListener from 'react-native-android-sms-listener'
import Contacts from 'react-native-contacts';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Mainpage from './Mainpage';
import Sos from './Sos';
import Others from './Others';
import Infopage from './Infopage';
import Colors from '../redux/constants/colors';
import Blog from './Blog';
import Icon, { Icons } from '../components/Icons';
import * as Animatable from 'react-native-animatable';

const TabArr = [
  { route: 'Home', label: 'Home', type: Icons.Ionicons, activeIcon: 'grid', inActiveIcon: 'grid-outline', component: Mainpage },
  { route: 'Sos', label: 'Sos', type: Icons.MaterialCommunityIcons, activeIcon: 'heart-plus', inActiveIcon: 'heart-plus-outline', component: Sos },
  { route: 'Info', label: 'Info', type: Icons.FontAwesome, activeIcon: 'info-circle', inActiveIcon: 'info-circle', component: Infopage },
  { route: 'Blog', label: 'Blog', type: Icons.FontAwesome, activeIcon: 'file-text', inActiveIcon: 'file-text', component: Blog },
  { route: 'Others', label: 'Others', type: Icons.FontAwesome, activeIcon: 'map-o', inActiveIcon: 'map-marker', component: Others },
];


const Tab = createBottomTabNavigator();

const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);

  useEffect(() => {
    if (focused) {
      viewRef.current.animate({ 0: { scale: .5, rotate: '0deg' }, 1: { scale: 1.5, rotate: '360deg' } });
    } else {
      viewRef.current.animate({ 0: { scale: 1.5, rotate: '360deg' }, 1: { scale: 1, rotate: '0deg' } });
    }
  }, [focused])
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={[styles.container, { top: 0 }]}>
      <Animatable.View
        ref={viewRef}
        duration={1000}
      >
        <Icon type={item.type}
          name={focused ? item.activeIcon : item.inActiveIcon}
          color={focused ? Colors.buttonbg : Colors.screenbg} />
      </Animatable.View>
      <Animatable.Text
        style={[styles.text, Colors.black]}>
        {item.label}
      </Animatable.Text>
    </TouchableOpacity>
  )
}
export default function HomeScreen() {
  const navigation = useNavigation();

  const [receiveSmsPermission, setReceiveSmsPermission] = useState('');

  const requestSmsPermission = async () => {
    try {
      const permission = await PermissionsAndroid
        .requestMultiple(
          [PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
          PermissionsAndroid.PERMISSIONS.READ_CALL_LOG]
        );
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
            const data = contacts.map((contact) => {
              return contact.phoneNumbers
            })
            // console.log(data)
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
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: 60,
            position: 'absolute',
            margin: 16,
            borderRadius: 16,
            justifyContent: 'center',
            alignItems: 'center',
          }
        }}
      >
        {TabArr.map((item, index) => {
          return (
            <Tab.Screen key={index} name={item.route} component={item.component}
              options={{
                tabBarShowLabel: false,
                tabBarButton: (props) => <TabButton {...props} item={item} />
              }}
            />
          )
        })}
      </Tab.Navigator>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
  },
  text: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
    color: Colors.buttonbg,
    fontWeight: '500'
  }
})