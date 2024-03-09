import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import SlideHeader from '../../components/header/SlideHeader';
import TextH4 from '../../components/Text/TextH4';
import Input from '../../components/Form/Input';
import NewButtob from '../../components/Button/NewButtob';
import { SCREENS } from '../../constants/Screens';
import { useState } from 'react';
import { useRoute } from '@react-navigation/native';

const MedicalHistory = ({ navigation }) => {
  const route = useRoute();
  const data = route.params?.data;
  const [MedicalHistory, setMedicalHistory] = useState("")
  console.log("OCCCU", data);

  return (
    <View>
      <SlideHeader />
      <View style={{ alignItems: 'center', marginVertical: 10 }}>
        <TextH4 style={{ marginTop: '30%' }}>Any medical history</TextH4>
        <Input
          placeholder={'Medical history'}
          onChangeText={(val) => { setMedicalHistory(val) }}
          customStyle={{
            width: '80%',
            marginVertical: 20,
            backgroundColor: 'white',
            elevation: 5,
          }}
        />
        <NewButtob
          onPress={() => navigation.navigate(SCREENS.OFFICETIMING, { data: { ...data, medical_history: MedicalHistory }, })}
          title={'Continue'}
        />
      </View>
    </View>
  );
};

export default MedicalHistory;

const styles = StyleSheet.create({});
