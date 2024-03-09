import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Step = ({text}) => {
  return (
    <View style={{marginTop: 36, marginBottom: 20}}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default Step;

const styles = StyleSheet.create({
  text: {
    color: '#7265E3',
    fontFamily: 'Rubik-Regular',
    fontSize: 12,
    fontWeight: 500,
    lineHeight: 14,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});
