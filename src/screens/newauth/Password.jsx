import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SlideHeader from '../../components/header/SlideHeader';
import Step from '../../components/new-auth/Step';
import NewButtob from '../../components/Button/NewButtob';
import {TextInput} from 'react-native';
import {Dimensions} from 'react-native';
import {SCREENS} from '../../constants/Screens';
import {useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {useRef} from 'react';
import CustomToast from '../../components/common/Toast';

const {width} = Dimensions.get('window');

const Password = ({navigation}) => {
  const route = useRoute();
  const data = route.params?.data;
  const [password, setPassword] = useState('');
  const childRef = useRef(null);
  const [toastColorState, setToastColorState] = useState('');
  const [toastTextColorState, setToastTextColorState] = useState('white');
  const [toastMessage, setToastMessage] = useState('');

  const handlePress = () => {
    if (password.length < 1) {
      setToastMessage('Password is required');
      setToastTextColorState('white');
      setToastColorState('red');
      childRef.current.showToast();
      return;
    }

    if (password.length < 8) {
      setToastMessage('Password should have at least 10 characters');
      setToastTextColorState('white');
      setToastColorState('red');
      childRef.current.showToast();
      return;
    }

    navigation.navigate(SCREENS.NNAME, {data: {...data, password}});
  };
  return (
    <View style={styles.container}>
      <CustomToast
        toastColor={toastColorState}
        toastTextColor={toastTextColorState}
        toastMessage={toastMessage}
        ref={childRef}
      />
      <SlideHeader />
      <Step text="STEP 4/12" />
      <Text style={styles.heading}>Set your password</Text>

      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
          style={styles.input}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 42,
          gap: 5,
          marginTop: 25,
        }}>
        <View style={[styles.progress, styles.processActive]} />
        <View style={[styles.progress, styles.processActive]} />
        <View style={styles.progress} />
        <View style={styles.progress} />
      </View>

      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          paddingHorizontal: 40,
          marginTop: 18,
        }}>
        <Text style={styles.text}>• 8+ characters</Text>
        <Text style={styles.text}>• 1 symbols</Text>
        <Text style={styles.text}>• 1 uppercase</Text>
        <Text style={styles.text}>• 1 number</Text>
      </View>
      <View
        style={{
          marginTop: 150,
          position: 'absolute',
          bottom: 40,
          width,
          alignItems: 'center',
        }}>
        <NewButtob onPress={handlePress} title={'Continue'} />
      </View>
    </View>
  );
};

export default Password;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F4F6FA',
    flex: 1,
    alignItems: 'center',
  },

  inputContainer: {
    backgroundColor: '#fff',
    width: 283,
    marginTop: 30,
    elevation: 20,
    borderRadius: 16,
    paddingHorizontal: 20,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },

  input: {
    height: '100%',

    color: '#2D3142',
    fontFamily: 'Rubik-Regular',
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 0.4,
    width: '100%',
  },

  heading: {
    color: '#2D3142',
    textAlign: 'center',
    fontFamily: 'Rubik-Regular',
    fontSize: 24,
    fontWeight: '500',
    lineHeight: 32,
    width: 281,
  },

  progress: {
    backgroundColor: '#E4DFFF',
    width: (width - 95) / 4,
    height: 7,
    borderRadius: 5,
  },

  processActive: {
    backgroundColor: '#AF8EFF',
  },

  text: {
    color: '#4C5980',
    fontFamily: 'Rubik-Regular',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 28,
    letterSpacing: 0.2,
    width: (width - 80) / 2,
  },
});
