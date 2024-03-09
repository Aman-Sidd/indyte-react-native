import {StyleSheet, Text, View, Dimensions, TextInput} from 'react-native';
import React, {useEffect, useRef} from 'react';
import SmallText from '../../components/Text/SmallText';
import {useState} from 'react';
import {getOtp} from '../../backend/utilFunctions';
import SlideHeader from '../../components/header/SlideHeader';
import Step from '../../components/new-auth/Step';
import NewButtob from '../../components/Button/NewButtob';
import {useRoute} from '@react-navigation/native';
import {SCREENS} from '../../constants/Screens';
import CustomToast from '../../components/common/Toast';

const {width, height} = Dimensions.get('window');

const TIMER_SECONDS = 59;
const TIMER_MINUTES = 1;
const SECONDS = 59;
let timeInterval = null;
const Otp = ({navigation}) => {
  const route = useRoute();
  const data = route.params?.data;
  // const navigation=useNavigation();
  const [timerSeconds, setTimerSeconds] = useState(TIMER_SECONDS);
  const [timerMinutes, setTimerMinutes] = useState(TIMER_MINUTES);
  const [resendAvailable, setResendAvailable] = useState(true);
  const [otp, setOtp] = useState({1: '', 2: '', 3: '', 4: '', 5: '', 6: ''});
  const childRef = useRef(null);
  const [toastColorState, setToastColorState] = useState('');
  const [toastTextColorState, setToastTextColorState] = useState('white');
  const [toastMessage, setToastMessage] = useState('');
  // request
  function getOtpByPhone() {
    //validation required
    // getOtp(phone)
    //   .then(res => console.log(res.data))
    //   .catch(error => {
    //     console.log(error.message);
    //     console.log('Message ', error.message);
    //   });
  }
  // refs
  const otpBox1 = useRef();
  const otpBox2 = useRef();
  const otpBox3 = useRef();
  const otpBox4 = useRef();
  const otpBox5 = useRef();
  const otpBox6 = useRef();
  function onPressSendOTP() {
    setTimerMinutes(TIMER_MINUTES);
    setTimerSeconds(TIMER_SECONDS);
    setResendAvailable(false);
    getOtpByPhone();
    timeInterval = setInterval(() => {
      setTimerSeconds(prevTime => prevTime - 1);
    }, 1000);
  }
  function updatePositionBasedOnOtp(currentPosition, value) {
    setOtp({...otp, [currentPosition]: value});
    if (currentPosition === 1) otpBox2.current.focus();
    else if (currentPosition === 2) otpBox3.current.focus();
    else if (currentPosition === 3) otpBox4.current.focus();
    else if (currentPosition === 4) otpBox5.current.focus();
    else if (currentPosition === 5) otpBox6.current.focus();
    else if (currentPosition === 6) otpBox1.current.focus();
  }
  useEffect(() => {
    if (timerSeconds === 0 && timerMinutes === 0) {
      clearInterval(timeInterval);
      setResendAvailable(true);
    } else if (timerSeconds === 0) {
      setTimerSeconds(SECONDS);
      setTimerMinutes(prev => prev - 1);
    }
  }, [timerSeconds, timerMinutes]);

  const concatValues = otp => {
    let result = '';
    for (let i = 1; i <= 6; i++) {
      result += otp[i];
    }
    return result;
  };

  const handlePress = () => {
    if (concatValues(otp).length < 1) {
      setToastMessage('OTP is required');
      setToastTextColorState('white');
      setToastColorState('red');
      childRef.current.showToast();
      return;
    }

    if (concatValues(otp).length !== 6) {
      setToastMessage('OTP must be 6 digit');
      setToastTextColorState('white');
      setToastColorState('red');
      childRef.current.showToast();
      return;
    }
    navigation.navigate(SCREENS.NEMAIL, {
      data: {...data, otp: concatValues(otp)},
    });
  };

  return (
    <View style={styles.MainView}>
      <CustomToast
        toastColor={toastColorState}
        toastTextColor={toastTextColorState}
        toastMessage={toastMessage}
        ref={childRef}
      />
      <SlideHeader />
      <Step text="STEP 2/12" />

      <Text style={styles.heading}>Verify your number</Text>
      <Text style={styles.subHeading}>Wel’ll text you on {data?.phone}.</Text>

      <View style={styles.InputOTP}>
        <TextInput
          placeholderTextColor="grey"
          style={styles.OTPInput}
          onChangeText={value => updatePositionBasedOnOtp(1, value)}
          maxLength={1}
          ref={otpBox1}
          keyboardType="numeric"
        />
        <TextInput
          placeholderTextColor="grey"
          style={styles.OTPInput}
          onChangeText={value => updatePositionBasedOnOtp(2, value)}
          maxLength={1}
          ref={otpBox2}
          keyboardType="numeric"
        />
        <TextInput
          placeholderTextColor="grey"
          style={styles.OTPInput}
          onChangeText={value => updatePositionBasedOnOtp(3, value)}
          maxLength={1}
          ref={otpBox3}
          keyboardType="numeric"
        />
        <TextInput
          placeholderTextColor="grey"
          style={styles.OTPInput}
          onChangeText={value => updatePositionBasedOnOtp(4, value)}
          maxLength={1}
          ref={otpBox4}
          keyboardType="numeric"
        />
        <TextInput
          placeholderTextColor="grey"
          style={styles.OTPInput}
          onChangeText={value => updatePositionBasedOnOtp(5, value)}
          maxLength={1}
          ref={otpBox5}
          keyboardType="numeric"
        />
        <TextInput
          placeholderTextColor="grey"
          style={styles.OTPInput}
          onChangeText={value => updatePositionBasedOnOtp(6, value)}
          maxLength={1}
          ref={otpBox6}
          keyboardType="numeric"
        />
      </View>
      <View>
        <Text style={styles.text}>Send me a new code</Text>
      </View>

      <View
        style={{
          marginTop: 70,
          marginTop: 150,
          position: 'absolute',
          bottom: 40,
          width,
          alignItems: 'center',
        }}>
        <NewButtob onPress={handlePress} title={'Continue'} />
      </View>
    </View>
  );
};

export default Otp;

const styles = StyleSheet.create({
  MainView: {
    flex: 1,
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
  },

  InputOTP: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '95%',
    marginTop: 30,
    gap: 10,
    color: 'red',
    // marginHorizontal: 10,
    paddingHorizontal: 10,
  },
  OTPInput: {
    borderRadius: 10,
    paddingHorizontal: 18,
    backgroundColor: '#ECF2FF',
    color: '#2D3142',
    textAlign: 'center',
    fontFamily: 'Rubik-Regular',
    fontSize: 25,
    fontWeight: '500',
    lineHeight: 32,
    width: (width - 70) / 6,
    aspectRatio: '1/1',
  },

  heading: {
    color: '#2D3142',
    textAlign: 'center',
    fontFamily: 'Rubik-Regular',
    fontSize: 24,
    fontWeight: '500',
    lineHeight: 32,
    width: 281,
  },

  subHeading: {
    color: '#4C5980',
    textAlign: 'center',
    fontFamily: 'Rubik-Regular',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 28,
    letterSpacing: 0.2,
    marginTop: 12,
  },

  text: {
    color: '#7265E3',
    textAlign: 'center',
    fontFamily: 'Rubik-Regular',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.2,
    marginTop: 45,
  },
});
