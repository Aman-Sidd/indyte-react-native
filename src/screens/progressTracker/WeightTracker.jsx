import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import {COLORS} from '../../constants/Colors';
import GradientLabel from '../../components/Label/GradientLabel';

import {FONTS} from '../../constants/Fonts';
import LargeText from '../../components/Text/LargeText';
const {width, height} = Dimensions.get('window');

import SolidContainer from '../../components/container/SolidContainer';

import {useNavigation} from '@react-navigation/native';
import AnimatedLineChart from '../../components/Utils/LineChart';
import TextH4 from '../../components/Text/TextH4';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {useRef} from 'react';
import useLayout from '../../hooks/useLayout';
import {useSelector} from 'react-redux';
import {getUserWorkouts, getWeightLogs} from '../../services';
import GradientDropdown from '../../components/Utils/GradientDropdown';
import {WORKOUTS} from '../../constants/Data';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {LineChart, yAxisSides} from 'react-native-gifted-charts';
import {SCREENS} from '../../constants/Screens';
import {current} from '@reduxjs/toolkit';
function WeightTracker(props) {
  const [weightdata, setWeightdata] = useState();
  const [weighttrack, setWeighttrack] = useState();
  const user = useSelector(state => state.user.user);
  const navigation = useNavigation();
  const [targetweight, setTargetweight] = useState(0);
  const sheetRef = useRef(null);
  const [viewHeight, getViewHeight] = useLayout();
  const [graphdata, setGraphdata] = useState();

  const [bmi, setBmi] = useState(0);

  const getWeigthLogs = async () => {
    try {
      if (user.weight && user.height) {
        const tempmeterheight = user.height / 100;
        const tempbmi = user.weight / (tempmeterheight * tempmeterheight);
        console.log(user.weight, user.height);
        setBmi(tempbmi);
      }
      const date = new Date();
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are  0-indexed in JavaScript
      const day = date.getDate().toString().padStart(2, '0');
      const formateddate = `${year}-${month}-${day}`;
      console.log(formateddate);

      const weightlogs = await getWeightLogs(user.id);
      if (weightlogs.data) {
        console.log('workouts>>', weightlogs.data);
        const temp = getDayOfWeek(weightlogs.data.data);
        setGraphdata(temp);
        setTargetweight(weightlogs.data.data[0].goal_weight);
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

  function getWeightGoalText(bmi) {
    console.log(bmi);
    if (bmi < 18.5) {
      return "Your BMI indicates you are underweight. It's important to gain weight to reach a healthy BMI range. This can help improve your overall health and well-being.";
    } else if (bmi >= 18.5 && bmi < 25) {
      return "Congratulations! Your BMI indicates you are at a healthy weight. It's important to maintain this weight to ensure you stay healthy.";
    } else if (bmi >= 25 && bmi < 30) {
      return "Your BMI indicates you are overweight. It's important to lose weight to reach a healthy BMI range. This can help improve your overall health and well-being.";
    } else {
      return "Your BMI indicates you are obese. It's important to lose weight to reach a healthy BMI range. This can help improve your overall health and well-being.";
    }
  }

  function getDayOfWeek(data) {
    console.log('tempdata', data);
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
        customDataPoint: idx == data.length - 1 && customDataPoint,
        hideDataPoint: idx == data.length - 1 ? false : true,
        currentWeight: item.current_weight,
        goalWeight: item.goal_weight,
      };

      res.push(tempdata);
    });
    console.log(res);
    return res;
  }

  useEffect(() => {
    getWeigthLogs();
  }, []);

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
            overflow: 'hidden',
            width: '90%',
            marginTop: '5%',
            marginBottom: '5%',
          }}>
          <TextH4
            style={{textAlign: 'center', marginVertical: 10, color: 'white'}}>
            Workout Tracker
          </TextH4>
        </View>
        <View style={styles.detailsSubContainer}>
          <View>
            <Text style={{fontSize: 15}}>CURRENT</Text>
            <View
              style={{flexDirection: 'row', gap: 10, alignItems: 'baseline'}}>
              <Text style={{fontSize: 30, fontWeight: '900', color: 'white'}}>
                {user.weight}
              </Text>
              <Text style={{fontSize: 18}}>kg</Text>
            </View>
          </View>
          <View style={{justifyContent: 'center'}}>
            <Icon name="weight" size={20} />
          </View>
          <View>
            <Text style={{fontSize: 15}}>TARGET</Text>
            <View
              style={{flexDirection: 'row', gap: 10, alignItems: 'baseline'}}>
              <Text style={{fontSize: 30, fontWeight: '900', color: 'white'}}>
                {targetweight}
              </Text>
              <Text style={{fontSize: 18}}>kg</Text>
            </View>
          </View>
        </View>
      </GradientLabel>
      <ScrollView style={styles.bottomContainer}>
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
              My Progress
            </LargeText>
            <GradientDropdown
              data={WORKOUTS}
              value={weighttrack}
              setValue={setWeighttrack}
              placeholder="Select Item"
              containerStyle={{
                width: width / 3.7,
                height: 40,
                borderRadius: 30,
              }}
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
                radius: 6,
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
                        width: 100,
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
                          {items[0].value}
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
          <View>
            <View style={styles.bmiContainer}>
              <View
                style={{
                  height: '50%',
                  width: '100%',
                  flexDirection: 'row',
                  gap: 10,
                }}>
                <View
                  style={{
                    height: '100%',
                    width: '25%',
                    backgroundColor: '#FF9B90',
                    borderRadius: 25,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{color: 'white'}}>BMI</Text>
                  <Text style={{fontSize: 30, color: 'white'}}>
                    {bmi.toFixed(1)}
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      color: '#4C5980',
                      fontSize: 15,
                      maxWidth: 200,
                      height: 400,
                    }}>
                    {getWeightGoalText(parseFloat(bmi))}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  zIndex: 100,
                }}>
                <Image
                  source={require('../../../assets/images/weight.png')}
                  style={{height: 100, width: 100}}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'flex-start',
              width: width * 0.9,
              marginTop: 10,
            }}>
            <TextH4>Gallery</TextH4>
            {graphdata &&
              graphdata.map(item => (
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: '#00000004',
                  }}>
                  <View>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 15,
                      }}>
                      {item.date}
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        color: 'black',
                      }}>{`${item.currentWeight} > ${item.goalWeight}`}</Text>
                  </View>
                </View>
              ))}

            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#7265E3',
                  padding: 15,
                  borderRadius: 10,
                  width: '90%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => navigation.navigate(SCREENS.WEIGHTUPDATE)}>
                <Text style={{color: 'white', fontSize: 20, fontWeight: '700'}}>
                  Update Weight
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    height: '100%',
  },
  detailContainer: {
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: 'white',
    width: width,
    // paddingTop: 50,
    // paddingLeft: 15,
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
  detailsSubContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
  bottomContainer: {
    height: '75%',
    width: '100%',
    backgroundColor: 'white',
    elevation: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 20,
    zIndex: 100,
    position: 'absolute',
    bottom: 0,
  },
  bmiContainer: {
    backgroundColor: '#F4F6FA',
    borderRadius: 25,
    height: height * 0.2,
    width: width * 0.95,
    marginTop: 20,
    alignItems: 'center',
    flexDirection: 'row',

    paddingHorizontal: 10,
  },
});
export default WeightTracker;
