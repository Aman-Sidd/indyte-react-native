import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MealHome from '../../screens/Meal/MealHome';
import MealScheduler from '../../screens/Meal/MealScheduler';
import DietDetails from '../../screens/Meal/DietDetails';
import {SCREENS} from '../../constants/Screens';
import FinalMealScreen from '../../screens/Meal/FinalMealScreen';
import DashboardStack from './DashboardStack';
import FlnishMeal from '../../screens/Meal/FInishMeal';
import FinishMeal from '../../screens/Meal/FinishMeal';
// import FinishWO from '../../screens/Dashboard/FinishWO';

const Stack = createNativeStackNavigator();

function MealStack() {
  return (
    <Stack.Navigator
      initialRouteName={SCREENS.MEALHOME}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={SCREENS.MEALHOME} component={MealHome} />
      <Stack.Screen name={SCREENS.MEALSCHEDULER} component={MealScheduler} />
      <Stack.Screen name={SCREENS.DIETDETAILS} component={DietDetails} />
      <Stack.Screen name={SCREENS.FINISHWO} component={FinalMealScreen} />
      <Stack.Screen name={SCREENS.DASHBOARDSTACK} component={DashboardStack} />
      <Stack.Screen name={SCREENS.MEALFINAL} component={FlnishMeal} />
      <Stack.Screen name={SCREENS.FINISHMEAL} component={FinishMeal} />
    </Stack.Navigator>
  );
}
export default MealStack;
