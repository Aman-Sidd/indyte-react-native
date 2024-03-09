import { View, Text, ScrollView, RefreshControl, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Header from '../../components/header/Header'
import SolidContainer from '../../components/container/SolidContainer'
import LargeText from '../../components/Text/LargeText'
import { StyleSheet } from 'react-native'
import { FONTS } from '../../constants/Fonts'
import DropdownPicker from '../../components/Utils/DropdownPicker'
import Calendar from "../../../assets/icons/Calendar.svg"
import ListBullet from '../../components/list/ListBullet'
import ActivePassiveList from '../../components/list/ActivePassiveList'
import TimelineList from '../../components/list/TimelineList'
import ConsultantResultCard from '../../components/consultant/ConsultantResultCard'
import ScreenContainer from '../../components/container/ScreenContainer'
import { SCREENS } from '../../constants/Screens'

const { width, height } = Dimensions.get('window');

export default function AppointmentHistory({ navigation }) {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
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
    return (
        <ScreenContainer
            scroll={true}
            paddingLeft={0}
            paddingRight={0}
            style={{ backgroundColor: 'black', padding: 0 }}
            refreshControl={
                <RefreshControl />
            }>
            <Header title={'Appointment history'} />
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
                        marginBottom: 0,
                        height: 100,
                        gap: 50
                    }}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                        <View style={{ borderWidth: 2, borderColor: "#DFE1FB", borderRadius: 15, padding: 5, paddingLeft: 8, paddingRight: 8 }}><Calendar width={30} height={40} /></View>
                        <Text style={{ fontFamily: FONTS.FONT_POPPINS_BOLD, color: '#343965', fontSize: 40 }}>19</Text>
                        <View>
                            <LargeText
                                style={{
                                    fontFamily: FONTS.FONT_POPPINS_REGULAR,
                                    color: '#343965',
                                }}>
                                Wednesday
                            </LargeText>
                            <Text style={{ fontFamily: FONTS.FONT_POPPINS_SEMIBOLD, color: '#343965', }}>June 2021</Text>
                        </View>
                    </View>
                    <DropdownPicker
                        // data={WORKOUTS}
                        // setValue={setFilter}
                        // value={filter}
                        width={'40%'}
                        containerStyle={{
                            borderRadius: 30,
                            height: 40,
                            color: 'black',
                            borderWidth: 1,
                            borderColor: "#DFE1FB"
                        }}
                        gradient={false}
                        selectedTextStyle={{ color: 'white' }}
                    />
                </SolidContainer>
                <View style={{ marginVertical: 20 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginLeft: "auto", gap: 10 }}>
                        <View style={{ height: 220 }}>
                            <TimelineList title={'19'} subtitle={'Wed'} isTodaysDate={true} />
                        </View>
                        <View style={{ flexDirection: "column", width: width / 1.2 }}>
                            <TouchableOpacity onPress={() => navigation.navigate(SCREENS.CONSULTATIONRESULT)}>

                                <ConsultantResultCard name={"Dr. Samantha"} designation={"Cardiologist"} rating={"4.9"} profilePath={require("../../../assets/images/doctor.png")} mapPath={require("../../../assets/icons/Vector.png")} containerStyle={{ width: width / 1.25 }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginLeft: "auto", gap: 10 }}>
                        <TimelineList title={'18'} subtitle={'Tue'} showDate={false} />
                        <View style={{ flexDirection: "column", width: width / 1.2 }}>

                            <TouchableOpacity onPress={() => navigation.navigate(SCREENS.CONSULTATIONRESULT)}>
                                <ConsultantResultCard name={"Dr. Daniel"} designation={"Dermatologist"} rating={"4.9"} profilePath={require("../../../assets/images/doctor1.png")} mapPath={require("../../../assets/icons/Vector.png")} containerStyle={{ width: width / 1.25 }} status={"finished"} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginLeft: "auto", gap: 10 }}>
                        <TimelineList title={'17'} subtitle={'Mon'} outerRingStyle={{ backgroundColor: "#fff", borderColor: "#DFE1FB", borderWidth: 2 }} />
                        <View style={{ flexDirection: "column", width: width / 1.2 }}>
                            <TouchableOpacity onPress={() => navigation.navigate(SCREENS.CONSULTATIONRESULT)}>
                                <ConsultantResultCard name={"Dr. Daniel"} designation={"Dermatologist"} rating={"4.9"} profilePath={require("../../../assets/images/doctor1.png")} mapPath={require("../../../assets/icons/Vector.png")} containerStyle={{ width: width / 1.25 }} status={"canceled"} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginLeft: "auto", gap: 10 }}>
                        <TimelineList title={'16'} subtitle={'Sun'} outerRingStyle={{ backgroundColor: "#fff", borderColor: "#DFE1FB", borderWidth: 2 }} />
                        <View style={{ flexDirection: "column", width: width / 1.2 }}>
                            <TouchableOpacity onPress={() => navigation.navigate(SCREENS.CONSULTATIONRESULT)}>
                                <ConsultantResultCard name={"Dr. Samantha"} designation={"Cardiologist"} rating={"4.9"} profilePath={require("../../../assets/images/doctor.png")} mapPath={require("../../../assets/icons/Vector.png")} containerStyle={{ width: width / 1.25 }} status={"finished"} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </ScreenContainer>
    )
}

const styles = StyleSheet.create({
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
});