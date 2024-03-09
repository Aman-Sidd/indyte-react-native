import {View, Text, StyleSheet, Dimensions, Pressable} from 'react-native';
import React from 'react';
import PrimaryButton from '../../components/Button/PrimaryButton';
import Onboardingne from '../../../assets/icons/Onboardingone.svg';
import TextH4 from '../../components/Text/TextH4';
import SmallText from '../../components/Text/SmallText';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../../constants/Screens';

const {width, height} = Dimensions.get('window');

const OnboardingOne = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.mainContainer}>
      <View style={{gap: 10}}>
        <Text
          style={{
            color: 'black',
            textAlign: 'center',
            fontSize: 28,
            fontWeight: '600',
          }}>
          Welcome to {'\n'} Indyte
        </Text>
        <Text style={{color: '#4C5980', fontSize: 16}}>
          Your journey to healtier You
        </Text>
      </View>
      <View style={{marginTop: 20}}>
        <Onboardingne />
      </View>
      <View style={{marginTop: 20}}>
        <PrimaryButton
          title={'Get Started'}
          containerStyle={{
            borderRadius: 10,
            width: width * 0.7,
          }}
          onPress={() =>
            navigation.navigate(SCREENS.ONBOARDINGTWO)
          }></PrimaryButton>
        <Pressable
          onPress={() => navigation.navigate(SCREENS.AUTHSTACK)}
          style={[styles.IconView, {alignItems: 'center'}]}>
          <SmallText style={{fontSize: 14}}>Already have an account?</SmallText>
          <TextH4 style={{fontSize: 14, color: '#7265E3', marginLeft: 5}}>
            Signin
          </TextH4>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  IconView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 15,
    marginTop: 20,
  },
});
export default OnboardingOne;
