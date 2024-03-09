import React from 'react';
import { View } from 'react-native';
import { Svg, Defs, LinearGradient, Stop, Text as SVGText } from 'react-native-svg';

const GradientText = ({ text, colors ,fontSize,x,y,style }) => {
  return (
      <Svg style={style}>
        <Defs>
          <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
            {colors.map((color, index) => (
              <Stop key={index} offset={`${(index * 100) / (colors.length - 1)}%`} stopColor={color} />
            ))}
          </LinearGradient>
        </Defs>
        <SVGText fill="url(#grad)" fontSize={fontSize} fontWeight="bold" x={x} y={y}  >
          {text}
        </SVGText>
      </Svg>
  );
};

export default GradientText;