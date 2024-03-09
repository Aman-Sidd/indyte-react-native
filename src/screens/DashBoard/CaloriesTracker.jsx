import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import SolidContainer from '../../components/container/SolidContainer';
import ScreenContainer from '../../components/container/ScreenContainer';
import TextH4 from '../../components/Text/TextH4';

import Plus from '../../../assets/icons/plus.svg';
import WaterGlass from '../../../assets/images/WaterH2O.svg';
import Shoes from '../../../assets/images/Shoes.svg';
import Back from '../../../assets/icons/Back.svg';

import GradientContainer from '../../components/container/GradientContainer';
import TargetContainerSubContainer from '../../components/DashBoard/TargetContainerSubContainer';
import ActivityEntryLabel from '../../components/Label/ActivityEntryLabel';
import ScheduleMealProgress from '../../components/DashBoard/ScheduleMealProgress';
import SmallText from '../../components/Text/SmallText';
import LatestActivityCard from '../../components/DashBoard/LatestActivityCard';
import {ChatsLabels} from '../../data/ActivityChartData';
import LineChartWithMultipleLines from '../../components/Utils/ActivityLineChats';
import CustomDatePicker from '../../components/common/CustomDatePicker';
import {TouchableOpacity} from 'react-native';
import {SCREENS} from '../../constants/Screens';
import DropdownPicker from '../../components/Utils/DropdownPicker';
import {WORKOUTS} from '../../constants/Data';
import AreaGraph from '../../components/Utils/AreaGraph';
import {
  getDailyWorkoutProgress,
  getUserMealLogByDate,
  getWeeklyDietProgress,
  getWeeklyWorkoutProgress,
  getYearlyWorkoutProgress,
  getyearlydietprogress,
} from '../../services';
import {useSelector} from 'react-redux';

const CaloriesTracker = ({navigation}) => {
  const [maxValue, setMaxValue] = useState(400);
  const [filter, setFilter] = useState('DAILY');
  const [loading, setLoading] = useState(false);
  const [calories, setCalories] = useState();
  const [meals, setMeals] = useState();
  const user = useSelector(state => state.user.user);
  const [lineData, setLineData] = useState([
    {value: 0},
    {value: 10, hideDataPoint: true},
    {value: 8, hideDataPoint: true},
    {value: 58, hideDataPoint: true},
    {value: 56, hideDataPoint: true},
    {value: 78, hideDataPoint: true},
    {value: 74, hideDataPoint: true},
    {value: 98},
  ]);
  const [lineData2, setLineData2] = useState([
    {value: 0},
    {value: 20, hideDataPoint: true},
    {value: 18, hideDataPoint: true},
    {value: 40, hideDataPoint: true},
    {value: 36, hideDataPoint: true},
    {value: 60, hideDataPoint: true},
    {value: 54, hideDataPoint: true},
    {value: 85},
  ]);

  const arrangeMealData = data => {
    const tempdata = {BREAKFAST: 0, LUNCH: 0, DINNER: 0, OTHERS: 0};
    if (filter == 'WEEKLY') {
      data.userMeals.map(i => {
        tempdata[i.mealTime] += i.meal.nutrition[0].cal;
      });
    } else {
      tempdata.consumedCalories = 0;
      data.map(i => (tempdata.consumedCalories += i.consumedCalories));
      console.log(tempdata.consumedCalories);
    }
    const result = {...data, ...tempdata};
    return result;
  };
  const getCaloriesData = async () => {
    try {
      let caloriesdata = null;
      let mealdata = null;
      setLoading(true);
      if (filter == 'DAILY') {
        setMaxValue(1500);
        const formateddate = new Date().toISOString().split('T')[0];
        caloriesdata = await getDailyWorkoutProgress(user.id, formateddate);
        mealdata = await getUserMealLogByDate(user.id, formateddate);
      } else if (filter == 'WEEKLY') {
        setMaxValue(8000);
        caloriesdata = await getWeeklyWorkoutProgress(user.id);
        mealdata = await getWeeklyDietProgress(user.id);
      } else {
        setMaxValue(10000);
        caloriesdata = await getYearlyWorkoutProgress(
          user.id,
          new Date().getFullYear(),
        );

        mealdata = await getyearlydietprogress(
          user.id,
          new Date().getFullYear(),
        );
      }

      if (caloriesdata?.data) {
        setLoading(false);
        setCalories(caloriesdata.data.data);
        arrangeCaloriesGraphData(caloriesdata?.data?.data);
      }
      if (mealdata?.data) {
        const tempdata = arrangeMealData(mealdata?.data?.data);
        arrangeMealGraphData(mealdata?.data?.data);

        setMeals(tempdata);
      }
    } catch (error) {
      console.log(error);
      console.log(error.response.data);
    }
  };
  const arrangeCaloriesGraphData = data => {
    const tempdata = [];
    data.map((i, idx) => {
      const tempobj = {value: i.burntCalories};
      if (idx != 0 || idx != data.length - 1) {
        tempobj.hideDataPoint = true;
      }
      tempdata.push(tempobj);
    });
    // setLineData(tempdata);
  };

  const arrangeMealGraphData = data => {
    const tempdata = [];
    data.map((i, idx) => {
      const tempobj = {value: i.consumedCalories};
      console.log(idx);
      if (idx != 0 || idx != data.length - 1) {
        tempobj.hideDataPoint = false;
      } else {
        tempobj.hideDataPoint = true;
      }
      tempdata.push(tempobj);
    });
    console.log(tempdata);
    setLineData(tempdata);
  };

  useEffect(() => {
    getCaloriesData();
  }, [filter]);
  return (
    <ScreenContainer scroll={true}>
      <SolidContainer
        containerStyle={styles.solidContainerStyle}
        onPress={() => {
          navigation.goBack();
        }}>
        <Back width={16} height={16} />
      </SolidContainer>
      <View style={{alignItems: 'center'}}>
        <TextH4>Calories Tracker</TextH4>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 10,
          width: '100%',
          paddingHorizontal: 20,
        }}>
        <Text style={{color: 'black', fontSize: 20, fontWeight: '600'}}>
          Total Calories
        </Text>
        <DropdownPicker
          data={WORKOUTS}
          setValue={setFilter}
          value={filter}
          width={'40%'}
          containerStyle={{
            borderRadius: 30,
            height: 40,
            color: 'black',
          }}
          gradient={true}
          colors={['#92A3FD', '#9DCEFF']}
          selectedTextStyle={{color: 'white'}}
        />
      </View>
      {/* <CustomDatePicker/> */}
      {/* <GradientContainer colors={['rgba(157, 206, 255, 0.2)', 'rgba(157, 206, 255, 0.2)']} styles={{ padding: 20, borderRadius: 20, height: 180, justifyContent: "space-around", marginVertical: 30, }}>
                <SolidContainer containerStyle={styles.continerTopStyles} >
                    <TextH4>
                        Today Target
                    </TextH4>
                    <GradientContainer colors={['#92A3FD', '#9DCEFF']} styles={styles.iconContainerStyle}>
                        <Plus width={14} height={14} />
                    </GradientContainer>
                </SolidContainer>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <TargetContainerSubContainer number={"10L"} label={"Water Intake"} image={<WaterGlass width={25} height={40} />} />
                    <TargetContainerSubContainer number={"4000"} label={"Foot Steps"} image={<Shoes width={30} height={30} />} />
                </View>
            </GradientContainer> */}
      <GradientContainer
        colors={['rgba(157, 206, 255, 0.2)', 'rgba(157, 206, 255, 0.2)']}
        styles={{
          padding: 20,
          borderRadius: 20,
          height: 180,
          alignItems: 'center',
          height: 430,
          marginTop: 30,
        }}>
        <View style={styles.chatTitle}>
          <TextH4>{meals?.consumedCalories || 0} kcal</TextH4>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            width: '80%',
            marginVertical: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TextH4 style={{fontSize: 14, fontWeight: '700'}}>{filter} </TextH4>
            {/* <SmallText>Avg Cals</SmallText> */}
          </View>
          <View
            style={{
              width: 15,
              height: 2,
              backgroundColor: 'rgba(97, 125, 121, 1)',
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TextH4 style={{fontSize: 14, fontWeight: '700'}}>
              {calories?.finishedWorkouts || 0}
            </TextH4>
            <SmallText> Activities</SmallText>
          </View>
        </View>
        <View style={{flex: 1, paddingHorizontal: 30}}>
          <AreaGraph
            lineData={lineData}
            lineData2={lineData2}
            maxValue={maxValue}
          />
        </View>

        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {ChatsLabels.map((item, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  width: 10,
                  height: 10,
                  backgroundColor: item.dotColor,
                  borderRadius: 5,
                  marginHorizontal: 5,
                }}
              />
              <Text style={styles.chatBoxText}>{item.label}</Text>
            </View>
          ))}
        </View>
      </GradientContainer>

      <View style={styles.entrieConteiner}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <ScheduleMealProgress
            unit={'Kcal'}
            amount={meals?.consumedCalories || 0}
            daytime={'Calorie gained'}
            mealpercentage={'14'}
            progressbar={{
              outerColor: 'rgba(157, 208, 48, 0.5)',
              innerColor: 'rgba(157, 208, 48, 1)',
              percentage: '52',
            }}
          />
          <ScheduleMealProgress
            unit={'Kcal'}
            amount={calories?.burntCalories || 0}
            daytime={'Calorie Burnt'}
            mealpercentage={'78'}
            progressbar={{
              outerColor: 'rgba(255, 57, 93, 0.5)',
              innerColor: 'rgba(255, 57, 93, 1)',
              percentage: '70',
            }}
          />
        </View>
      </View>
      <TextH4>Meal activities</TextH4>
      <View style={styles.entrieConteiner}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <ScheduleMealProgress
            unit={'Kcal'}
            amount={meals?.BREAKFAST || 0}
            daytime={'Breakfast'}
            mealpercentage={'14'}
            progressbar={{
              outerColor: 'rgba(157, 208, 48, 0.5)',
              innerColor: 'rgba(157, 208, 48, 1)',
              percentage: '52',
            }}
          />
          <ScheduleMealProgress
            unit={'Kcal'}
            amount={meals?.LUNCH || 0}
            daytime={'Lunch'}
            mealpercentage={'78'}
            progressbar={{
              outerColor: 'rgba(146, 163, 253, 0.5)',
              innerColor: 'rgba(146, 163, 253, 1)',
              percentage: '70',
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <ScheduleMealProgress
            unit={'Kcal'}
            amount={meals?.DINNER || 0}
            daytime={'Dinner'}
            mealpercentage={'20'}
            progressbar={{
              outerColor: 'rgba(57, 172, 255, 0.5)',
              innerColor: 'rgba(57, 172, 255, 1)',
              percentage: '47',
            }}
          />
          <ScheduleMealProgress
            unit={'Kcal'}
            amount={meals?.OTHERS || 0}
            daytime={'Other'}
            mealpercentage={'18'}
            progressbar={{
              outerColor: 'rgba(146, 163, 253, 0.5)',
              innerColor: 'rgba(146, 163, 253, 1)',
              percentage: '30',
            }}
          />
        </View>
      </View>
    </ScreenContainer>
  );
};
const styles = StyleSheet.create({
  continerTopStyles: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  iconContainerStyle: {
    width: 30,
    height: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  solidContainerStyle: {
    borderRadius: 10,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    // borderWidth: 1
  },
  entrieConteiner: {
    backgroundColor: 'rgba(246, 247, 247, 1)',
    marginVertical: 20,
    borderRadius: 20,
    alignItems: 'center',
    padding: 20,
  },
  chatTitle: {
    backgroundColor: 'white',
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    borderRadius: 30,
  },
  chatBoxText: {
    color: 'black',
    fontWeight: '500',
    fontSize: 15,
  },
});
export default CaloriesTracker;
