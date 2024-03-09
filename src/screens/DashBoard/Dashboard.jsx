import React, {
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
} from 'react';
import ScreenContainer from '../../components/container/ScreenContainer';

import {View, StyleSheet, Image, Text, Dimensions} from 'react-native';
import TextH4 from '../../components/Text/TextH4';
import SmallText from '../../components/Text/SmallText';
import SolidButton from '../../components/Button/SolidButton';
import Notification from '../../../assets/icons/Notification.svg';
import GradientLabel from '../../components/Label/GradientLabel';
import {COLORS} from '../../constants/Colors';
import TextMedium from '../../components/Text/TextMedium';
import SecondaryButton from '../../components/Button/SecondaryButton';
import {FONTS} from '../../constants/Fonts';
import SolidContainer from '../../components/container/SolidContainer';
import PrimaryButton from '../../components/Button/PrimaryButton';
import LargeText from '../../components/Text/LargeText';
import PairText from '../../components/Text/PairText';
import ProgressBar from '../../components/progress/ProgressBar';
import ListBullet from '../../components/list/ListBullet';
import DataContainer from '../../components/container/DataContainer';
import CircularRing from '../../components/progress/CircularRing';
import {MEALS, WORKOUTS} from '../../constants/Data';
import GradientDropdown from '../../components/Utils/GradientDropdown';
import MealContainer from '../../components/container/MealContainer';
import AnimatedLineChart from '../../components/Utils/LineChart';
import WorkoutContainer from '../../components/container/WorkoutContainer';
import CustomPieChart from '../../components/Utils/PieChart';
import LineGraphWithoutLabel from '../../components/Utils/LineGraphWithoutLabel';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../../constants/Screens';
import {TouchableOpacity} from 'react-native';
import HomeSwiper from '../../components/Utils/HomeSwiper';
import {GlobalContext} from '../../../App';
import HeartPulse from '../../../assets/icons/Heart-Pulse.svg';
import {
  getMedicineRemainder,
  getSleepLog,
  getUserMealsByDay,
  getWaterLog,
  getWeightLogs,
} from '../../services';
import Breakfastmeal from '../../../assets/images/BreakFast_meal.png';
import {useFocusEffect} from '@react-navigation/native';
import glass1 from '../../../assets/images/glass1.png';
import boots1 from '../../../assets/images/boots1.png';
import {
  dateFormat,
  getDataFromAsyncStorage,
  getTimeInAMPMFormat,
} from '../../utils/common';
// import {getUserRecommendedMeal} from '../../backend/utilFunctions';
import Score from '../../../assets/images/Score.svg';
import {useSelector, useDispatch} from 'react-redux';
import {userSlice} from '../../store/userSlice';
import {LineChart, yAxisSides} from 'react-native-gifted-charts';
import LottieView from 'lottie-react-native';
const BASE_TRACKER_CONTAINER_HEIGHT = 350;

const {width, height} = Dimensions.get('window');
function Dashboard(props) {
  const navigation = useNavigation();
  const [waterdrinked, setWaterdrinked] = useState(0);
  const user = useSelector(state => state.user?.user);
  const [ProfComplete, setProfComplete] = useState(false);
  const [graphdata, setGraphdata] = useState();
  const [meals, setMeals] = useState('BREAKFAST');
  const [workout, setWorkout] = useState(WORKOUTS[0]);
  const [recommendedMeals, setRecommendedMeals] = useState([]);
  const [filteredRecommendedMeals, setFilteredRecommendedMeals] = useState([]);
  const [sleep, setSleep] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const data = [{value: 50}, {value: 80}, {value: 90}, {value: 70}];
  const [medicine, setMedicine] = useState([]);
  const dispatch = useDispatch();

  const getWeigthLogs = async () => {
    try {
      const date = new Date();
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are  0-indexed in JavaScript
      const day = date.getDate().toString().padStart(2, '0');
      const formateddate = `${year}-${month}-${day}`;

      const weightlogs = await getWeightLogs(user?.id);
      if (weightlogs.data) {
        const temp = getDayOfWeek(weightlogs.data.data);
        setGraphdata(temp);
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const customDataPoint = () => {
    return (
      <View
        style={{
          width: 20,
          height: 20,
          backgroundColor: '#8C80F8',
          borderWidth: 4,
          borderRadius: 10,
          borderColor: 'white',
        }}
      />
    );
  };
  function getDayOfWeek(data) {
    const res = [];
    data.map((item, idx) => {
      const date = new Date(item.createdAt);

      // Convert the Date object to a more human-readable format
      const formattedDate = date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });

      // const dayOfWeek = date.getDay();

      // const dayOfWeekName = date.toLocaleString('en-US', {weekday: 'short'});
      const tempdatesplit = formattedDate.split(' ');
      const tempdata = {
        value: item.current_weight,
        label: tempdatesplit[0] + ' ' + tempdatesplit[1],
        date: formattedDate,
        labelTextStyle: {color: '#8C80F8', width: 60},
        customDataPoint: customDataPoint,
        hideDataPoint: idx == data.length - 1 ? false : true,
      };
      res.push(tempdata);
    });

    return res;
  }

  function filterMealsBasedOnType(type) {
    const filteredMeals = recommendedMeals.filter(
      meal => meal?.mealTime?.toLowerCase() == type.toLowerCase(),
    );

    return filteredMeals;
  }
  const getSleepDetails = async () => {
    try {
      const now = new Date(); // This gets the current date and time
      const formattedDate = now.toISOString().split('T')[0];

      const sleepdetails = await getSleepLog(user?.id, formattedDate);
      console.log('sleepdetails', sleepdetails.data.totalSleep);
      if (sleepdetails.data) {
        const totalMinutes = sleepdetails.data.totalSleep;
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        const tempsleep =
          hours && minutes ? `${hours}h ${minutes}m` : `${hours}h`;
        setSleep(tempsleep || '-');
        dispatch(userSlice.actions.userLogin({sleeptime: tempsleep}));
      }
    } catch (error) {
      setSleep('-');
      console.log(error.response.data);
    }
  };

  const getTodayAssignedMeals = async () => {
    try {
      const date = new Date();
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are  0-indexed in JavaScript
      const day = date.getDate().toString().padStart(2, '0');

      const formatedDate = `${year}-${month}-${day}`;
      const todayMeals = await getUserMealsByDay(user?.id, formatedDate);
      if (todayMeals.data) {
        setRecommendedMeals(todayMeals.data.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (meals === null) setFilteredRecommendedMeals(recommendedMeals);
    else if (meals === 'BREAKFAST')
      setFilteredRecommendedMeals(filterMealsBasedOnType('BREAKFAST'));
    else if (meals === 'LUNCH')
      setFilteredRecommendedMeals(filterMealsBasedOnType('LUNCH'));
    else if (meals === 'DINNER')
      setFilteredRecommendedMeals(filterMealsBasedOnType('DINNER'));
    else setFilteredRecommendedMeals(recommendedMeals);
  }, [meals, recommendedMeals]);
  const getWaterDetails = async () => {
    try {
      const now = new Date(); // This gets the current date and time
      const formattedDate = now.toISOString().split('T')[0];
      const userid = user?.id;

      const reswaterlogs = await getWaterLog(userid, formattedDate);

      if (reswaterlogs.data.waterIntakes) {
        const sum = reswaterlogs.data.waterIntakes.reduce(
          (accumulator, currentObject) => {
            return accumulator + currentObject.amount;
          },
          0,
        );
        setWaterdrinked(sum);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  function timeStringToDate(timeString, dateString) {
    const [time, period] = timeString.split(' ');
    const [hours, minutes] = time.split(':');
    const date = new Date(dateString);
    date.setHours(
      period?.toUpperCase() == 'PM' ? parseInt(hours) + 12 : parseInt(hours),
    );
    date.setMinutes(minutes);
    const options = {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true, // Use 24-hour format
    };

    return date;
  }
  const checkNextMedicine = medicineData => {
    const now = new Date();
    const upcomingMedicines = medicineData
      .filter(med => {
        const medTime = timeStringToDate(med.time, med.date);
        return medTime > now && med.finished == false;
      })
      .sort((a, b) => {
        const aTime = timeStringToDate(a.time, a.date);
        const bTime = timeStringToDate(b.time, b.date);
        return aTime - bTime;
      });

    // Step 3: Find the next medicine time

    const nextMedicine = upcomingMedicines[0];
    const nextMedicineTime = timeStringToDate(
      nextMedicine.time,
      nextMedicine.date,
    );

    // Check if the next medicine time is in the future
    const isNextMedicineInFuture = nextMedicineTime > now;

    const differenceInMilliseconds = nextMedicineTime - now;
    const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
    const differenceInMinutes = Math.floor(differenceInSeconds / 60);
    const differenceInHours = Math.floor(differenceInMinutes / 60);

    // Calculate remaining minutes after accounting for hours
    const remainingMinutes = differenceInMinutes % 60;

    // Format the difference in "4h 3m" format
    const formattedDifference = `${differenceInHours}h ${remainingMinutes}m`;

    // Step 4: Count the number of finished medicines
    const finishedMedicinesCount = medicineData.filter(
      med => med.finished === true,
    ).length;

    return {
      finished: finishedMedicinesCount,
      diff: formattedDifference,
      nextmed: isNextMedicineInFuture,
    };
  };
  const getTodayMedicine = async (customdate = new Date()) => {
    try {
      const now = new Date(customdate);
      const todaydate = now.toISOString().split('T')[0];
      const todaymedicine = await getMedicineRemainder(user.id, todaydate);
      if (todaymedicine.data) {
        const tempmedicine = {};
        tempmedicine.total = todaymedicine.data.data.length;
        const tempresult = checkNextMedicine(todaymedicine.data.data);
        tempmedicine.finished = tempresult.finished;
        tempmedicine.nextmed = tempresult.nextmed;
        tempmedicine.diff = tempresult.diff;
        console.log('medicine >>', tempresult);
        setMedicine(tempmedicine);
      }
    } catch (error) {
      console.log(error);
      console.log(error.response);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getSleepDetails();
      getWaterDetails();
      getTodayAssignedMeals();
      getWeigthLogs();
      getTodayMedicine();
    }, []),
  );

  return (
    <ScreenContainer scroll={true}>
      <View style={styles.profileInfo}>
        <View style={styles.userInfo}>
          <SmallText
            style={{color: '#7265E3', fontSize: 14, fontWeight: '700'}}>
            {currentDate}
          </SmallText>
          <TextH4>{user?.name}</TextH4>
        </View>
        <SolidButton
          onPress={() => navigation.navigate(SCREENS.NOTIFICATION)}
          containerStyle={styles.solidButtonContainer}>
          <Notification width={30} height={30} />
        </SolidButton>
      </View>

      {/* {ProfComplete ? null : (
        <View style={styles.scoreCard}>
          <Score />
          <View style={{width: 192}}>
            <Text style={styles.scoreHeading}>Incomplete profile</Text>
            <Text style={styles.scoreDesc}>
              Please complete your health details for better experiance
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate(SCREENS.FOODDISLIKE)}>
              <Text style={styles.scoreBtn}>Complete</Text>
            </TouchableOpacity>
          </View>
        </View>
      )} */}
      <HomeSwiper />
      <View style={{marginVertical: 30}}>
        <View style={[styles.targets]}>
          <Text
            style={{
              color: '#1D1617',
              margin: 10,
              marginBottom: 16,
              fontWeight: '600',
            }}>
            Todays Target
          </Text>
          <View style={[styles.targetItems]}>
            <View style={[styles.targetItem]}>
              <View style={[styles.targetItemMain]}>
                <Image source={glass1} />
              </View>
              <View>
                <Text style={styles.targetText1}>
                  {user?.water_target
                    ? user?.water_target / 1000 + ' L'
                    : '0 L'}
                </Text>
                <Text style={styles.targetText2}>Water Intake</Text>
              </View>
            </View>
            <View style={[styles.targetItems]}>
              <View style={[styles.targetItem]}>
                <View style={[styles.targetItemMain]}>
                  <Image
                    //   style={{height: 40}}
                    source={boots1}
                  />
                </View>
                <View>
                  <Text style={styles.targetText1}>
                    {user?.step_target
                      ? user?.step_target?.toLocaleString('en-IN', {
                          useGrouping: true,
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })
                      : '0'}
                  </Text>
                  <Text style={styles.targetText2}>Foot Steps</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate(SCREENS.WEIGHTTRACKERNEW)}>
        <GradientLabel
          colors={[
            COLORS.PRIMARY_BUTTON_GRADIENT.BLUE1,
            COLORS.PRIMARY_BUTTON_GRADIENT.BLUE2,
          ]}
          conatinerStyle={styles.gradientContainer}>
          <View style={styles.bmiContainer}>
            <View style={{flexGrow: 1}}>
              <TextMedium style={{color: 'white'}}>
                BMI (Body Mass Index)
              </TextMedium>
              <SmallText style={{color: 'white', marginBottom: 15}}>
                You have a normal weight
              </SmallText>
              <SecondaryButton
                title={'View More'}
                containerStyle={{width: 100, height: 40, elevation: 0}}
                textStyle={{fontSize: 12}}
              />
            </View>
            <View>
              <CustomPieChart />
            </View>
          </View>
        </GradientLabel>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(SCREENS.FINDYOURDOCTOR);
        }}>
        <View style={styles.Container}>
          <View style={{width: '55%', marginHorizontal: 18}}>
            <Text
              style={{
                fontSize: 14,
                color: 'black',
                fontFamily: FONTS.FONT_POPPINS_SEMIBOLD,
              }}>
              Consult Your health with out qualified Doctors
            </Text>
            <View style={{marginVertical: 10, marginTop: 15}}>
              <PrimaryButton
                title={'Find Doctor'}
                containerStyle={{height: 35, width: width / 3.5}}
                textStyle={{fontSize: 13}}
                onPress={() => navigation.navigate(SCREENS.FINDYOURDOCTOR)}
              />
            </View>
          </View>
          <HeartPulse />
        </View>
      </TouchableOpacity>
      <SolidContainer
        containerStyle={styles.solidcontainer}
        onPress={() => navigation.navigate(SCREENS.ACTIVITYTRACKER)}>
        <TextMedium style={{flexGrow: 1}}>Activities</TextMedium>
        <PrimaryButton
          containerStyle={styles.targetButton}
          textStyle={styles.targetButtonText}
          title={'Check'}
          onPress={() => navigation.navigate(SCREENS.ACTIVITYTRACKER)}
        />
      </SolidContainer>
      <LargeText
        style={{
          fontFamily: FONTS.FONT_POPPINS_SEMIBOLD,
          color: 'black',
          marginBottom: 15,
        }}>
        Activity Status
      </LargeText>
      {/* <SolidContainer containerStyle={styles.lineGraphContainer}>
        <LineGraphWithoutLabel />
        <PairText
          containerStyle={styles.stepContainer}
          heading={'STEPS'}
          subHeading="2000"
        />
      </SolidContainer> */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          rowGap: 30,
        }}>
        <View
          style={styles.stepContainer}
          onPress={() => navigation.navigate(SCREENS.ACTIVITYTRACKER)}>
          <View>
            <Text
              style={{
                color: 'black',
                fontSize: 15,
                fontWeight: '500',
                marginLeft: 30,
              }}>
              Step
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate(SCREENS.STEP_TRACKER)}>
            <View style={{alignItems: 'center', marginTop: 10}}>
              <CircularRing
                radius={55}
                fontSize={20}
                gap={13}
                label="1200 Steps"
              />
            </View>
          </TouchableOpacity>
          {/* <View style={{justifyContent: 'center', width: '100%'}}>
            <Text>1200</Text>
          </View> */}
        </View>
        <TouchableOpacity
          style={styles.medicineContainer}
          onPress={() => navigation.navigate(SCREENS.MEDICINESTACK)}>
          <View style={{gap: 2, width: '70%'}}>
            <View style={{gap: 4}}>
              <Text style={{color: 'black', fontSize: 18, textAlign: 'left'}}>
                Medicine
              </Text>
              {medicine.nextmed && (
                <Text
                  style={{color: '#92A3FD', fontSize: 18, fontWeight: '600'}}>
                  Next in {medicine.diff}
                </Text>
              )}
            </View>
            {/* <View>
            </View> */}
            <View style={{alignItems: 'center', marginRight: 20}}>
              {/* <PrimaryButton
                containerStyle={{height: 40}}
                title={'Upcomming'}></PrimaryButton> */}
              <CircularRing
                radius={40}
                fontSize={14}
                gap={13}
                label={`${medicine.finished || 0}/${medicine.total || 0} taken`}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.basicTracker}>
        <DataContainer containerStyle={styles.waterIntakeTracker}>
          <View style={{paddingTop: 20}}>
            <ProgressBar
              vertical={true}
              containerStyle={styles.waterInTakeBar}
              gradientContainerStyle={{
                ...styles.waterInTakeGradient,
                height: `${(waterdrinked / 2000) * 100}%`,
              }}
            />
          </View>
          <TouchableOpacity
            style={{alignSelf: 'flex-start', paddingTop: 15, marginLeft: 10}}
            onPress={() => navigation.navigate(SCREENS.WATERDRINK)}>
            <PairText
              heading={'Water Intake'}
              subHeading={
                user?.water_target ? user?.water_target / 1000 + ' L' : '0 L'
              }
            />
            <SmallText style={{marginTop: 10, marginBottom: 10}}>
              Real time updates
            </SmallText>
            <ListBullet title={'6am - 8am'} subTitle={'600ml'} />
            <ListBullet title={'9am - 11am'} subTitle={'500ml'} />
            <ListBullet title={'11am - 2pm'} subTitle={'300ml'} />
            <ListBullet title={'2pm - 4pm'} subTitle={'200ml'} />
            <ListBullet
              title={'4pm - now'}
              subTitle={'100ml'}
              showLine={false}
            />
          </TouchableOpacity>
        </DataContainer>
        <View
          style={{
            flexGrow: 1,
            height: BASE_TRACKER_CONTAINER_HEIGHT,
            marginRight: 10,
          }}>
          <DataContainer
            containerStyle={styles.sleepContainer}
            onPress={() => navigation.navigate(SCREENS.SLEEPSTACK)}>
            <PairText heading="Sleep" subHeading={sleep} />
            <Image source={require('../../../assets/images/Sleep-Graph.png')} />
          </DataContainer>
          <DataContainer
            containerStyle={{
              ...styles.sleepContainer,
              ...{marginBottom: 0, marginTop: 10, marginBottom: -20},
            }}
            onPress={() => navigation.navigate(SCREENS.CALORIESTRACKER)}>
            <PairText heading="Calories" subHeading="760 kCal" />
            <View
              style={{alignItems: 'center', marginTop: 10, marginRight: 20}}>
              <CircularRing
                radius={45}
                fontSize={11}
                gap={13}
                label="230kCal left"
              />
            </View>
          </DataContainer>
        </View>
      </View>
      <SolidContainer
        containerStyle={{
          ...styles.solidcontainer,
          backgroundColor: 'white',
          paddingHorizontal: 10,
          marginBottom: 0,
        }}>
        <LargeText
          style={{
            fontFamily: FONTS.FONT_POPPINS_SEMIBOLD,
            color: 'black',
            flexGrow: 1,
          }}>
          Today Meals
        </LargeText>
        <GradientDropdown
          data={MEALS}
          value={meals}
          setValue={setMeals}
          placeholder="Select Item"
          containerStyle={{width: 150, height: 40, borderRadius: 30}}
        />
      </SolidContainer>
      <View style={{paddingHorizontal: 10, marginBottom: '5%'}}>
        {filteredRecommendedMeals.length == 0 ? (
          <View style={{height: 150}}>
            <LottieView
              source={require('../../../assets/lottieanimations/Nodatefound.json')}
              style={{width: '100%', height: '100%'}}
              autoPlay
              loop
            />
          </View>
        ) : (
          filteredRecommendedMeals.map((meal, i) => {
            return (
              <MealContainer
                key={meal._id}
                img={Breakfastmeal}
                imgStyle={{width: 50, height: 50, borderRadius: 8}}
                title={meal?.meal?.name || ' '}
                time={getTimeInAMPMFormat(new Date(meal.date))}
                date={'Today'}
                onpress={() =>
                  navigation.navigate(SCREENS.MEALSCHEDULER, {
                    filteredRecommendedMeals,
                  })
                }
              />
            );
          })
        )}
      </View>
      <SolidContainer
        containerStyle={{
          ...styles.solidcontainer,
          backgroundColor: 'white',
          paddingHorizontal: 10,
          marginBottom: 0,
        }}>
        <LargeText
          style={{
            fontFamily: FONTS.FONT_POPPINS_SEMIBOLD,
            color: 'black',
            flexGrow: 1,
          }}>
          Weight Progress
        </LargeText>
        <GradientDropdown
          data={WORKOUTS}
          value={workout}
          setValue={setWorkout}
          placeholder="Select Item"
          containerStyle={{width: 150, height: 40, borderRadius: 30}}
        />
      </SolidContainer>
      <View
        style={{
          paddingVertical: 50,
          backgroundColor: '#9DCEFF55',
          width: width * 0.9,
          borderRadius: 20,
        }}>
        {/* <LineChart
              curved
              data={graphdata}
              scrollToEnd
              width={width * 0.9}
              height={height * 0.3}
              isAnimated
              xAxisLabelTextStyle={{
                color: '#7B6F72',
                fontFamily: FONTS.FONT_POPPINS_MEDIUM,
              }}
              hideRules
              yAxisSide={yAxisSides.RIGHT}
              yAxisTextStyle={{
                color: '#7265E3',
                fontFamily: FONTS.FONT_POPPINS_MEDIUM,
              }}
              secondaryYAxis={{yAxisColor: 'black'}}
              xAxisThickness={0}
              yAxisThickness={0}
              thickness1={3}
              color="#7265E3"
            /> */}
        <LineChart
          data={graphdata}
          rotateLabel
          width={300}
          color="#8C80F8"
          thickness={2}
          startOpacity={0.9}
          endOpacity={0.2}
          initialSpacing={0}
          noOfSections={6}
          maxValue={200}
          yAxisColor="#C58BF2"
          yAxisThickness={0}
          rulesType="solid"
          yAxisTextStyle={{color: '#C58BF2'}}
          xAxisLabelTextStyle={{color: '#C58BF2'}}
          yAxisSide={yAxisSides.RIGHT}
          xAxisColor="lightgray"
          pointerConfig={{
            pointerStripHeight: 160,
            pointerStripColor: '#8C80F8',
            pointerStripWidth: 2,
            pointerColor: '#8C80F8',
            radius: 10,
            pointerLabelWidth: 100,
            pointerLabelHeight: 90,
            activatePointersOnLongPress: true,
            autoAdjustPointerLabelPosition: false,
            pointerLabelComponent: items => {
              const tempdata = items[0].date.split(' ');
              return (
                <View
                  style={{
                    height: 90,
                    width: 120,
                    justifyContent: 'center',
                    marginTop: 0,
                    marginLeft: -40,
                  }}>
                  <View
                    style={{
                      paddingHorizontal: 14,
                      paddingVertical: 10,
                      borderRadius: 10,
                      backgroundColor: '#8C80F8',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        textAlign: 'center',
                        color: 'white',
                      }}>
                      {tempdata[0] + ' ' + tempdata[1]}
                    </Text>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        textAlign: 'center',
                        color: 'white',
                      }}>
                      {'- ' + items[0].value + ' kg'}
                    </Text>
                  </View>
                </View>
              );
            },
          }}
          hideRules
          curved
        />
      </View>
      <SolidContainer
        containerStyle={styles.solidcontainer}
        onPress={() => navigation.navigate(SCREENS.WEIGHTTRACKERNEW)}>
        <TextMedium style={{flexGrow: 1}}>Weight Tracker</TextMedium>
        <PrimaryButton
          containerStyle={styles.targetButton}
          textStyle={styles.targetButtonText}
          title={'Track'}
          onPress={() => navigation.navigate(SCREENS.WEIGHTTRACKERNEW)}
        />
      </SolidContainer>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  solidButtonContainer: {
    width: 50,
    height: 50,
    borderRadius: 15,
  },
  basicTracker: {
    flexDirection: 'row',
  },
  stepContainer: {
    marginBottom: 20,
    marginLeft: 0,
    marginRight: 20,
    backgroundColor: '#fff',
    elevation: 4,
    borderRadius: 15,
    padding: 10,
    width: '45%',
    height: '100%',
  },
  medicineContainer: {
    width: '55%',
    height: '100%',
    backgroundColor: '#fff',
    elevation: 4,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 20,
    paddingTop: 20,
  },
  sleepContainer: {
    flex: 1,
    marginLeft: 20,
    marginBottom: 10,
    marginTop: 20,
    flexGrow: 1,
  },
  waterIntakeTracker: {
    width: '46%',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 1,
    height: BASE_TRACKER_CONTAINER_HEIGHT,
    marginBottom: 0,
    marginTop: 20,
  },
  waterInTakeGradient: {
    height: 0,
    position: 'absolute',
    bottom: 0,
  },
  waterInTakeBar: {
    width: 30,
    height: BASE_TRACKER_CONTAINER_HEIGHT - 50,
  },
  targetButton: {
    width: 100,
    height: 40,
    elevation: 0,
  },
  targetButtonText: {
    fontSize: 14,
  },
  solidcontainer: {
    flexDirection: 'row',
    borderRadius: 15,
    height: 70,
    padding: 15,
    paddingHorizontal: 20,
    marginTop: 30,
    backgroundColor: 'rgba(157,206,255,0.2)',
    marginBottom: 40,
  },
  userInfo: {
    flexGrow: 1,
  },
  profileInfo: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  lineGraphContainer: {
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    height: 'auto',
    backgroundColor: 'rgba(157, 206, 255,0.2)',
    marginBottom: 15,
  },
  gradientContainer: {
    width: '100%',
    height: 180,
    borderRadius: 15,
    elevation: 5,
    padding: 30,
  },
  bmiContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  scoreCard: {
    backgroundColor: '#F4F6FA',
    padding: 18,
    height: 167,
    borderRadius: 20,
    flexDirection: 'row',
    gap: 15,
  },

  scoreHeading: {
    color: '#2D3142',
    fontFamily: 'Rubik-Regular',
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 24 /* 133.333% */,
    letterSpacing: 0.2,
  },

  scoreDesc: {
    color: '#4C5980',
    fontFamily: 'Rubik-Regular',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 24 /* 171.429% */,
    letterSpacing: 0.2,
    marginTop: 7,
  },

  scoreBtn: {
    color: '#7265E3',
    fontamily: 'Rubik-Regular',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 14 /* 100% */,
    letterSpacing: 0.2,
    paddingLeft: 36,
    marginTop: 20,
  },
  solidContainerStyle: {
    borderRadius: 10,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  targets: {
    backgroundColor: 'rgba(157,206,255,0.2)',
    paddingVertical: 22,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  targetItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  targetItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    borderRadius: 15,
    padding: 5,
    paddingVertical: 20,
    justifyContent: 'space-evenly',

    width: (width - 105) / 2,
  },
  targetItemMain: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  targetText2: {
    color: '#7B6F72',
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 20,
  },

  targetText1: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 21,
    color: '#9DCEFF',
  },

  dailystepsText: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 25,
    fontSize: 14,
  },
  Calender: {
    width: 160,
    height: 76,
    marginLeft: -40,
    marginTop: 30,
  },
  Container: {
    display: 'flex',
    flexDirection: 'row',

    paddingVertical: 15,
    borderRadius: 15,
    marginVertical: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(157,206,255,0.2)',
    elevation: 10,
    shadowColor: 'rgba(137,210,245,0.2)',
  },
});
export default Dashboard;
