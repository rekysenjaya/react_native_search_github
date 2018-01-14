import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image
} from 'react-native';
import icon from '../../assets/img/github.png';
const D = Dimensions.get('window')
const Header = () => (
  <View style={{ height: 50, backgroundColor: '#24292e', width: D.width }} >
    <View style={{ alignContent: 'center', flexDirection: 'row', padding: 10 }}>
      <Image source={icon} resizeMode="contain" style={{ width: 30, height: 30, marginHorizontal: 10 }} /><Text style={{ color: 'white', padding: 2 }} >Search Repository </Text><Text style={{ color: 'black', fontWeight: 'bold', padding: 2 }} >GITHUB</Text>
    </View>
  </View>
);

export default Header;
