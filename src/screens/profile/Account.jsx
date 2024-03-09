import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Alert,
  Modal,
  Pressable,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useContext, useRef, useEffect} from 'react';
import Header from '../../components/header/Header';
import ProfileCard from '../../components/profile/ProfileCard';
import Group from '../../../assets/icons/Group.svg';
import Age from '../../../assets/icons/Age.svg';
import Weight from '../../../assets/icons/Weight.svg';
import Height from '../../../assets/icons/Height.svg';
import Gender from '../../../assets/icons/Gender.svg';
import Edit from '../../../assets/icons/Edit.svg';
import {FONTS} from '../../constants/Fonts';
import {GlobalContext} from '../../../App';
import {formatDate, getAge} from '../../utils/common';
import {updateUser} from '../../backend/utilFunctions';
import CalenderPicker from '../../components/Utils/CalenderPicker';
import PickerLabel from '../../components/Label/PickerLabel';
import Calendar from '../../../assets/icons/Calendar.svg';
import UserSvg from '../../../assets/icons/User.svg';
import {
  FOOD_TYPE,
  GENDERS,
  HEIGHT_UNIT,
  WEIGHT_UNIT,
} from '../../constants/Data';
import DropdownPicker from '../../components/Utils/DropdownPicker';
import CustomToast from '../../components/common/Toast';
import {getProfileDetails, updateProfileDetails} from '../../services';
import {useDispatch, useSelector} from 'react-redux';
import {userSlice} from '../../store/userSlice';
const {width, height} = Dimensions.get('window');

const Account = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const {user, setLoggedInUser} = useContext(GlobalContext);
  const [age, setAge] = useState(12);
  const [weight, setWeight] = useState(50);
  const [weight_unit, setWeight_Unit] = useState('');
  const [height, setHeight] = useState('');
  const [height_unit, setHeight_unit] = useState();
  const [gender, setGender] = useState();
  const [foodType, setFoodType] = useState('');
  const [date, setDate] = useState(formatDate());
  const [selectedInput, setSelectedInput] = useState('');
  const [selectedData, setSelectedData] = useState({
    gender: {value: ''},
    weight: {value: '', unit: 'weight_unit', weight_unit: ''},
    height: {value: '', unit: 'height_unit', height_unit: ''},
    food: {vlaue: ''},
  });
  const [loading, setLoading] = useState(false);
  const childRef = useRef(null);
  const [toastColorState, setToastColorState] = useState('');
  const [toastTextColorState, setToastTextColorState] = useState('white');
  const [toastMessage, setToastMessage] = useState('');
  const tempuser = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  const assignData = () => {
    setGender(tempuser.gender);
    setHeight(tempuser.height);
    setHeight_unit(tempuser.height_unit);
    setWeight(tempuser.weight);
    setWeight_Unit(tempuser.weight_unit);
  };

  useEffect(() => {
    assignData();
  }, []);

  const UpdateData = async () => {
    setLoading(true);

    try {
      const reqBody = {
        weight,
        height,
        weight_unit,
        height_unit,
        gender,
      };
      console.log('reqBody', reqBody);
      const profileUpdate = await updateProfileDetails(tempuser.id, reqBody);
      if (profileUpdate.data) {
        setLoading(false);
        setModalVisible(false);
        setToastMessage(profileUpdate.data.message);
        setToastTextColorState('white');
        setToastColorState('green');
        childRef.current.showToast();
        await getData();
        assignData();
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
      console.log(userDetails);
      console.log('user details', tempuser);
      if (userDetails) {
        dispatch(userSlice.actions.userLogin(userDetails.user));
        console.log(userDetails.user);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.Mainview}>
      <CustomToast
        toastColor={toastColorState}
        toastTextColor={toastTextColorState}
        toastMessage={toastMessage}
        ref={childRef}
      />
      <Header title={'Profile'} />
      <ScrollView>
        <View style={styles.profile}>
          <View style={{marginHorizontal: 30, marginTop: 30}}>
            <Text
              style={[
                {
                  fontSize: 15,
                  color: '#1D1617',
                  fontFamily: FONTS.FONT_POPPINS_SEMIBOLD,
                },
              ]}>{`${tempuser?.name}`}</Text>
            <Text
              style={[
                {
                  fontSize: 13,
                  color: '#1D1617',
                  fontFamily: FONTS.FONT_POPPINS_REGULAR,
                },
              ]}>{`${tempuser?.email}`}</Text>
          </View>
          {/* <Edit style={{ marginTop: 35, marginHorizontal: 40 }} /> */}
        </View>

        <Text
          style={[
            {
              fontSize: 16,
              color: '#1D1617',
              fontFamily: FONTS.FONT_POPPINS_SEMIBOLD,
              marginHorizontal: 40,
            },
          ]}>
          Your Information
        </Text>
        <View style={{marginVertical: 20, marginBottom: '20%'}}>
          <ProfileCard
            type={'Food Type'}
            value={'Vegan'}
            icon={<Group width={20} height={20} />}
            onPress={() => {
              setModalVisible(true);
              setSelectedInput('food');
            }}
          />
          {/* <ProfileCard
            type={'Age'}
            value={`${age} yo`}
            icon={<Age width={20} height={20} />}
            onPress={() => {
              setModalVisible(true);
              setSelectedInput('age');
            }}
          /> */}
          <ProfileCard
            type={'Weight'}
            value={`${tempuser?.weight} ${tempuser?.weight_unit}`}
            icon={<Weight width={20} height={20} />}
            onPress={() => {
              setModalVisible(true);
              setSelectedInput('weight');
            }}
          />
          <ProfileCard
            type={'Height'}
            value={`${tempuser?.height} ${tempuser?.height_unit}`}
            icon={<Height width={20} height={20} />}
            onPress={() => {
              setModalVisible(true);
              setSelectedInput('height');
            }}
          />
          <ProfileCard
            type={'Gender'}
            value={tempuser?.gender}
            icon={<Gender width={20} height={20} />}
            onPress={() => {
              setModalVisible(true);
              setSelectedInput('gender');
            }}
          />
        </View>
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
                {selectedInput === 'food' && (
                  <DropdownPicker
                    width={'80%'}
                    marginBottom={5}
                    data={FOOD_TYPE}
                    value={foodType}
                    setValue={setFoodType}
                    placeholder="Choose food type"
                    icon={<UserSvg width={20} height={20} />}
                  />
                )}

                {selectedInput === 'age' && (
                  <CalenderPicker
                    setDate={setDate}
                    width={'80%'}
                    label={
                      <PickerLabel
                        title={date ? date : 'Date of Birth'}
                        icon={<Calendar width={20} height={20} />}
                      />
                    }
                  />
                )}

                {selectedInput === 'weight' && (
                  <View
                    style={{
                      width: '100%',
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      gap: 10,
                    }}>
                    <TextInput
                      placeholder="Weight (in kgs)"
                      placeholderTextColor={'grey'}
                      style={[styles.InputFields, {width: '50%'}]}
                      onChangeText={value =>
                        setWeight(parseInt(value ? value : 0))
                      }
                      value={`${weight}`}
                      keyboardType="numeric"
                    />

                    <DropdownPicker
                      width={'25%'}
                      marginBottom={5}
                      data={WEIGHT_UNIT}
                      value={weight_unit}
                      setValue={setWeight_Unit}
                      placeholder="Unit"
                    />
                  </View>
                )}

                {selectedInput === 'height' && (
                  <View
                    style={{
                      width: '100%',
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      gap: 10,
                    }}>
                    <TextInput
                      placeholder="Height (in ft.)"
                      placeholderTextColor={'grey'}
                      style={[styles.InputFields, {width: '50%'}]}
                      keyboardType="numeric"
                      onChangeText={value => setHeight(parseInt(value))}
                      value={`${height}`}
                    />

                    <DropdownPicker
                      width={'25%'}
                      marginBottom={5}
                      data={HEIGHT_UNIT}
                      value={height_unit}
                      setValue={setHeight_unit}
                      placeholder="Unit"
                    />
                  </View>
                )}

                {selectedInput === 'gender' && (
                  <DropdownPicker
                    width={'80%'}
                    marginBottom={5}
                    data={GENDERS}
                    value={gender}
                    setValue={setGender}
                    placeholder="Choose Gender"
                    icon={<UserSvg width={20} height={20} />}
                  />
                )}

                {loading ? (
                  <ActivityIndicator size={30} color={'blue'} />
                ) : (
                  <TouchableOpacity
                    style={styles.BtnUpdate}
                    onPress={UpdateData}>
                    <Text style={styles.BtnText}>Update Data</Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  style={styles.BtnUpdate}
                  onPress={() => {
                    setModalVisible(false);
                    setSelectedInput('');
                    setLoading(false);
                    setGender(tempuser.gender);
                    setHeight(tempuser.height);
                  }}>
                  <Text style={styles.BtnText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  Mainview: {
    backgroundColor: 'white',
    height: height,
    width: width,
  },
  profile: {
    height: 118,
    width: 315,
    backgroundColor: '#ECEFFF',
    marginBottom: 30,
    borderRadius: 22,
    alignSelf: 'center',
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  InputFields: {
    borderWidth: 1,
    width: '80%',
    marginVertical: '2%',
    borderRadius: 8,
    paddingHorizontal: 10,
    color: 'black',
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
});
