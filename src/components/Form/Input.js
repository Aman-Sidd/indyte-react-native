import React from 'react';
import {View, StyleSheet, TextInput, Touchable, Pressable} from 'react-native';
import {FONTS} from '../../constants/Fonts';
import {SIZES} from '../../constants/Size';
import {COLORS} from '../../constants/Colors';
import {secureTextEntry} from 'deprecated-react-native-prop-types/DeprecatedTextInputPropTypes';

function Input({
  value,
  onChangeText,
  customStyle,
  icon,
  placeholder,
  keyboardType = 'default',
  maxlength,
  editable,
  icon2 = null,
  onicon2press,
  secureTextEntry = false,
}) {
  return (
    <View style={[styles.container, customStyle]}>
      <View style={styles.imageContainer}>{icon}</View>
      <TextInput
        editable={editable}
        keyboardType={keyboardType}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.TITLE_BLACK}
        maxLength={maxlength}
        secureTextEntry={secureTextEntry}
      />

      <Pressable
        style={[styles.imageContainer, {paddingRight: 20}]}
        onPress={() => onicon2press()}>
        {icon2}
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: SIZES.INPUT_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'grey',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 15,
    backgroundColor: '#F7F8F8',
  },
  imageContainer: {
    marginLeft: 20,
  },
  input: {
    flexGrow: 1,
    marginLeft: 10,
    height: 65,
    fontFamily: FONTS.FONT_POPPINS_MEDIUM,
    fontSize: SIZES.INPUT_FONT_SIZE,
    color: COLORS.TITLE_BLACK,
  },
});
export default Input;
