import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native'
import React from 'react'
const { width, height } = Dimensions.get('window');
import ScreenContainer from '../../components/container/ScreenContainer'
import Back from "../../../assets/icons/BackLeft.svg"
import { FONTS } from '../../constants/Fonts';
import { SCREENS } from '../../constants/Screens';


export default function ConfirmAppointment() {
    return (
        <ScreenContainer scroll paddingLeft={0} paddingRight={0}>
            <View style={styles.MainView}>
                <View style={{ borderColor: "#9a9cb2", borderWidth: 1, padding: 12, borderRadius: 10 }}>
                    <Back width={15} height={15} />
                </View>
            </View>
            <View style={{ paddingVertical: 40, justifyContent: "center", alignItems: "center", gap: 10 }}>
                <Image source={require("../../../assets/images/ConfirmCheck.png")} />
                <Text style={{ color: "#585CE5", fontSize: 20, fontFamily: FONTS.FONT_POPPINS_BOLD }}>Appoiment Confirmed!</Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 10 }}>
                <View style={{ backgroundColor: "#ECF2FF", padding: 5, paddingHorizontal: 8, borderRadius: 30, marginVertical: 10, marginHorizontal: 10, flexDirection: "row", flex: 1 }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Image style={{ width: 70, height: 70, borderRadius: 15 }} source={require("../../../assets/images/doctor.png")} />
                        <View style={{ flexDirection: "column", padding: 8, }}>
                            <View>
                                <Text style={{ fontFamily: FONTS.FONT_POPPINS_MEDIUM, color: "#343965", fontSize: 12, textAlign: "left" }}>Dr Samantha</Text>
                                <Text style={{ fontFamily: FONTS.FONT_POPPINS_REGULAR, color: "#9a9cb2", fontSize: 10, }}>Cardiologist</Text>
                            </View>
                            <View style={{ alignItems: "flex-start" }}>
                                <View style={{ flexDirection: "row", gap: 6, alignItems: "center" }}>
                                    <Image style={{ width: 13, height: 13, alignItems: "center" }} source={require("../../../assets/icons/Vector.png")} />
                                    <Text style={{ fontFamily: FONTS.FONT_POPPINS_MEDIUM, color: "black", fontSize: 10 }}>4.9</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <Image style={{ height: 80, borderRadius: 22 }} source={require("../../../assets/images/appointment_map.png")} />
            </View>
            <View style={{ borderBottomColor: "#9a9cb2", borderBottomWidth: 0.5, marginHorizontal: 40, paddingTop: 15 }} />

            <View style={{ flexDirection: "row", justifyContent: "center", width: width, marginHorizontal: 30 }}>
                <View style={{ flexDirection: "column", justifyContent: "flex-start", gap: 20, alignItems: "flex-start", padding: 20, paddingLeft: 10, width: width / 2 }}>
                    <View style={{ gap: 5 }}>
                        <Text style={{ fontFamily: FONTS.FONT_POPPINS_SEMIBOLD, color: "#343965", fontSize: 16 }}>Date</Text>
                        <Text style={{ fontFamily: FONTS.FONT_POPPINS_SEMIBOLD, fontSize: 14, paddingLeft: 10, color: "#9a9cb2" }}>Wed, 19 July 2021</Text>
                    </View>
                    <View style={{ gap: 5 }}>
                        <Text style={{ fontFamily: FONTS.FONT_POPPINS_SEMIBOLD, color: "#343965", fontSize: 16 }}>Appointment Type</Text>
                        <Text style={{ fontFamily: FONTS.FONT_POPPINS_SEMIBOLD, fontSize: 14, paddingLeft: 10, color: "#9a9cb2" }}>Online</Text>
                    </View>
                </View>
                <View style={{ flexDirection: "column", justifyContent: "flex-start", gap: 20, alignItems: "center", padding: 20, alignItems: "flex-start", width: width / 2 }}>
                    <View style={{ gap: 5 }}>
                        <Text style={{ fontFamily: FONTS.FONT_POPPINS_SEMIBOLD, color: "#343965", fontSize: 16 }}>Slots</Text>
                        <Text style={{ fontFamily: FONTS.FONT_POPPINS_SEMIBOLD, fontSize: 14, paddingLeft: 10, color: "#9a9cb2" }}>Afternoon</Text>
                    </View>
                    <View style={{ gap: 5 }}>
                        <Text style={{ fontFamily: FONTS.FONT_POPPINS_SEMIBOLD, color: "#343965", fontSize: 16 }}>Time</Text>
                        <Text style={{ fontFamily: FONTS.FONT_POPPINS_SEMIBOLD, fontSize: 14, paddingLeft: 10, color: "#9a9cb2" }}>02:00 pm</Text>
                    </View>
                </View>
            </View>

            <View style={{ borderBottomColor: "#9a9cb2", borderBottomWidth: 0.5, marginHorizontal: 40, paddingTop: 10 }} />

            <View style={{ padding: 20, gap: 10 }}>
                <Text style={{ fontFamily: FONTS.FONT_POPPINS_REGULAR, fontSize: 13, textAlign: "center" }}>
                    Your approximate waiting time is
                </Text>
                <View style={{ flexDirection: "row", gap: 2, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ backgroundColor: "#CDECEA", padding: 15, paddingVertical: 8, fontSize: 30, color: "#1AB095", borderRadius: 20, fontFamily: FONTS.FONT_POPPINS_MEDIUM }}>05</Text>
                    <Text style={{ padding: 5, fontSize: 30, color: "#343965", fontFamily: FONTS.FONT_POPPINS_MEDIUM }}>:</Text>
                    <Text style={{ backgroundColor: "#CDECEA", padding: 15, paddingVertical: 8, fontSize: 30, color: "#1AB095", borderRadius: 20, fontFamily: FONTS.FONT_POPPINS_MEDIUM }}>30</Text>
                </View>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center", marginTop: 30, marginBottom: 100 }}>
                <TouchableOpacity>
                    <View style={{
                        width: width / 1.8, justifyContent: "center", backgroundColor: "#585CE5", elevation: 8,
                        borderRadius: 30,
                        color: '#FAFBFF',
                        fontWeight: 300,
                        fontSize: 17,
                        elevation: 8,
                        alignItems: "center",
                        flexDirection: "row",
                    }}>
                        <Image source={require('../../../assets/images/alarm.png')} />
                        <Text
                            style={{
                                textAlign: 'center',
                                color: '#FAFBFF',
                                fontWeight: 300,
                                fontSize: 17,
                                padding: 20,
                                paddingLeft: 10,
                                paddingRight: 0
                            }}
                        >
                            Set Reminder
                        </Text>
                    </View>
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