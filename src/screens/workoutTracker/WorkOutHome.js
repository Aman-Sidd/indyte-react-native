import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import {COLORS} from '../../constants/Colors';
import GradientLabel from '../../components/Label/GradientLabel';
import {Image} from 'react-native';
import SmallText from '../../components/Text/SmallText';
import {FONTS} from '../../constants/Fonts';
import LargeText from '../../components/Text/LargeText';
const {width, height} = Dimensions.get('window');

import WorkoutPic from '../../../assets/images/WorkoutPic.svg';
import WorkoutPic1 from '../../../assets/images/WorkoutPic1.svg';
import GirlLifting from '../../../assets/images/GirlLifting.svg';
import BoyLifting from '../../../assets/images/BoyLifting.svg';
import BoyJumping from '../../../assets/images/BoyJumping.svg';

import Tag from '../../components/Text/Tag';
import FireSvg from '../../../assets/icons/Calories-Icon.svg';
import CarboSvg from '../../../assets/icons/Carbo-Icon.svg';
import ProteinSvg from '../../../assets/icons/Proteins-Icon.svg';
import FatSvg from '../../../assets/icons/trans-fat.svg';
import SolidContainer from '../../components/container/SolidContainer';
import IngridientCard from '../../components/card/IngridientCard';
import BakingSodaSvg from '../../../assets/icons/BakingSoda-Icon.svg';
import EggsSvg from '../../../assets/icons/Eggs-Icon.svg';
import FlourSvg from '../../../assets/icons/Flour-Icon.svg';
import SugarSvg from '../../../assets/icons/Sugar-Icon.svg';
import ActivePassiveList from '../../components/list/ActivePassiveList';
import PrimaryButton from '../../components/Button/PrimaryButton';
import TextMedium from '../../components/Text/TextMedium';
import DIfferentBWContainer from '../../components/workout/DIfferentBWContainer';
import WorkOutForms from '../../components/workout/WorkOutForms';
import {SCREENS} from '../../constants/Screens';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import AnimatedLineChart from '../../components/Utils/LineChart';
import TextH4 from '../../components/Text/TextH4';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {useRef} from 'react';
import useLayout from '../../hooks/useLayout';
import {useSelector} from 'react-redux';
import {
  getDailyWorkoutProgress,
  getMonthlyWorkoutProgress,
  getUserWorkouts,
  getWeeklyWorkoutProgress,
} from '../../services';
import Back from '../../../assets/icons/Back.svg';
import TwoDot from '../../../assets/icons/twodot.svg';
import CustomDatePicker from '../../components/common/CustomDatePicker';
import {style} from 'deprecated-react-native-prop-types/DeprecatedViewPropTypes';
import GradientDropdown from '../../components/Utils/GradientDropdown';
import {WORKOUTS} from '../../constants/Data';
import LottieView from 'lottie-react-native';

function WorkOutHome(props) {
  const [workoutdata, setWorkoutdata] = useState();
  const user = useSelector(state => state.user.user);
  const [date, setDate] = useState('');
  const [filter, setFilter] = useState('DAILY');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const sheetRef = useRef(null);
  const [refreshing, setRefreshing] = useState(false);
  const [viewHeight, getViewHeight] = useLayout();
  const [workoutstats, setWorkoutstats] = useState();

  const getWorkouts = async (customDate = new Date()) => {
    try {
      setLoading(true);
      const date = new Date(customDate);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are  0-indexed in JavaScript
      const day = date.getDate().toString().padStart(2, '0');
      const formateddate = `${year}-${month}-${day}`;
      console.log('todayDate', formateddate);

      const workouts = await getUserWorkouts(user.id, formateddate);
      if (workouts.data) {
        setWorkoutdata(workouts.data.data);
        console.log('workouts>>', workouts.data);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      console.log(error.response.data.message);
    }
  };

  const snapPoints = useMemo(() => ['60%', '60%', '100%'], []);

  const handleSheetChange = useCallback(index => {}, []);
  const handleSnapPress = useCallback(index => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);
  useFocusEffect(
    useCallback(() => {
      getWorkouts();
    }, []),
  );

  const getWorkoutsStats = async () => {
    try {
      let tempdata;
      if (filter == 'DAILY') {
        const todaydate = new Date().toISOString().split('T')[0];
        tempdata = await getDailyWorkoutProgress(user.id, todaydate);
      } else if (filter == 'WEEKLY') {
        tempdata = await getWeeklyWorkoutProgress(user.id);
      } else {
        tempdata = await getMonthlyWorkoutProgress(user.id);
      }
      if (tempdata.data) {
        // console.log('stats>>', tempdata.data.data);
        setWorkoutstats(tempdata.data.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getWorkoutsStats();
  }, [filter]);
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <GradientLabel
        colors={[
          COLORS.PRIMARY_BUTTON_GRADIENT.BLUE1,
          COLORS.PRIMARY_BUTTON_GRADIENT.BLUE2,
        ]}
        conatinerStyle={styles.container}>
        {/* <Image source={require('../../../assets/images/cake.png')} style={styles.image} /> */}

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '5%',
            width: width,
            paddingHorizontal: 20,
          }}>
          <SolidContainer containerStyle={styles.solidContainerStyle}>
            <Back width={16} height={16} />
          </SolidContainer>
          <View style={{marginLeft: 15}}>
            <TextH4 style={{color: 'white'}}>Workout Tracker</TextH4>
          </View>
          <View></View>
          {/* <SolidContainer containerStyle={styles.solidContainerStyle}>
            <TwoDot width={16} height={16} />
          </SolidContainer> */}
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            width: width * 0.9,
          }}>
          <GradientDropdown
            data={WORKOUTS}
            value={filter}
            setValue={setFilter}
            placeholder="Select Item"
            containerStyle={{width: 150, height: 40, borderRadius: 30}}
          />
        </View>
        <View style={styles.statsMainCard}>
          <View style={styles.statsCard}>
            <View
              style={{
                borderRightWidth: 0.5,
                width: '33.3%',
                borderRightColor: '#979797',
                paddingHorizontal: 10,
              }}>
              <Text
                style={{fontSize: 15, color: '#333333', textAlign: 'center'}}>
                Target
              </Text>
              <Text
                style={{color: '#726EF0', fontSize: 15, textAlign: 'center'}}>
                {workoutstats?.targetCalories || 0} Cal
              </Text>
            </View>
            <View
              style={{
                borderRightWidth: 0.5,
                width: '33.3%',
                paddingHorizontal: 10,
                borderRightColor: '#979797',
              }}>
              <Text
                style={{fontSize: 15, color: '#333333', textAlign: 'center'}}>
                Burn
              </Text>
              <Text
                style={{color: '#726EF0', fontSize: 15, textAlign: 'center'}}>
                {workoutstats?.burntCalories || 0} Cal
              </Text>
            </View>
            <View style={{width: '33.3%', paddingHorizontal: 10}}>
              <Text
                style={{fontSize: 15, color: '#333333', textAlign: 'center'}}>
                Left
              </Text>
              <Text
                style={{color: '#726EF0', fontSize: 15, textAlign: 'center'}}>
                {workoutstats?.totalCalories - workoutstats?.burntCalories || 0}{' '}
                Cal
              </Text>
            </View>
          </View>
          <View style={styles.statsCard}>
            <View
              style={{
                borderRightWidth: 0.5,
                paddingHorizontal: 10,
                borderRightColor: '#979797',
                width: '33.3%',
              }}>
              <Text
                style={{fontSize: 15, color: '#333333', textAlign: 'center'}}>
                Total
              </Text>
              <Text
                style={{color: '#726EF0', fontSize: 15, textAlign: 'center'}}>
                {workoutstats?.finishedWorkouts +
                  workoutstats?.unfinishedWorkouts || 0}{' '}
                Workouts
              </Text>
            </View>
            <View
              style={{
                borderRightWidth: 0.5,
                paddingHorizontal: 10,
                borderRightColor: '#979797',

                width: '33.3%',
              }}>
              <Text
                style={{fontSize: 15, color: '#333333', textAlign: 'center'}}>
                Completed
              </Text>
              <Text
                style={{color: '#726EF0', fontSize: 15, textAlign: 'center'}}>
                {workoutstats?.finishedWorkouts || 0} Completed
              </Text>
            </View>
            <View style={{width: '33.3%', paddingHorizontal: 10}}>
              <Text
                style={{fontSize: 15, color: '#333333', textAlign: 'center'}}>
                Left
              </Text>
              <Text
                style={{color: '#726EF0', fontSize: 15, textAlign: 'center'}}>
                {workoutstats?.unfinishedWorkouts || 0} Workouts
              </Text>
            </View>
          </View>
        </View>

        <BottomSheet
          ref={sheetRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChange}>
          <BottomSheetScrollView
            contentContainerStyle={styles.contentContainer}>
            {/* <ScrollView
           
            onLayout={getViewHeight}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={getWorkouts} />
            }> */}
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginVertical: '1%',
              }}></View>
            <CustomDatePicker
              FetchMeal={async date => {
                await getWorkouts(date);
              }}
            />
            {workoutdata && workoutdata?.length > 0 ? (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginHorizontal: '5%',
                }}>
                <LargeText
                  style={{fontFamily: FONTS.FONT_POPPINS_BOLD, color: 'black'}}>
                  Upcoming Workout
                </LargeText>
                <TextMedium style={{}}>See more</TextMedium>
              </View>
            ) : (
              <View
                style={{
                  height,
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}>
                <LottieView
                  source={require('../../../assets/lottieanimations/Nodatefound.json')}
                  style={{width: '50%', height: '50%'}}
                  autoPlay
                  loop
                />
              </View>
            )}
            {loading ? (
              <View style={{height: 250, justifyContent: 'center'}}>
                <ActivityIndicator size={'large'} />
              </View>
            ) : (
              <View>
                {workoutdata && workoutdata && workoutdata?.length > 0 ? (
                  <>
                    {workoutdata?.map((item, ind) => (
                      <DIfferentBWContainer
                        moreInfo={{
                          ...item,
                          workout: {
                            ...item.workout,
                            exercises: [
                              {
                                name: 'Push-ups',
                                difficulty: 'Intermediate',
                                caloriesBurn: 100,
                                description:
                                  'A classic bodyweight exercise targeting the upper body muscles.',
                                steps: [
                                  'Start in a plank position with your hands shoulder-width apart.',
                                  'Lower your body until your chest nearly touches the floor.',
                                  'Push yourself back up to the starting position.',
                                  'Repeat for the desired number of repetitions.',
                                ],
                                equipments: ['None'],
                                reps: 15,
                              },
                            ],
                          },
                        }}
                        key={item.id}
                        title={item.workout.name}
                        time={'Today'}
                        icon={<WorkoutPic width={50} height={50} />}
                      />
                    ))}
                  </>
                ) : null}
                {/* <DIfferentBWContainer title={"Diabetes Workout"} time={"Today, 03pm"} icon={<WorkoutPic width={50} height={50} />} />
                                <DIfferentBWContainer title={"Upperbody Workout"} time={"Today, 03pm"} icon={<WorkoutPic1 width={50} height={50} />} /> */}
              </View>
            )}
            <View
              style={{
                marginHorizontal: '5%',
                marginTop: '5%',
                paddingBottom: 90,
              }}>
              {/* <LargeText
            style={{fontFamily: FONTS.FONT_POPPINS_BOLD, color: 'black'}}>
            What Do You Want to Train
          </LargeText>

          {apiTempData && apiTempData?.data && apiTempData?.data.length > 0 ? (
            <>
              {apiTempData?.data?.map((item, ind) => (
                <WorkOutForms
                  moreInfo={item}
                  key={item._id}
                  title={item.workout_id.workout_name}
                  NOfExercise={item.workout_id.exercises.length}
                  Time={'35mins'}
                  icon={<BoyJumping width={75} height={105} />}
                />
              ))}
            </>
          ) : null} */}
              {/* <WorkOutForms title={"Fullbody Workout"} NOfExercise={"10"} Time={"30mins"} icon={<BoyJumping width={75} height={105} />} />
                                <WorkOutForms title={"Lowebody Workout"} NOfExercise={"10"} Time={"30mins"} icon={<GirlLifting width={75} height={105} />} />
                                <WorkOutForms title={"AB Workout"} NOfExercise={"10"} Time={"30mins"} icon={<BoyLifting width={75} height={105} />} /> */}
            </View>
          </BottomSheetScrollView>
        </BottomSheet>
      </GradientLabel>
    </GestureHandlerRootView>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  detailContainer: {
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: 'white',
    width: width,
    marginTop: height * 0.01,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  image: {
    marginTop: 20,
  },
  solidcontainer: {
    marginTop: 20,
    paddingRight: 35,
    backgroundColor: 'white',
    flexDirection: 'row',
    marginBottom: 10,
  },
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
  statsMainCard: {
    flexDirection: 'column',
    gap: 5,
  },

  statsCard: {
    height: height * 0.1,
    backgroundColor: '#F8F8F8',
    width: width * 0.9,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
export default WorkOutHome;
