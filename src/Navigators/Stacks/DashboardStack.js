import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ActivityTracker from '../../screens/DashBoard/ActivityTracker';
// import Profile from '../../screens/dashboard/Profile';
import Account from '../../screens/profile/Account';
// import FinishWO from '../../screens/DashBoard/FinishWO';
import WaterDrink from '../../screens/DashBoard/WaterDrink';
// import Subscription from '../../screens/DashBoard/Subscription';
// import Notification from '../../screens/DashBoard/Notification';
import {SCREENS} from '../../constants/Screens';
import SleepStack from './SleepSchedule';
import WorkoutStack from './WorkoutStack';
import MealStack from './MealStack';
import ProgressStack from './ProgressStask';
import MainCalorie from '../../screens/Calories/MainCalorie';
import MealScheduler from '../../screens/Meal/MealScheduler';
// import DietDetails from '../../screens/Meal/DietDetails';
import FlnishMeal from '../../screens/Meal/FInishMeal';
import MealHome from '../../screens/Meal/MealHome';
import StepTracker from '../../screens/DashBoard/StepTracker';
import Occupation from '../../screens/newauth/Occupation';
import MedicalHistory from '../../screens/newauth/MedicalHistory';
import OfficeTiming from '../../screens/newauth/OfficeTiming';
import SupplementMain from '../../screens/newauth/Supplement';
import FoodDiskike from '../../screens/newauth/FoodDiskike';
import Location from '../../screens/newauth/Location';
import Dashboard from '../../screens/DashBoard/Dashboard';
import MedicineStack from './MedicineStack';
import WeightTracker from '../../screens/progressTracker/WeightTracker';
import WeightUpdate from '../../screens/progressTracker/WeightUpdate';
import DietDetails from '../../screens/Meal/DietDetails';
import FinalMealScreen from '../../screens/Meal/FinalMealScreen';
import CaloriesTracker from '../../screens/DashBoard/CaloriesTracker';
import AppointmentHistory from '../../screens/consultant/AppointmentHistory';
import ConsultationResult from '../../screens/consultant/ConsultationResult';
import FindYourDoctor from '../../screens/consultant/FindYourDoctor';
import MakeAppointment from '../../screens/consultant/MakeAppointment';
import ConfirmAppointment from '../../screens/consultant/ConfirmAppointment';
import TargetUpdate from '../../screens/DashBoard/TargetUpdate';
import ChatScreen from '../../screens/chat/ChatScreen';

const Stack = createNativeStackNavigator();

function DashboardStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={SCREENS.DASHBOARD} component={Dashboard} />
      {/* <Stack.Screen name={SCREENS.NOTIFICATION} component={Notification} /> */}
      <Stack.Screen
        name={SCREENS.ACTIVITYTRACKER}
        component={ActivityTracker}
      />
      <Stack.Screen
        name={SCREENS.CALORIESTRACKER}
        component={CaloriesTracker}
      />
      {/* <Stack.Screen name={SCREENS.FINISHWO} component={FinishWO} /> */}
      <Stack.Screen name={SCREENS.WATERDRINK} component={WaterDrink} />
      {/* <Stack.Screen name={SCREENS.SUBSCRIPTION} component={Subscription} /> */}
      <Stack.Screen name={SCREENS.SLEEPSTACK} component={SleepStack} />
      <Stack.Screen name={SCREENS.WORKOUTSTACK} component={WorkoutStack} />
      <Stack.Screen name={SCREENS.MEALSTACK} component={MealStack} />
      <Stack.Screen name={SCREENS.PROGRESSTACK} component={ProgressStack} />
      <Stack.Screen name={SCREENS.MAINCALORIE} component={MainCalorie} />
      <Stack.Screen name={SCREENS.MEALSCHEDULER} component={MealScheduler} />
      <Stack.Screen name={SCREENS.DIETDETAILS} component={DietDetails} />
      <Stack.Screen name={SCREENS.FINISHWO} component={FinalMealScreen} />
      <Stack.Screen name={SCREENS.MEALFINAL} component={FlnishMeal} />
      <Stack.Screen name={SCREENS.MEALHOME} component={MealHome} />
      <Stack.Screen name={SCREENS.STEP_TRACKER} component={StepTracker} />
      <Stack.Screen name={SCREENS.OCCUPATION} component={Occupation} />
      <Stack.Screen name={SCREENS.MEDICALHISTORY} component={MedicalHistory} />
      <Stack.Screen name={SCREENS.OFFICETIMING} component={OfficeTiming} />
      <Stack.Screen name={SCREENS.SUPPLEMENT} component={SupplementMain} />
      <Stack.Screen name={SCREENS.FOODDISLIKE} component={FoodDiskike} />
      <Stack.Screen name={SCREENS.LOCATION} component={Location} />
      <Stack.Screen name={SCREENS.MEDICINESTACK} component={MedicineStack} />
      <Stack.Screen name={SCREENS.WEIGHTTRACKERNEW} component={WeightTracker} />
      <Stack.Screen name={SCREENS.WEIGHTUPDATE} component={WeightUpdate} />
      <Stack.Screen
        name={SCREENS.APPOINTMENTHISTORY}
        component={AppointmentHistory}
      />
      <Stack.Screen
        name={SCREENS.CONSULTATIONRESULT}
        component={ConsultationResult}
      />
      <Stack.Screen name={SCREENS.FINDYOURDOCTOR} component={FindYourDoctor} />
      <Stack.Screen name={SCREENS.CHATSCREEN} component={ChatScreen} />
      <Stack.Screen
        name={SCREENS.MAKEAPPOINTMENT}
        component={MakeAppointment}
      />
      <Stack.Screen
        name={SCREENS.CONFIRMAPPOINTMENT}
        component={ConfirmAppointment}
      />
      <Stack.Screen name={SCREENS.UPDATETARGET} component={TargetUpdate} />
    </Stack.Navigator>
  );
}
export default DashboardStack;
