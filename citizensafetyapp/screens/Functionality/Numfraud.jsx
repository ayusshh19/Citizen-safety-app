import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../../redux/constants/colors';
import CallLogs from 'react-native-call-log';
import {ListItem, Avatar, Button} from '@rneui/themed';
export default function Numfraud() {
  const [loadcall, setloadcall] = useState([]);
  useEffect(() => {
    CallLogs.load(20).then(c => setloadcall(c));
  }, []);
  return (
    <View style={styles.component}>
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
                    borderRadius:10,
                    color:colors.white
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
                        borderRadius:10
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
                        borderRadius:10
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
                    <ListItem.Subtitle style={{color:colors.buttonbg}}>{data.phoneNumber}</ListItem.Subtitle>
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
});
