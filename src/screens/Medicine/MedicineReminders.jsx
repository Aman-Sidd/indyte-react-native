import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import ScreenContainer from '../../components/container/ScreenContainer';
import DropdownPicker from '../../components/Utils/DropdownPicker';

import {
  BeforeOrAfterMeal,
  MEDICINES,
  MONTHS,
  MedicineType,
  REPEAT,
} from '../../constants/Data';
import {useState} from 'react';
import PrimaryButton from '../../components/Button/PrimaryButton';
import TextCenterHeader from '../header/TextCenterHeader';
import BackSvg from '../../../assets/icons/ArrowLeft.svg';
import LoadMoreSvg from '../../../assets/icons/MoreSquare.svg';
import TextMedium from '../../components/Text/TextMedium';
import TimePicker from '../../components/Utils/TimePicker';
import BedSvg from '../../../assets/icons/Icon-Bed.svg';
import ClockSvg from '../../../assets/icons/Icon-Time.svg';
import RepeatSvg from '../../../assets/icons/Icon-Repeat.svg';
import VibrateSvg from '../../../assets/icons/Icon-Vibrate.svg';
import ArrowRightSvg from '../../../assets/icons/Icon-Arrow.svg';
import PickerLabel from '../../components/Label/PickerLabel';
import UserSvg from '../../../assets/icons/User.svg';
import Bed from '../../../assets/icons/Icon-Bed.svg';
import {SCREENS} from '../../constants/Screens';
import {useNavigation} from '@react-navigation/native';
import PickerLabelTwo from '../../components/Label/PIckerLabelTwo';
import GradientSwitch from '../../components/common/GradientSwitch';
import {useSelector} from 'react-redux';
import {createMedicine} from '../../backend/utilFunctions';
import {createMedicineRemainder} from '../../services';
import {TextInput} from 'react-native-paper';
import {FONTS} from '../../constants/Fonts';
import {SIZES} from '../../constants/Size';

function getFormattedTime(value) {
  return value < 10 ? `0${value}` : value;
}
function MedicineReminder(props) {
  const user = useSelector(state => state.user.user);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const [name, setName] = useState('Paracetamol');
  const [quantity, setQuantity] = useState('1 tablet');
  const [time, setTime] = useState({hr: '12', min: '0'});
  const [beforeOrAfterMeal, setBeforeOrAfterMeal] = useState('Before');
  const [medType, setMedtype] = useState('Tablet');
  const [repeat, setRepeat] = useState('mon-fri');
  const [type, setType] = useState();
  const [loading, setLoading] = useState(false);

  const [vibrate, setVibrate] = useState(false);

  function convertTo12HourFormat(timeString) {
    // Split the timeString into hours and minutes
    const [hours, minutes] = timeString.split(':');

    // Check if the hour is 24
    if (hours === '24') {
      return '12:00 AM';
    }

    // Convert the hour to 12-hour format
    let hour12 = parseInt(hours, 10);
    const period = hour12 >= 12 ? 'PM' : 'AM';

    // Convert hours to 12-hour format
    if (hour12 > 12) {
      hour12 -= 12;
    } else if (hour12 === 0) {
      hour12 = 12;
    }

    // Return the formatted time string
    return `${hour12.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')} ${period}`;
  }

  const handleAddRemainder = async () => {
    try {
      setLoading(true);
      const reqBody = {
        userId: user.id,
        name,
        quantity,
        date: new Date().toISOString().split('T')[0],
        time: convertTo12HourFormat(time.hr + ':' + time.min),
        beforeOrAfterMeal,
        medType,
      };

      const addmedicine = await createMedicineRemainder(reqBody);
      if (addmedicine.data) {
        console.log('remainder', addmedicine.data);
        setLoading(false);
        navigation.navigate(SCREENS.MEDICINEFINAL);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.response.data);
    }
  };

  const handleCommonTextChanges = (type, value) => {};

  return (
    <ScreenContainer flex={1}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              value={type == 'name' ? name : quantity}
              onChangeText={text => {
                type == 'name' ? setName(text) : setQuantity(text);
              }}
              style={{
                height: 40,
                borderColor: 'gray',
                borderWidth: 1,
                paddingLeft: 10,
                borderRadius: 5,
                width: 200,
                backgroundColor: 'white',
              }}
            />

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <TextCenterHeader
        icon1={<BackSvg width={20} height={20} />}
        icon2={<LoadMoreSvg width={20} height={20} />}
        title="Add Reminder"
      />

      <View style={styles.content}>
        <View style={{marginBottom: 15}}>
          <TouchableOpacity
            onPress={() => {
              setType('name');
              setModalVisible(true);
            }}>
            <View
              style={{
                marginHorizontal: 1,
                padding: 20,
                borderRadius: 10,
                backgroundColor: '#F7F8F8',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row', gap: 10}}>
                <Bed width={20} height={20} />
                <Text
                  style={{
                    fontFamily: FONTS.FONT_POPPINS_MEDIUM,
                    fontSize: SIZES.INPUT_FONT_SIZE,
                    color: 'black',
                  }}>
                  Name
                </Text>
              </View>
              <Text style={{color: 'grey'}}>{name}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{marginBottom: 15}}>
          <TouchableOpacity
            onPress={() => {
              setType('quantity');
              setModalVisible(true);
            }}>
            <View
              style={{
                marginHorizontal: 1,
                padding: 20,
                borderRadius: 10,
                backgroundColor: '#F7F8F8',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row', gap: 10}}>
                <Bed width={20} height={20} />
                <Text
                  style={{
                    fontFamily: FONTS.FONT_POPPINS_MEDIUM,
                    fontSize: SIZES.INPUT_FONT_SIZE,
                    color: 'black',
                  }}>
                  Quantity
                </Text>
              </View>
              <Text style={{color: 'grey'}}>{quantity}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{marginBottom: 15}}>
          <TouchableOpacity onPress={() => {}}>
            <PickerLabelTwo
              dropdownLabel="Select"
              data={BeforeOrAfterMeal}
              dropdown={true}
              repeat={beforeOrAfterMeal}
              setRepeat={setBeforeOrAfterMeal}
              title={`Before or After Meal`}
              icon={<Bed width={20} height={20} />}
              text={`Paracetamol`}
              icon2={<ArrowRightSvg width={20} height={20} />}
            />
          </TouchableOpacity>
        </View>
        <View style={{marginBottom: 15}}>
          <TouchableOpacity onPress={() => {}}>
            <PickerLabelTwo
              dropdownLabel="Select"
              data={MedicineType}
              dropdown={true}
              repeat={medType}
              setRepeat={setMedtype}
              title={`Medicine Type`}
              icon={<Bed width={20} height={20} />}
              text={`Paracetamol`}
              icon2={<ArrowRightSvg width={20} height={20} />}
            />
          </TouchableOpacity>
        </View>

        <View style={{marginBottom: 15}}>
          <TimePicker
            setTime={setTime}
            label={
              <PickerLabel
                title={`Time `}
                icon={<BedSvg width={20} height={20} />}
              />
            }
            label2={`${getFormattedTime(time.hr)}:${getFormattedTime(
              time.min,
            )}`}
          />
        </View>
        <View style={{marginBottom: 15}}>
          <TouchableOpacity onPress={() => {}}>
            <PickerLabelTwo
              data={REPEAT}
              title={`Repeat`}
              icon={<RepeatSvg width={20} height={20} />}
              text={repeat}
              icon2={<ArrowRightSvg width={20} height={20} />}
              repeat
              setRepeat
              dropdown={true}
            />
          </TouchableOpacity>
        </View>
        <View style={{marginBottom: 15}}>
          <TouchableOpacity onPress={() => {}}>
            <PickerLabelTwo
              title={`Vibrate When Alarm Sound`}
              icon={<VibrateSvg width={20} height={20} />}
              component={<GradientSwitch />}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <PrimaryButton onPress={handleAddRemainder} title={'Add'} />
        )}
      </View>
    </ScreenContainer>
  );
}
const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    gap: 20,
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
    borderRadius: 10,
    width: 150,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'black',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
});
export default MedicineReminder;
