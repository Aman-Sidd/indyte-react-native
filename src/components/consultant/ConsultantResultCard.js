import { View, Text, Image, Dimensions } from 'react-native'
import React from 'react'
import { FONTS } from '../../constants/Fonts'
const { width, height } = Dimensions.get('window');


export default function ConsultantResultCard({ name, designation, rating, profilePath, mapPath, status,containerStyle,statusStyle,mapImgStyle }) {
    let appointmentDetails;

    switch (status) {
        case 'finished':
            appointmentDetails = (
                <View style={{ padding: 25, marginTop: 15, backgroundColor: "#d1efea", borderRadius: 20, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 12,...statusStyle }}>
                    <Text style={{ fontFamily: FONTS.FONT_POPPINS_BOLD, color: "#1AB095", fontSize: 16 }}>Appointment Finished</Text>
                </View>
            );
            break;

        case 'canceled':
            appointmentDetails = (
                <View style={{ padding: 25, marginTop: 15, backgroundColor: "#ffe6e6", borderRadius: 20, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 12,...statusStyle }}>
                    <Text style={{ fontFamily: FONTS.FONT_POPPINS_BOLD, color: '#F15178', fontSize: 16 }}>Appointment canceled</Text>
                </View>
            );
            break;

        default:
            appointmentDetails = (
                <View style={{ padding: 25, marginTop: 15, backgroundColor: "#696ce8", borderWidth: 1, borderRadius: 20, borderColor: "#343965", flexDirection: "row", alignItems: "center", gap: 12,...statusStyle }}>
                    <Image style={{ width: 25, height: 25 }} source={require("../../../assets/images/outlinecalendar.png")} />
                    <Text style={{ fontFamily: FONTS.FONT_POPPINS_BOLD, color: '#fff', fontSize: 16}}>19 June 2021, 02.00 pm</Text>
                </View>
            );
            break;
    }

    return (
        <View style={{ backgroundColor: status === "canceled" && "#ECF2FF" || status === "finished" && "#ECF2FF" || "#585CE5", borderColor: status === "canceled" && "red" || status === "finished" && "#1AB095", height: 200, borderRadius: 25, padding: 12, marginRight: 10, borderWidth: 1, width:width,...containerStyle}}>
            <View style={{ flexDirection: "row", alignItems: "center", }}>
                <Image style={{ width: 80, height: 80, }} source={profilePath} />
                <View style={{ flexDirection: "column", padding: 8, }}>
                    <Text style={{ fontFamily: FONTS.FONT_POPPINS_MEDIUM, color: !status ? '#fff' : "black", fontSize: 15, textAlign: "left" }}>{name}</Text>
                    <Text style={{ fontFamily: FONTS.FONT_POPPINS_REGULAR, color: !status ? '#fff' : "black", fontSize: 12, }}>{designation}</Text>
                    <View style={{ gap: 6, flexDirection: "row", alignItems: "center" }}>
                        <Image style={{ width: 13, height: 13, alignItems: "center" }} source={mapPath} />
                        <Text style={{ fontFamily: FONTS.FONT_POPPINS_MEDIUM, color: !status ? '#fff' : "black", fontSize: 12 }}>{rating}</Text>
                    </View>
                </View>
                <Image style={{ width: 80, height: 80, borderRadius: 20, marginLeft: "auto",...mapImgStyle }} source={require("../../../assets/images/map.png")} />
            </View>
            {appointmentDetails}
        </View >
    )
}