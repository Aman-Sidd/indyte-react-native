import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Modal,
  Pressable,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import GradientContainer from '../../components/container/GradientContainer';
import SolidContainer from '../../components/container/SolidContainer';
import TextH4 from '../../components/Text/TextH4';

import Back from '../../../assets/icons/Back.svg';
import TwoDot from '../../../assets/icons/twodot.svg';
import Add from '../../../assets/icons/plus.svg';
import SleepImage from '../../../assets/images/sleepimage.svg';
import Bed from '../../../assets/images/bed.svg';
import Alarm from '../../../assets/images/alarm.svg';

import ScreenContainer from '../../components/container/ScreenContainer';
import FloatingGradingButton from '../../components/Button/FloatingGradingButton';
import CustomDatePicker from '../../components/common/CustomDatePicker';
import SmallText from '../../components/Text/SmallText';
import ProgressBar from '../../components/progress/ProgressBar';
import LongProgressBar from '../../components/progress/LongProgressBar';
import PrimaryButton from '../../components/Button/PrimaryButton';
import GradientText from '../../components/Text/GradientText';
import SleepScheduleCard from '../../components/Sleep/SleepBottomContainer';
import {SCREENS} from '../../constants/Screens';
import {getMedicineRemainder, markMedicineFinished} from '../../services';
import {useSelector} from 'react-redux';
import {ActivityIndicator} from 'react-native-paper';
import LottieView from 'lottie-react-native';
import CustomToast from '../../components/common/Toast';
import MedicineRemainderCard from '../../components/medicine/MedicineRemainderCard';
import {useFocusEffect} from '@react-navigation/native';
const {width} = Dimensions.get('window');

const MedicineScheduler = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalloading, setModalloading] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [medicine, setMedicine] = useState([]);
  const user = useSelector(state => state.user.user);
  const [loading, setLoading] = useState(false);
  const [toastColorState, setToastColorState] = useState('');
  const [toastTextColorState, setToastTextColorState] = useState('white');
  const [toastMessage, setToastMessage] = useState('');
  const childRef = useRef(null);
  const [currentid, setCurrentid] = useState();
  const getTodayMedicine = async (customdate = new Date()) => {
    try {
      setLoading(true);
      const now = new Date(customdate);
      const todaydate = now.toISOString().split('T')[0];
      const todaymedicine = await getMedicineRemainder(user.id, todaydate);
      if (todaymedicine.data) {
        console.log(todaymedicine.data);
        setMedicine(todaymedicine.data.data);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.response);
    }
  };

  function calculateTimeDifference(timeString) {
    // Split the timeString into hour, minute, and period parts
    const [time, period] = timeString.split(' ');
    const [hourString, minuteString] = time.split(':');
    const hour = parseInt(hourString, 10);
    const minute = parseInt(minuteString, 10);
    const isPM = period?.toUpperCase() === 'PM';
    const hour24 =
      isPM && hour !== 12 ? hour + 12 : hour === 12 && !isPM ? 0 : hour;
    const now = new Date();

    // Create a new Date object for the target time
    const targetTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hour24,
      minute,
    );

    // If the target time is in the past, add 24 hours to get the next occurrence
    if (now > targetTime) {
      targetTime.setDate(targetTime.getDate() + 1);
    }

    // Calculate the difference in milliseconds
    const differenceInMilliseconds = targetTime.getTime() - now.getTime();

    // Convert the difference to hours and minutes
    const hours = Math.floor(differenceInMilliseconds / (1000 * 60 * 60));
    const minutes = Math.floor(
      (differenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60),
    );

    // Format the difference as a string
    let formattedDifference = '';
    if (hours > 0) {
      formattedDifference += `${hours} hour${hours > 1 ? 's' : ''} `;
    }
    if (minutes > 0) {
      formattedDifference += `${minutes} minute${minutes > 1 ? 's' : ''}`;
    }
    const tempdate = new Date().toISOString().split('T')[0];

    // Return the formatted difference if the date matches, otherwise return an empty string
    return 'in ' + formattedDifference.trim();
  }

  const markMedicine = async () => {
    try {
      if (currentid) {
        setModalloading(true);
        const reqBody = {
          userId: user.id,
          medicineId: currentid,
        };
        const markmedicine = await markMedicineFinished(reqBody);
        console.log(markmedicine);
        if (markmedicine.data) {
          console.log(markmedicine.data);
          setToastMessage(markmedicine.data.message);
          setToastTextColorState('white');
          setToastColorState('green');
          childRef.current.showToast();
          await getTodayMedicine(date);
        }
        setModalloading(false);
      }
    } catch (error) {
      setModalloading(false);
      console.log(error.response);
      setToastMessage(error.response.data.message);
      setToastTextColorState('white');
      setToastColorState('red');
      childRef.current.showToast();
    }
  };

  // useEffect(() => {
  //   getTodayMedicine();
  // }, []);

  useFocusEffect(
    React.useCallback(() => {
      getTodayMedicine();
      return () => {};
    }, []),
  );

  return (
    <>
      <ScreenContainer scroll>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => markMedicine()}>
                {modalloading ? (
                  <ActivityIndicator color="white" size={20} />
                ) : (
                  <Text style={styles.textStyle}>Completed</Text>
                )}
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <CustomToast
            toastColor={toastColorState}
            toastTextColor={toastTextColorState}
            toastMessage={toastMessage}
            ref={childRef}
          />
          <SolidContainer containerStyle={styles.solidContainerStyle}>
            <Back width={16} height={16} />
          </SolidContainer>
          <View style={{marginLeft: 15}}>
            <TextH4>Medicine Reminder</TextH4>
          </View>
          <SolidContainer containerStyle={styles.solidContainerStyle}>
            <TwoDot width={16} height={16} />
          </SolidContainer>
        </View>
        <GradientContainer
          colors={['rgba(157, 206, 255, 0.2)', 'rgba(157, 206, 255, 0.2)']}
          styles={{
            padding: 20,
            borderRadius: 25,
            height: 180,
            justifyContent: 'space-around',
            marginVertical: 30,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View>
            <SmallText style={{fontSize: 12, fontWeight: '400'}}>
              Next medicine in
            </SmallText>
            <GradientText
              style={{height: 40}}
              x={0}
              y={15}
              fontSize={'15'}
              text="8hours 30minutes"
              colors={['#92A3FD', '#9DCEFF']}
            />
            <PrimaryButton
              containerStyle={styles.learnmore}
              textStyle={styles.learnmoreText}
              title={'Learn More'}
            />
          </View>
          <SleepImage width={120} height={100} />
        </GradientContainer>
        <TextH4 style={{fontSize: 16, fontWeight: '600', padding: 10}}>
          Your Schedule
        </TextH4>
        <CustomDatePicker
          showMonth={false}
          FetchMeal={async date => {
            setDate(date);
            await getTodayMedicine(date);
          }}
        />
        {loading ? (
          <View style={{height: 250, justifyContent: 'center'}}>
            <ActivityIndicator size={'large'} />
          </View>
        ) : medicine.length == 0 ? (
          <View style={{height: 250, justifyContent: 'center'}}>
            <LottieView
              source={require('../../../assets/lottieanimations/Nodatefound.json')}
              style={{width: '100%', height: '100%'}}
              autoPlay
              loop
            />
          </View>
        ) : (
          <View style={{marginBottom: 15}}>
            {medicine.map(m => (
              <MedicineRemainderCard
                icon={<Alarm width={30} height={30} />}
                title={m.name}
                timeat={calculateTimeDifference(m?.time)}
                time={m?.quantity + ' at ' + m?.time}
                bgcolor={'rgba(255,141,168,0.3)'}
                status={true}
                finished={m?.finished}
                handleButton={() => {
                  setCurrentid(m?.id);
                  setModalVisible(true);
                }}
              />
            ))}
          </View>
        )}
      </ScreenContainer>
      <FloatingGradingButton
        colors={['rgba(197, 139, 242, 1)', 'rgba(238, 164, 206, 1)']}
        onPress={() => navigation.navigate(SCREENS.MEDICINEREMINDER)}>
        <Add width={25} height={25} />
      </FloatingGradingButton>
    </>
  );
};
const styles = StyleSheet.create({
  solidContainerStyle: {
    borderRadius: 10,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  learnmore: {
    width: width / 3,
    height: 40,
    elevation: 0,
  },
  learnmoreText: {
    fontSize: 12,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    gap: 20,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    borderRadius: 10,
    width: 150,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'black',
  },
});
export default MedicineScheduler;
