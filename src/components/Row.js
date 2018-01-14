import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';
const D = Dimensions.get('window')
const Row = () => (
  <View style={{ height: 100, backgroundColor: '#24292e', width: D.width }} >
    <View style={{ alignContent: 'center' }}>
      <Text style={{ color: 'white' }} >List</Text><Text style={{ color: 'black', fontWeight: 'bold' }} >GITHUB</Text>
    </View>
  </View>
);

export default Row;
