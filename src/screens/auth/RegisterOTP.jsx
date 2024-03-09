import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TextInput,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import PrimaryButton from '../../components/Button/PrimaryButton';
import Input from '../../components/Form/Input';
import SmallText from '../../components/Text/SmallText';
import TextH4 from '../../components/Text/TextH4';
import Email from '../../../assets/icons/email.svg';
import Eye from '../../../assets/icons/eye.svg';
import {COLORS} from '../../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import {Pressable} from 'react-native';
import {SCREENS} from '../../constants/Screens';
import {GlobalContext} from '../../../App';
import {useContext} from 'react';
import {useState} from 'react';
import {getOtp} from '../../backend/utilFunctions';
import {ActivityIndicator} from 'react-native';
import CustomToast from '../../components/common/Toast';

const {width, height} = Dimensions.get('window');

const TIMER_SECONDS = 59;
const TIMER_MINUTES = 1;
const SECONDS = 59;
let timeInterval = null;
const RegisterOTP = ({user, setUser}) => {
  const navigation = useNavigation();
  const {setLoggedInUser} = useContext(GlobalContext);
  const [phone, setPhone] = useState('');
  const [timerSeconds, setTimerSeconds] = useState(TIMER_SECONDS);
  const [timerMinutes, setTimerMinutes] = useState(TIMER_MINUTES);
  const [resendAvailable, setResendAvailable] = useState(true);
  const [loading, setLoading] = useState(false);

  const childRef = useRef(null);
  const [toastColorState, setToastColorState] = useState('');
  const [toastTextColorState, setToastTextColorState] = useState('white');
  const [toastMessage, setToastMessage] = useState('');

  const [otp, setOtp] = useState({1: '', 2: '', 3: '', 4: '', 5: '', 6: ''});

  // request
  function getOtpByPhone() {
    setLoading(true);
    //validation required
    // getOtp(phone)
    //   .then(res => setUser({...user, hash: res.hash}))
    //   .catch(error => {
    //     console.log(error.message);
    //     console.log('Message ', error.message);
    //   })
    //   .finally(() => setLoading(false));
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
  function onVerify() {
    //collect the otp
    try {
      if (!phone) {
        throw 'Enter Phone Number';
      }
      let otpAsString = '';
      if (!otp[1] || !otp[2] || !otp[3] || !otp[4] || !otp[5] || !otp[6]) {
        throw 'Not a valid OTP received';
      }
      // valid otp
      otpAsString = otp[1] + otp[2] + otp[3] + otp[4] + otp[5] + otp[6];
      setUser({...user, otp: otpAsString, phone: phone});
      navigation.navigate(SCREENS.REGISTER);
    } catch (error) {
      setToastMessage(error);
      setToastTextColorState('white');
      setToastColorState('red');
      childRef.current.showToast();
    }
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

  return (
    <View style={styles.MainView}>
      <CustomToast
        toastColor={toastColorState}
        toastTextColor={toastTextColorState}
        toastMessage={toastMessage}
        ref={childRef}
      />
      <View style={styles.Heading}>
        <SmallText style={{fontWeight: '700', color: 'black', fontSize: 16}}>
          Hey there,
        </SmallText>
        <TextH4 style={{marginTop: 7}}>Register Youself</TextH4>
      </View>
      <View style={{width: '85%', marginTop: 7}}>
        <Input
          keyboardType="numeric"
          placeholder={'Phone'}
          onChangeText={value => setPhone(value)}
          icon={<Email width={20} height={20} />}
        />
      </View>
      {!resendAvailable && TIMER_SECONDS > 0 && (
        <SmallText
          style={{textAlign: 'center', marginVertical: 20, color: '#92A3FD'}}
          onPress={onPressSendOTP}>
          {timerMinutes < 10 ? `0${timerMinutes}` : timerMinutes}:
          {timerSeconds < 10 ? `0${timerSeconds}` : timerSeconds}
        </SmallText>
      )}
      {phone.length === 10 && resendAvailable && (
        <SmallText
          style={{textAlign: 'center', marginVertical: 20, color: '#92A3FD'}}
          onPress={onPressSendOTP}>
          Send OTP
        </SmallText>
      )}
      <SmallText
        style={{textAlign: 'center', marginVertical: 20, color: '#343965'}}>
        Verification Code
      </SmallText>
      <View style={styles.InputOTP}>
        <TextInput
          keyboardType="numeric"
          placeholderTextColor="grey"
          style={styles.OTPInput}
          onChangeText={value => updatePositionBasedOnOtp(1, value)}
          maxLength={1}
          ref={otpBox1}
          placeholder='0'
        />
        <TextInput
          keyboardType="numeric"
          placeholderTextColor="grey"
          style={styles.OTPInput}
          onChangeText={value => updatePositionBasedOnOtp(2, value)}
          maxLength={1}
          ref={otpBox2}
          placeholder='0'
        />
        <TextInput
          keyboardType="numeric"
          placeholderTextColor="grey"
          style={styles.OTPInput}
          onChangeText={value => updatePositionBasedOnOtp(3, value)}
          maxLength={1}
          ref={otpBox3}
          placeholder='0'
        />
        <TextInput
          keyboardType="numeric"
          placeholderTextColor="grey"
          style={styles.OTPInput}
          onChangeText={value => updatePositionBasedOnOtp(4, value)}
          maxLength={1}
          ref={otpBox4}
          placeholder='0'
        />
        <TextInput
          keyboardType="numeric"
          placeholderTextColor="grey"
          style={styles.OTPInput}
          onChangeText={value => updatePositionBasedOnOtp(5, value)}
          maxLength={1}
          ref={otpBox5}
          placeholder='0'
        />
        <TextInput
          keyboardType="numeric"
          placeholderTextColor="grey"
          style={styles.OTPInput}
          onChangeText={value => updatePositionBasedOnOtp(6, value)}
          maxLength={1}
          ref={otpBox6}
          placeholder='0'
        />
      </View>
      {/* <Eye width={18} height={18} /> */}
      <SmallText style={{textAlign: 'center', marginTop: '5%'}}>
        You can request the next code in{' '}
      </SmallText>
      <View style={{alignItems: 'center', marginTop: '25%'}}>
        {loading ? (
          <ActivityIndicator size={30} color={'blue'} />
        ) : (
          <PrimaryButton
            containerStyle={{width: width - 30}}
            title={'Next'}
            onPress={() => onVerify()}
          />
        )}
      </View>
      <Text style={{marginTop: '14%'}}>Or</Text>
      <View style={[styles.IconView, {marginTop: '5%'}]}>
        <View style={styles.iconContainer}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/300/300221.png',
            }}
            style={styles.icon}
          />
        </View>
        <View style={styles.iconContainer}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/4922/4922978.png',
            }}
            style={styles.icon}
          />
        </View>
      </View>
      <Pressable
        onPress={() => navigation.navigate(SCREENS.LOGIN)}
        style={[styles.IconView, {alignItems: 'center'}]}>
        <SmallText style={{fontSize: 14}}>Already have a account ?</SmallText>
        <TextH4 style={{fontSize: 14, color: '#C58BF2', marginLeft: 5}}>
          Login
        </TextH4>
      </Pressable>
    </View>
  );
};

export default RegisterOTP;

const styles = StyleSheet.create({
  MainView: {
    flex: 1,
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
  },
  Heading: {
    height: height / 9,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '5%',
  },
  icon: {
    width: 30,
    height: 30,
  },
  IconView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  iconContainer: {
    borderWidth: 1,
    borderColor: '#DDDADA',
    padding: 8,
    borderRadius: 8,
    marginHorizontal: 30,
  },
  InputOTP: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '95%',
    marginHorizontal: 10,
  },
  OTPInput: {
    borderRadius: 10,
    paddingHorizontal: 18,
    backgroundColor: '#ECF2FF',
    textAlign: 'center',
    color: 'black'
  },
});
