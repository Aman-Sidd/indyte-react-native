import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {FONTS} from '../../constants/Fonts';
import UserSvg from '../../../assets/icons/User.svg';
import {SIZES} from '../../constants/Size';
import DropdownPicker from '../Utils/DropdownPicker';
import {REPEAT} from '../../constants/Data';
function PickerLabelTwo({
  customStyle,
  title,
  text,
  icon,
  dropdown,
  icon2 = null,
  repeat,
  setRepeat,
  component = null,
  data,
  dropdownLabel='Repeat'
}) {
  return (
    <View style={[styles.container, customStyle]}>
      <View style={{flexDirection: 'row'}}>
        {icon && <View style={styles.imageContainer}>{icon}</View>}
        <Text style={styles.input}>{title}</Text>
      </View>
      {component ? (
        <View style={{marginEnd: 10}}>{component}</View>
      ) : dropdown ? (
        <DropdownPicker
          width={'40%'}
          marginBottom={5}
          data={data}
          value={repeat}
          setValue={setRepeat}
          placeholder={dropdownLabel}
        />
      ) : (
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.input, {color: 'grey'}]}>{text}</Text>
          {icon2 && <View style={styles.imageContainer2}>{icon2}</View>}
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: SIZES.INPUT_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
    borderRadius: 15,
    backgroundColor: '#F7F8F8',
  },
  imageContainer: {
    marginLeft: 20,
  },
  imageContainer2: {
    marginRight: 20,
  },
  input: {
    marginLeft: 10,
    fontFamily: FONTS.FONT_POPPINS_MEDIUM,
    fontSize: SIZES.INPUT_FONT_SIZE,
    color: 'black',
  },
});
export default PickerLabelTwo;
