import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { FONTS } from '../../constants/Fonts';
import Edit from '../../../assets/icons/Edit.svg';
const { width, height } = Dimensions.get('window');
const ProfileCard = ({ type, value, icon, containerStyle, onPress }) => {
  return (
    <View style={[styles.Container, styles.shadowProp, containerStyle]}>
      <View style={styles.image}>{icon}</View>
      <View style={{ paddingHorizontal: 20, marginTop: 12, width: width / 1.8 }}>
        <Text
          style={[
            {
              fontSize: 15,
              color: '#1D1617',
              fontFamily: FONTS.FONT_POPPINS_MEDIUM,
            },
          ]}>
          {type}{' '}
        </Text>
        <Text
          style={[
            {
              fontSize: 13,
              color: '#1D1617',
              fontFamily: FONTS.FONT_POPPINS_REGULAR,
            },
          ]}>
          {value}
        </Text>
      </View>
      <TouchableOpacity
        style={{ marginTop: 18, paddingTop: 9 }}
        onPress={onPress}>
        <Edit />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileCard;

const styles = StyleSheet.create({
  Container: {
    paddingVertical: 10,
    borderRadius: 16,
    width: width / 1.25,
    height: height / 8.35,
    backgroundColor: 'white',
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '4%',
  },
  shadowProp: {
    elevation: 5,
  },
  image: {
    marginLeft: '10%',
    marginTop: 18,
    display: 'flex',
    flexDirection: 'row',
  },
});
