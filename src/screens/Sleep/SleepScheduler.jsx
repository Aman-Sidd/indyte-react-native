import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import {useSelector} from 'react-redux';
import {getSleepLog} from '../../services';
import {height} from 'deprecated-react-native-prop-types/DeprecatedImagePropType';
import {ActivityIndicator} from 'react-native-paper';
import LottieView from 'lottie-react-native';

const {width} = Dimensions.get('window');

const SleepScheduler = ({navigation, route}) => {
  // const {timings, sleep} = route.params;
  const todaydate = new Date().toISOString().split('T')[0];
  const user = useSelector(state => state.user.user);
  const [loading, setLoading] = useState(false);
  const [sleep, setSleep] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [yesterdaysleep, setYesterdaysleep] = useState('');
  const [timings, setTimings] = useState({bedtime: '', wakeUpTime: ''});
  const [sleepinghours, setSleepinghours] = useState(0);
  function calculateTimeDifference(timeString) {
    const [hourString, tminuteString] = timeString?.split(':');
    const period = tminuteString?.substring(2, 4);
    const minuteString = tminuteString?.substring(0, 2);
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
    const tempdate = new Date().toISOString().split('T')[0];

    return tempdate == date ? 'in ' + formattedDifference.trim() : '';
  }

  const getSleepDetails = async (customDate = new Date()) => {
    try {
      setLoading(true);
      const now = new Date(customDate); // This gets the current date and time
      const formattedDate = now.toISOString().split('T')[0];

      const sleepdetails = await getSleepLog(user.id, formattedDate);

      if (sleepdetails.data) {
        const totalMinutes = sleepdetails.data.totalSleep;
        setSleepinghours(totalMinutes);
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        const tempsleep =
          hours && minutes ? `${hours}h ${minutes}m` : `${hours}h`;

        setSleep(tempsleep);
        setTimings({
          bedtime: sleepdetails.data.sleepIntakes[0].bedtime,
          wakeUpTime: sleepdetails.data.sleepIntakes[0].wakeUpTime,
        });
        setLoading(false);
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
  }, []);

  return (
    <>
      <ScreenContainer scroll>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <SolidContainer containerStyle={styles.solidContainerStyle}>
            <Back width={16} height={16} />
          </SolidContainer>
          <View style={{marginLeft: 15}}>
            <TextH4>Sleep Schedule</TextH4>
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
              Ideal Hours for Sleep
            </SmallText>
            <GradientText
              style={{height: 40}}
              x={0}
              y={15}
              fontSize={'15'}
              text="8 hours"
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
          FetchMeal={date => {
            setDate(date);
            getSleepDetails(date);
          }}
        />
        {loading ? (
          <View style={{height: 200, justifyContent: 'center'}}>
            <ActivityIndicator size={'large'} />
          </View>
        ) : timings ? (
          <View>
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
          <View style={{height: 250, justifyContent: 'center'}}>
            <LottieView
              source={require('../../../assets/lottieanimations/Nodatefound.json')}
              style={{width: '100%', height: '100%'}}
              autoPlay
              loop
            />
          </View>
        )}

        {sleep && (
          <GradientContainer
            colors={['rgba(197, 139, 242, 0.2)', 'rgba(238, 164, 206, 0.2)']}
            styles={{
              padding: 20,
              borderRadius: 25,
              justifyContent: 'space-between',
              marginVertical: 30,
              paddingVertical: 25,
              height: 130,
            }}>
            <SmallText
              style={{color: 'black', fontSize: 14, fontWeight: '500'}}>
              {todaydate == date
                ? `you will get ${sleep} sleep  for tonight`
                : `you have got ${sleep} sleept on ${date}`}
            </SmallText>
            <LongProgressBar
              colors={['rgba(197, 139, 242, 1)', 'rgba(238, 164, 206, 1)']}
              percentage={
                (sleepinghours / 480) * 100 > 100
                  ? 100
                  : (sleepinghours / 480) * 100
              }
            />
          </GradientContainer>
        )}
      </ScreenContainer>
      <FloatingGradingButton
        colors={['rgba(197, 139, 242, 1)', 'rgba(238, 164, 206, 1)']}
        onPress={() => navigation.navigate(SCREENS.REMINDERS)}>
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
});
export default SleepScheduler;
