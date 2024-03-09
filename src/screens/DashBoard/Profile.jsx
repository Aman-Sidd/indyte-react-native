import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Header from '../../components/header/Header';
import ProfileTop from '../../components/profile/ProfileTop';
import ProfileDesc from '../../components/profile/ProfileDesc';
import TextH4 from '../../components/Text/TextH4';
import ProfileOption from '../../components/profile/ProfileOption';
const {width, height} = Dimensions.get('window');
import UserIcon from '../../../assets/icons/UserIcon.svg';
import Workout from '../../../assets/icons/Workout.svg';
import Appointment from '../../../assets/icons/Appointment.svg';
import Achivement from '../../../assets/icons/Achivement.svg';
import Activity from '../../../assets/icons/Activity.svg';
import Right from '../../../assets/icons/Right.svg';
import Privacy from '../../../assets/icons/Privacy.svg';
import Setting from '../../../assets/icons/Setting.svg';
import Contact from '../../../assets/icons/Contact.svg';
import PopUp from '../../../assets/icons/PopUp.svg';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../../constants/Screens';
import GradientSwitch from '../../components/common/GradientSwitch';
import {GlobalContext} from '../../../App';
import {getAge, removeFromAsyncStorage} from '../../utils/common';
import PrimaryButton from '../../components/Button/PrimaryButton';
import {storageKeyName} from '../../constants/Data';
import {useDispatch, useSelector} from 'react-redux';
import Account from '../profile/Account';
import {userSlice} from '../../store/userSlice';
import {getProfileDetails} from '../../services';
const Avatar = require('../../../assets/images/Avatar.png');
const Profile = () => {
  const navigation = useNavigation();
  // const { user, setLoggedInUser } = useContext(GlobalContext)
  const [loading, setLoading] = useState(false);
  const tempuser = useSelector(state => state.user.user);

  const [user, setTempuser] = useState({
    ...tempuser,
    goal: 'Weight',
    height: '168',
    weight: '5.5',
    height_unit: 'cm',
    weight_unit: 'ft',
    dob: 12,
  });
  const dispatch = useDispatch();

  const getProfile = async () => {
    try {
      const profile = await getProfileDetails();

      if (profile.data) {
        dispatch(userSlice.actions.userLogin(userDetails.data.user));
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  async function onLogout() {
    setLoading(true);
    await removeFromAsyncStorage('access_token');
    dispatch(userSlice.actions.userLogout());
    setLoading(false);
  }

  useEffect(() => {
    getProfile();
  }, []);
  return (
    <View style={styles.Container}>
      <Header title="Profile" />
      <ScrollView>
        <ProfileTop
          name={`${tempuser?.name}`}
          Program={tempuser?.goal}
          image={{
            uri: tempuser?.profile,
          }}
        />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            margin: 20,
          }}>
          <ProfileDesc
            value={tempuser?.height}
            vauleOf={'Height'}
            unit={tempuser?.height_unit}
          />
          <ProfileDesc
            value={tempuser?.weight}
            vauleOf={'Weight'}
            unit={tempuser?.weight_unit}
          />
          <ProfileDesc
            value={getAge(tempuser?.date_of_birth)}
            vauleOf={'Age'}
            unit={'year'}
          />
        </View>
        <View style={{marginLeft: '9%', marginRight: 5, marginTop: '10%'}}>
          <TextH4 style={{marginVertical: 10}}>Account</TextH4>
          <ProfileOption
            onPress={() => navigation.navigate(SCREENS.ACCOUNT)}
            leftIcon={<UserIcon width={20} height={20} />}
            rightIcon={<Right width={20} height={20} />}
            Title={'Personal Data'}
          />
          {/* <ProfileOption
            onPress={() => navigation.navigate(SCREENS.ADDITIONALINFO)}
            leftIcon={<UserIcon width={20} height={20} />}
            rightIcon={<Right width={20} height={20} />}
            Title={'Additional Data'}
          /> */}
          <ProfileOption
            onPress={() => console.log('should be navigated to other screen')}
            leftIcon={<Achivement width={20} height={20} />}
            rightIcon={<Right width={20} height={20} />}
            Title={'Achievement'}
          />
          <ProfileOption
            onPress={() => navigation.navigate(SCREENS.ACTIVITYTRACKER)}
            leftIcon={<Activity width={20} height={20} />}
            rightIcon={<Right width={20} height={20} />}
            Title={'Activity History'}
          />
          <ProfileOption
            onPress={() => navigation.navigate(SCREENS.WORKOUTSTACK)}
            leftIcon={<Workout width={20} height={20} />}
            rightIcon={<Right width={20} height={20} />}
            Title={'Workout Progress'}
          />
          <ProfileOption
            onPress={() => navigation.navigate(SCREENS.APPOINTMENTHISTORY)}
            leftIcon={<Appointment width={20} height={20} />}
            rightIcon={<Right width={20} height={20} />}
            Title={'Appointment History'}
          />
        </View>
        <View style={{marginLeft: '9%', marginRight: 5, marginTop: '10%'}}>
          <TextH4 style={{marginVertical: 10}}>Notification</TextH4>
          <ProfileOption
            leftIcon={<PopUp width={20} height={20} />}
            rightIcon={<GradientSwitch />}
            Title={'Pop-up Notification'}
          />
        </View>
        <View style={{marginLeft: '9%', marginRight: 5, marginTop: '10%'}}>
          <TextH4 style={{marginVertical: 10}}>Other</TextH4>
          <ProfileOption
            leftIcon={<Contact width={20} height={20} />}
            rightIcon={<Right width={20} height={20} />}
            Title={'Contact Us'}
          />
          <ProfileOption
            leftIcon={<Privacy width={20} height={20} />}
            rightIcon={<Right width={20} height={20} />}
            Title={'Privacy Policy'}
          />
          <ProfileOption
            leftIcon={<Setting width={20} height={20} />}
            rightIcon={<Right width={20} height={20} />}
            Title={'Settings'}
          />
        </View>
        <View style={{marginHorizontal: 30, marginVertical: 40}}>
          {loading ? (
            <ActivityIndicator size={30} color={'blue'} />
          ) : (
            <PrimaryButton title={'Logout'} onPress={() => onLogout()} />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
