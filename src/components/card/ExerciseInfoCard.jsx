import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Image} from 'react-native';
import ArrowRight from '../../../assets/icons/ArrowRight.svg';
import LargeText from '../Text/LargeText';
import {FONTS} from '../../constants/Fonts';
import SmallText from '../Text/SmallText';
import TextMedium from '../Text/TextMedium';
const ExerciseInfoCard = ({title, img, Time, finished}) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: '5%',
        width: '100%',
      }}>
      <Image
        source={require('../../../assets/icons/Girl.png')}
        style={{width: 60, height: 60}}
      />
      <View style={{width: '50%', marginLeft: '3%'}}>
        <LargeText
          style={{fontFamily: FONTS.FONT_POPPINS_SEMIBOLD, color: 'black'}}>
          {title}
        </LargeText>
        <TextMedium>{Time}</TextMedium>
      </View>
      <View
        style={[
          styles.btn,
          {
            backgroundColor: finished ? '#92A3FD' : '#FF0000',
          },
        ]}>
        <Text style={styles.btnText}>{finished ? 'completed' : 'pending'}</Text>
      </View>

      <ArrowRight width={24} height={24} />
    </View>
  );
};

export default ExerciseInfoCard;

const styles = StyleSheet.create({
  btn: {
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
