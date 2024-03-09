import {View, Text, Dimensions} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import PrimaryButton from '../../components/Button/PrimaryButton';
import TextH4 from '../../components/Text/TextH4';
import SmallText from '../../components/Text/SmallText';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../../constants/Screens';
const {width, height} = Dimensions.get('window');

const FinishWorkout = () => {
  const navigation = useNavigation();
  const user = useSelector(state => state?.user?.user);
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{height: height * 0.5}}>
        <LottieView
          source={require('../../../assets/lottieanimations/Success.json')}
          style={{width: '100%', height: '100%'}}
          autoPlay
          loop
        />
      </View>
      <View style={{alignItems: 'center', marginTop: '8%'}}>
        <TextH4>Congratulations,You Have{'\n'} Finished Your Workout</TextH4>
        <SmallText style={{width: '80%', textAlign: 'center', marginTop: 5}}>
          Exercise is king and nutrition is queen.Combine the two and you will
          have a kingdom
          {'\n'} -Jack Lalonne
        </SmallText>
      </View>
      <View
        style={{
          alignItems: 'center',
          marginTop: '30%',
          backgroundColor: 'white',
        }}>
        <PrimaryButton
          containerStyle={{width: width - 30}}
          title={'Go To Home'}
          onPress={() => navigation.navigate(SCREENS.WORKOUTHOME)}
        />
      </View>
    </View>
  );
};

export default FinishWorkout;
