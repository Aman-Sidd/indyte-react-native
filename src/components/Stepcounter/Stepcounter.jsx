
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function StepCounter() {
  const [stepCount, setStepCount] = useState(0);

 return (
    <View style={styles.container}>
      <Text>Steps taken: {stepCount}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:  1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
