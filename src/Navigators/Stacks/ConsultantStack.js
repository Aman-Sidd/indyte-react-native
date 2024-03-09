import React from 'react'
import { SCREENS } from '../../constants/Screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppointmentHistory from '../../screens/consultant/AppointmentHistory';
import ConsultationResult from '../../screens/consultant/ConsultationResult';
import FindYourDoctor from '../../screens/consultant/FindYourDoctor';
import MakeAppointment from '../../screens/consultant/MakeAppointment';
import ConfirmingAppointment from '../../screens/consultant/ConfirmingAppointment';
import ConfirmAppointment from '../../screens/consultant/ConfirmAppointment';
import ConsultationComplete from '../../screens/consultant/ConsultationComplete';
import ConsultationChat from '../../screens/consultant/ConsultationChat';
import DietitianChat from '../../screens/consultant/DietitianChat';
import VoiceChat from '../../screens/consultant/VoiceChat';

const Stack = createNativeStackNavigator();

export default function ConsultantStack() {
  return (
    <Stack.Navigator
      initialRouteName={SCREENS.VOICECHAT}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={SCREENS.APPOINTMENTHISTORY} component={AppointmentHistory} />
      <Stack.Screen name={SCREENS.CONSULTATIONRESULT} component={ConsultationResult} />
      <Stack.Screen name={SCREENS.FINDYOURDOCTOR} component={FindYourDoctor} />
      <Stack.Screen name={SCREENS.MAKEAPPOINTMENT} component={MakeAppointment} />
      <Stack.Screen name={SCREENS.CONFIRMINGAPPOINTMENT} component={ConfirmingAppointment} />
      <Stack.Screen name={SCREENS.CONFIRMAPPOINTMENT} component={ConfirmAppointment} />
      <Stack.Screen name={SCREENS.CONSULTATIONCOMPLETE} component={ConsultationComplete} />
      <Stack.Screen name={SCREENS.CONSULTATIONCHAT} component={ConsultationChat} />
      <Stack.Screen name={SCREENS.DIETITIANCHAT} component={DietitianChat} />
      <Stack.Screen name={SCREENS.VOICECHAT} component={VoiceChat} />
    </Stack.Navigator>
  )
}