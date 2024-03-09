import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LargeText from '../Text/LargeText';
import SmallText from '../Text/SmallText';
import {TouchableOpacity} from 'react-native';
import {FONTS} from '../../constants/Fonts';
import {SCREENS} from '../../constants/Screens';
import {useNavigation} from '@react-navigation/native';

const WorkOutForms = ({moreInfo, title, NOfExercise, Time, icon}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.mainConatiner}>
      <View>
        <LargeText
          style={{fontFamily: FONTS.FONT_POPPINS_SEMIBOLD, color: 'black'}}>
          {title}
        </LargeText>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <SmallText style={{fontFamily: FONTS.FONT_POPPINS_REGULAR}}>
            {NOfExercise} Exercises |{' '}
          </SmallText>
          <SmallText>{Time}</SmallText>
        </View>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate(SCREENS.WORLOUTINFO, {moreInfo})}>
          <Text style={styles.BtnText}>View More</Text>
        </TouchableOpacity>
      </View>
      {icon}
    </View>
  );
};

export default WorkOutForms;

const styles = StyleSheet.create({
  mainConatiner: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e3eeff',
    justifyContent: 'space-between',
    borderRadius: 15,
    paddingHorizontal: '5%',
    marginVertical: '5%',
    paddingVertical: '5%',
  },
  btn: {
    backgroundColor: 'white',
    width: 100,
    alignItems: 'center',
    borderRadius: 15,
    paddingVertical: 7,
    marginTop: '10%',
  },
  BtnText: {
    fontSize: 10,
    fontFamily: FONTS.FONT_POPPINS_REGULAR,
    color: '#94bbf7',
  },
});
