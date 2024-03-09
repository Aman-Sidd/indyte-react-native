import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import PrimaryButton from '../../components/Button/PrimaryButton';
import Input from '../../components/Form/Input';
import SmallText from '../../components/Text/SmallText';
import TextH4 from '../../components/Text/TextH4';
import Email from '../../../assets/icons/email.svg';
import Pass from '../../../assets/icons/Pass.svg';
import { useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native';
import { SCREENS } from '../../constants/Screens';
import { GlobalContext } from '../../../App';
import { useContext } from 'react';
import { useState } from 'react';
import { SendOTP, SendOTPLogin, VerifyOtp, getUser, loginUser } from '../../backend/utilFunctions';
import { storeDataInAsyncStorage } from '../../utils/common';
import { storageKeyName } from '../../constants/Data';
import CustomToast from '../../components/common/Toast';
import { useRef } from 'react';
// import { fetch } from 'react-native-ssl-pinning';
import NewButtob from '../../components/Button/NewButtob';

const { width, height } = Dimensions.get('window');

const Login = () => {
  const navigation = useNavigation();
  const { setLoggedInUser } = useContext(GlobalContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);

  const childRef = useRef(null);
  const [toastColorState, setToastColorState] = useState('');
  const [toastTextColorState, setToastTextColorState] = useState('white');
  const [toastMessage, setToastMessage] = useState('');
  const [PhoneHash, setPhoneHash] = useState("")
  const [otp, setotp] = useState(0)
  const [OtpVisible, setOtpVisible] = useState(false)
  const SendOtp = async () => {
    try {
      const credentials = { email };
      setLoading(true);
      // SendOTPLogin(email)
      //   .then(res => {
      //     console.log(res, "I am res");
      //     setPhoneHash(res)
      //     console.log(PhoneHash, "PHON ");
      //     setToastMessage("OTP message sent successfully");
      //     setToastTextColorState('white');
      //     setToastColorState('green');
      //     setOtpVisible(true)
      //     childRef.current.showToast();
      //   })
      //   .catch(err => {
      //     console.log(err.message);
      //     setToastMessage(err.message);
      //     setToastTextColorState('white');
      //     setToastColorState('red');
      //     childRef.current.showToast();
      //     setLoading(false);
      //   })
      //   .finally(() => setLoading(false));
    } catch (error) {
      setToastMessage(error);
      setToastTextColorState('white');
      setToastColorState('red');
      childRef.current.showToast();
      setLoading(false);
    }
  };



  const Login = async () => {
    console.log(otp, typeof (otp), "OYTP");
    if (otp?.length < 6) {
      setToastMessage("OTP must be 6 digit only");
      setToastTextColorState('white');
      setToastColorState('red');
      childRef.current.showToast();
    }
    else {
      try {
        console.log(PhoneHash, "HAHS");
        setLoading1(true);
        // VerifyOtp(email, otp, PhoneHash?.hash)
        //   .then(res => {
        //     console.log('====================================');
        //     console.log(res, "I am res");
        //     console.log('====================================');
        //     console.log(res?.token, "LL");
        //     storeDataInAsyncStorage(storageKeyName, res.token)
        //       .then(res => {
        //         // fetch user
        //         getUser()
        //           .then(res => {
        //             console.log(res, "testt");
        //             setLoggedInUser(res.user);
        //             setLoading1(false)
        //           })
        //           .catch(err => { console.log(err); setLoading1(false) });
        //       })
        //       .catch(err => { console.log('error while storing', err); setLoading1(false) });
        //   })
        //   .catch(err => {
        //     console.log(err.message);
        //     setToastMessage(err.message);
        //     setToastTextColorState('white');
        //     setToastColorState('red');
        //     childRef.current.showToast();
        //     setLoading1(false);
        //   })
        //   .finally(() => setLoading(false));
      } catch (error) {
        setToastMessage(error);
        setToastTextColorState('white');
        setToastColorState('red');
        childRef.current.showToast();
        setLoading1(false);
      }
    }
  };

  return (
    <View style={styles.MainView}>
      <CustomToast
        toastColor={toastColorState}
        toastTextColor={toastTextColorState}
        toastMessage={toastMessage}
        ref={childRef}
      />
      <View style={styles.Heading}>
        <SmallText style={{ fontWeight: '700', color: '#000', fontSize: 16 }}>
          Hey there,
        </SmallText>
        <TextH4 style={{ marginTop: 7 }}>Welcome Back</TextH4>
      </View>
      <View style={{ width: '85%', marginTop: 7 }}>
        <Input
          keyboardType='numeric'
          placeholder={'Phone number'}
          onChangeText={value => setEmail(value)}
          icon={<Email width={20} height={20} />}
        />
      </View>
      <NewButtob
        loading={loading}
        title={'Send OTP'}
        onPress={SendOtp}
        width={"80%"}
      />
      {
        OtpVisible ?
          <>
            <View style={{ width: '85%', marginTop: 15 }}>
              <Input
                maxlength={6}
                keyboardType='numeric'
                placeholder={'Enter OTP'}
                onChangeText={value => setotp(value)}
                icon={<Pass width={20} height={20} />}
              />
            </View>
            <NewButtob
              loading={loading1}
              title={'Login'}
              onPress={Login}
              width={"80%"}
            />
          </> : null
      }
      <Pressable
        onPress={() => navigation.navigate(SCREENS.FORGOPASS)}
        style={[styles.IconView, { alignItems: 'center' }]}>
        <SmallText style={{ fontSize: 14 }}>Forgot Password ? </SmallText>
        <TextH4 style={{ fontSize: 14, color: '#C58BF2', marginLeft: 5 }}>
          Reset Now
        </TextH4>
      </Pressable>
      {/* <View style={{ alignItems: 'center', marginTop: '25%' }}>
        {loading ? (
          <ActivityIndicator size={30} color={'blue'} />
        ) : (
          <PrimaryButton
            containerStyle={{ width: width - 30 }}
            title={'Login'}
            onPress={() => Login()}
          />
        )}
      </View> */}


      {/* <Text style={{ marginTop: '14%' }}>Or</Text> */}
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
        onPress={() => navigation.navigate(SCREENS.NSIGNIN)}
        style={[styles.IconView, { alignItems: 'center', position: "absolute", bottom: "5%" }]}>
        <SmallText style={{ fontSize: 14 }}>Don't have an account yet?</SmallText>
        <TextH4 style={{ fontSize: 14, color: '#C58BF2', marginLeft: 5 }}>
          Register
        </TextH4>
      </Pressable>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  MainView: {
    flex: 1,
    backgroundColor: '#F4F6FA',
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
    // position: "absolute",
    // bottom: 20
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
  },
});
