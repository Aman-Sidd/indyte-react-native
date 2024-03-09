import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Dimensions} from 'react-native';
// import BannerImage from '../../../assets/images/welcome-banner.svg';
import BannerImage from '../../../assets/images/welcome-banner.png';
import NewButtob from '../../components/Button/NewButtob';
import {Image} from 'react-native';
import {Pressable} from 'react-native';
import {SCREENS} from '../../constants/Screens';

const {width, height} = Dimensions.get('window');

const Welcome = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to Indyte</Text>
      <Text style={styles.para}>Your journey to healthier You</Text>

      <View style={{marginTop: 35}}>
        {/* <BannerImage style={{width: '100%'}} /> */}
        <Image style={{width}} source={BannerImage} />
      </View>

      <Pressable style={{marginTop: 40}}>
        <NewButtob
          onPress={() => navigation.navigate(SCREENS.NSIGNIN)}
          title={'Get Started'}
        />
      </Pressable>
      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 30}}>
        <Text style={styles.txt}>Already have account? </Text>
        <Text
          onPress={() => navigation.navigate(SCREENS.LOGIN)}
          style={[styles.txt, {color: '#7265E3', fontWeight: '500'}]}>
          Sign in
        </Text>
      </View>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6FA',
    alignItems: 'center',
  },

  welcomeText: {
    color: '#2D3142',
    textAlign: 'center',
    fontFamily: 'Rubik-Regular',
    fontSize: 28,
    fontWeight: '500',
    lineHeight: 32,
    marginTop: height / 10,
    maxWidth: 200,
  },

  para: {
    color: '#4C5980',
    textAlign: 'center',
    fontFamily: 'Rubik-Regular',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 28,
    letterSpacing: 0.2,
    marginTop: 15,
  },

  txt: {
    color: '#4C5980',
    fontFamily: 'Rubik-Regular',
    fontSize: 16,
    fontWeight: '400',
  },
});
