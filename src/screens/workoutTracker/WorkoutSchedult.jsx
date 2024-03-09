import { StyleSheet, Touchable, View, } from 'react-native';
import ScreenContainer from '../../components/container/ScreenContainer';
import SolidContainer from '../../components/container/SolidContainer';
import TextH4 from '../../components/Text/TextH4';
import CustomDatePicker from '../../components/common/CustomDatePicker';

import Back from '../../../assets/icons/Back.svg'
import TwoDot from '../../../assets/icons/twodot.svg';
import Add from '../../../assets/icons/plus.svg';
import FloatingGradingButton from '../../components/Button/FloatingGradingButton';
import WorkoutSchedultCompleteModal from '../../components/workout/WorkoutSchedultCompleteModal';
import { useRef } from 'react';
import { WorkoutSchedult } from '../../data/workoutSchedultData';
import { Dimensions } from 'react-native';
import SmallText from '../../components/Text/SmallText';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SCREENS } from '../../constants/Screens';

const { width } = Dimensions.get('window');

const WorkoutSchedule = () => {
    const schedulerRef = useRef(null);
  const navigation = useNavigation()
    return (
        <>
            <ScreenContainer scroll={true}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <SolidContainer containerStyle={styles.solidContainerStyle}>
                        <Back width={16} height={16} />
                    </SolidContainer>
                    <View style={{ alignItems: "center" }}>
                        <TextH4 >Workout Schedule</TextH4>
                    </View>
                    <SolidContainer containerStyle={styles.solidContainerStyle}>
                        <TwoDot width={16} height={16} />
                    </SolidContainer>
                </View>
                <CustomDatePicker />
                {
                    WorkoutSchedult.map((schedule) => (
                        <TouchableOpacity style={styles.timeWorkoutBox} onPress={() => schedulerRef.current.showScheduleModal()} >
                            <SmallText>{schedule.time}</SmallText>
                            {
                                schedule.workoutname &&
                                <View style={styles.containerStyle}>
                                    <LinearGradient
                                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                        colors={schedule.isDone ? ['rgba(197, 139, 242, 1)', 'rgba(238, 164, 206, 1)'] : ['rgba(247, 248, 248, 1)', 'rgba(247, 248, 248, 1)']} style={styles.container}
                                    >
                                        <SmallText style={{ color: schedule.isDone ? "white" : "black" }} >{schedule.workoutname}</SmallText>
                                    </LinearGradient>
                                </View>
                            }
                        </TouchableOpacity>
                    ))
                }
                <WorkoutSchedultCompleteModal ref={schedulerRef} />
            </ScreenContainer>
            <FloatingGradingButton onPress={()=>{navigation.navigate(SCREENS.ADDSHCEDULE)}} colors={['rgba(197, 139, 242, 1)', 'rgba(238, 164, 206, 1)']}>
                <Add width={25} height={25} />
            </FloatingGradingButton>
        </>
    );
}

const styles = StyleSheet.create({
    solidContainerStyle: {
        borderRadius: 10,
        width: 32,
        height: 32,
        alignItems: "center",
        justifyContent: "center",
    },
    timeWorkoutBox: {
        backgroundColor: "white",
        width: width,
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: "#F7F8F8",
        marginTop: 5,
        justifyContent: "space-between",
        flexDirection: "row",
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    container: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 30,
        alignSelf: "center",
        paddingHorizontal: 25,
        paddingVertical: 10,
        marginRight: 50,
    }
})
export default WorkoutSchedule;

