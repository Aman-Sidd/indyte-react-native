import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
  Modal,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import SlideHeader from '../../components/header/SlideHeader';
import Step from '../../components/new-auth/Step';
import NewButtob from '../../components/Button/NewButtob';
import {TextInput} from 'react-native';
import {Dimensions} from 'react-native';
import {SCREENS} from '../../constants/Screens';
import {useRoute} from '@react-navigation/native';
import {useRef} from 'react';
import CustomToast from '../../components/common/Toast';
import TextH4 from '../../components/Text/TextH4';
import TextMedium from '../../components/Text/TextMedium';
import SmallText from '../../components/Text/SmallText';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {getAge} from '../../utils/common';
import GradientDropdown from '../../components/Utils/GradientDropdown';
import {GENDER} from '../../constants/Data';
import {registerUser} from '../../backend/utilFunctions';
import {launchImageLibrary} from 'react-native-image-picker';

const {width} = Dimensions.get('window');

const Email = ({navigation}) => {
  const route = useRoute();
  const data = route.params?.data;
  const [email, setEmail] = useState('');
  const childRef = useRef(null);
  const [toastColorState, setToastColorState] = useState('');
  const [toastTextColorState, setToastTextColorState] = useState('white');
  const [toastMessage, setToastMessage] = useState('');
  const [fullName, setfullName] = useState('');
  const [WeightVals, setWeightVals] = useState('');
  const [GoalWeightVals, setGoalWeightVals] = useState('');
  const [HeightVals, setHeightVals] = useState('');
  const [ImageData, setImageData] = useState(data);

  const [date, setDate] = useState('dd/mm/yyyy');
  const [actualDate, setActualDate] = useState(null);

  const [Gender, setGender] = useState(GENDER[0]?.label);
  const [GaolVal, setGaolVal] = useState(GOALS[0]?.label);
  const [heightUnit, setheightUnit] = useState(HEIGHT[0]?.label);
  const [WeightUnit, setWeightUnit] = useState(WEIGHT[0]?.label);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading1, setLoading1] = useState(false);

  const [galleryPhoto, setGalleryPhoto] = useState();
  const [Photo, setPhoto] = useState(false);
  const [photoResult, setPhotoResult] = useState(null);
  const [MainD, setMainD] = useState([]);
  let options = {
    saveToPhotos: true,
    mediaType: 'photo',
  };

  function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  }

  const handlePress1 = async () => {
    if (email.length < 1) {
      setToastMessage('Email is required');
      setToastTextColorState('white');
      setToastColorState('red');
      childRef.current.showToast();
      return;
    }

    if (!validateEmail(email)) {
      setToastMessage('Enter a valid email');
      setToastTextColorState('white');
      setToastColorState('red');
      childRef.current.showToast();
      return;
    }
    const final = JSON.stringify(actualDate);
    const yeh = final.slice(1, 11);
    console.log(yeh, 'mj');
    console.log(MainD, 'MAIND');
    const ImgData = {
      uri:
        MainD[0]?.uri || 'https://cdn-icons-png.flaticon.com/128/64/64572.png',
      name:
        MainD[0]?.fileName ||
        'https://cdn-icons-png.flaticon.com/128/64/64572.png',
      type: MainD[0]?.type || 'image/png',
    };
    // return
    console.log('====================================');
    console.log(Gender, WeightUnit, heightUnit);
    console.log('====================================');
    // return
    setLoading1(true);

    try {
      let datas = {
        ...data,
        weight_unit: WeightUnit,
        full_name: fullName,
        email: email,
        dob: yeh,
        password: '12345678899',
        gender: Gender,
        weight: WeightVals,
        weight_unit: WeightUnit,
        height: HeightVals,
        goal: GaolVal,
        goal_weight: GoalWeightVals,
        profile_image: ImgData,
        current_weight: WeightVals,
        height_unit: heightUnit,
      };

      console.log(datas, 'DATA');
      // return
      // const res = await registerUser({datas});
      // console.log(res);
      // if (res?.success == true) {
      //   navigation.navigate(SCREENS.LOGIN);
      //   setToastMessage('Account Created');
      //   setToastTextColorState('white');
      //   setToastColorState('green');
      //   childRef.current.showToast();
      //   setLoading1(false);
      // } else {
      //   setToastMessage(res?.message);
      //   setToastTextColorState('white');
      //   setToastColorState('red');
      //   childRef.current.showToast();
      //   setLoading1(false);
      // }
    } catch (error) {
      console.log(error);
      setToastMessage(error?.message);
      setToastTextColorState('white');
      setToastColorState('red');
      childRef.current.showToast();
      setLoading1(false);
    }
    // navigation.navigate(SCREENS.NPASSWORD, { data: { ...data, email } })
  };

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handlePress = () => {
    if (actualDate === null) {
      setToastMessage('Date of birth is requires');
      setToastTextColorState('white');
      setToastColorState('red');
      childRef.current.showToast();
      return;
    }

    console.log(actualDate);
    const final = JSON.stringify(actualDate);
    const yeh = final.slice(1, 11);
    console.log(yeh, 'mj');
    // navigation.navigate(SCREENS.PROFILEIMAGE, { data: { ...data, dob: yeh } });
  };
  const handleConfirm = date => {
    console.log('date', date);
    if (Number(getAge(date)) < 5) {
      console.log('TEST');
      setToastMessage('Age should be least 5 year');
      setToastTextColorState('white');
      setToastColorState('red');
      childRef.current.showToast();
      hideDatePicker();
      return;
    }
    console.log('====================================');
    console.log('KKKKKKKKKkk', date);
    console.log('====================================');
    setActualDate(date);
    const year = date.getFullYear();
    const month = 1 + date.getMonth();
    const day = date.getDate();
    console.log(year, 'YEAR');
    const new_date = day + ' / ' + month + ' / ' + year;
    console.log(new_date, 'NEWDATE');
    setDate(new_date);
    hideDatePicker();
  };

  const OpenGallery = async () => {
    try {
      setPhoto(false);
      const result = await launchImageLibrary(options);
      setMainD(result?.assets);
      console.log(MainD, 'I am main');
      const data = result.assets[0].uri;
      setPhotoResult(
        result && result.assets && result.assets[0] ? result.assets[0] : null,
      );
      setGalleryPhoto(data);
      setPhoto(true);
    } catch (error) {
      setPhotoResult(null);
      console.log(error, 'error');
      setPhoto(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{alignItems: 'center', marginTop: '5%', marginVertical: 20}}>
        <TextH4>Welcome</TextH4>
        <TextMedium>We just need your following Information</TextMedium>
      </View>
      <View style={{alignItems: 'center'}}>
        {galleryPhoto ? (
          <Image
            source={{uri: galleryPhoto}}
            style={{width: 100, height: 100, borderRadius: 70, borderWidth: 1}}
          />
        ) : (
          <View
            style={{
              borderRadius: 100,
              borderWidth: 1,
              padding: 50,
              backgroundColor: 'white',
            }}>
            {/* <Text>hii</Text> */}
          </View>
        )}
        <TouchableOpacity onPress={OpenGallery}>
          <TextMedium style={{color: '#7265E3', marginVertical: '2%'}}>
            Add Photo
          </TextMedium>
        </TouchableOpacity>
      </View>

      <View style={{marginHorizontal: 20}}>
        <SmallText>Full Name</SmallText>
        <TextInput
          keyboardType="Name"
          onChangeText={text => setfullName(text)}
          style={styles.input}
          placeholder="Name"
        />
        <SmallText>Email Address</SmallText>
        <TextInput
          keyboardType="email-address"
          onChangeText={text => setEmail(text)}
          style={styles.input}
          placeholder="email-address"
        />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity style={{width: '45%'}}>
            <SmallText>DOB</SmallText>
            <TouchableOpacity
              onPress={showDatePicker}
              style={{backgroundColor: 'white'}}>
              <Text
                style={{
                  borderWidth: 1,
                  paddingVertical: 14,
                  borderRadius: 10,
                  paddingHorizontal: 15,
                }}>
                {date}
              </Text>
            </TouchableOpacity>
            {/* <TextInput
              onChangeText={(text) => setEmail(text)} value={date} style={styles.input} placeholder='Date of birth' /> */}
          </TouchableOpacity>
          <View style={{width: '45%'}}>
            <SmallText>Gender</SmallText>
            {/* <TextInput
              keyboardType='email-address'
              onChangeText={(text) => setEmail(text)} style={styles.input} /> */}
            <GradientDropdown
              Tryies={false}
              data={GENDER}
              value={Gender}
              setValue={setGender}
              placeholder="Select Gender"
              containerStyle={{width: 150, height: 45, borderRadius: 10}}
            />
          </View>
        </View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{width: '30%'}}>
            <SmallText>Current Weight</SmallText>
            <TextInput
              keyboardType="numeric"
              onChangeText={text => setWeightVals(text)}
              style={styles.input}
              placeholder="Weight"
            />
          </View>
          <View style={{width: '30%'}}>
            <SmallText>Goal Weight</SmallText>
            <TextInput
              keyboardType="numeric"
              onChangeText={text => setGoalWeightVals(text)}
              style={styles.input}
              placeholder="Goal Wei"
            />
          </View>
          <GradientDropdown
            Tryies={false}
            data={WEIGHT}
            value={WeightUnit}
            setValue={setWeightUnit}
            placeholder="Weight Unit"
            containerStyle={{
              width: '30%',
              height: 50,
              borderRadius: 10,
              marginTop: 20,
              marginHorizontal: 10,
            }}
          />
        </View>
        <View style={{}}>
          <SmallText>Goal</SmallText>
          {/* <TextInput
              keyboardType='email-address'
              onChangeText={(text) => setEmail(text)} style={styles.input} /> */}
          <GradientDropdown
            Tryies={false}
            data={GOALS}
            value={GaolVal}
            setValue={setGaolVal}
            placeholder="Select Goal"
            containerStyle={{width: '100%', height: 45, borderRadius: 10}}
          />
        </View>
        <View
          style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <View style={{width: '45%'}}>
            <SmallText>Height</SmallText>
            <TextInput
              keyboardType="numeric"
              placeholder="Height"
              onChangeText={text => setHeightVals(text)}
              style={styles.input}
            />
          </View>
          <GradientDropdown
            Tryies={false}
            data={HEIGHT}
            value={heightUnit}
            setValue={setheightUnit}
            placeholder="Height Unit"
            containerStyle={{
              width: '50%',
              height: 50,
              borderRadius: 10,
              marginTop: 20,
              marginHorizontal: 10,
            }}
          />
        </View>

        <View
          style={{alignItems: 'center', marginTop: '15%', marginVertical: 20}}>
          <NewButtob
            loading={loading1}
            title={'Sign Up'}
            onPress={handlePress1}
          />
        </View>
      </View>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={[styles.modalView, {height: 180}]}>
              <Text style={styles.modalText}>Choose your weight!</Text>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <ScrollView
                  style={{width: 60, height: 100}}
                  showsVerticalScrollIndicator={false}>
                  {WeiData.map((item, index) => (
                    <Text style={{paddingVertical: 10, textAlign: 'center'}}>
                      {item?.weightVal}
                    </Text>
                  ))}
                </ScrollView>
                <ScrollView
                  style={{width: 10, height: 100}}
                  showsVerticalScrollIndicator={false}>
                  {['kg', 'lbs'].map((item, index) => {
                    return (
                      <Text style={{paddingVertical: 10, textAlign: 'center'}}>
                        {item}
                      </Text>
                    );
                  })}
                </ScrollView>
              </View>
              <Pressable
                style={{alignSelf: 'flex-end', marginHorizontal: 30}}
                onPress={() => {
                  setModalVisible(false);
                }}>
                <Text style={{fontSize: 15, color: 'green', fontWeight: '600'}}>
                  DONE
                </Text>
              </Pressable>
              {/* <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable> */}
            </View>
          </View>
        </Modal>
        {/* <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.textStyle}>Show Modal</Text>
        </Pressable> */}
      </View>
      <CustomToast
        toastColor={toastColorState}
        toastTextColor={toastTextColorState}
        toastMessage={toastMessage}
        ref={childRef}
      />
    </ScrollView>
  );
};

export default Email;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F4F6FA',
    flex: 1,
    // alignItems: 'center',
  },

  inputContainer: {
    backgroundColor: '#fff',
    width: 283,
    marginTop: 30,
    elevation: 20,
    borderRadius: 16,
    paddingHorizontal: 20,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },

  input: {
    // height: '100%',
    borderWidth: 1,
    color: '#7265E3',
    fontFamily: 'Rubik-Regular',
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 0.4,
    width: '100%',
    textTransform: 'lowercase',
    borderRadius: 10,
    marginBottom: '5%',
    marginRight: 10,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },

  heading: {
    color: '#2D3142',
    textAlign: 'center',
    fontFamily: 'Rubik-Regular',
    fontSize: 24,
    fontWeight: '500',
    lineHeight: 32,
    width: 281,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    // padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: 400,
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
    marginTop: 15,
  },
});

export const GOALS = [
  {label: 'Weight loss', value: 'Weight loss'},
  {label: 'Better sleeping habit', value: 'Better sleeping habit'},
  {label: 'Track my nutrition', value: 'Track my nutrition'},
  {label: 'Improve overall fitness', value: 'Improve overall fitness'},
];

export const HEIGHT = [
  {label: 'cm', value: 'cm'},
  {label: 'ft', value: 'ft'},
];

export const WEIGHT = [
  {label: 'kg', value: 'kg'},

  {label: 'lbs', value: 'lbs'},
];
const WeiData = [
  {
    id: '1',
    weightVal: "5'1''",
  },
  {
    id: '1',
    weightVal: "5'2''",
  },
  {
    id: '1',
    weightVal: "5'3''",
  },
  {
    id: '1',
    weightVal: "5'4''",
  },
  {
    id: '1',
    weightVal: "5'5''",
  },
  {
    id: '1',
    weightVal: "5'6''",
  },
  {
    id: '1',
    weightVal: "5'7''",
  },
  {
    id: '1',
    weightVal: "5'8''",
  },
  {
    id: '1',
    weightVal: "5'9''",
  },
  {
    id: '1',
    weightVal: "6'0''",
  },
  {
    id: '1',
    weightVal: "6'1''",
  },
  {
    id: '1',
    weightVal: "6'2''",
  },
];
