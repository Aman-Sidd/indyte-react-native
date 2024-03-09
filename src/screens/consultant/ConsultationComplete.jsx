import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import ScreenContainer from '../../components/container/ScreenContainer'
import Back from "../../../assets/icons/BackLeft.svg"
import { FONTS } from '../../constants/Fonts';
import PrescriptionCard from '../../components/consultant/PrescriptionCard';
const { width, height } = Dimensions.get('window');


export default function ConsultationComplete() {
    return (
        <ScreenContainer scroll paddingLeft={0} paddingRight={0}>
            <View style={styles.MainView}>
                <View style={{ borderColor: "#9a9cb2", borderWidth: 1, padding: 12, borderRadius: 10 }}>
                    <Back width={15} height={15} />
                </View>
                <Text style={styles.HeaderText}>Consultation</Text>
            </View>
            <View style={{ paddingVertical: 40, justifyContent: "center", alignItems: "center", gap: 10 }}>
                <Image source={require("../../../assets/images/completeCheck.png")} />
                <Text style={{ color: "#1AB095", fontSize: 20, fontFamily: FONTS.FONT_POPPINS_BOLD }}>Consultation Complete!</Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 10 }}>
                <View style={{ backgroundColor: "#ECF2FF", padding: 10, paddingHorizontal: 8, borderRadius: 30, marginVertical: 10, marginHorizontal: 10, flexDirection: "row", flex: 1 }}>
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
                <View style={{ padding: 27, paddingTop: 15, paddingBottom: 15, backgroundColor: "#ECF2FF", borderRadius: 25, gap: 0, textAlign: "center", justifyContent: "center", gap: 7 }}>
                    <Text style={{ fontFamily: FONTS.FONT_POPPINS_MEDIUM, textAlign: "center", color: "#343965", fontSize: 12 }}>Total time</Text>
                    <View style={{ flexDirection: 'row', justifyContent: "center", gap: 5, alignItems: "center" }}>
                        <Image style={{ width: 15, height: 15 }} source={require("../../../assets/images/Ellipse.png")} />
                        <Text style={{ fontFamily: FONTS.FONT_POPPINS_REGULAR, fontSize: 14, color: "#9a9cb2" }}>07:51</Text>
                    </View>
                </View>
            </View>
            <View style={{ paddingHorizontal: 25, paddingVertical: 25 }}>
                <Text style={{ fontFamily: FONTS.FONT_POPPINS_SEMIBOLD, color: "#343965", fontSize: 18 }}>Summary</Text>
                <Text style={{ lineHeight: 20, fontSize: 14, fontFamily: FONTS.FONT_POPPINS_REGULAR, color: "#9a9cb2", marginLeft: 14 }}>
                    Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit. Amet phasellus a enim sed. Sit
                    mattis sed hac turpis. Duis pharetra pellentesque
                    ligula vitae aliquet dui nisi.
                </Text>
            </View>
            <View style={{ marginBottom: 40 }}>
                <Text style={{ fontFamily: FONTS.FONT_POPPINS_SEMIBOLD, color: "#343965", fontSize: 18, paddingHorizontal: 25, paddingTop: 40 }}>Items prescribed</Text>
                <View>
                    <View style={{ padding: 10, paddingBottom: 0, marginLeft: "auto", marginRight: "auto" }}>
                        <Image style={{ height: 6, borderRadius: 9999, width: 60 }} source={require("../../../assets/images/bar.png")} />
                    </View>
                    <PrescriptionCard name={"Pronitol Edrocin"} dose={"30mg tablets"} price={"13"} decimalPrice={"00"} />
                    <PrescriptionCard name={"Pronitol Edrocin"} dose={"30mg tablets"} price={"13"} decimalPrice={"00"} />
                    <PrescriptionCard name={"Pronitol Edrocin"} dose={"30mg tablets"} price={"13"} decimalPrice={"00"} />
                    <PrescriptionCard name={"Pronitol Edrocin"} dose={"30mg tablets"} price={"13"} decimalPrice={"00"} />
                    <PrescriptionCard name={"Pronitol Edrocin"} dose={"30mg tablets"} price={"13"} decimalPrice={"00"} />
                </View>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center", marginBottom: 50 }}>
                <TouchableOpacity>
                    <View style={{
                        width: width / 1.2, justifyContent: "center", backgroundColor: "#585CE5", elevation: 8,
                        borderRadius: 30,
                        color: '#FAFBFF',
                        fontWeight: 300,
                        fontSize: 17,
                        elevation: 8,
                        alignItems: "center",
                        flexDirection: "row",
                    }}>
                        <Text
                            style={{
                                textAlign: 'center',
                                color: '#FAFBFF',
                                fontWeight: 300,
                                fontSize: 17,
                                padding: 20,
                                paddingLeft: 0,
                                paddingRight: 10
                            }}
                        >
                            Save Result
                        </Text>
                        <Image source={require('../../../assets/images/ArrowRight.png')} />
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
    HeaderText: {
        width: "80%",
        fontSize: 15,
        fontFamily: FONTS.FONT_POPPINS_REGULAR,
        color: "black",
        textAlign: "center",
    }
})