import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProgressPhoto from '../../screens/progressTracker/ProgressPhoto';
import Comparison from '../../screens/progressTracker/Comparison';
import Result from '../../screens/progressTracker/Result';
import {SCREENS} from '../../constants/Screens';
import DashboardStack from './DashboardStack';
import WeightProgress from '../../screens/progressTracker/WeightProgress';

import TrackProgress from '../../screens/progressTracker/TrackProgress';
import AddProgress from '../../screens/progressTracker/AddProgress';

import WeightTracker from '../../screens/progressTracker/WeightTracker';
import WeightUpdate from '../../screens/progressTracker/WeightUpdate';

const Stack = createNativeStackNavigator();

function ProgressStack() {
  return (
    <Stack.Navigator
      initialRouteName={SCREENS.PROGRESSPHOTO}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={SCREENS.PROGRESSPHOTO} component={ProgressPhoto} />
      <Stack.Screen name={SCREENS.TRACKPROGRESS} component={TrackProgress} />
      <Stack.Screen name={SCREENS.ADDPROGRESS} component={AddProgress} />
      <Stack.Screen name={SCREENS.COMPARISION} component={Comparison} />
      <Stack.Screen name={SCREENS.RESULT} component={Result} />
      <Stack.Screen name={SCREENS.DASHBOARDSTACK} component={DashboardStack} />
      <Stack.Screen name={SCREENS.WEIGHTTRACKER} component={WeightProgress} />
      <Stack.Screen name={SCREENS.WEIGHTTRACKERNEW} component={WeightTracker} />
      <Stack.Screen name={SCREENS.WEIGHTUPDATE} component={WeightUpdate} />
    </Stack.Navigator>
  );
}
export default ProgressStack;
