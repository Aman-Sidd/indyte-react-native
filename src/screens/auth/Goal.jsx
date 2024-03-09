import * as React from 'react';
import {
  StatusBar,
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  Animated,
  TouchableOpacity,
  Platform,
} from 'react-native';
import GoalSlider from '../../components/auth/GoalSlider';
import Heading from '../../components/Text/Heading';
import PrimaryButton from '../../components/Button/PrimaryButton';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../../constants/Screens';
// import {registerUser} from '../../backend/utilFunctions';
import CustomToast from '../../components/common/Toast';
import {useState} from 'react';
import {useRef} from 'react';
import {ActivityIndicator} from 'react-native';
import {generateOTPPhone, registerGenerateOTP} from '../../services';
import {useGenerateUserMutation} from '../../store/apiSlice';

const {width, height} = Dimensions.get('window');
export default function Goal({user, setUser}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const childRef = useRef(null);
  const [toastColorState, setToastColorState] = useState('');
  const [toastTextColorState, setToastTextColorState] = useState('white');
  const [toastMessage, setToastMessage] = useState('');

  const [generateUser] = useGenerateUserMutation();
  async function onRegister() {
    setLoading(true);

    try {
      const sendotp = await generateUser({
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
      });

      if (sendotp.error) {
        throw sendotp.error;
      }
      console.log(sendotp);
      navigation.navigate(SCREENS.VERIFYOTP);
    } catch (err) {
      console.log(err.data.errors);
      setToastMessage(err.data.errors.phone);
      setToastTextColorState('white');
      setToastColorState('red');

      childRef.current.showToast();
    } finally {
      setLoading(false);
    }
  }
  const goals = ['Improve Shape', 'Lean & Time', 'Loose a Fat'];

  React.useEffect(() => {
    setUser({...user, goal: goals[activeIndex]});
  }, [activeIndex]);
  return (
    <View style={styles.container}>
      <CustomToast
        toastColor={toastColorState}
        toastTextColor={toastTextColorState}
        toastMessage={toastMessage}
        ref={childRef}
      />
      <Heading
        heading={'What is your goal ?'}
        subheading={'It will help us to choose a best program for you'}
      />
      <GoalSlider activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
      {loading ? (
        <ActivityIndicator size={30} color="blue" />
      ) : (
        <PrimaryButton
          onPress={() => onRegister()}
          containerStyle={{width: width - 40}}
          title={'Register'}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'white',
  },
});
