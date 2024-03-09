import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SolidContainer from '../../components/container/SolidContainer';
import TextH4 from '../../components/Text/TextH4';

import Back from '../../../assets/icons/Back.svg';
import TwoDot from '../../../assets/icons/twodot.svg';
import Bed from '../../../assets/images/bed.svg';
import Alarm from '../../../assets/images/alarm.svg';

const {width, height} = Dimensions.get('window');
import SleepScheduleCard from '../../components/Sleep/SleepBottomContainer';
import TextMedium from '../../components/Text/TextMedium';
import PrimaryButton from '../../components/Button/PrimaryButton';
import SleepMeasureCard from '../../components/card/SleepMeasureCard';
import AnimatedLineChart from '../../components/Utils/LineChart';
import {SCREENS} from '../../constants/Screens';
import {useNavigation} from '@react-navigation/native';
import {getSleepLog} from '../../services';
import {useSelector, useDispatch} from 'react-redux';
import LottieView from 'lottie-react-native';
const SleepTracker = () => {
  const navigation = useNavigation();
  const [sleep, setSleep] = useState('');
  const [loading, setLoading] = useState(false);
  const [yesterdaysleep, setYesterdaysleep] = useState('');
  const [timings, setTimings] = useState(null);
  const user = useSelector(state => state.user.user);
  console.log(user);
  const dispatch = useDispatch();

  function calculateTimeDifference(timeString) {
    // Parse the time string to extract the hour and minute

    const [hourString, tminuteString] = timeString?.split(':');
    const period = tminuteString?.substring(2, 4);
    const minuteString = tminuteString?.substring(0, 2);
    console.log(hourString, minuteString, period);

    const hour = parseInt(hourString, 10);
    const minute = parseInt(minuteString, 10);

    // Convert the hour to   24-hour format if it's PM
    const isPM = period?.toUpperCase() === 'PM';
    const hour24 =
      isPM && hour !== 12 ? hour + 12 : hour === 12 && !isPM ? 0 : hour;
    console.log(hour24);
    // Get the current date and time
    const now = new Date();

    // Create a new Date object for the target time
    const targetTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hour24,
      minute,
    );

    // If the target time is in the past, add   24 hours to get the next occurrence
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

    return 'in ' + formattedDifference.trim();
  }

  const getYesterdaySleepDetails = async () => {
    try {
      setLoading(true);
      const tempnow = new Date();
      tempnow.setDate(now.getDate() - 1); // Subtract one day from the current date

      const yesterdayDate = tempnow.toISOString().split('T')[0];

      const yesterdaydetails = await getSleepLog(user.id, yesterdayDate);

      if (yesterdaydetails.data) {
        const totalMinutes = yesterdaydetails.data.totalSleep;
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        const tempsleep =
          hours && minutes ? `${hours}h ${minutes}m` : `${hours}h`;
        setYesterdaysleep(tempsleep);
      }

      dispatch(userSlice.actions.userLogin({sleeptime: tempsleep}));
      setLoading(false);
    } catch (error) {
      setYesterdaysleep('-');
      setLoading(false);
      console.log(error.response.data);
    }
  };
  const getSleepDetails = async () => {
    try {
      setLoading(true);
      const now = new Date(); // This gets the current date and time
      const formattedDate = now.toISOString().split('T')[0];

      const sleepdetails = await getSleepLog(user.id, formattedDate);
      if (sleepdetails.data) {
        console.log(sleepdetails.data);
        const totalMinutes = sleepdetails.data.totalSleep;
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        const tempsleep =
          hours && minutes ? `${hours}h ${minutes}m` : `${hours}h`;
        setSleep(tempsleep);
        setTimings({
          bedtime: sleepdetails.data.sleepIntakes[0].bedtime,
          wakeUpTime: sleepdetails.data.sleepIntakes[0].wakeUpTime,
        });
      }
      setLoading(false);
    } catch (error) {
      setSleep('');
      setTimings(null);
      setLoading(false);
      console.log(error.response.data);
    }
  };
  useEffect(() => {
    getSleepDetails();
    getYesterdaySleepDetails();
  }, []);
  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '5%',
        }}>
        <SolidContainer containerStyle={styles.solidContainerStyle}>
          <Back width={16} height={16} />
        </SolidContainer>
        <View style={{marginLeft: 15}}>
          <TextH4>Sleep Tracker</TextH4>
        </View>
        <SolidContainer containerStyle={styles.solidContainerStyle}>
          <TwoDot width={16} height={16} />
        </SolidContainer>
      </View>
      <View
        style={{
          overflow: 'hidden',
          marginHorizontal: 15,
          marginVertical: 15,
          marginBottom: '10%',
          marginTop: '10%',
        }}>
        <AnimatedLineChart />
      </View>
      <SleepMeasureCard title={'Last Night Sleep'} SleepTime={yesterdaysleep} />
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginVertical: '8%',
        }}>
        <SolidContainer
          containerStyle={[styles.solidcontainer, {marginHorizontal: 10}]}>
          <TextMedium style={{flexGrow: 1}}>Daily Sleep Schedule</TextMedium>
          <PrimaryButton
            containerStyle={styles.targetButton}
            textStyle={styles.targetButtonText}
            title={'Check'}
            onPress={() =>
              navigation.navigate(SCREENS.SLEEPSCHEDULER, {timings, sleep})
            }
          />
        </SolidContainer>
      </View>
      {loading ? (
        <View style={{height: 200, justifyContent: 'center'}}>
          <ActivityIndicator size={'large'} />
        </View>
      ) : timings ? (
        <View style={{marginHorizontal: 15}}>
          <TextH4 style={{marginHorizontal: 15}}>Today Schedule</TextH4>
          <SleepScheduleCard
            icon={<Bed width={30} height={30} />}
            title={'Bed Time'}
            timeat={calculateTimeDifference(timings.bedtime)}
            time={timings.bedtime}
            bgcolor={'rgba(255,141,308,0.3)'}
          />
          <SleepScheduleCard
            icon={<Alarm width={30} height={30} />}
            title={'Wakeup Time'}
            timeat={calculateTimeDifference(timings.wakeUpTime)}
            time={timings.wakeUpTime}
            bgcolor={'rgba(255,141,168,0.3)'}
          />
        </View>
      ) : (
        <View style={{height: 100, justifyContent: 'center'}}>
          <LottieView
            source={require('../../../assets/lottieanimations/Nodatefound.json')}
            style={{width: '100%', height: '100%'}}
            autoPlay
            loop
          />
        </View>
      )}
    </ScrollView>
  );
};

export default SleepTracker;

const styles = StyleSheet.create({
  solidContainerStyle: {
    borderRadius: 10,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  solidcontainer: {
    flexDirection: 'row',
    borderRadius: 15,
    height: 70,
    padding: 15,
    paddingHorizontal: 20,
    marginTop: 10,
    backgroundColor: 'rgba(157,206,255,0.2)',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: width / 1.111,
  },
  targetButton: {
    width: width / 3.6,
    height: 40,
    elevation: 0,
  },
  targetButtonText: {
    fontSize: 14,
  },
});
