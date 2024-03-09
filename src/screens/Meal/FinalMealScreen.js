import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
} from 'react-native';
import React from 'react';
import TextH4 from '../../components/Text/TextH4';
import SmallText from '../../components/Text/SmallText';
import PrimaryButton from '../../components/Button/PrimaryButton';
import BoyGirl from '../../../assets/icons/BoyGirl.svg';
import {useNavigation} from '@react-navigation/native';
import {ScrollViewBase} from 'react-native';
import {SCREENS} from '../../constants/Screens';
import {useSelector} from 'react-redux';
const {width, height} = Dimensions.get('window');

const FinalMealScreen = () => {
  const navigation = useNavigation();
  const user = useSelector(state => state.user.user);
  return (
    <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{width: width, height: height / 2.2, marginTop: '10%'}}>
        <BoyGirl width={'100%'} height={'100%'} />
      </View>
      <View style={{alignItems: 'center', marginTop: '8%'}}>
        <TextH4>Welcome, {user?.name}</TextH4>
        <SmallText style={{width: '60%', textAlign: 'center', marginTop: 5}}>
          You are all set now, let’s reach your goals together with us
        </SmallText>
      </View>
      <View style={{alignItems: 'center', marginTop: '40%'}}>
        <PrimaryButton
          containerStyle={{width: width - 30}}
          title={'Go To Home'}
          onPress={() => navigation.navigate(SCREENS.MEALHOME)}
        />
      </View>
    </ScrollView>
  );
};
export default FinalMealScreen;
