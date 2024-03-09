import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TextInput,
  ActivityIndicator,
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
import {registerVerifyOTP} from '../../services';
import {
  useGenerateUserMutation,
  useVeriftyLoginOTPMutation,
  useVerifyUserMutation,
} from '../../store/apiSlice';
import {useDispatch} from 'react-redux';
import {userSlice} from '../../store/userSlice';
import {storeDataInAsyncStorage} from '../../utils/common';
import CustomToast from '../../components/common/Toast';

const {width, height} = Dimensions.get('window');

const TIMER_SECONDS = 59;
const TIMER_MINUTES = 1;
const SECONDS = 59;
let timeInterval = null;
const VerifyOTP = ({user}) => {
  const navigation = useNavigation();
  const {setLoggedInUser} = useContext(GlobalContext);
  const [phone, setPhone] = useState(user.phonenumber);
  const [timerSeconds, setTimerSeconds] = useState(TIMER_SECONDS);
  const [timerMinutes, setTimerMinutes] = useState(TIMER_MINUTES);
  const [resendAvailable, setResendAvailable] = useState(true);
  const [otp, setOtp] = useState('');
  const [verifyUser] = useVerifyUserMutation();
  const dispatch = useDispatch();
  const [toastColorState, setToastColorState] = useState('');
  const [toastTextColorState, setToastTextColorState] = useState('white');
  const [toastMessage, setToastMessage] = useState('');
  const childRef = useRef(null);
  const [loading, setLoading] = useState(false);

  async function handleVerify() {
    try {
      setLoading(true);

      const reqBody = {
        name: user.name,
        phone: '+91' + user.phonenumber,
        email: user.email,
        profile: '',
        password: user.password,
        date_of_birth: user.date_of_birth,
        height: parseFloat(user.height),
        weight: parseInt(user.weight),
        weight_unit: user.weight_unit,
        height_unit: user.height_unit,
        gender: user.gender,
        goal: user.goal,
        otp,
      };
      console.log('input>>', reqBody);

      const verifyotp = await verifyUser(reqBody);
      console.log(verifyotp);
      if (verifyotp.error) {
        setLoading(false);
        throw verifyotp.error;
      }

      setToastMessage(verifyotp.data.message);
      setToastTextColorState('white');
      setToastColorState('green');
      childRef.current.showToast();
      await storeDataInAsyncStorage('access_token', verifyotp.data.token);
      dispatch(userSlice.actions.userLogin(verifyotp.data.user));
      setLoading(fasle);
    } catch (error) {
      setLoading(false);
      console.log(error);
      setToastMessage(error?.data?.message || error?.data?.errors.phone);
      setToastTextColorState('white');
      setToastColorState('red');
      childRef.current.showToast();
      console.log(error?.data?.message);
    }
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
    // getOtpByPhone();
    // timeInterval = setInterval(() => {
    //   setTimerSeconds(prevTime => prevTime - 1);
    // }, 1000);
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

  return (
    <View style={styles.MainView}>
      <CustomToast
        toastColor={toastColorState}
        toastTextColor={toastTextColorState}
        toastMessage={toastMessage}
        ref={childRef}
      />

      <View style={styles.Heading}>
        <TextH4 style={{marginTop: 7}}>Verfify OTP</TextH4>
      </View>
      <View style={{width: '85%', marginTop: 7}}>
        <Input
          placeholder={'Phone'}
          value={user.phonenumber}
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
      {/* <View style={styles.InputOTP}>
        <TextInput
          placeholderTextColor="grey"
          style={styles.OTPInput}
          onChangeText={value => updatePositionBasedOnOtp(1, value)}
          maxLength={1}
          ref={otpBox1}
        />
        <TextInput
          placeholderTextColor="grey"
          style={styles.OTPInput}
          onChangeText={value => updatePositionBasedOnOtp(2, value)}
          maxLength={1}
          ref={otpBox2}
        />
        <TextInput
          placeholderTextColor="grey"
          style={styles.OTPInput}
          onChangeText={value => updatePositionBasedOnOtp(3, value)}
          maxLength={1}
          ref={otpBox3}
        />
        <TextInput
          placeholderTextColor="grey"
          style={styles.OTPInput}
          onChangeText={value => updatePositionBasedOnOtp(4, value)}
          maxLength={1}
          ref={otpBox4}
        />
        <TextInput
          placeholderTextColor="grey"
          style={styles.OTPInput}
          onChangeText={value => updatePositionBasedOnOtp(5, value)}
          maxLength={1}
          ref={otpBox5}
        />
        <TextInput
          placeholderTextColor="grey"
          style={styles.OTPInput}
          onChangeText={value => updatePositionBasedOnOtp(6, value)}
          maxLength={1}
          ref={otpBox6}
        />
      </View> */}
      <View>
        <Input
          placeholder={'OTP'}
          customStyle={[{width: '80%'}, styles.OTPInput]}
          // icon={<Lock width={20} height={20} />}
          value={otp}
          onChangeText={text => setOtp(text)}
        />
      </View>
      {/* <Eye width={18} height={18} /> */}
      <SmallText style={{textAlign: 'center', marginTop: '5%'}}>
        You can request the next code in{' '}
      </SmallText>
      <View style={{alignItems: 'center', marginTop: '25%'}}>
        {loading ? (
          <ActivityIndicator size={30} />
        ) : (
          <PrimaryButton
            containerStyle={{width: width - 30}}
            title={'Verify'}
            onPress={() => handleVerify()}
          />
        )}
      </View>
      <Text style={{marginTop: '14%'}}>Or</Text>
      {/* <View style={[styles.IconView, {marginTop: '5%'}]}>
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
      </View> */}
      <Pressable
        onPress={() => navigation.navigate(SCREENS.REGISTER)}
        style={[styles.IconView, {alignItems: 'center'}]}>
        <SmallText style={{fontSize: 14}}>Don't have an account yet?</SmallText>
        <TextH4 style={{fontSize: 14, color: '#C58BF2', marginLeft: 5}}>
          Register
        </TextH4>
      </Pressable>
    </View>
  );
};

export default VerifyOTP;

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
    paddingHorizontal: 5,
    backgroundColor: '#ECF2FF',
    textAlign: 'center',
  },
});
