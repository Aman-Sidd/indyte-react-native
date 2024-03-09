import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {PieChart} from 'react-native-gifted-charts';
import GradientLabel from '../Label/GradientLabel';
import {COLORS} from '../../constants/Colors';
import {FONTS} from '../../constants/Fonts';
function CircularRing({
  radius = 200,
  fontSize = 20,
  label = 'label',
  gap,
  pieData = [
    {value: 75, color: COLORS.PRIMARY_BUTTON_GRADIENT.BLUE1},
    {value: 25, color: '#F7F8F8'},
  ],
}) {
  return (
    <View>
      <PieChart
        donut
        showGradient={true}
        innerRadius={radius - 10}
        radius={radius}
        data={pieData}
        centerLabelComponent={() => {
          return (
            <GradientLabel
              colors={[
                COLORS.PRIMARY_BUTTON_GRADIENT.BLUE2,
                COLORS.PRIMARY_BUTTON_GRADIENT.BLUE1,
              ]}
              conatinerStyle={{
                ...styles.label,
                width: 2 * (radius - (gap || 15)),
                height: 2 * (radius - (gap || 15)),
              }}>
              <Text style={{...styles.text, fontSize: fontSize}}>{label}</Text>
            </GradientLabel>
          );
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  label: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 999,
  },
  text: {
    fontFamily: FONTS.FONT_POPPINS_MEDIUM,
    color: 'white',
    textAlign: 'center',
  },
});
export default CircularRing;
