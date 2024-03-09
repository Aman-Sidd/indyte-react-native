import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import GirlSvg from '../../../assets/icons/dumble_girl.svg';
import UserSvg from '../../../assets/icons/User.svg';
import ScreenContainer from '../../components/container/ScreenContainer';
import Heading from '../../components/Text/Heading';
import DropdownPicker from '../../components/Utils/DropdownPicker';
import {GENDERS, HEIGHT_UNIT, WEIGHT_UNIT} from '../../constants/Data';
import PrimaryButton from '../../components/Button/PrimaryButton';
import CalenderPicker from '../../components/Utils/CalenderPicker';
import PickerLabel from '../../components/Label/PickerLabel';
import Calendar from '../../../assets/icons/Calendar.svg';
import ArrowRight from '../../../assets/icons/ArrowRight.svg';
import Weight from '../../../assets/icons/weight-scale.svg';
import Swap from '../../../assets/icons/Swap.svg';
import Input from '../../components/Form/Input';
import SecondaryLabel from '../../components/Label/SecondaryLabel';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../../constants/Screens';
import CustomToast from '../../components/common/Toast';
import {useRef} from 'react';
import {ActivityIndicator} from 'react-native';
import {useDispatch} from 'react-redux';
import {userSlice} from '../../store/userSlice';
import {COLORS} from '../../constants/Colors';
import GradientDropdown from '../../components/Utils/GradientDropdown';

function CreateProfile({user, setUser}) {
  const navigation = useNavigation();
  const [gender, setGender] = useState('');
  const [date, setDate] = useState('');
  const [actualdate, setActualdate] = useState();
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [weight_unit, setWeight_Unit] = useState('');
  const [height_unit, setHeight_Unit] = useState('');
  const [weight_target, setWeight_Target] = useState('');

  const [loading, setLoading] = useState(false);
  const childRef = useRef(null);
  const [toastColorState, setToastColorState] = useState('');
  const [toastTextColorState, setToastTextColorState] = useState('white');
  const [toastMessage, setToastMessage] = useState('');
  const dispatch = useDispatch();
  function reverseDate() {
    const date_splitted = date.split('/');
    const day = date_splitted[0];
    const month = date_splitted[1];
    const year = date_splitted[2];
    return year + '/' + month + '/' + day;
  }
  function onNext() {
    try {
      if (!gender) throw 'Select Your Gender';
      if (!date) throw 'Select your Date of Birth';
      if (!weight) throw 'Enter your weight';
      if (!height) throw 'Enter your height';

      setUser(prev => ({
        ...prev,
        gender,
        date_of_birth: actualdate,
        weight,
        weight_unit,
        height,
        height_unit,
        weight_target,
      }));

      navigation.navigate(SCREENS.GOAL);
    } catch (error) {
      setToastMessage(error);
      setToastTextColorState('white');
      setToastColorState('red');
      childRef.current.showToast();
    } finally {
      setLoading(false);
    }
  }
  return (
    <View style={styles.container}>
      <CustomToast
        toastColor={toastColorState}
        toastTextColor={toastTextColorState}
        toastMessage={toastMessage}
        ref={childRef}
      />
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <GirlSvg width={270} height={270} />
      </View>
      <ScreenContainer paddingTop={0}>
        <Heading
          heading={'Let’s complete your profile'}
          subheading={'It will help us to know more about you!'}
        />
        <View style={{marginBottom: 10}}>
          <DropdownPicker
            data={GENDERS}
            value={gender}
            setValue={setGender}
            placeholder="Choose Gender"
            icon={<UserSvg width={20} height={20} />}
            placeholderStyle={{color: 'black'}}
          />
        </View>
        <CalenderPicker
          setDate={setDate}
          setActualdate={setActualdate}
          label={
            <PickerLabel
              title={date ? date : 'Date of Birth'}
              icon={<Calendar width={20} height={20} />}
            />
          }
        />
        <View
          style={[
            styles.weight,
            {
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
            },
          ]}>
          <Input
            placeholder={'Your Weight'}
            customStyle={{width: '70%'}}
            value={weight}
            onChangeText={text => setWeight(text)}
            icon={<Weight width={20} height={20} />}
            keyboardType="numeric"
          />
          <GradientDropdown
            marginBottom={0}
            data={WEIGHT_UNIT}
            value={weight_unit}
            setValue={setWeight_Unit}
            placeholder={'Unit'}
            placeholderStyle={{
              color: 'white',
            }}
            containerStyle={{
              width: 100,
            }}
            selectedTextStyle={{color: 'white'}}
            colors={[
              COLORS.SECONDARY_BUTTON_GRADIENT.PURPLE2,
              COLORS.SECONDARY_BUTTON_GRADIENT.PURPLE1,
            ]}
          />
        </View>
        <View
          style={[
            styles.weight,
            {
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
            },
          ]}>
          <Input
            placeholder={'Target Weight'}
            customStyle={{width: '70%'}}
            value={weight_target}
            onChangeText={text => setWeight_Target(text)}
            icon={<Weight width={20} height={20} />}
            keyboardType="numeric"
          />
          <GradientDropdown
            marginBottom={5}
            data={WEIGHT_UNIT}
            value={weight_unit}
            setValue={setWeight_Unit}
            placeholder={'Unit'}
            placeholderStyle={{
              color: 'white',
            }}
            containerStyle={{
              width: 100,
            }}
            selectedTextStyle={{color: 'white'}}
            colors={[
              COLORS.SECONDARY_BUTTON_GRADIENT.PURPLE2,
              COLORS.SECONDARY_BUTTON_GRADIENT.PURPLE1,
            ]}
          />
        </View>
        <View
          style={[
            styles.weight,
            {
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            },
          ]}>
          <Input
            placeholder={'Your Height'}
            customStyle={{width: '70%'}}
            value={height}
            onChangeText={text => setHeight(text)}
            icon={<Swap width={20} height={20} />}
            keyboardType="numeric"
          />
          <GradientDropdown
            marginBottom={5}
            data={HEIGHT_UNIT}
            value={height_unit}
            setValue={setHeight_Unit}
            placeholder={'Unit'}
            placeholderStyle={{
              color: 'white',
            }}
            containerStyle={{
              width: 100,
            }}
            selectedTextStyle={{color: 'white'}}
            colors={[
              COLORS.SECONDARY_BUTTON_GRADIENT.PURPLE2,
              COLORS.SECONDARY_BUTTON_GRADIENT.PURPLE1,
            ]}
          />
        </View>
        {loading ? (
          <ActivityIndicator size={30} color={'blue'} />
        ) : (
          <PrimaryButton
            onPress={() => onNext()}
            title={'Next'}
            containerStyle={{marginTop: 0}}>
            <View style={{marginLeft: 5, bottom: 1.5}}>
              <ArrowRight width={15} height={15} />
            </View>
          </PrimaryButton>
        )}
      </ScreenContainer>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  weight: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  weightLabelContainer: {
    width: 60,
    height: 60,
    borderRadius: 15,
    marginLeft: 10,
  },
});
export default CreateProfile;
