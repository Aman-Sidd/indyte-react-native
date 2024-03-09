import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import CircleBar from '../../components/DashBoard/CircleBar';
import SmallText from '../../components/Text/SmallText';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomToast from '../../components/common/Toast';

import Mug from '../../../assets/images/mug.svg';
import Glass from '../../../assets/images/waterglass.svg';
import BKbottle from '../../../assets/images/bottlebk.svg';
import Array from '../../../assets/images/arrow.svg';
import AddWater from '../../../assets/images/addwater.svg';
import GradientLine from '../../components/DashBoard/GradientLine';
import Back from '../../../assets/icons/Back.svg';
import Setting from '../../../assets/icons/Setting.svg';
import SolidContainer from '../../components/container/SolidContainer';
import TextH4 from '../../components/Text/TextH4';

import glass1 from '../../../assets/images/glass1.png';
import boots1 from '../../../assets/images/boots1.png';
import {ScrollView} from 'react-native';
import CustomDatePicker from '../../components/common/CustomDatePicker';
import LinearGradient from 'react-native-linear-gradient';
import {SCREENS} from '../../constants/Screens';
import {TouchableOpacity} from 'react-native';
import LatestPic from '../../../assets/images/Latest-Pic.svg';
import ThreeDot from '../../../assets/icons/threedot.svg';
import DropdownPicker from '../../components/Utils/DropdownPicker';
import {WORKOUTS} from '../../constants/Data';
import WaterWavyAnimation from '../../components/Waves/WaterWavyAnimation';
import WaterWave from '../../components/Waves/WaterWave';
import {black} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import {useWaterIntakeMutation} from '../../store/apiSlice';
import {useSelector, useDispatch} from 'react-redux';
import {userSlice} from '../../store/userSlice';
import {deleteWaterIntake, getWaterLog, postWaterIntake} from '../../services';

const {width, height} = Dimensions.get('window');
const WaterDrink = ({navigation}) => {
  const [waterdrinked, setWaterdrinked] = useState(0);
  const [containertype, setContainertype] = useState({
    name: 'cup',
    capacity: 200,
  });

  const [filter, setFilter] = useState('DAILY');
  const [loading, setLoading] = useState(false);
  const user = useSelector(state => state.user?.user);
  const [totalwater, setTotalwater] = useState(user?.water_target || 2000);
  const [date, setDate] = useState(
    new Date().toISOString().split('T')[0].toString(),
  );
  const [tempnotification, setTempnotifications] = useState([]);
  const dispatch = useDispatch();
  const childRef = useRef(null);
  const [toastColorState, setToastColorState] = useState('red');
  const [toastTextColorState, setToastTextColorState] = useState('white');
  const [toastMessage, setToastMessage] = useState('');

  const handleAddWater = async value => {
    try {
      if (waterdrinked >= totalwater) {
        setWaterdrinked(totalwater);
        return;
      }
      console.log(date);
      const tempdatet = new Date().toISOString().split('T')[0].toString();
      console.log(tempdatet);
      if (date != tempdatet) {
        console.log("You can't update water other than today");
        setToastMessage("You can't update water other than today");
        setToastColorState('red');
        setToastTextColorState('white');
        childRef.current.showToast();
        return;
      }
      setLoading(true);

      const reqBody = {
        userId: user?.id,
        amount: value,
        recordedAt: new Date().toISOString(),
      };
      console.log(reqBody);
      const waterintake = await postWaterIntake(reqBody);

      console.log(waterintake.data);

      await getWaterDetails();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const getWaterDetails = async (customdate = new Date()) => {
    try {
      console.log(customdate);
      const now = new Date(customdate); // This gets the current date and time
      const formattedDate = now.toISOString().split('T')[0];
      const userid = user?.id;
      const reswaterlogs = await getWaterLog(userid, formattedDate);
      console.log('getwaterDetails', reswaterlogs);
      if (reswaterlogs.data.waterIntakes) {
        setTempnotifications([...reswaterlogs.data.waterIntakes]);
        const sum = reswaterlogs.data.waterIntakes.reduce(
          (accumulator, currentObject) => {
            return accumulator + currentObject.amount;
          },
          0,
        );
        setWaterdrinked(sum);
        console.log(sum);
      }
    } catch (error) {
      setWaterdrinked(0);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    getWaterDetails();
  }, []);
  function calculateTimeDifference(timestamp1, timestamp2) {
    // Ensure timestamp1 is earlier than timestamp2
    if (timestamp1 > timestamp2) {
      [timestamp1, timestamp2] = [timestamp2, timestamp1];
    }

    // Calculate difference in milliseconds
    const diffMilliseconds = timestamp2 - timestamp1;

    // Convert to seconds
    let totalSeconds = Math.floor(diffMilliseconds / 1000);

    // Extract hours, minutes, and remaining seconds
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    // Build the formatted string
    let formattedDiff = '';
    if (hours > 0) {
      formattedDiff += `${hours} hour${hours === 1 ? '' : 's'}`;
      if (minutes > 0 || seconds > 0) {
        formattedDiff += ', ';
      }
    }
    if (minutes > 0) {
      formattedDiff += `${minutes} minute${minutes === 1 ? '' : 's'}`;
      if (seconds > 0) {
        formattedDiff += ', ';
      }
    }
    if (seconds > 0) {
      formattedDiff += `${seconds} second${seconds === 1 ? '' : 's'}`;
    }

    return formattedDiff;
  }

  function getAllDaysOfCurrentMonth() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth(); // January is  0!
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Get the number of days in the month
    const allDays = [];

    for (let day = 1; day <= daysInMonth; day++) {
      allDays.push(new Date(year, month, day));
    }

    console.log(allDays);
  }

  const handleDeleteTempnotifications = async id => {
    try {
      const deleteWater = await deleteWaterIntake(id);
      if (deleteWater.data) {
        console.log(deleteWater.data);
        setToastMessage(deleteWater.data.message);
        setToastTextColorState('white');
        setToastColorState('green');
        childRef.current.showToast();
        await getWaterDetails();
      }
    } catch (error) {
      setToastMessage(error.response.data);
      setToastTextColorState('white');
      setToastColorState('red');
      childRef.current.showToast();
    }

    setTempnotifications(tempdata);
  };

  return (
    <View>
      <CustomToast
        toastColor={toastColorState}
        toastTextColor={toastTextColorState}
        toastMessage={toastMessage}
        ref={childRef}
      />
      <ScrollView>
        <View style={styles.containr}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width,
              paddingHorizontal: 20,
              marginTop: 15,
            }}>
            <View style={{flexDirection: 'row', alignContent: 'center'}}>
              <SolidContainer containerStyle={styles.solidContainerStyle}>
                <Back width={16} height={16} />
              </SolidContainer>
              <View style={{marginLeft: 15}}>
                <TextH4>Drink Water</TextH4>
                <SmallText>Today</SmallText>
              </View>
            </View>
            <SolidContainer containerStyle={styles.solidContainerStyle}>
              <Setting width={16} height={16} />
            </SolidContainer>
          </View>

          <CustomDatePicker
            showMonth={false}
            FetchMeal={async date => {
              setDate(date);
              await getWaterDetails(date);
            }}
          />

          <View style={{marginTop: 30}}>
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

          <View style={[styles.dailystepsText]}>
            <Text style={[styles.walk40percent]}>
              You have completed{'\n'}{' '}
              <Text style={{color: '#7265E3'}}>
                {totalwater == 0
                  ? '0% '
                  : `${((waterdrinked / totalwater) * 100).toFixed(0)}% `}
              </Text>
              of your Target
            </Text>
          </View>
          <View>
            <WaterWave
              percentage={50}
              current={waterdrinked}
              target={totalwater}
            />
          </View>

          {/* <View
          style={{
            width,
            height: width / 2,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
          }}>
          <CircleBar
            radius={100}
            strokeWidth={10}
            gradientColors={['#C58BF2', '#B4C0FE']}
            percentage={50}
            target={totalwater}
            current={waterdrinked}
          />
        </View> */}
          <View style={styles.bottomIcons}>
            <TouchableOpacity
              onPress={() => handleAddWater(containertype.capacity)}>
              {loading ? (
                <ActivityIndicator size={30} />
              ) : (
                <View style={styles.verticalIconsWater}>
                  <Array width={40} height={40} />
                  {containertype.name == 'cup' && (
                    <Mug width={40} height={56} />
                  )}
                  {containertype.name == 'glass' && (
                    <AddWater width={40} height={56} />
                  )}
                  {containertype.name == 'bottle' && (
                    <BKbottle width={40} height={56} />
                  )}

                  <SmallText style={styles.waterVolume}>
                    {containertype.capacity} ml
                  </SmallText>
                </View>
              )}
            </TouchableOpacity>
            <View style={styles.waterIcons}>
              <TouchableOpacity
                onPress={() => setContainertype({name: 'cup', capacity: 200})}>
                <Mug width={40} height={40} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  setContainertype({name: 'glass', capacity: 150})
                }>
                <Glass width={34} height={44} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  setContainertype({name: 'bottle', capacity: 500})
                }>
                <BKbottle width={20} height={44} />
              </TouchableOpacity>
            </View>
            {/* <View style={{alignItems: 'center'}}>
              <View style={{alignItems: 'center'}}>
                <SmallText style={styles.textStyles}>Week</SmallText>
                <GradientLine />
              </View>
              <SmallText style={styles.weekRange}>Jun 18 - Jun 24</SmallText>
            </View> */}
          </View>

          <View style={{gap: 20, paddingHorizontal: 20, marginBottom: 20}}>
            {/* <Card
            shadow={true}
            mesure="Drinking 300ml Water"
            time="About 3 minutes ago"
          /> */}
            {tempnotification?.map((n, idx) => {
              const date = new Date(n.recordedAt);
              const timestamp = date.getTime();
              const timediff = calculateTimeDifference(timestamp, Date.now());

              return (
                <Card
                  mesure={`Drinking ${n.amount} ml Water`}
                  time={`About ${timediff} ago`}
                  id={n.id}
                  key={idx}
                  handleTempDelete={handleDeleteTempnotifications}
                />
              );
            })}

            {/* <Card
            shadow={true}
            mesure="Drinking 300ml Water"
            time="About 3 minutes ago"
          />
          <Card mesure="Drinking 500ml Water" time="About 10 minutes ago" /> */}
          </View>

          {/* <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 10,
              width: '80%',
            }}>
            <Text style={{color: 'black', fontSize: 20, fontWeight: '600'}}>
              Water Intake
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
          </View> */}
          {/* 
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
                width: width - 40,
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
                <Text style={{fontSize: 16, fontWeight: 600}}>Total Drunk</Text>
                <Text>Friday</Text>
              </View>
              <View>
                <Text style={{color: 'white', fontSize: 15, fontWeight: 600}}>
                  14 Liters
                </Text>
              </View>
            </View>
          </View> */}

          <View style={styles.statsCard}>
            <View
              style={{
                flexDirection: 'row',
                borderTopWidth: 0.5,
                borderTopColor: '#979797',
                marginTop: 10,
                paddingTop: 10,
              }}>
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
                  {user?.water_target ? user?.water_target + ' ml' : '0 ml'}
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
                  Drunk
                </Text>
                <Text
                  style={{color: '#726EF0', fontSize: 15, textAlign: 'center'}}>
                  {waterdrinked + ' ml'}
                </Text>
              </View>
              <View style={{width: '33.3%', paddingHorizontal: 10}}>
                <Text
                  style={{fontSize: 15, color: '#333333', textAlign: 'center'}}>
                  Left
                </Text>
                <Text
                  style={{color: '#726EF0', fontSize: 15, textAlign: 'center'}}>
                  {user?.water_target
                    ? user?.water_target - waterdrinked + ' ml'
                    : '0 ml'}
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
                width: width - 50,
              }}
              colors={['#92A3FD', '#9DCEFF']}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(SCREENS.DASHBOARD);
                  // getAllDaysOfCurrentMonth();
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
      </ScrollView>
    </View>
  );
};

const Card = ({mesure, time, shadow, id, handleTempDelete}) => {
  const [options, setOptions] = useState(false);

  const toggleOptions = () => {
    setOptions(prev => !prev);
  };
  const handleDelete = async () => {
    await handleTempDelete(id);
  };
  return (
    <View style={[styles.cardContainer, {elevation: shadow ? 12 : 0}]}>
      <LatestPic />

      <View>
        <Text style={styles.cardText1}>{mesure}</Text>
        <Text style={styles.cardText2}>{time}</Text>
      </View>
      <TouchableOpacity
        onPress={() => toggleOptions()}
        style={{position: 'absolute', right: 15, top: 15}}>
        <ThreeDot width={18} height={18} />
      </TouchableOpacity>
      {options && (
        <View style={[styles.optionsContainer]}>
          <TouchableOpacity onPress={async () => await handleDelete()}>
            <MaterialCommunityIcons name="delete" color={'black'} size={25} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  containr: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  textStyles: {
    fontWeight: '800',
    fontSize: 16,
    color: 'rgba(29, 22, 23, 1)',
    textAlign: 'center',
  },
  weekRange: {
    fontWeight: '500',
    fontSize: 14,
    color: 'rgba(123, 111, 114, 1)',
    textAlign: 'center',
    marginTop: 20,
  },
  waterIcons: {
    flexDirection: 'row',
    width: width,
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 20,
    paddingHorizontal: 50,
  },
  verticalIconsWater: {
    alignItems: 'center',
    justifyContent: 'space-between',
    height: width / 2.5,
  },
  waterVolume: {
    color: 'rgba(173, 164, 165, 1)',
    fontWeight: '400',
    fontSize: 14,
  },
  bottomIcons: {
    height: height / 2.3,
    justifyContent: 'space-around',
  },
  solidContainerStyle: {
    borderRadius: 10,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
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
  walk40percent: {
    fontSize: 28,
    textAlign: 'center',
    fontWeight: '500',
    color: '#2D3142',
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

  cardContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: width - 40,
    height: 80,
    alignItems: 'center',
    padding: 15,
    gap: 10,
    borderRadius: 16,
    position: 'relative',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#fff',
    width: 30,
    height: 30,
    alignItems: 'center',
    borderRadius: 10,
    position: 'absolute',
    right: 50,
    top: 10,
    elevation: 12,
    width: 50,
    height: 40,
  },

  cardText1: {
    color: '#1D1617',
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 18,
  },

  cardText2: {
    color: '#A4A9AD',
    fontFamily: 'Poppins',
    fontSize: 10,
    fontWeight: '400',
    lineHeight: 15,
  },
  statsMainCard: {
    flexDirection: 'column',
    gap: 5,
  },

  statsCard: {
    height: height * 0.125,
    backgroundColor: '#F8F8F8',
    width: width * 0.9,
    borderRadius: 15,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,
  },
});
export default WaterDrink;
