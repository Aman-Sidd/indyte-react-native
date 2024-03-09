import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {SCREENS} from '../../constants/Screens';
import SleepFinalModal from '../../screens/Sleep/SleepFinalModal';
import MedicineScheduler from '../../screens/Medicine/MedicineScheduler';
import MedicineReminder from '../../screens/Medicine/MedicineReminders';
import MedicineFinalModal from '../../screens/Medicine/MedicineFinalModal';

const Stack = createNativeStackNavigator();

function MedicineStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={SCREENS.MEDICINESCHEDULER}>
      <Stack.Screen
        name={SCREENS.MEDICINESCHEDULER}
        component={MedicineScheduler}
      />
      <Stack.Screen
        name={SCREENS.MEDICINEREMINDER}
        component={MedicineReminder}
      />
      <Stack.Screen
        name={SCREENS.MEDICINEFINAL}
        component={MedicineFinalModal}
      />
    </Stack.Navigator>
  );
}
export default MedicineStack;
