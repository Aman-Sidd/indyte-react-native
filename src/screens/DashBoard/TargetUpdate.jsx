import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import TextH4 from '../../components/Text/TextH4';

const TargetUpdate = () => {
  return (
    <View style={styles.mainContainer}>
      <View>
        <TextH4 style={{color: 'black'}}>Please set your Target</TextH4>
      </View>
    </View>
  );
};

export default TargetUpdate;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 100,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
});
