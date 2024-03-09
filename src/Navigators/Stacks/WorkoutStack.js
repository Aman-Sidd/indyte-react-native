import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WorkOutHome from '../../screens/workoutTracker/WorkOutHome';
import WorkOutInfo from '../../screens/workoutTracker/WordOutInfo';
import AddSchedule from '../../screens/workoutTracker/AddSchedule';
import WorkoutSchedule from '../../screens/workoutTracker/WorkoutSchedult';
import WorkoutDetails from '../../components/workout/WorkoutDetails';
import {SCREENS} from '../../constants/Screens';
import FinishWorkout from '../../screens/workoutTracker/FinishWorkout';

const Stack = createNativeStackNavigator();

function WorkoutStack() {
  return (
    <Stack.Navigator
      initialRouteName={SCREENS.WORKOUTHOME}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={SCREENS.WORKOUTHOME} component={WorkOutHome} />
      <Stack.Screen name={SCREENS.WORLOUTINFO} component={WorkOutInfo} />
      <Stack.Screen name={SCREENS.WODKOUTDETAILS} component={WorkoutDetails} />
      <Stack.Screen
        name={SCREENS.WODKOUTSCHEDULE}
        component={WorkoutSchedule}
      />
      <Stack.Screen name={SCREENS.ADDSHCEDULE} component={AddSchedule} />
      <Stack.Screen name={SCREENS.FINISHWORKOUT} component={FinishWorkout} />
    </Stack.Navigator>
  );
}
export default WorkoutStack;
