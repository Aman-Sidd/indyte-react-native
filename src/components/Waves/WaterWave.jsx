import {useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, Animated, Image} from 'react-native';
import React from 'react';
import GradientText from '../Text/GradientText';

const WaterWave = ({current, target}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [tempheight, setTempheight] = useState(0);

  useEffect(() => {
    // Animated.timing(animatedValue, {
    //   toValue: percentage,
    //   duration: 1000, // Adjust the duration as needed
    //   useNativeDriver: false, // Native driver does not support interpolation
    // }).start();
    setTempheight((current / target) * 100);
  }, [current, target]);

  const waveHeight = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
  });

  return (
    <View style={styles.container}>
      <View
        style={{
          position: 'absolute',
          top: 10,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          zIndex: 100,
        }}>
        <Image
          source={require('../../../assets/images/bottlefull.png')}
          style={{width: 40, height: 40, marginTop: 5}}
        />
        <Text style={{color: 'black', fontSize: 30}}>{current}</Text>
        <Text style={{color: 'black', fontSize: 20}}>/{target}</Text>
      </View>
      <View style={[styles.wave, {height: `${tempheight}%`}]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 200, // Adjust the size as needed
    height: 200, // Adjust the size as needed
    borderRadius: 100, // Make it a circle
    overflow: 'hidden',
    borderWidth: 10,
    borderColor: 'lightgrey',
  },
  wave: {
    backgroundColor: 'skyblue', // Change to your desired color
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
export default WaterWave;
