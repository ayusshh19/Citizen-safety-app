import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../../redux/constants/colors';
import CallLogs from 'react-native-call-log';
import {ListItem, Avatar, Button, Icon, Input} from '@rneui/themed';
import RNFS from 'react-native-fs';
import { Overlay } from '@rneui/themed';
import numberlist from './Fraudnumbers'
export default function Numfraud() {
  const [loadcall, setloadcall] = useState([]);
  const [numberinput, setnumberinput] = useState('');
  const [isfraud,setisfraud]=useState(false)
  const handletestinput = () => {
    if(numberlist.includes(parseInt(numberinput))){
      setisfraud(true)
    }else{
      Alert.alert("Its a Fraud number but we have already blocked it for you")
    }
  };
  useEffect(() => {
    CallLogs.load(20).then(c => setloadcall(c));
  }, []);
  return (
    <View style={styles.component}>
      <Overlay isVisible={isfraud} onBackdropPress={()=>setisfraud(!isfraud)}>

      </Overlay>
      <View style={styles.inputcomponent}>
        <Input
          placeholder="Enter your number to test"
          keyboardType="number-pad"
          style={{color: 'white'}}
          containerStyle={{
            width: 300,
          }}
          onChangeText={e => setnumberinput(e)}
          value={numberinput}
        />
        <Button
          title="Test Number"
          buttonStyle={{
            backgroundColor: colors.buttonbg,
            borderRadius: 3,
          }}
          containerStyle={{
            width: 200,
            marginHorizontal: 70,
            marginVertical: 10,
          }}
          onPress={handletestinput}
        />
      </View>
      <Text
        style={{
          fontSize: 30,
          marginBottom: 20,
          fontWeight: '600',
          textAlign: 'left',
        }}>
        Call Logs
      </Text>
      <ScrollView>
        {loadcall &&
          loadcall.map((data, index) => {
            return (
              <View key={index}>
                <ListItem.Swipeable
                  style={{
                    width: 320,
                    margin: 3,
                  }}
                  containerStyle={{
                    backgroundColor: colors.grayscreenbg,
                    borderRadius: 10,
                    color: colors.white,
                  }}
                  leftContent={reset => (
                    <Button
                      title="Info"
                      onPress={() => reset()}
                      icon={{name: 'info', color: 'white'}}
                      buttonStyle={{
                        minHeight: '90%',
                        minWidth: '90%',
                        margin: 3,
                        borderRadius: 10,
                      }}
                    />
                  )}
                  rightContent={reset => (
                    <Button
                      title="Report Fraud"
                      onPress={() => reset()}
                      buttonStyle={{
                        minHeight: '90%',
                        backgroundColor: 'red',
                        minWidth: '90%',
                        margin: 3,
                        borderRadius: 10,
                      }}
                    />
                  )}>
                  <Avatar
                    rounded
                    title={data.name ? data.name[0] : 'X'}
                    containerStyle={{backgroundColor: colors.screenbg}}
                  />
                  <ListItem.Content>
                    <ListItem.Title style={{color: 'white', width: 'auto'}}>
                      {data.name ? data.name : 'UNKNOWN'}
                    </ListItem.Title>
                    <ListItem.Subtitle style={{color: colors.buttonbg}}>
                      {data.phoneNumber}
                    </ListItem.Subtitle>
                  </ListItem.Content>
                  <ListItem.Chevron />
                </ListItem.Swipeable>
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  component: {
    flex: 1,
    backgroundColor: colors.screenbg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textstyles: {
    fontSize: 20,
  },
  inputcomponent: {
    width: '100%',
    margin: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputtest: {
    width: '80%',
  },
});
