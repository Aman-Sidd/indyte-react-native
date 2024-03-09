import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Close from '../../../assets/images/Close-Navs.png';
import Detail from '../../../assets/images/Detail-Navs.png';
import boots1 from '../../../assets/images/boots1.png';
import glass1 from '../../../assets/images/glass1.png';
import Background from '../../../assets/images/Bg.png';
import walk from '../../../assets/images/walk.png';
import walk2 from '../../../assets/images/walk2.png';
import calories from '../../../assets/images/calories.png';
import time from '../../../assets/images/time.png';
import Shape from '../../../assets/images/Shape.png';
import ImagePerson from '../../../assets/images/Image.png';
import Gold from '../../../assets/images/gold.png';
import Avatar from '../../../assets/images/Avatar.png';
import Medal from '../../../assets/images/medal.png';
import Avatar1 from '../../../assets/images/Avatar1.png';
import Medal1 from '../../../assets/images/medal1.png';
import moreIcon from '../../../assets/images/more.png';
import Group from '../../../assets/images/Group.png';
import LinearGradient from 'react-native-linear-gradient';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {Circle} from 'react-native-svg';
import Day from '../../../assets/images/day.svg';
import Night from '../../../assets/images/night.svg';
// import {BarChart, LineChart} from 'react-native-chart-kit';
import {LineChart, XAxis, Grid, YAxis, BarChart} from 'react-native-svg-charts';
import * as scale from 'd3-scale';
import CustomDatePicker from '../../components/common/CustomDatePicker';
import {SCREENS} from '../../constants/Screens';
import Back from '../../../assets/images/Close-Navs.svg';
import Details from '../../../assets/images/Detail-Navs.svg';
const {width} = Dimensions.get('window');
const MAX_POINTS = 597;

export default function StepTracker({navigation}) {
  const data = [50, 10, 40, 95, 85, 35, 53, 24, 50, 10, 40, 95, 85, 35, 53, 24];

  const contentInset = {top: 20, bottom: 20};

  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <View style={[styles.container]}>
        <View style={[styles.header]}>
          <View>
            <Back />
          </View>
          <Text style={styles.textStyle}>Step Tracker</Text>
          <View>
            <Details />
          </View>
        </View>
        {/* <View style={[styles.dateList]}>
                    <View style={[styles.day]}>
                        <Text style={[styles.dayText]}>Wed</Text>
                        <Text style={[styles.dayText]}>12</Text>
                    </View>
                    <View style={[styles.day]}>
                        <Text style={[styles.dayText]}>Thus</Text>
                        <Text style={[styles.dayText]}>13</Text>
                    </View>
                    <LinearGradient colors={['#92A3FD', '#9DCEFF']} style={[styles.day]}>
                        <Text style={[styles.dayText]}>Fri</Text>
                        <Text style={[styles.dayText]}>14</Text>
                    </LinearGradient>
                    <View style={[styles.day]}>
                        <Text style={[styles.dayText]}>Sat</Text>
                        <Text style={[styles.dayText]}>15</Text>
                    </View>
                    <View style={[styles.day]}>
                        <Text style={[styles.dayText]}>Sun</Text>
                        <Text style={[styles.dayText]}>16</Text>
                    </View>
                </View> */}
        <CustomDatePicker
          showMonth={false}
          FetchMeal={date => {
            console.log(date);
          }}
        />
        <View style={[styles.dailystepsText]}>
          <Text style={{color: '#7265E3', fontWeight: '500'}}>DAILY STEPS</Text>
        </View>
        <View style={[styles.dailystepsText]}>
          <Text style={[styles.walk40percent]}>
            You have walked{'\n'} <Text style={{color: '#7265E3'}}>40% </Text>of
            your Target
          </Text>
        </View>
        <View style={{paddingHorizontal: 30}}>
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
                  <Text style={styles.targetText1}>8 L</Text>
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
                    <Text style={styles.targetText1}>10,000</Text>
                    <Text style={styles.targetText2}>Foot Steps</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{justifyContent: 'center', alignItems: 'center', margin: 30}}>
          <AnimatedCircularProgress
            size={250}
            width={20}
            // backgroundWidth={5}
            fill={80}
            tintColor="#7265E3"
            tintColorSecondary="#7265E3"
            backgroundColor="#bfc0c3"
            arcSweepAngle={240}
            rotation={240}
            lineCap="round"
            duration={1200}
            // dashedBackground={{width: 10, gap: 1}}
          >
            {fill => (
              <View>
                <View style={{alignItems: 'center'}}>
                  <Image source={walk2} />
                </View>
                <Text style={{color: 'black', fontSize: 30, fontWeight: 500}}>
                  {Math.round((MAX_POINTS * fill) / 10)}
                </Text>
                <View style={{alignItems: 'center'}}>
                  <Text>Steps</Text>
                </View>
              </View>
            )}
          </AnimatedCircularProgress>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginBottom: 10,
          }}>
          <View>
            <AnimatedCircularProgress
              size={100}
              width={15}
              fill={50}
              rotation={0}
              tintColor="#00e0ff"
              lineCap="round"
              onAnimationComplete={() => console.log('onAnimationComplete')}
              backgroundColor="#99dfe9">
              {fill => (
                <View>
                  <Image source={calories} />
                </View>
              )}
            </AnimatedCircularProgress>
            <View style={{alignItems: 'center'}}>
              <Text>31 Kcal</Text>
            </View>
          </View>
          <View>
            <AnimatedCircularProgress
              size={100}
              width={15}
              fill={30}
              rotation={0}
              tintColor="#AF8EFF"
              lineCap="round"
              onAnimationComplete={() => console.log('onAnimationComplete')}
              backgroundColor="#cebbf9">
              {fill => (
                <View>
                  <Image source={Shape} />
                </View>
              )}
            </AnimatedCircularProgress>
            <View style={{alignItems: 'center'}}>
              <Text>2 Km</Text>
            </View>
          </View>
          <View>
            <AnimatedCircularProgress
              size={100}
              width={15}
              fill={65}
              rotation={0}
              tintColor="#1F87FE"
              lineCap="round"
              onAnimationComplete={() => console.log('onAnimationComplete')}
              backgroundColor="#7bb6f9">
              {fill => (
                <View>
                  <Image source={time} />
                </View>
              )}
            </AnimatedCircularProgress>
            <View style={{alignItems: 'center'}}>
              <Text>50 min</Text>
            </View>
          </View>
        </View>

        <View style={{marginTop: 30, paddingHorizontal: 10}}>
          <ImageBackground
            source={Background}
            resizeMode="cover"
            style={styles.image}>
            <Image
              source={walk}
              style={{marginHorizontal: 30, marginTop: 10}}
            />

            <Text
              style={{
                marginHorizontal: 30,
                marginTop: 10,
                color: 'white',
                fontSize: 48,
                fontWeight: 500,
              }}>
              7,235
            </Text>
            <View>
              <Text
                style={{
                  fontSize: 20,
                  color: 'white',
                  marginHorizontal: 30,
                }}>
                You're taking{' '}
                <Text style={{color: '#7FE3F0'}}>fewer steps</Text> {'\n'} than
                you normally do
              </Text>
            </View>
            <View>
              <View style={{flex: 1}}>
                <View
                  style={{
                    height: 200,
                    flexDirection: 'row',
                    paddingHorizontal: 10,
                  }}>
                  <YAxis
                    data={data}
                    contentInset={contentInset}
                    svg={{
                      fill: '#FFF',
                      fontSize: 10,
                    }}
                    numberOfTicks={10}
                    formatLabel={value => `${value}`}
                  />
                  <View style={{flex: 1, marginLeft: 10}}>
                    <BarChart
                      style={{flex: 1}}
                      data={data}
                      svg={{fill: '#7FE3F0'}}
                      contentInset={contentInset}
                      yAccessor={({item}) => item}
                      spacingInner={0.1}>
                      <Grid />
                    </BarChart>
                    {/* <XAxis
                      style={{marginHorizontal: -10}}
                      data={data}
                      scale={scale.scaleBand}
                      formatLabel={(value, index) => index}
                      contentInset={{left: 10, right: 10}}
                      svg={{fontSize: 10, fill: 'black'}}
                    /> */}
                  </View>
                </View>

                <View style={styles.yAxis}>
                  <Day />
                  <Text style={styles.nAxisText}>6AM</Text>
                  <Text style={styles.nAxisText}>12PM</Text>
                  <Text style={styles.nAxisText}>6PM</Text>
                  <Night />
                </View>
              </View>
            </View>
          </ImageBackground>
          <View style={{marginTop: 25}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                margin: 10,
              }}>
              <View>
                <Image source={ImagePerson} />
              </View>
              <View>
                <Text style={{color: 'black', fontSize: 17, fontWeight: 700}}>
                  INZAMAMUL AHMED
                </Text>
              </View>
              <View>
                <Image
                  source={moreIcon}
                  //   style={{marginHorizontal: 30, marginTop: 10}}
                />
              </View>
            </View>
            <View>
              <ImageBackground
                source={Group}
                resizeMode="cover"
                style={{borderRadius: 10}}>
                <View>
                  <Text
                    style={{
                      fontSize: 15,
                      color: '#7265E3',
                      marginTop: 30,
                      marginHorizontal: 10,
                    }}>
                    LEADERBOARD
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 20,
                      color: '#2D3142',
                      marginTop: 30,
                      marginHorizontal: 10,
                    }}>
                    You are on <Text style={{color: '#7265E3'}}>1st</Text> place
                    {'\n'} among your friends
                  </Text>
                </View>
                <View style={{margin: 20}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      backgroundColor: 'white',
                      padding: 10,
                      borderRadius: 10,
                      margin: 10,
                    }}>
                    <View>
                      <Image source={ImagePerson} />
                    </View>
                    <View>
                      <Text>
                        You <Text style={{color: 'black'}}>55 Km</Text>
                      </Text>
                    </View>
                    <View>
                      <View>
                        <Image source={Gold} />
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      backgroundColor: 'white',
                      padding: 10,
                      borderRadius: 10,
                      margin: 10,
                    }}>
                    <View>
                      <Image source={Avatar} />
                    </View>
                    <View>
                      <Text>
                        Amanda <Text style={{color: 'black'}}>53 Km</Text>
                      </Text>
                    </View>
                    <View>
                      <View>
                        <Image source={Medal} />
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      backgroundColor: 'white',
                      padding: 10,
                      borderRadius: 10,
                      margin: 10,
                    }}>
                    <View>
                      <Image source={Avatar1} />
                    </View>
                    <View>
                      <Text>
                        Clarie <Text style={{color: 'black'}}>50 Km</Text>
                      </Text>
                    </View>
                    <View>
                      <View>
                        <Image source={Medal1} />
                      </View>
                    </View>
                  </View>
                </View>
              </ImageBackground>
            </View>

            <View style={{marginTop: 20}}>
              <View
                style={{
                  backgroundColor: '#8C80F8',
                  borderRadius: 10,
                  padding: 20,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Image
                    source={walk}
                    style={{marginHorizontal: 30, marginTop: 10}}
                  />
                  <LinearGradient
                    style={{padding: 10, borderRadius: 20}}
                    colors={['#C58BF2', '#EEA4CE']}>
                    <TouchableOpacity>
                      <Text>Weekly</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
                <View>
                  <Text style={{margin: 10, color: '#7FE3F0', fontWeight: 500}}>
                    Average steps
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      margin: 10,
                      color: '#ffffff',
                      fontSize: 48,
                      fontWeight: 600,
                    }}>
                    8,560
                  </Text>
                </View>
                <View>
                  <View style={{flex: 1}}>
                    <View style={{height: 200, flexDirection: 'row'}}>
                      <YAxis
                        data={data}
                        contentInset={contentInset}
                        svg={{
                          fill: '#fff',
                          fontSize: 10,
                        }}
                        numberOfTicks={10}
                        formatLabel={value => `${value}`}
                      />
                      <View style={{flex: 1, marginLeft: 10}}>
                        <BarChart
                          style={{flex: 1}}
                          data={data}
                          svg={{fill: '#7FE3F0'}}
                          contentInset={contentInset}
                          yAccessor={({item}) => item}
                          spacingInner={0.1}>
                          <Grid />
                        </BarChart>
                        <XAxis
                          style={{marginHorizontal: -10}}
                          data={data}
                          scale={scale.scaleBand}
                          formatLabel={(value, index) => index}
                          contentInset={{left: 10, right: 10}}
                          svg={{fontSize: 10, fill: '#fff'}}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View style={{justifyContent: 'center', marginTop: 10}}>
              <View
                style={{
                  backgroundColor: '#92A3FD',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                  alignItems: 'center',
                  borderRadius: 10,
                }}>
                <View
                  style={{
                    backgroundColor: '#8C80F8',
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 48,
                    height: 57.562,
                  }}>
                  <Text style={styles.stepsText}>OCT</Text>
                  <Text style={styles.stepsText1}>13</Text>
                </View>
                <View>
                  <Text style={{fontSize: 16, fontWeight: 600}}>
                    Most steps
                  </Text>
                  <Text>Friday</Text>
                </View>
                <View>
                  <Text style={{color: 'white', fontSize: 15, fontWeight: 600}}>
                    13,450
                  </Text>
                </View>
              </View>
            </View>

            <View style={{justifyContent: 'center', marginTop: 10}}>
              <View
                style={{
                  backgroundColor: '#92A3FD',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                  alignItems: 'center',
                  borderRadius: 10,
                }}>
                <View
                  style={{
                    backgroundColor: '#8C80F8',
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 48,
                    height: 57.562,
                  }}>
                  <Text style={styles.stepsText}>OCT</Text>
                  <Text style={styles.stepsText1}>10</Text>
                </View>
                <View>
                  <Text style={{fontSize: 16, fontWeight: 600}}>
                    Least steps
                  </Text>
                  <Text>Tuesday</Text>
                </View>
                <View>
                  <Text style={{color: 'white', fontSize: 15, fontWeight: 600}}>
                    13,450
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={{
                justifyContent: 'center',
                marginTop: 10,
                marginVertical: 30,
              }}>
              <LinearGradient
                style={{
                  padding: 10,
                  borderRadius: 50,
                  paddingVertical: 20,
                  paddingHorizontal: 10,
                  marginTop: 50,
                }}
                colors={['#92A3FD', '#9DCEFF']}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(SCREENS.DASHBOARD);
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: 'white',
                      fontWeight: 700,
                      fontSize: 17,
                    }}>
                    Back to Home
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
  },

  textStyle: {
    color: '#1D1617',
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
  },
  dateList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  day: {
    backgroundColor: '#e3e3e3',
    // margin: 5,
    width: 60,
    paddingHorizontal: 12,
    paddingVertical: 20,
    borderRadius: 10,
  },
  dayText: {
    textAlign: 'center',
  },
  dailystepsText: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 25,
    fontSize: 14,
  },
  walk40percent: {
    fontSize: 28,
    textAlign: 'center',
    fontWeight: '500',
    color: '#2D3142',
  },
  targets: {
    backgroundColor: '#dde1f8',
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
    // marginHorizontal: 5,
  },
  backgraoundImage: {
    // bac,
  },
  image: {
    borderRadius: 20,
    overflow: 'hidden',
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

  yAxis: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },

  nAxisText: {
    color: '#E4DFFF',
    fontFamily: 'Rubik-Regular',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 20,
  },

  stepsText: {
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'Rubik-Regular',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 14,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },

  stepsText1: {
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'Rubik-Regular',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.229,
    textTransform: 'uppercase',
  },
});
