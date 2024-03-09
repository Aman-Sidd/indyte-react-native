import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {FONTS} from '../../constants/Fonts';
import {SIZES} from '../../constants/Size';
import GradientLabel from '../Label/GradientLabel';
import {COLORS} from '../../constants/Colors';

function GradientDropdown({
  iconColor,
  colors,
  data = [],
  placeholder = 'Select Item',
  value,
  setValue,
  containerStyle,
  placeholderStyle,
  selectedTextStyle,
  iconStyle,
  Tryies = true,
  icon,
}) {
  const [Main, setMain] = useState(false);
  return (
    <>
      {Tryies ? (
        <GradientLabel
          colors={
            colors
              ? colors
              : [
                  COLORS.PRIMARY_BUTTON_GRADIENT.BLUE2,
                  COLORS.PRIMARY_BUTTON_GRADIENT.BLUE1,
                ]
          }
          conatinerStyle={{...styles.container, ...containerStyle}}>
          <Dropdown
            data={data}
            maxHeight={300}
            selectedTextStyle={{
              ...styles.placeholderStyle,
              ...selectedTextStyle,
            }}
            placeholderStyle={{...styles.placeholderStyle, ...placeholderStyle}}
            labelField="label"
            valueField="value"
            placeholder={placeholder}
            value={value}
            iconStyle={{...styles.iconStyle, ...iconStyle}}
            iconColor={iconColor || 'white'}
            onChange={item => setValue(item.value)}
            itemTextStyle={{color: 'black'}}
            renderLeftIcon={() => (
              <View style={{marginLeft: icon ? 20 : 10}}>{icon}</View>
            )}
          />
        </GradientLabel>
      ) : (
        <View style={{...styles.container1, ...containerStyle}}>
          <Dropdown
            data={data}
            maxHeight={300}
            selectedTextStyle={{
              ...styles.placeholderStyle1,
              ...selectedTextStyle,
            }}
            itemTextStyle={{color: 'black'}}
            placeholderStyle={{
              ...styles.placeholderStyle1,
              ...placeholderStyle,
            }}
            labelField="label"
            valueField="value"
            placeholder={placeholder}
            value={value}
            iconStyle={{...styles.iconStyle, ...iconStyle}}
            iconColor={iconColor || 'black'}
            onChange={item => setValue(item.value)}
            renderLeftIcon={() => (
              <View style={{marginLeft: icon ? 20 : 0}}>{icon}</View>
            )}
          />
        </View>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    height: SIZES.INPUT_HEIGHT,
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 15,
    backgroundColor: '#F7F8F8',
    marginBottom: 15,
  },
  placeholderStyle: {
    marginLeft: 15,
    fontSize: SIZES.INPUT_FONT_SIZE,
    fontFamily: FONTS.FONT_POPPINS_MEDIUM,
    color: 'white',
  },
  iconStyle: {
    marginRight: 10,
  },
  dropdown: {
    fontFamily: FONTS.FONT_POPPINS_MEDIUM,
  },
  placeholderStyle1: {
    marginLeft: 15,
    fontSize: SIZES.INPUT_FONT_SIZE,
    fontFamily: FONTS.FONT_POPPINS_MEDIUM,
    color: 'black',
  },
  container1: {
    height: SIZES.INPUT_HEIGHT,
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 15,
    backgroundColor: 'white',
    marginBottom: 15,
    borderWidth: 1,
  },
});
export default GradientDropdown;
