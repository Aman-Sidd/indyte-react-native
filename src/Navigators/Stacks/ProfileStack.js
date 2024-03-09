import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Account from '../../screens/profile/Account';
import {SCREENS} from '../../constants/Screens';
import EditProfile from '../../screens/profile/EditProfile';
import Profile from '../../screens/DashBoard/Profile';
import AdditionalInfo from '../../screens/profile/AdditionalInfo';
import WorkoutStack from './WorkoutStack';
import ActivityTracker from '../../screens/DashBoard/ActivityTracker';
import AppointmentHistory from '../../screens/consultant/AppointmentHistory';
import ConsultationResult from '../../screens/consultant/ConsultationResult';
import FindYourDoctor from '../../screens/consultant/FindYourDoctor';
import MakeAppointment from '../../screens/consultant/MakeAppointment';
import ConfirmAppointment from '../../screens/consultant/ConfirmAppointment';

const Stack = createNativeStackNavigator();

function ProfileStack() {
  return (
    <Stack.Navigator
      initialRouteName={SCREENS.PROFILE}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={SCREENS.PROFILE} component={Profile} />
      <Stack.Screen name={SCREENS.ACCOUNT} component={Account} />
      <Stack.Screen name={SCREENS.EDITPROFILE} component={EditProfile} />
      <Stack.Screen name={SCREENS.ADDITIONALINFO} component={AdditionalInfo} />
      <Stack.Screen name={SCREENS.WORKOUTSTACK} component={WorkoutStack} />
      <Stack.Screen
        name={SCREENS.ACTIVITYTRACKER}
        component={ActivityTracker}
      />
      <Stack.Screen
        name={SCREENS.APPOINTMENTHISTORY}
        component={AppointmentHistory}
      />
      <Stack.Screen
        name={SCREENS.CONSULTATIONRESULT}
        component={ConsultationResult}
      />
      <Stack.Screen name={SCREENS.FINDYOURDOCTOR} component={FindYourDoctor} />
      <Stack.Screen
        name={SCREENS.MAKEAPPOINTMENT}
        component={MakeAppointment}
      />
      <Stack.Screen
        name={SCREENS.CONFIRMAPPOINTMENT}
        component={ConfirmAppointment}
      />
    </Stack.Navigator>
  );
}
export default ProfileStack;
