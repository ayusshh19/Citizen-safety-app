import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../redux/constants/colors';
import {Image} from 'react-native-animatable';
import axios from 'axios';
import {Button, Overlay} from '@rneui/themed';
const Blog = () => {
  const [blognews, setblognews] = useState([]);
  const [visible, setVisible] = useState(false);
  const [blogoverlaydata, setblogoverlaydata] = useState('');
  useEffect(() => {
    axios
      .get(
        'https://newsapi.org/v2/everything?q=tesla&from=2024-02-11&sortBy=publishedAt&apiKey=e1d7c86abdf740cc83720c83e59eab6d',
      )
      .then(response => {
        setblognews(response.data.articles);
      });
  }, []);
  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const setdata = currentdata => {
    setblogoverlaydata(currentdata);
    setVisible(!visible);
  };
  return (
    <ScrollView style={styles.container}>
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <View style={styles.blogoverlay}>
          {/* <Text>Title section</Text> */}
          <ScrollView>
            <Image
              source={{
                uri: blogoverlaydata.urlToImage,
                width: 300,
                height: 220,
              }}
              style={{objectFit:"contain"}}
              // style={styles.blogimage}
            />
            <Text
              style={{fontSize: 25, fontWeight: '800', color: colors.black,marginHorizontal:10}}>
              {blogoverlaydata.title}
            </Text>
            <Text
              style={{fontSize: 20, color: colors.black, fontWeight: '400',margin:10}}>
              {blogoverlaydata.description}
            </Text>
            <Text
              style={{fontSize: 15, color: colors.black, fontWeight: '400',margin:10}}>
              Authors : {blogoverlaydata.author}
            </Text>
            <Text style={{fontSize: 15, color: colors.black, fontWeight: '400',marginHorizontal:10}}>
              Important Urls - {blogoverlaydata.url}
            </Text>

          </ScrollView>
        </View>
      </Overlay>
      {blognews &&
        blognews.map((newsdata, index) => {
          return (
            <TouchableOpacity
              style={styles.blogcontainer}
              key={index}
              onPress={() => setdata(newsdata)}>
              <View style={styles.blogimage}>
                <Image
                  source={{
                    uri:
                      newsdata['urlToImage'] === null
                        ? 'https://plus.unsplash.com/premium_photo-1666997726532-33f671ca24c8?q=80&w=2021&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                        : newsdata.urlToImage,
                    width: 120,
                    height: 120,
                  }}
                  style={styles.blogimage}
                />
              </View>
              <View style={styles.blogtext}>
                <Text
                  style={{
                    fontSize: 20,
                    color: '#fff',
                    fontWeight: '800',
                    height: '80%',
                  }}>
                  {newsdata?.title}
                </Text>
                <Text style={styles.bloginnertext}>{newsdata.publishedAt}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.screenbg,
  },
  text: {
    fontSize: 100,
    fontStyle: 'italic',
  },
  blogcontainer: {
    display: 'flex',
    flexDirection: 'row',
    height: 120,
    width: 'auto',
    marginVertical: 20,
  },
  blogimage: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    objectFit: 'cover',
    borderRadius: 10,
  },
  blogtext: {
    flex: 3,
    justifyContent: 'space-between',
    // alignItems:"center",
    color: colors.white,
  },
  bloginnertext: {
    color: colors.white,
  },
  blogoverlay: {
    height: 600,
    width: 300,
  },
  blogoverlayimg: {
    width: '100%',
  },
});
export default Blog;
