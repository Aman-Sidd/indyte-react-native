import {
  Dimensions,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import Header from '../../components/header/Header';
import SolidContainer from '../../components/container/SolidContainer';
import GradientDropdown from '../../components/Utils/GradientDropdown';
import LargeText from '../../components/Text/LargeText';
import AnimatedLineChart from '../../components/Utils/LineChart';
import {MEALS, WORKOUTS} from '../../constants/Data';
import {FONTS} from '../../constants/Fonts';
import TextMedium from '../../components/Text/TextMedium';
import PrimaryButton from '../../components/Button/PrimaryButton';
import MealContainer from '../../components/container/MealContainer';
import MealCard from '../../components/card/MealCard';
import {SCREENS} from '../../constants/Screens';
import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import {
  generateRequest,
  getMealDetails,
  getUserRecommendedMeal,
} from '../../backend/utilFunctions';
import {dateFormat, getTimeInAMPMFormat} from '../../utils/common';
import {GlobalContext} from '../../../App';
import TextH4 from '../../components/Text/TextH4';
import {useSelector} from 'react-redux';
import {useGetMealsMutation, useGetMealsQuery} from '../../store/apiSlice';
import {
  getDailyDietProgress,
  getUserMealDetails,
  getUserMealsByDay,
  getWeeklyDietProgress,
} from '../../services';
const {width, height} = Dimensions.get('window');
const imageUrl = require('../../../assets/images/BreakFast_meal.png');
import LottieView from 'lottie-react-native';

const MealHome = () => {
  const navigation = useNavigation();
  const [mealPlan, setMealPlan] = useState(WORKOUTS[0]);
  const [meals, setMeals] = useState('BREAKFAST');
  const [mealstats, setMealstats] = useState();
  const [recommendedMeals, setRecommendedMeals] = useState([]);
  const [filteredRecommendedMeals, setFilteredRecommendedMeals] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const user = useSelector(state => state.user.user);
  const onRefresh = async () => {
    setRefreshing(true);
    if (error) {
      console.log(error);
      setRefreshing(false);
      return;
    }
    console.log(data);
    setRefreshing(false);
  };

  function filterMealsBasedOnType(type) {
    const filteredMeals = recommendedMeals.filter(
      meal => meal?.mealTime?.toLowerCase() == type.toLowerCase(),
    );

    return filteredMeals;
  }

  const getUserMeals = async () => {
    try {
      const meals = await getUserMealDetails(user.id);
      console.log(meals.data.data);
      setRecommendedMeals(meals.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getMealStats = async () => {
    try {
      let tempdata;
      if (mealPlan == 'DAILY') {
        tempdata = await getDailyDietProgress(user.id);
      } else if (mealPlan == 'WEEKLY') {
        tempdata = await getWeeklyDietProgress(user.id);
      } else {
        tempdata = await getDailyDietProgress(user.id);
      }
      if (tempdata.data) {
        console.log(tempdata.data.data);
        setMealstats(tempdata.data.data);
      }
    } catch (error) {
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
      const todayMeals = await getUserMealsByDay(user.id, formatedDate);
      if (todayMeals.data) {
        setRecommendedMeals(todayMeals.data.data);
        console.log('tempdate>>', todayMeals.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    const currentDate = new Date();
    // getUserMeals();
    getTodayAssignedMeals();

    console.log('first');
  }, []);

  useEffect(() => {
    getMealStats();
  }, [mealPlan]);

  useEffect(() => {
    if (meals === null) setFilteredRecommendedMeals(recommendedMeals);
    else if (meals === 'BREAKFAST') {
      setFilteredRecommendedMeals(filterMealsBasedOnType('BREAKFAST'));
    } else if (meals === 'LUNCH') {
      console.log(filterMealsBasedOnType('LUNCH'));
      setFilteredRecommendedMeals(filterMealsBasedOnType('LUNCH'));
    } else if (meals === 'DINNER') {
      setFilteredRecommendedMeals(filterMealsBasedOnType('DINNER'));
    } else if (meals === 'SNACKS') {
      setFilteredRecommendedMeals(filterMealsBasedOnType('SNACKS'));
    }
  }, [meals, recommendedMeals]);

  return (
    <ScrollView
      style={{backgroundColor: 'white'}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <Header title={'Meal Planner'} />
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: 10,
        }}>
        <SolidContainer
          containerStyle={{
            ...styles.solidcontainer,
            display: 'flex',
            flexdirection: 'row',
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
            Meal Nutritions
          </LargeText>
          <GradientDropdown
            data={WORKOUTS}
            value={mealPlan}
            setValue={setMealPlan}
            placeholder="Select Item"
            containerStyle={{
              width: width / 3.7,
              height: 40,
              borderRadius: 30,
            }}
            selectedTextStyle={{color: 'black'}}
          />
        </SolidContainer>
      </View>
      <View style={{overflow: 'hidden', alignItems: 'center'}}>
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
                Total
              </Text>
              <Text
                style={{color: '#726EF0', fontSize: 15, textAlign: 'center'}}>
                {mealstats?.completedMeals + mealstats?.uncompleteMeals || 0}
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
                Completed
              </Text>
              <Text
                style={{color: '#726EF0', fontSize: 15, textAlign: 'center'}}>
                {mealstats?.completedMeals || 0}
              </Text>
            </View>
            <View style={{width: '33.3%', paddingHorizontal: 10}}>
              <Text
                style={{fontSize: 15, color: '#333333', textAlign: 'center'}}>
                Skipped
              </Text>
              <Text
                style={{color: '#726EF0', fontSize: 15, textAlign: 'center'}}>
                {mealstats?.incompleteMeals || 0}
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
                Target
              </Text>
              <Text
                style={{color: '#726EF0', fontSize: 15, textAlign: 'center'}}>
                {mealstats?.totalCalories || 0}
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
                Taken
              </Text>
              <Text
                style={{color: '#726EF0', fontSize: 15, textAlign: 'center'}}>
                {mealstats?.consumedCalories || 0}
              </Text>
            </View>
            <View style={{width: '33.3%', paddingHorizontal: 10}}>
              <Text
                style={{fontSize: 15, color: '#333333', textAlign: 'center'}}>
                Left
              </Text>
              <Text
                style={{color: '#726EF0', fontSize: 15, textAlign: 'center'}}>
                {mealstats?.totalCalories - mealstats?.consumedCalories || 0}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '5%',
        }}>
        <SolidContainer
          containerStyle={[styles.solidcontainer, {marginHorizontal: 10}]}>
          <TextMedium style={{flexGrow: 1}}>Daily Meal Schedule</TextMedium>
          <PrimaryButton
            containerStyle={styles.targetButton}
            textStyle={styles.targetButtonText}
            title={'Check'}
            onPress={() => navigation.navigate(SCREENS.MEALSCHEDULER)}
          />
        </SolidContainer>
      </View>
      <View style={{marginHorizontal: 15}}>
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
            placeholder="Select"
            containerStyle={{
              width: width / 2.8,
              height: 40,
              borderRadius: 30,
            }}
          />
        </SolidContainer>
        <View style={{paddingHorizontal: 10}}>
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
              // console.log(i, meal?.meal?.meal_image, "jjjj");

              return (
                <View>
                  {
                    <MealContainer
                      key={meal.id}
                      img={require('../../../assets/images/BreakFast_meal.png')}
                      imgStyle={{width: 50, height: 50, borderRadius: 8}}
                      title={meal?.meal?.name || ' '}
                      time={getTimeInAMPMFormat(new Date(meal?.date))}
                      date={'Today'}
                      onpress={() =>
                        navigation.navigate(SCREENS.MEALSCHEDULER, {
                          filteredRecommendedMeals,
                        })
                      }
                    />
                  }
                </View>
              );
            })
          )}
          {/* )} */}
        </View>
        <View style={{marginHorizontal: 20, marginVertical: '5%'}}>
          <LargeText
            style={{
              fontFamily: FONTS.FONT_POPPINS_SEMIBOLD,
              color: 'black',
              flexGrow: 1,
              marginVertical: 5,
            }}>
            Meal
          </LargeText>
          <ScrollView horizontal>
            <MealCard
              onPress={() =>
                navigation.navigate(SCREENS.MEALSCHEDULER, {
                  filteredRecommendedMeals: filteredRecommendedMeals,
                })
              }
              Type="BreakFast"
              NOFood="0"
              backgroundColor={'#D9FFFD'}
              btnBackGround={'#82E1FF'}
              img={require('../../../assets/images/BreakFast_meal.png')}
            />
            <MealCard
              onPress={() =>
                navigation.navigate(SCREENS.MEALSCHEDULER, {
                  filteredRecommendedMeals: filteredRecommendedMeals,
                })
              }
              Type="Lunch"
              NOFood="0"
              backgroundColor={'#FFE0DC'}
              btnBackGround={'#FF8ECB'}
              img={require('../../../assets/images/BreakFast_meal.png')}
            />

            <MealCard
              onPress={() =>
                navigation.navigate(SCREENS.MEALSCHEDULER, {
                  filteredRecommendedMeals: filteredRecommendedMeals,
                })
              }
              Type="Dinner"
              NOFood="0"
              backgroundColor={'#D9FFFD'}
              btnBackGround={'#82E1FF'}
              img={require('../../../assets/images/BreakFast_meal.png')}
            />
          </ScrollView>
        </View>
      </View>
      <View style={{marginHorizontal: 15, marginBottom: '5%'}}>
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
            Skipped Meals
          </LargeText>
          {/* <GradientDropdown
            data={MEALS}
            value={meals}
            setValue={setMeals}
            placeholder="Select"
            containerStyle={{ width: width / 2.8, height: 40, borderRadius: 30 }}
          /> */}
        </SolidContainer>
        {/* <View style={{ paddingHorizontal: 10 }}>
          <MealContainer
            img={require('../../../assets/images/sushi.png')}
            title={'Salmon Nigiri'}
            time={'7am'}
            date={'Today'}
            onpress={() => navigation.navigate(SCREENS.MEALSCHEDULER)}
          />
          <MealContainer
            img={require('../../../assets/images/glass-of-milk.png')}
            title={'Lowfat Milk'}
            time={'8am'}
            date={'Today'}
            onpress={() => navigation.navigate(SCREENS.MEALSCHEDULER)}
          />
        </View> */}
        <View style={{paddingHorizontal: 10}}>
          {filteredRecommendedMeals.length == 0 ? (
            <TextH4 style={{marginVertical: 20}}>No meals skipped today</TextH4>
          ) : (
            filteredRecommendedMeals.map((meal, i) => {
              console.log(i, meal?.user_skip, 'jjjj');
              return (
                <View>
                  {meal?.user_skip ? (
                    <MealContainer
                      key={meal._id}
                      img={{uri: meal?.meal?.meal_image}}
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
                  ) : null}
                </View>
              );
            })
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default MealHome;

const styles = StyleSheet.create({
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
