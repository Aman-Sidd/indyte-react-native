import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import ScreenContainer from '../../components/container/ScreenContainer';
import TextH4 from '../../components/Text/TextH4';
import SolidContainer from '../../components/container/SolidContainer';

import Back from '../../../assets/icons/Back.svg';
import TwoDot from '../../../assets/icons/twodot.svg';
import Add from '../../../assets/icons/plus.svg';
import Calorie from '../../../assets/images/fire.svg';
import Sugar from '../../../assets/images/sugar.svg';
import Fat from '../../../assets/images/fat.svg';
import CustomDatePicker from '../../components/common/CustomDatePicker';
import SubSectionTitle from '../../components/Meal/SubSectionTitle';
import FloatingGradingButton from '../../components/Button/FloatingGradingButton';
import TodayMealPlannerCard from '../../components/Meal/TodayMealPlannerCard';
import MealImage from '../../../assets/images/BreakFast_meal.png';
import MealContainerNew from '../../components/Meal/MealContainerNew';
import {
  MealSchedulLunch,
  MealScheduleBreakfast,
  MealScheduleDinner,
  MealScheduleOther,
} from '../../data/Mealschedule';
import {SCREENS} from '../../constants/Screens';
import {useNavigation, useRoute} from '@react-navigation/native';
import {dateFormat, getTimeInAMPMFormat} from '../../utils/common';
import {useMemo} from 'react';
import {getUserRecommendedMeal} from '../../backend/utilFunctions';
import TextMedium from '../../components/Text/TextMedium';
import {useSelector} from 'react-redux';
import {getUserMealDetails, getUserMealsByDay} from '../../services';
import {ActivityIndicator} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import LottieView from 'lottie-react-native';
const MealScheduler = ({}) => {
  const route = useRoute();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const user = useSelector(state => state.user.user);
  const [filteredRecommendedMeals, setFilteredRecommendedMeals] = useState([]);
  const [date, setDate] = useState(dateFormat(new Date()));

  const getUserMeals = async () => {
    try {
      const meals = await getUserMealDetails(user.id);
      console.log(meals.data.data);
      setFilteredRecommendedMeals(meals.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTodayAssignedMeals = async (customdate = null) => {
    try {
      console.log(customdate);
      setLoading(true);
      const date = new Date();
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are  0-indexed in JavaScript
      const day = date.getDate().toString().padStart(2, '0');

      const formatedDate = `${year}-${month}-${day}`;
      const todayMeals = await getUserMealsByDay(
        user.id,
        customdate ? customdate : formatedDate,
      );
      if (todayMeals.data) {
        setLoading(false);
        setFilteredRecommendedMeals(todayMeals.data.data);
        console.log('schedule>>', todayMeals.data.data);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  function filterMealsBasedOnType(type) {
    const filteredMeals = filteredRecommendedMeals.filter(
      meal => meal.mealTime.toLowerCase() === type.toLowerCase(),
    );

    return filteredMeals;
  }
  const breakfastMeal = useMemo(() => {
    return filterMealsBasedOnType('BREAKFAST');
  });
  const lunchfastMeal = useMemo(() => {
    return filterMealsBasedOnType('LUNCH');
  });
  const dinnerfastMeal = useMemo(() => {
    return filterMealsBasedOnType('DINNER');
  });
  const snackfastMeal = useMemo(() => {
    return filterMealsBasedOnType('SNACKS');
  });

  useEffect(() => {
    getTodayAssignedMeals();
  }, []);
  return (
    <>
      <ScreenContainer scroll={true}>
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
            <TextH4>Meal Schedule</TextH4>
          </View>
          <SolidContainer containerStyle={styles.solidContainerStyle}>
            <TwoDot width={16} height={16} />
          </SolidContainer>
        </View>
        <CustomDatePicker
          FetchMeal={date => {
            console.log(date, 'DATEEE');
            getTodayAssignedMeals(date);
          }}
          setDate={() => {
            console.log('HI');
            setDate;
          }}
        />
        {loading ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator />
          </View>
        ) : (
          <View style={{}}>
            {breakfastMeal.length == 0 &&
            lunchfastMeal.length == 0 &&
            snackfastMeal.length == 0 &&
            dinnerfastMeal.length == 0 ? (
              <View style={{height: 250, justifyContent: 'center'}}>
                <LottieView
                  source={require('../../../assets/lottieanimations/Nodatefound.json')}
                  style={{width: '100%', height: '100%'}}
                  autoPlay
                  loop
                />
              </View>
            ) : (
              <>
                <SubSectionTitle
                  mealgoal={`${breakfastMeal.length || 0} meals`}
                  title={'Breakfast'}
                />
                <View>
                  {breakfastMeal.map(item => (
                    <MealContainerNew
                      key={item._id}
                      colors={[
                        'rgba(146, 163, 253, 0.2)',
                        'rgba(157, 206, 255, 0.2)',
                      ]}
                      title={item && item.meal?.name ? item.meal?.name : 'Meal'}
                      time={''}
                      containerStyle={{width: '98%', alignSelf: 'center'}}
                      // img={{}}
                      img={require('../../../assets/images/BreakFast_meal.png')}
                      onPress={() => {
                        navigation.navigate(SCREENS.DIETDETAILS, {
                          meal: item,
                        });
                      }}
                      finished={item.finished}
                    />
                  ))}
                </View>
                <SubSectionTitle
                  mealgoal={`${lunchfastMeal.length || 0} meals`}
                  title={'Lunch'}
                />
                <View>
                  {lunchfastMeal.map(item => (
                    <MealContainerNew
                      key={item._id}
                      colors={[
                        'rgba(146, 163, 253, 0.2)',
                        'rgba(157, 206, 255, 0.2)',
                      ]}
                      title={item && item.meal ? item.meal.name : ''}
                      time={''}
                      containerStyle={{width: '98%', alignSelf: 'center'}}
                      img={require('../../../assets/images/lunch_meal.png')}
                      onPress={() =>
                        navigation.navigate(SCREENS.DIETDETAILS, {
                          meal: item,
                        })
                      }
                      finished={item.finished}
                    />
                  ))}
                </View>
                <SubSectionTitle
                  mealgoal={`${snackfastMeal.length || 0} meals`}
                  title={'Snack'}
                />
                <View>
                  {snackfastMeal.map(item => (
                    <MealContainerNew
                      key={item._id}
                      colors={[
                        'rgba(146, 163, 253, 0.2)',
                        'rgba(157, 206, 255, 0.2)',
                      ]}
                      title={item && item.meal ? item.meal.name : ''}
                      time={''}
                      containerStyle={{width: '98%', alignSelf: 'center'}}
                      img={require('../../../assets/images/sushi.png')}
                      onPress={() =>
                        navigation.navigate(SCREENS.DIETDETAILS, {
                          meal: item,
                        })
                      }
                      finished={item.finished}
                    />
                  ))}
                </View>
                <SubSectionTitle
                  mealgoal={`${dinnerfastMeal.length || 0} meals`}
                  title={'Dinner'}
                />
                <View style={{marginBottom: 30}}>
                  {dinnerfastMeal.map(item => (
                    <MealContainerNew
                      key={item._id}
                      colors={[
                        'rgba(146, 163, 253, 0.2)',
                        'rgba(157, 206, 255, 0.2)',
                      ]}
                      title={item && item.meal ? item.meal.name : ''}
                      time={''}
                      containerStyle={{width: '98%', alignSelf: 'center'}}
                      img={require('../../../assets/images/sushi.png')}
                      onPress={() =>
                        navigation.navigate(SCREENS.DIETDETAILS, {
                          meal: item,
                        })
                      }
                      finished={item.finished}
                    />
                  ))}
                </View>
              </>
            )}
          </View>
        )}
      </ScreenContainer>
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
});
export default MealScheduler;
