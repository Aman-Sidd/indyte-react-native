import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {FONTS} from '../../constants/Fonts';
import UserSvg from '../../../assets/icons/User.svg';
import {SIZES} from '../../constants/Size';

function PickerLabel({customStyle, title, icon, icon2 = null}) {
  return (
    <View style={[styles.container, customStyle]}>
      {icon && <View style={styles.imageContainer}>{icon}</View>}
      <Text style={styles.input}>{title}</Text>
      {icon2 && <View style={styles.imageContainer2}>{icon2}</View>}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: SIZES.INPUT_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
    flexGrow: 1,
    marginLeft: 10,
    fontFamily: FONTS.FONT_POPPINS_MEDIUM,
    fontSize: SIZES.INPUT_FONT_SIZE,
    color: 'black'
  },
});
export default PickerLabel;
