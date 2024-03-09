import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import LargeText from '../Text/LargeText';
import SmallText from '../Text/SmallText';
import {FONTS} from '../../constants/Fonts';
import {SCREENS} from '../../constants/Screens';
import {useNavigation} from '@react-navigation/native';

const DIfferentBWContainer = ({moreInfo, title, time, icon}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(SCREENS.WORLOUTINFO, {moreInfo})}
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        elevation: 3,
        marginVertical: 15,
        marginHorizontal: '5%',
        borderRadius: 15,
        padding: '3%',
      }}>
      {icon}
      <View style={{marginLeft: '5%'}}>
        <LargeText
          style={{
            fontFamily: FONTS.FONT_POPPINS_BOLD,
            color: 'black',
            marginBottom: '4%',
          }}>
          {title}
        </LargeText>
        <SmallText>{time}</SmallText>
      </View>
      <View
        style={[
          styles.btn,
          {
            backgroundColor: moreInfo.finished ? '#92A3FD' : '#FF0000',
          },
        ]}>
        <Text style={styles.btnText}>
          {moreInfo.finished ? 'completed' : 'pending'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default DIfferentBWContainer;

const styles = StyleSheet.create({
  btn: {
    position: 'absolute',
    right: 10,
    width: 80,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  btnText: {
    fontSize: 12,
    color: 'white',
  },
});
