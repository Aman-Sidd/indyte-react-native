import { StyleSheet, Text, View,Dimensions } from 'react-native'
import React,{useState} from 'react'
import Header from '../../components/header/Header'
import DateTimePicker from 'react-native-modal-datetime-picker'
import Calendar from '../../../assets/icons/Calendar.svg'
import CalenderPicker from '../../components/Utils/CalenderPicker'
import PickerLabel from '../../components/Label/PickerLabel';
import CardSch from '../../components/Schedule/CardSch'
import Repetitions from '../../../assets/icons/Repetitions.svg'
import Barbel from '../../../assets/icons/Barbel.svg'
import ISwap from '../../../assets/icons/ISwap.svg'
import Arrow from '../../../assets/icons/Arrow.svg'
import { FONTS } from '../../constants/Fonts'
import PrimaryButton from '../../components/Button/PrimaryButton'
import TimePicker from '../../components/Utils/TimePicker';
import TimeCircle from '../../../assets/icons/TimeCircle'
const { width, height } = Dimensions.get('window');
function getFormattedTime(value){
    return value < 10 ? `0${value}`:value;
}
const AddSchedule = () => {
    const [date,setDate] = useState('');
    const [time,setTime] = useState({hr:'12',min:'0'})
  return (
    <View style={styles.body}>
      <Header title={"Add Schedule"} />
      <View>
      <CalenderPicker
                setDate={setDate}
                label={
                    <PickerLabel title={date?date:'Select Date'} 
                    icon={<Calendar width={22} height={22}/>}
                    />}
                />
      </View>
      <View>
        <Text style={styles.head}>Time</Text>
        <TimePicker
                setTime={time}
                label={<PickerLabel title={time?`${getFormattedTime(time.hr)}:${getFormattedTime(time.min)}`:'Select Time'}
                icon={<TimeCircle width={22} height={22}/>} />}
                />
      </View>
      <View>
        <Text style={styles.head}>Details Workout</Text>
        <CardSch value={"Choose Workout"} subvalue={"Upperbody Workout"} icon={<Barbel width={20} height={20}/>} icon2={<Arrow width={20} height={20}/>}/>
        <CardSch value={"Difficulty"} subvalue={"Beginner"} icon={<ISwap width={20} height={20}/>} icon2={<Arrow width={20} height={20}/>}/>
        <CardSch value={"Custom Repetitions"}  icon={<Repetitions width={20} height={20}/>} icon2={<Arrow width={20} height={20}/>}/>
        <CardSch value={"Custom Weights"}  icon={<Repetitions width={20} height={20}/>} icon2={<Arrow width={20} height={20}/>}/>
      </View>
      <View style={{ alignItems: "center", marginTop: "35%" }}>
                <PrimaryButton containerStyle={{ width: width - 70, }} title={'Save'} />
      </View>
    </View>
  )
}

export default AddSchedule

const styles = StyleSheet.create({
    body:{
        backgroundColor:"white",
        height:height,
        width:width
    },
    head:{
        color:"#1D1617",
        fontFamily:FONTS.FONT_POPPINS_MEDIUM,
        fontSize:14,
        marginHorizontal:24,
        marginBottom:20
    }
})