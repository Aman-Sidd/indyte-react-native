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

const FinishMeal = () => {
  const user = useSelector(state => state?.user?.user);
  const navigation = useNavigation();

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
        <TextH4>Congratulation</TextH4>
        <SmallText style={{width: '60%', textAlign: 'center', marginTop: 5}}>
          You have successfully completed your meal {user?.name}
        </SmallText>
      </View>
      <View
        style={{
          alignItems: 'center',
          marginTop: '40%',
          backgroundColor: 'white',
        }}>
        <PrimaryButton
          containerStyle={{width: width - 30}}
          title={'Go To Home'}
          onPress={() => navigation.navigate(SCREENS.MEALHOME)}
        />
      </View>
    </View>
  );
};

export default FinishMeal;
