import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import PrimaryButton from '../../components/Button/PrimaryButton';
import Input from '../../components/Form/Input';
import SmallText from '../../components/Text/SmallText';
import TextH4 from '../../components/Text/TextH4';
import Email from '../../../assets/icons/email.svg';
import Eye from '../../../assets/icons/eye.svg';
import Eyeslash from '../../../assets/icons/eyeslash.svg';
import {COLORS} from '../../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import {Pressable} from 'react-native';
import {SCREENS} from '../../constants/Screens';
import {GlobalContext} from '../../../App';
import {useContext} from 'react';
import {useState} from 'react';
// import { getOtp } from "../../backend/utilFunctions";
// import {generateOTPPhone, verifyOTPPhone} from '../../services';
import {storeDataInAsyncStorage} from '../../utils/common';
import {useDispatch} from 'react-redux';
import {userSlice} from '../../store/userSlice';
import {
  apiSlice,
  useGenerateLoginOTPMutation,
  useGetProfileQuery,
  useUserLoginMutation,
  useVeriftyLoginOTPMutation,
} from '../../store/apiSlice';
import {
  forgotPassword,
  getProfileDetails,
  userLogin,
  verifyPassword,
} from '../../services';
import CustomToast from '../../components/common/Toast';
import Lock from '../../../assets/icons/Lock.svg';
const {width, height} = Dimensions.get('window');

const TIMER_SECONDS = 59;
const TIMER_MINUTES = 1;
const SECONDS = 59;
let timeInterval = null;
const ForgotPass = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [timerSeconds, setTimerSeconds] = useState(TIMER_SECONDS);
  const [timerMinutes, setTimerMinutes] = useState(TIMER_MINUTES);
  const [resendAvailable, setResendAvailable] = useState(true);
  const [passwordhide, setPasswordhide] = useState(true);
  // const [otp, setOtp] = useState({ 1: "", 2: "", 3: "", 4: "", 5: "", 6: "" });
  const [type, setType] = useState('phone');
  const [otp, setOtp] = useState('');
  const dispatch = useDispatch();
  const [veriftyLoginOTP] = useVeriftyLoginOTPMutation();
  const [generateLoginOTP] = useGenerateLoginOTPMutation();
  const [userLogin] = useUserLoginMutation();
  const [token, setToken] = useState('');
  const [toastColorState, setToastColorState] = useState('');
  const [toastTextColorState, setToastTextColorState] = useState('white');
  const [toastMessage, setToastMessage] = useState('');
  const childRef = useRef(null);

  // request
  async function getOtpByPhone() {
    try {
      const otpreq = await forgotPassword({phone: '+91' + phone});
      if (otpreq.data) {
        console.log(otpreq.data);
      }
    } catch (error) {
      console.log('error', error.response);
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

  function validateInput(input) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Regular expression for phone number
    // This is a simple example and might not cover all phone number formats
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;

    if (emailRegex.test(input)) {
      setType('email');
      setPhone(input);
    } else if (phoneRegex.test(input)) {
      setType('phone');
      setPhone(input);
    }
  }

  async function handleVefify() {
    try {
      console.log('type >> ', type);
      setLoading(true);
      if (type == 'phone') {
        const reqBody = {
          phone: '+91' + phone,
          password,
          otp,
        };
        const verifyforgotpassword = await verifyPassword(reqBody);
        if (verifyforgotpassword.data) {
          console.log(verifyforgotpassword.data);
          setToastMessage(verifyforgotpassword.data.message);
          setToastTextColorState('white');
          setToastColorState('green');
          childRef.current.showToast();
          setTimeout(() => {
            navigation.navigate(SCREENS.OTP);
          }, 3000);
        }
      } else {
        setToastMessage('Enter a valid phone number');
        setToastTextColorState('white');
        setToastColorState('red');
        childRef.current.showToast();
      }
    } catch (error) {
      console.log(error.response.data);
      setToastMessage('');
      setToastTextColorState('white');
      setToastColorState('red');
      childRef.current.showToast();

      setLoading(false);
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
        <TextH4 style={{marginTop: 7}}>Reset Your Password</TextH4>
      </View>
      <View style={{width: '85%', marginTop: 7}}>
        <Input
          placeholder={'Enter registered Email or Number'}
          onChangeText={value => validateInput(value)}
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
            onChangeText={(value) => updatePositionBasedOnOtp(1, value)}
            maxLength={1}
            value={otp[1]}
            ref={otpBox1}
          />
          <TextInput
            placeholderTextColor="grey"
            style={styles.OTPInput}
            onChangeText={(value) => updatePositionBasedOnOtp(2, value)}
            maxLength={1}
            
            value={otp[2]}
            ref={otpBox2}
          />
          <TextInput
            placeholderTextColor="grey"
            style={styles.OTPInput}
            onChangeText={(value) => updatePositionBasedOnOtp(3, value)}
            maxLength={1}
  
            value={otp[3]}
            ref={otpBox3}
          />
          <TextInput
            placeholderTextColor="grey"
            style={styles.OTPInput}
            onChangeText={(value) => updatePositionBasedOnOtp(4, value)}
            maxLength={1}
  
            value={otp[4]}
            ref={otpBox4}
          />
          <TextInput
            placeholderTextColor="grey"
            style={styles.OTPInput}
            onChangeText={(value) => updatePositionBasedOnOtp(5, value)}
            maxLength={1}
  
            value={otp[5]}
            ref={otpBox5}
          />
          <TextInput
            placeholderTextColor="grey"
            style={styles.OTPInput}
            onChangeText={(value) => updatePositionBasedOnOtp(6, value)}
            maxLength={1}
  
            value={otp[6]}
            ref={otpBox6}
          />

        </View> */}

      <View>
        <Input
          placeholder={type == 'email' ? 'Password' : 'OTP'}
          customStyle={[{width: '80%'}, styles.OTPInput]}
          // icon={<Lock width={20} height={20} />}
          value={otp}
          onChangeText={text => setOtp(text)}
        />
      </View>
      <SmallText style={{marginTop: 15}}>Enter OTP received on Phone</SmallText>

      <View style={{width: '85%', marginTop: 20}}>
        <Input
          placeholder={'Enter New Password'}
          onChangeText={text => setPassword(text)}
          icon={<Lock width={20} height={20} />}
          icon2={
            passwordhide ? (
              <Eye width={20} height={20} />
            ) : (
              <Eyeslash width={20} height={20} />
            )
          }
          secureTextEntry={passwordhide}
          onicon2press={() => setPasswordhide(p => !p)}
        />
      </View>
      {/* <Eye width={18} height={18} /> */}
      {!resendAvailable && (
        <SmallText style={{textAlign: 'center', marginTop: '5%'}}>
          You can request the next code in{' '}
          {timerMinutes < 10 ? `0${timerMinutes}` : timerMinutes}:
          {timerSeconds < 10 ? `0${timerSeconds}` : timerSeconds}
        </SmallText>
      )}
      <View style={{alignItems: 'center', marginTop: '25%'}}>
        {loading ? (
          <ActivityIndicator size={30} color={'blue'} />
        ) : (
          <PrimaryButton
            containerStyle={{width: width - 30}}
            title={'Reset'}
            onPress={() => {
              handleVefify();
            }}
          />
        )}
      </View>
      <Text style={{marginTop: '14%'}}>Or</Text>
      {/* <View style={[styles.IconView, { marginTop: "5%" }]}>
          <View style={styles.iconContainer}>
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/128/300/300221.png",
              }}
              style={styles.icon}
            />
          </View>
          <View style={styles.iconContainer}>
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/128/4922/4922978.png",
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

export default ForgotPass;

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
    elevation: 5,
    textAlign: 'center',
  },
});
