import React from 'react';
import {View, StyleSheet, Text, ActivityIndicator} from 'react-native';
import ScreenContainer from '../../components/container/ScreenContainer';
import CustomToast from '../../components/common/Toast';
import {MONTHS} from '../../constants/Data';
import {useState, useRef} from 'react';
import PrimaryButton from '../../components/Button/PrimaryButton';
import TextCenterHeader from '../header/TextCenterHeader';
import BackSvg from '../../../assets/icons/ArrowLeft.svg';
import LoadMoreSvg from '../../../assets/icons/MoreSquare.svg';
import TextMedium from '../../components/Text/TextMedium';
import TimePicker from '../../components/Utils/TimePicker';
import BedSvg from '../../../assets/icons/Icon-Bed.svg';
import PickerLabel from '../../components/Label/PickerLabel';
import {SCREENS} from '../../constants/Screens';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {spleepIntake} from '../../services';

function getFormattedTime(value) {
  return value < 10 ? `0${value}` : value;
}
function Reminders(props) {
  const navigation = useNavigation();
  const [bedTime, setBedTime] = useState({hr: '12', min: '0'});
  const [wakeUp, setWakeUp] = useState({hr: '12', min: '0'});
  function convertToTimeString(time) {
    const date = new Date();
    date.setHours(parseInt(time.hr, 10));
    date.setMinutes(parseInt(time.min, 10));
    const hours = date.getHours();
    const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
    const minutes = date.getMinutes();
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const period = hours >= 12 ? 'PM' : 'AM';
    return `${formattedHours}:${formattedMinutes}${period}`;
  }
  const user = useSelector(state => state.user.user);
  const childRef = useRef(null);
  const [toastColorState, setToastColorState] = useState('');
  const [toastTextColorState, setToastTextColorState] = useState('white');
  const [toastMessage, setToastMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddReminder = async () => {
    try {
      setLoading(true);
      const reqBody = {
        userId: user.id,
        bedtime: convertToTimeString(bedTime),
        wakeUpTime: convertToTimeString(wakeUp),
        recordedAt: new Date().toISOString(),
      };
      console.log(reqBody);
      const response = await spleepIntake(reqBody);
      if (response.data) {
        setLoading(false);
        setToastMessage('Sleep chedule have been added successfully');
        setToastTextColorState('white');
        setToastColorState('green');

        childRef.current.showToast();

        navigation.navigate(SCREENS.SLEEPFINALMODAL);
      }
      setLoading(false);
    } catch (error) {
      console.log(error.response.data);
      setLoading(false);
      setToastMessage(error.response.data.error);
      setToastTextColorState('white');
      setToastColorState('red');

      childRef.current.showToast();
    }
  };
  return (
    <ScreenContainer flex={1}>
      <TextCenterHeader
        icon1={<BackSvg width={20} height={20} />}
        icon2={<LoadMoreSvg width={20} height={20} />}
        title="Reminders"
      />
      <CustomToast
        toastColor={toastColorState}
        toastTextColor={toastTextColorState}
        toastMessage={toastMessage}
        ref={childRef}
      />
      <View style={styles.content}>
        <TextMedium style={{marginBottom: 10}}>Choose a Bedtime</TextMedium>
        <TimePicker
          setTime={setBedTime}
          label={
            <PickerLabel
              title={`BedTime `}
              icon={<BedSvg width={20} height={20} />}
            />
          }
          label2={`${getFormattedTime(bedTime.hr)}:${getFormattedTime(
            bedTime.min,
          )}`}
        />
        <TimePicker
          setTime={setWakeUp}
          label={
            <PickerLabel
              title={`Wakeup `}
              icon={<BedSvg width={20} height={20} />}
            />
          }
          label2={`${getFormattedTime(wakeUp.hr)}:${getFormattedTime(
            wakeUp.min,
          )}`}
        />
      </View>
      {!loading ? (
        <PrimaryButton
          onPress={() => {
            // navigation.navigate(SCREENS.SLEEPFINALMODAL)
            handleAddReminder();
          }}
          title={'Add'}
        />
      ) : (
        <ActivityIndicator />
      )}
    </ScreenContainer>
  );
}
const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
  },
});
export default Reminders;
