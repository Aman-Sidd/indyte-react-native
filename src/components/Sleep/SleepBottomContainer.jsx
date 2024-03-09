import {View, StyleSheet} from 'react-native';
import React from 'react';

import ThreeDot from '../../../assets/icons/threedot.svg';
import TextH4 from '../Text/TextH4';
import SmallText from '../Text/SmallText';
import GradientSwitch from '../common/GradientSwitch';
import PrimaryButton from '../Button/PrimaryButton';

const SleepScheduleCard = ({title, timeat, icon, time}) => {
  return (
    <View style={styles.cardBody}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View
          style={{
            backgroundColor: 'red',
            width: 50,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            backgroundColor: '#CACFD2',
          }}>
          {icon}
        </View>
        <View style={{marginLeft: 10, gap: 5}}>
          <View style={{alignItems: 'flex-start'}}>
            <TextH4 style={styles.cardTitle}>{`${title},`}</TextH4>
            <SmallText>{time}</SmallText>
          </View>
          <SmallText style={styles.timeat}>{timeat}</SmallText>
        </View>
      </View>
      <View
        style={{
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          height: '100%',
        }}>
        <ThreeDot width={18} height={18} />
        {/* <GradientSwitch /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardBody: {
    width: '98%',
    backgroundColor: 'white',
    marginVertical: 10,
    padding: 15,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderRadius: 20,
    zIndex: 1,
    alignSelf: 'center',
    elevation: 2,
    height: 100,
  },
  cardTitle: {
    fontSize: 15,
    marginRight: 5,
  },
  timeat: {
    fontSize: 14,
    fontWeight: '500',
  },
  btn: {
    width: 100,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 12,
    color: 'white',
  },
});
export default SleepScheduleCard;
