import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import DataContainer from '../container/DataContainer';
import TextMedium from '../Text/TextMedium';
import SmallText from '../Text/SmallText';

import CicrleArrowRight from '../../../assets/images/circulararrow.svg';
import GradientContainer from '../container/GradientContainer';
import {SCREENS} from '../../constants/Screens';
import {useNavigation} from '@react-navigation/native';
import PrimaryButton from '../Button/PrimaryButton';

function MealContainerNew({
  containerStyle,
  img,
  title = '',
  time = '',
  colors,
  onPress,
  finished,
}) {
  const navigation = useNavigation();
  return (
    <DataContainer
      onPress={onPress}
      containerStyle={{...styles.container, ...containerStyle}}>
      <GradientContainer
        colors={colors}
        styles={{
          borderRadius: 12,
          width: 70,
          height: 70,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image source={img} style={{width: 60, height: 60, borderRadius: 8}} />
      </GradientContainer>
      <View style={styles.info}>
        <TextMedium>{title}</TextMedium>
        <SmallText>{time}</SmallText>
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

      <CicrleArrowRight width={30} height={30} />
    </DataContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 100,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  info: {
    marginLeft: 15,
    flexGrow: 1,
  },
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
export default MealContainerNew;
