import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import ResultHeader from '../../components/Result/ResultHeader';
import BackSvg from '../../../assets/icons/ArrowLeft.svg';
import Share from '../../../assets/icons/Share.svg';
import MoreInfo from '../../../assets/icons/MoreInfo.svg';
import ScreenContainer from '../../components/container/ScreenContainer';
import DropdownPicker from '../../components/Utils/DropdownPicker';
import {PROGRESS} from '../../constants/Data';
import CircularRing from '../../components/progress/CircularRing';
import {StyleSheet} from 'react-native';
import {FONTS} from '../../constants/Fonts';
import {TouchableOpacity} from 'react-native';
import GradientButton from '../../components/Button/GradientButton';
import PrimaryButton from '../../components/Button/PrimaryButton';
import {
  getDailyDietProgress,
  getDailyWorkoutProgress,
  getLastMonthSleepProgress,
  getLastMonthWaterProgress,
  getLastWeekSleepProgress,
  getLastWeekWaterProgress,
  getMonthlyWorkoutProgress,
  getWeeklyDietProgress,
  getWeeklyWorkoutProgress,
} from '../../services';
import {useSelector} from 'react-redux';

export default function TrackProgress() {
  const [filter, setFilter] = useState('Last Week');
  const [activeButton, setActiveButton] = useState('Workout');
  const [alldata, setAlldata] = useState();
  const user = useSelector(state => state.user.user);
  const handleButtonClick = buttonName => {
    setActiveButton(buttonName);
  };

  const getData = async () => {
    try {
      console.log('Getdata');
      let tempdata = null;
      if (filter == 'Today') {
        const formateddate = new Date().toISOString().split('T')[0];
        if (activeButton == 'Workout') {
          tempdata = await getDailyWorkoutProgress(user.id, formateddate);
        } else if (activeButton == 'Diet') {
          tempdata = await getDailyDietProgress(user.id, formateddate);
        } else {
        }
      } else if (filter == 'Last Week') {
        if (activeButton == 'Workout') {
          tempdata = await getWeeklyWorkoutProgress(user.id);
        } else if (activeButton == 'Diet') {
          tempdata = await getWeeklyDietProgress(user.id);
        } else {
          tempdata = await getLastWeekWaterProgress(user.id);
          const tempsleep = await getLastWeekSleepProgress(user.id);
          if (tempdata.data.data) {
            tempdata.data.data.sleepdata = tempsleep.data.data;
          }
        }
      } else {
        if (activeButton == 'Workout') {
          tempdata = await getMonthlyWorkoutProgress(user.id);
        } else if (activeButton == 'Diet') {
        } else {
          tempdata = await getLastMonthWaterProgress(user.id);
          const tempsleep = await getLastMonthSleepProgress(user.id);
          if (tempdata.data.data) {
            tempdata.data.data.sleepdata = tempsleep.data.data;
          }
        }
      }
      if (tempdata.data) {
        setAlldata(tempdata.data.data);
        console.log(tempdata.data.data);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const calculateSleep = totalMinutes => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const tempsleep = hours && minutes ? `${hours}h ${minutes}m` : `${hours}h`;
    return tempsleep;
  };
  useEffect(() => {
    getData();
  }, [filter, activeButton]);

  const renderContent = () => {
    switch (activeButton) {
      case 'Workout':
        return (
          <>
            <View
              style={{
                marginVertical: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: 10,
                  justifyContent: 'center',
                  gap: 40,
                }}>
                <View
                  style={{
                    alignItems: 'center',
                    backgroundColor: '#F8F8F8',
                    width: 155,
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    justifyContent: 'center',
                    borderRadius: 10,
                  }}>
                  <Text
                    style={{
                      fontFamily: FONTS.FONT_POPPINS_REGULAR,
                      fontSize: 17,
                      color: 'black',
                    }}>
                    Total Workouts
                  </Text>
                  <Text
                    style={{
                      fontFamily: FONTS.FONT_POPPINS_REGULAR,
                      fontSize: 21,
                      color: '#726EF0',
                    }}>
                    {alldata?.finishedWorkouts + alldata?.unfinishedWorkouts ||
                      0}
                  </Text>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    backgroundColor: '#F8F8F8',
                    width: 155,
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    justifyContent: 'center',
                    borderRadius: 10,
                  }}>
                  <Text
                    style={{
                      fontFamily: FONTS.FONT_POPPINS_REGULAR,
                      fontSize: 17,
                      color: 'black',
                    }}>
                    Time Duration
                  </Text>
                  <Text
                    style={{
                      fontFamily: FONTS.FONT_POPPINS_REGULAR,
                      fontSize: 21,
                      color: '#726EF0',
                    }}>
                    18 min
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: 30,
                  justifyContent: 'center',
                  gap: 40,
                }}>
                <View
                  style={{
                    alignItems: 'center',
                    backgroundColor: '#F8F8F8',
                    width: 155,
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    justifyContent: 'center',
                    borderRadius: 10,
                  }}>
                  <Text
                    style={{
                      fontFamily: FONTS.FONT_POPPINS_REGULAR,
                      fontSize: 17,
                      color: 'black',
                    }}>
                    Complete
                  </Text>
                  <Text
                    style={{
                      fontFamily: FONTS.FONT_POPPINS_REGULAR,
                      fontSize: 21,
                      color: '#726EF0',
                    }}>
                    {alldata?.finishedWorkouts}
                  </Text>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    backgroundColor: '#F8F8F8',
                    width: 155,
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    justifyContent: 'center',
                    borderRadius: 10,
                  }}>
                  <Text
                    style={{
                      fontFamily: FONTS.FONT_POPPINS_REGULAR,
                      fontSize: 17,
                      color: 'black',
                    }}>
                    Incomplete
                  </Text>
                  <Text
                    style={{
                      fontFamily: FONTS.FONT_POPPINS_REGULAR,
                      fontSize: 21,
                      color: '#726EF0',
                    }}>
                    {alldata?.finishedWorkouts}
                  </Text>
                </View>
              </View>
            </View>
          </>
        );
      case 'Diet':
        return (
          <>
            <View
              style={{
                marginVertical: 20,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                gap: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  backgroundColor: '#F8F8F8',
                  borderRadius: 10,
                }}>
                <View style={styles.container}>
                  <View style={{alignItems: 'center'}}>
                    <Text style={{...styles.text}}>Protein</Text>
                    <Text
                      style={{
                        ...styles.calText,
                        fontSize: 24,
                        color: '#726EF0',
                      }}>
                      {alldata?.totalProtein || 0} g
                    </Text>
                  </View>
                  <View style={{...styles.line}} />
                </View>
                <View style={styles.container}>
                  <View
                    style={{
                      alignItems: 'center',
                      marginLeft: 8,
                      marginRight: 9,
                    }}>
                    <Text style={{...styles.text}}>Carbs</Text>
                    <Text
                      style={{
                        ...styles.calText,
                        fontSize: 24,
                        color: '#726EF0',
                      }}>
                      {alldata?.totalCarbs || 0} g
                    </Text>
                  </View>
                  <View style={styles.line} />
                </View>
                <View style={styles.container}>
                  <View style={{alignItems: 'center'}}>
                    <Text style={{...styles.text}}>Fat</Text>
                    <Text
                      style={{
                        ...styles.calText,
                        fontSize: 24,
                        color: '#726EF0',
                      }}>
                      {alldata?.totalFats || 0} g
                    </Text>
                  </View>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  borderRadius: 10,

                  backgroundColor: '#F8F8F8',
                }}>
                <View style={styles.container}>
                  <View style={{alignItems: 'center'}}>
                    <Text style={{...styles.text}}>Total</Text>
                    <Text
                      style={{
                        ...styles.calText,
                        fontSize: 24,
                        color: '#726EF0',
                      }}>
                      {alldata?.completedMeals + alldata?.incompleteMeals || 0}
                    </Text>
                  </View>
                  <View style={{...styles.line}} />
                </View>
                <View style={styles.container}>
                  <View
                    style={{
                      alignItems: 'center',
                      marginLeft: 8,
                      marginRight: 9,
                    }}>
                    <Text style={{...styles.text, paddingHorizontal: 6}}>
                      Completed
                    </Text>
                    <Text
                      style={{
                        ...styles.calText,
                        fontSize: 24,
                        color: '#726EF0',
                      }}>
                      {alldata?.completedMeals || 0}
                    </Text>
                  </View>
                  <View style={styles.line} />
                </View>
                <View style={styles.container}>
                  <View style={{alignItems: 'center'}}>
                    <Text style={{...styles.text}}>Skipped</Text>
                    <Text
                      style={{
                        ...styles.calText,
                        fontSize: 24,
                        color: '#726EF0',
                      }}>
                      {alldata?.incompleteMeals || 0}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </>
        );

      case 'Water':
        return (
          <View style={{alignItems: 'center', marginTop: 20}}>
            <TouchableOpacity onPress={() => console.log('Sleep')}>
              <Text
                style={{
                  backgroundColor: '#726EF0',
                  padding: 5,
                  borderRadius: 8,
                  color: 'white',
                  width: 80,
                  textAlign: 'center',
                }}>
                Sleep
              </Text>
            </TouchableOpacity>
            <View style={{...styles.container, marginVertical: 30}}>
              <View style={styles.line} />
              <View style={{alignItems: 'center'}}>
                <Text style={{...styles.text, color: '#21E000'}}>
                  Average Sleep
                </Text>
                <Text style={{...styles.calText, color: 'black'}}>
                  {calculateSleep(alldata?.sleepdata?.totalSleepMinutes || 0)}
                </Text>
              </View>
              <View style={styles.line} />
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <ScreenContainer scroll={true}>
      <ResultHeader
        icon1={<BackSvg width={20} height={20} />}
        icon2={<Share width={20} height={20} />}
        icon3={<MoreInfo width={14} height={10} />}
        title="Progress"
      />
      <View style={{alignItems: 'flex-end'}}>
        <DropdownPicker
          placeholder="Last Week"
          data={PROGRESS}
          setValue={setFilter}
          value={filter}
          width={130}
          containerStyle={{
            // borderRadius: 30,
            borderWidth: 1,
            borderColor: '#E8E8EC',
            height: 40,
            color: 'black',
          }}
          selectedTextStyle={{color: 'black'}}
        />
      </View>
      <View style={{marginTop: 100, alignItems: 'center'}}>
        <CircularRing
          radius={80}
          fontSize={18}
          gap={0}
          label={`60%\nComplete`}
        />
      </View>
      <View style={{backgroundColor: '#F8F8F8', borderRadius: 10}}>
        <View
          style={{
            flexDirection: 'row',
            gap: 40,
            justifyContent: 'center',
            marginTop: 30,
          }}>
          <TouchableOpacity onPress={() => handleButtonClick('Workout')}>
            <Text
              style={[
                styles.btn,
                activeButton === 'Workout' && styles.activeBtn,
              ]}>
              Workout
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleButtonClick('Diet')}>
            <Text
              style={[styles.btn, activeButton === 'Diet' && styles.activeBtn]}>
              Diet
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleButtonClick('Water')}>
            <Text
              style={[
                styles.btn,
                activeButton === 'Water' && styles.activeBtn,
              ]}>
              Water
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            borderBottomColor: '#979797',
            borderBottomWidth: 0.3,
            marginTop: 10,
          }}
        />
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <View style={styles.container}>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.text}>Target</Text>
              <Text style={styles.calText}>
                {activeButton == 'Workout'
                  ? `${alldata?.targetCalories || 0} Cal`
                  : activeButton == 'Diet'
                  ? `${alldata?.completedMeals + alldata?.incompleteMeals || 0}`
                  : `${
                      filter == 'Daily'
                        ? user.water_target
                        : filter == 'Last Week'
                        ? user.water_target * 7
                        : user.water_target * 30 || 0
                    } ml`}
              </Text>
            </View>
            <View style={styles.line} />
          </View>
          <View style={styles.container}>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.text}>
                {activeButton == 'Workout'
                  ? 'Burn'
                  : activeButton == 'Diet'
                  ? 'Taken'
                  : 'Drunk'}
              </Text>
              <Text style={styles.calText}>
                {activeButton == 'Workout'
                  ? `${alldata?.burntCalories || 0} Cal`
                  : activeButton == 'Diet'
                  ? `${alldata?.completedMeals || 0}`
                  : `${alldata?.totalWaterDrunk} ml`}
              </Text>
            </View>
            <View style={styles.line} />
          </View>
          <View style={styles.container}>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.text}>Left</Text>
              <Text style={styles.calText}>
                {activeButton == 'Workout'
                  ? `${
                      alldata?.targetCalories - alldata?.burntCalories || 0
                    } Cal`
                  : activeButton == 'Diet'
                  ? `${alldata?.completedMeals + alldata?.incompleteMeals || 0}`
                  : `${
                      (filter == 'Daily'
                        ? user.water_target
                        : filter == 'Last Week'
                        ? user.water_target * 7 - alldata?.totalWaterDrunk
                        : user.water_target * 30 - alldata?.totalWaterDrunk) ||
                      0
                    } ml`}
              </Text>
            </View>
          </View>
        </View>
      </View>
      {renderContent()}
      <View style={{...styles.gradientButtonContainer}}>
        <PrimaryButton
          title="Back to Home"
          colors={['red', 'green', 'blue']}
          onPress={() => console.log('Button clicked')}
          containerStyle={{elevation: 0}}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  line: {
    height: 80,
    width: 1,
    backgroundColor: '#979797',
    marginHorizontal: 5,
  },
  text: {
    paddingHorizontal: 20,
    fontSize: 14,
    paddingVertical: 1,
    color: 'black',
    fontFamily: FONTS.FONT_POPPINS_REGULAR,
  },
  calText: {
    paddingHorizontal: 20,
    fontSize: 17,
    paddingVertical: 1,
    fontFamily: FONTS.FONT_POPPINS_MEDIUM,
    color: '#616161',
  },
  btn: {
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 8,
    color: 'black',
    width: 80,
    textAlign: 'center',
  },
  activeBtn: {
    backgroundColor: '#726EF0',
    color: 'white',
  },
  gradientButtonContainer: {
    marginVertical: 160,
    marginBottom: 60,
    borderRadius: 8,
    overflow: 'hidden',
  },
});
