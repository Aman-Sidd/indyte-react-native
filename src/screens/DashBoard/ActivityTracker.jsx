import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  ActivityIndicator,
  Modal,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
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
import TextMedium from '../../components/Text/TextMedium';
import PrimaryButton from '../../components/Button/PrimaryButton';
import {useDispatch, useSelector} from 'react-redux';
import {
  getProfileDetails,
  getUserMealLogByDate,
  getWaterLog,
  updateProfileDetails,
} from '../../services';
import LatestPic from '../../../assets/images/Latest-Pic.svg';
import ThreeDot from '../../../assets/icons/threedot.svg';
import {userSlice} from '../../store/userSlice';
import CustomToast from '../../components/common/Toast';
const {width, height} = Dimensions.get('window');
const ActivityTracker = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [filter, setFilter] = useState('DAILY');
  const [tempnotification, setTempnotifications] = useState([]);
  const [mealnotification, setMealnotifications] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [water, setWater] = useState(0);
  const [steps, setSteps] = useState(0);
  const user = useSelector(state => state.user.user);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const childRef = useRef(null);
  const [toastColorState, setToastColorState] = useState('');
  const [toastTextColorState, setToastTextColorState] = useState('white');
  const [toastMessage, setToastMessage] = useState('');
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
  const getWaterDetails = async (customdate = new Date()) => {
    try {
      const now = new Date(customdate); // This gets the current date and time
      const formattedDate = now.toISOString().split('T')[0];
      const userid = user.id;
      console.log(userid);
      const reswaterlogs = await getWaterLog(userid, formattedDate);

      if (reswaterlogs.data.waterIntakes) {
        setTempnotifications([...reswaterlogs.data.waterIntakes]);
        const sum = reswaterlogs.data.waterIntakes.reduce(
          (accumulator, currentObject) => {
            return accumulator + currentObject.amount;
          },
          0,
        );
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const UpdateData = async () => {
    setLoading(true);

    try {
      const reqBody = {
        water_target: water,
        step_target: steps,
      };
      console.log('reqBody', reqBody);
      const profileUpdate = await updateProfileDetails(user.id, reqBody);
      if (profileUpdate.data) {
        setLoading(false);
        setModalVisible(false);
        setToastMessage(profileUpdate.data.message);
        setToastTextColorState('white');
        setToastColorState('green');
        childRef.current.showToast();
        await getData();
      }
    } catch (error) {
      console.log(error);
      setToastMessage(error.response.data.message);
      setToastTextColorState('white');
      setToastColorState('red');
      childRef.current.showToast();
      setLoading(false);
    }
  };

  const getData = async () => {
    try {
      const userDetailsResp = await getProfileDetails();
      const userDetails = userDetailsResp.data;

      if (userDetails) {
        dispatch(userSlice.actions.userLogin(userDetails.user));
        setSteps(userDetails.user.step_target);
        setWater(userDetails.user.water_target);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };
  const setData = () => {
    if (user.step_target) {
      setSteps(user.step_target);
    } else {
      setSteps(0);
    }
    if (user.water_target) {
      setWater(user.water_target);
    } else {
      setWater(0);
    }
  };
  useEffect(() => {
    getWaterDetails(date);
    getMealLogs(date);
    setData();
  }, [date]);
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
  const getMealLogs = async (customdate = new Date()) => {
    try {
      const now = new Date(customdate); // This gets the current date and time
      const formattedDate = now.toISOString().split('T')[0];
      const userid = user.id;
      console.log(userid);
      const usermeallogs = await getUserMealLogByDate(userid, formattedDate);

      if (usermeallogs.data.data) {
        console.log(usermeallogs.data.data);
        setMealnotifications([...usermeallogs.data.data]);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };
  return (
    <ScreenContainer scroll={true}>
      <CustomToast
        toastColor={toastColorState}
        toastTextColor={toastTextColorState}
        toastMessage={toastMessage}
        ref={childRef}
      />
      <SolidContainer
        containerStyle={styles.solidContainerStyle}
        onPress={() => {
          navigation.goBack();
        }}>
        <Back width={16} height={16} />
      </SolidContainer>
      <View style={{alignItems: 'center'}}>
        <TextH4>Activity Tracker</TextH4>
      </View>

      <CustomDatePicker
        FetchMeal={async date => {
          await getWaterDetails(date);
          await getMealLogs(date);
        }}
      />
      <GradientContainer
        colors={['rgba(157, 206, 255, 0.2)', 'rgba(157, 206, 255, 0.2)']}
        styles={{
          padding: 20,
          borderRadius: 20,
          height: 180,
          justifyContent: 'space-around',
          marginVertical: 30,
        }}>
        <SolidContainer containerStyle={styles.continerTopStyles}>
          <TextH4>Today Target</TextH4>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
            }}>
            <GradientContainer
              colors={['#92A3FD', '#9DCEFF']}
              styles={styles.iconContainerStyle}>
              <Plus width={14} height={14} />
            </GradientContainer>
          </TouchableOpacity>
        </SolidContainer>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TargetContainerSubContainer
            number={water / 1000 + ' L'}
            label={'Water Intake'}
            image={<WaterGlass width={25} height={40} />}
          />
          <TargetContainerSubContainer
            number={steps?.toLocaleString('en-IN', {
              useGrouping: true,
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
            label={'Foot Steps'}
            image={<Shoes width={30} height={30} />}
          />
        </View>
      </GradientContainer>
      <SolidContainer
        containerStyle={styles.solidcontainer}
        onPress={() => navigation.navigate(SCREENS.MEDICINESTACK)}>
        <TextMedium style={{flexGrow: 1}}>Medicine Remainder</TextMedium>
        <PrimaryButton
          containerStyle={styles.targetButton}
          textStyle={styles.targetButtonText}
          title={'Check'}
          onPress={() => navigation.navigate(SCREENS.MEDICINESTACK)}
        />
      </SolidContainer>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  gap: 10,
                }}>
                <WaterGlass width={25} height={40} />
                <TextInput
                  placeholder="Water"
                  placeholderTextColor={'grey'}
                  style={[styles.InputFields, {width: '50%'}]}
                  onChangeText={value => setWater(parseInt(value ? value : 0))}
                  value={`${water}`}
                  keyboardType="numeric"
                />
              </View>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  gap: 10,
                }}>
                <Shoes width={25} height={40} />
                <TextInput
                  placeholder="Steps"
                  placeholderTextColor={'grey'}
                  style={[styles.InputFields, {width: '50%'}]}
                  onChangeText={value => setSteps(parseInt(value ? value : 0))}
                  value={`${steps}`}
                  keyboardType="numeric"
                />
              </View>

              {loading ? (
                <ActivityIndicator size={30} color={'blue'} />
              ) : (
                <TouchableOpacity style={styles.BtnUpdate} onPress={UpdateData}>
                  <Text style={styles.BtnText}>Update Data</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={styles.BtnUpdate}
                onPress={() => {
                  setModalVisible(false);
                  setLoading(false);
                }}>
                <Text style={styles.BtnText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}>
        <TextH4>Latest Activity</TextH4>
        <SmallText>See more</SmallText>
      </View>
      <View style={{gap: 20, marginBottom: 20}}>
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
      <View style={{gap: 20, marginBottom: 20}}>
        {/* <Card
            shadow={true}
            mesure="Drinking 300ml Water"
            time="About 3 minutes ago"
          /> */}
        {mealnotification?.map((n, idx) => {
          const date = new Date(n.createdAt);
          const timestamp = date.getTime();
          const timediff = calculateTimeDifference(timestamp, Date.now());

          return (
            <Card
              mesure={`Eat ${n?.mealTime} `}
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
      {/* <View style={{marginBottom: 20, paddingHorizontal: 5}}>
        <LatestActivityCard
          title={'Drinking 300ml Water'}
          timeago={'About 3 minutes ago'}
          bgcolor={'rgba(255,141,168,0.3)'}
          selected={true}
        />
        <LatestActivityCard
          title={'Eat Snack (Fitbar)'}
          timeago={'About 10 minutes ago'}
          bgcolor={'rgba(255,141,168,0.3)'}
        />
      </View> */}
    </ScreenContainer>
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
  targetButton: {
    width: 100,
    height: 40,
    elevation: 0,
  },
  targetButtonText: {
    fontSize: 14,
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  modalView: {
    width: '90%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  BtnUpdate: {
    width: '80%',
    borderRadius: 8,
    padding: 7,
    alignItems: 'center',
    backgroundColor: '#92A3FD',
    marginVertical: 5,
    paddingVertical: 10,
  },
  BtnText: {
    fontSize: 14,
    color: 'white',
    fontWeight: '800',
  },
  InputFields: {
    borderWidth: 1,
    width: '80%',
    marginVertical: '2%',
    borderRadius: 8,
    paddingHorizontal: 10,
    color: 'black',
  },
});
export default ActivityTracker;
