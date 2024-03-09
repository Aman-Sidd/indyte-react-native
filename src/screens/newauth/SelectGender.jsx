import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import SlideHeader from '../../components/header/SlideHeader';
import TextH4 from '../../components/Text/TextH4';
import SmallText from '../../components/Text/SmallText';
import NewButtob from '../../components/Button/NewButtob';
import Male from '../../../assets/images/Male.svg';
import Female from '../../../assets/images/Female.svg';
import { Image } from 'react-native';
import { SCREENS } from '../../constants/Screens';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import CustomToast from '../../components/common/Toast';
import { useRef } from 'react';

const SelectGender = ({ navigation }) => {
  const route = useRoute();
  const values = route.params?.values;
  const childRef = useRef(null);
  const [toastColorState, setToastColorState] = useState('');
  const [toastTextColorState, setToastTextColorState] = useState('white');
  const [toastMessage, setToastMessage] = useState('');


  console.log(values);
  const [selectedGen, setselectedGen] = useState('');
  return (
    <View style={{ backgroundColor: '#F4F6FA', height: '100%' }}>
      <CustomToast
        toastColor={toastColorState}
        toastTextColor={toastTextColorState}
        toastMessage={toastMessage}
        ref={childRef}
      />
      <SlideHeader />
      <View style={styles.ProfileView}>
        <TextH4 style={{ marginTop: '20%' }}>Which one are you?</TextH4>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-around',
            marginTop: '20%',
          }}>
          <TouchableOpacity
            style={{ width: 150 }}
            onPress={() => {
              setselectedGen('Male');
            }}>
            <Image
              source={require('../../../assets/images/Male1.png')}
              style={{ width: 150 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ paddingTop: "4%", }}
            onPress={() => {
              setselectedGen('Female');
            }}>
            <Image source={require('../../../assets/images/Female1.png')} />
          </TouchableOpacity>
        </View>
        {selectedGen == '' ? (
          <SmallText
            style={{ width: '60%', textAlign: 'center', marginVertical: '10%' }}>
            To give you a customize experience we need to know your gender
          </SmallText>
        ) : (
          <TextH4
            style={{ width: '80%', textAlign: 'center', marginVertical: '10%' }}>
            Selected Gender is {selectedGen}
          </TextH4>
        )}
        <NewButtob
          title={'CHOOSE'}
          onPress={() => {
            if (selectedGen.length < 1) {
              setToastMessage('Gender is required');
              setToastTextColorState('white');
              setToastColorState('red');
              childRef.current.showToast();
              return
            }
            navigation.navigate(SCREENS.WEIGHT, {
              values: { ...values, gender: selectedGen },
            });
          }}
        />
      </View>
    </View>
  );
};

export default SelectGender;

const styles = StyleSheet.create({
  ProfileView: {
    alignItems: 'center',
  },
});
