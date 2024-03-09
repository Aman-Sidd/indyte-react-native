import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native'
import React from 'react'
const { width, height } = Dimensions.get('window');
import ScreenContainer from '../../components/container/ScreenContainer.jsx'
import Back from "../../../assets/icons/BackLeft.svg"
import { FONTS } from '../../constants/Fonts.js';
import CustomDatePicker from '../../components/common/CustomDatePicker.jsx';
import AppointmentBtn from '../../components/consultant/AppointmentBtn.jsx';
import DropdownPicker from '../../components/Utils/DropdownPicker.js';
import { SCREENS } from '../../constants/Screens.js';


export default function ConfirmingAppointment() {
    return (
        <ScreenContainer scroll paddingLeft={0} paddingRight={0}>
            <View style={styles.MainView}>
                <View style={{ borderColor: "#9a9cb2", borderWidth: 1, padding: 12, borderRadius: 10 }}>
                    <Back width={15} height={15} />
                </View>
            </View>

            <View style={{ marginHorizontal: 20, flexDirection: "row", gap: 10, height: 330 }}>
                <Image style={{ width: 200, height: 350 }} source={require("../../../assets/images/doctorProfile.png")} />
                <View style={{ marginTop: 40 }}>
                    <Text style={{ fontFamily: FONTS.FONT_POPPINS_SEMIBOLD, color: "#343965", fontSize: 17, textAlign: "left" }}>Dr. Samantha</Text>
                    <Text style={{ fontFamily: FONTS.FONT_POPPINS_REGULAR, color: "#343965", fontSize: 14, textAlign: "left" }}>Cardiologist</Text>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ backgroundColor: "#fee9dd", padding: 5, width: 28, height: 28, borderRadius: 8, alignItems: 'center', justifyContent: "center", marginRight: 6 }}>
                            <Image style={{ width: 15, height: 15 }} source={require("../../../assets/icons/Vector.png")} />
                        </View>
                        <View>
                            <Text style={{ flexDirection: "column", fontSize: 8 }}>Rating</Text>
                            <Text style={{ flexDirection: "column", fontSize: 12, fontFamily: FONTS.FONT_POPPINS_SEMIBOLD, }}>4.9</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ backgroundColor: "#e6e6ff", padding: 5, width: 28, height: 28, borderRadius: 8, alignItems: 'center', justifyContent: "center", marginRight: 6 }}>
                            <Image style={{ width: 15, height: 15 }} source={require("../../../assets/icons/health.png")} />
                        </View>
                        <View>
                            <Text style={{ flexDirection: "column", fontSize: 8 }}>Experience</Text>
                            <Text style={{ flexDirection: "column", fontSize: 12, fontFamily: FONTS.FONT_POPPINS_SEMIBOLD, }}>8 years+</Text>
                        </View>
                    </View>
                    <Image style={{ width: width / 3, height: 135, borderRadius: 22, marginTop: 12 }} source={require("../../../assets/images/appointment_map.png")} />
                </View>
            </View>
            <View style={{ marginTop: 20, marginHorizontal: 40, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <Text style={{ fontFamily: FONTS.FONT_POPPINS_SEMIBOLD, color: "#343965", fontSize: 18 }}>Schedule</Text>
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
            </View>
            <CustomDatePicker showMonth={false} />

            <View style={{ marginTop: 20, marginHorizontal: 40, flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between" }}>
                <Text style={{ fontFamily: FONTS.FONT_POPPINS_SEMIBOLD, color: "#343965", fontSize: 18 }}>Slots</Text>
                <View style={{ flexDirection: "row", paddingVertical: 15 }}>
                    <AppointmentBtn name={"Morning"} />
                    <AppointmentBtn name={"Afternoon"} textStyles={{ backgroundColor: "#585CE5", color: "#FAFBFF" }} isChecked={true} />
                    <AppointmentBtn name={"Evening"} textStyles={{ backgroundColor: "#DFE1FB", color: "#9a9cb2", borderColor: "#DFE1FB" }} />
                </View>
            </View>
            <View style={{ marginTop: 20, marginHorizontal: 40, flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between" }}>
                <Text style={{ fontFamily: FONTS.FONT_POPPINS_SEMIBOLD, color: "#343965", fontSize: 18 }}>Time</Text>
                <View style={{ flexDirection: "row", paddingVertical: 15 }}>
                    <AppointmentBtn name={"02:00 pm"} textStyles={{ backgroundColor: "#585CE5", color: "#FAFBFF" }} isChecked={true} />
                    <AppointmentBtn name={"02:20 pm"} />
                    <AppointmentBtn name={"02:40 pm"} />
                </View>
            </View>
            <View style={{ marginVertical: 10,  marginHorizontal: 40, flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between" }}>
                <Text style={{ fontFamily: FONTS.FONT_POPPINS_SEMIBOLD, color: "#343965", fontSize: 18 }}>Appointment Type</Text>
                <View style={{ flexDirection: "row", paddingVertical: 15 }}>
                    <AppointmentBtn name={"Online"} textStyles={{ backgroundColor: "#585CE5", color: "#FAFBFF" }} isChecked={true} />
                    <AppointmentBtn name={"Offline"} />
                </View>
            </View>
            <View
                style={{
                    justifyContent: 'flex-start',
                    marginVertical: 30,
                    paddingTop: 10,
                    marginBottom: 60,
                    height: 100,
                    // position: "absolute",
                    bottom: -20,
                    width,
                    alignItems: "center",
                    backgroundColor: "white",
                    elevation: 1,
                    zIndex: 1,
                    borderRadius:40
                }}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate(SCREENS.DASHBOARD);
                    }}>
                    <Text
                        style={{
                            textAlign: 'center',
                            color: '#FAFBFF',
                            fontWeight: 300,
                            fontSize: 17,
                            padding: 20,
                            width: width * 9.5 / 10,
                            backgroundColor: "#585CE5",
                            elevation: 8,
                            borderRadius: 30,
                        }}>
                        Confirm Appointment
                        <Image source={require('../../../assets/images/ArrowRight.png')} />
                    </Text>
                </TouchableOpacity>
            </View>
        </ScreenContainer>
    )
}

const styles = StyleSheet.create({
    MainView: {
        width: width,
        // height: height / 12,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 30,
    },
})