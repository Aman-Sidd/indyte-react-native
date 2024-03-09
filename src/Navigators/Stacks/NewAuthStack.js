import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {SCREENS} from '../../constants/Screens';
import Welcome from '../../screens/newauth/Welcome';

const Stack = createNativeStackNavigator();

function NewAuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={SCREENS.NWELCOME} component={Welcome} />
    </Stack.Navigator>
  );
}
export default NewAuthStack;
