import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Register from '../../screens/auth/Register';
import CreateProfile from '../../screens/profile/CreateProfile';
import Goal from '../../screens/auth/Goal';
import Otp from '../../screens/auth/Otp';
import OTP from '../../screens/newauth/OTP';
import FinalAuth from '../../screens/auth/FinalAuth';
import {SCREENS} from '../../constants/Screens';
import RegisterOTP from '../../screens/auth/RegisterOTP';
import {useState} from 'react';
import Login from '../../screens/auth/Login';
import ForgotPass from '../../screens/auth/ForgotPass';
import FinalGoalMain from '../../screens/newauth/FinalGoalMain';
import FoodAllergy from '../../screens/newauth/FoodAllergy';
import FoodDiskike from '../../screens/newauth/FoodDiskike';
import FoodFrequency from '../../screens/newauth/FoodFrequency';
import GoalWeight from '../../screens/newauth/GoalWeight';
import Heights from '../../screens/newauth/Height';
import Location from '../../screens/newauth/Location';
import MedicalHistory from '../../screens/newauth/MedicalHistory';
import NewGoal from '../../screens/newauth/NewGoal';
import Occupation from '../../screens/newauth/Occupation';
import OfficeTiming from '../../screens/newauth/OfficeTiming';
import ProfileImage from '../../screens/newauth/ProfileImage';
import SelectGender from '../../screens/newauth/SelectGender';
import SkipMealPage from '../../screens/newauth/SkipMealPage';
import SupplementMain from '../../screens/newauth/Supplement';
import Weight from '../../screens/newauth/Weight';
import SIgnin from '../../screens/newauth/SIgnin';
import Welcome from '../../screens/newauth/Welcome';
import Email from '../../screens/newauth/Email';
import Password from '../../screens/newauth/Password';
import Name from '../../screens/newauth/Name';
import DOB from '../../screens/newauth/DOB';
// import {VerifyOtp} from '../../backend/utilFunctions';
import VerifyOTP from '../../screens/auth/VerifyOtp';

const Stack = createNativeStackNavigator();
//register -> name,mobile,password
// createProfile -> gender,dob,weight,height
function AuthStack() {
  const [user, setUser] = useState({
    // first_name: '',
    // last_name: '',
    name: '',
    otp: '',
    hash: '',
    phone: '',
    email: '',
    password: '',
    phonenumber: '',
    gender: '',
    dob: '',
    weight: '',
    height: '',
    goal: '',
  });
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={SCREENS.REGISTER}>
      <Stack.Screen name={SCREENS.LOGIN}>
        {() => <Login user={user} setUser={setUser} />}
      </Stack.Screen>
      <Stack.Screen name={SCREENS.REGISTEROTP}>
        {() => <RegisterOTP user={user} setUser={setUser} />}
      </Stack.Screen>
      <Stack.Screen name={SCREENS.CREATEPROFILE}>
        {() => <CreateProfile user={user} setUser={setUser} />}
      </Stack.Screen>
      <Stack.Screen name={SCREENS.REGISTER}>
        {() => <Register user={user} setUser={setUser} />}
      </Stack.Screen>
      <Stack.Screen name={SCREENS.GOAL}>
        {() => <Goal user={user} setUser={setUser} />}
      </Stack.Screen>
      <Stack.Screen name={SCREENS.FORGOPASS}>
        {() => <ForgotPass user={user} setUser={setUser} />}
      </Stack.Screen>
      <Stack.Screen name={SCREENS.OTP} component={Otp} />
      <Stack.Screen name={SCREENS.VERIFYOTP}>
        {() => <VerifyOTP user={user} />}
      </Stack.Screen>
      <Stack.Screen name={SCREENS.FINALAUTH} component={FinalAuth} />

      {/* //newAuth */}
      <Stack.Screen name={SCREENS.FINALGOALMAIN} component={FinalGoalMain} />
      <Stack.Screen name={SCREENS.FOODALLERGY} component={FoodAllergy} />
      <Stack.Screen name={SCREENS.FOODDISLIKE} component={FoodDiskike} />
      <Stack.Screen name={SCREENS.FOODFREQUENCY} component={FoodFrequency} />
      <Stack.Screen name={SCREENS.GOALWEIGHT} component={GoalWeight} />
      <Stack.Screen name={SCREENS.HEIGHT} component={Heights} />
      <Stack.Screen name={SCREENS.LOCATION} component={Location} />
      <Stack.Screen name={SCREENS.MEDICALHISTORY} component={MedicalHistory} />
      <Stack.Screen name={SCREENS.NEWGOAL} component={NewGoal} />
      <Stack.Screen name={SCREENS.OCCUPATION} component={Occupation} />
      <Stack.Screen name={SCREENS.OFFICETIMING} component={OfficeTiming} />
      <Stack.Screen name={SCREENS.PROFILEIMAGE} component={ProfileImage} />
      <Stack.Screen name={SCREENS.SELECTGENDER} component={SelectGender} />
      <Stack.Screen name={SCREENS.SKIPMEALPAGE} component={SkipMealPage} />
      <Stack.Screen name={SCREENS.SUPPLEMENT} component={SupplementMain} />
      <Stack.Screen name={SCREENS.WEIGHT} component={Weight} />
      <Stack.Screen name={SCREENS.NOTP} component={OTP} />
      <Stack.Screen name={SCREENS.NSIGNIN} component={SIgnin} />
      <Stack.Screen name={SCREENS.NWELCOME} component={Welcome} />
      <Stack.Screen name={SCREENS.NEMAIL} component={Email} />
      <Stack.Screen name={SCREENS.NPASSWORD} component={Password} />
      <Stack.Screen name={SCREENS.NNAME} component={Name} />
      <Stack.Screen name={SCREENS.NDOB} component={DOB} />
    </Stack.Navigator>
  );
}
export default AuthStack;
