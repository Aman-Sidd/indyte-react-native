
import React, { useRef, useEffect } from 'react';
import { Animated, View, StyleSheet } from 'react-native';
const WaterWavyAnimation = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue:  1,
          duration:  1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue:  0,
          duration:  1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const waveStyle = {
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [0,  1],
          outputRange: [0, -50], // Adjust these values to control the amplitude of the wave
        }),
      },
    ],
  };

  return (
    <View style={styles.waveContainer}>
      <Animated.View style={[styles.wave, waveStyle]} />
      <Animated.View style={[styles.wave, styles.wave2, waveStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  waveContainer: {
    overflow: 'hidden',
    height:  100,
  },
  wave: {
    position: 'absolute',
    left:  0,
    right:  0,
    top:  0,
    height:  100,
    backgroundColor: 'blue',
  },
  wave2: {
    backgroundColor: 'lightblue',
  },
});

export default WaterWavyAnimation;
