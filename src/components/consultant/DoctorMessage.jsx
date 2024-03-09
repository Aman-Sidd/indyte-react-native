import { View, Text, Dimensions, Image } from 'react-native'
import React from 'react'
import { FONTS } from '../../constants/Fonts'
const { width, height } = Dimensions.get("window")


export default function DoctorMessage({message,date}) {
    return (
        <View style={{ alignItems: "flex-start", flexDirection: "row", gap: 10, marginHorizontal: 20, marginBottom: 10 }}>
            <Image style={{ width: 40, height: 40 }} source={require("../../../assets/images/doctorChatIcon.png")} />
            <View style={{ maxWidth: width / 1.2 }}>
                <Text style={{ padding: 10, backgroundColor: "#F0F5FF", fontFamily: FONTS.FONT_POPPINS_REGULAR, color: "#343965", fontSize: 14, borderRadius: 20, borderTopLeftRadius: 0 }}>{message}</Text>
                <Text style={{ fontFamily: FONTS.FONT_POPPINS_REGULAR, color: "#343965", fontSize: 10, marginTop: 4 }}>{date}</Text>
            </View>
        </View>
    )
}