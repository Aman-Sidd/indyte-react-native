
import React from 'react';
import { Animated } from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';

const Wave = ({ animatedValue }) => {
  const translateY = animatedValue.interpolate({
    inputRange: [0,  1],
    outputRange: [-50,  50] // Adjust these values to control the amplitude of the wave
  });

  return (
    <Svg height="100" width="300">
      <Animated.Path
        d={`M0,50 Q75,${translateY}  150,50 T300,50`}
        fill="none"
        stroke="blue"
        strokeWidth="2"
      />
    </Svg>
  );
};

export default Wave;
