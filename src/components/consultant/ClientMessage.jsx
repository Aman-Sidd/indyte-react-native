import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import { FONTS } from '../../constants/Fonts'
const { width, height } = Dimensions.get("window")


export default function ClientMessage({ message, date }) {
    return (
        <View style={{ alignItems: "flex-end", marginHorizontal: 20, paddingBottom: 10 }}>
            <View style={{ maxWidth: width / 1.15, alignItems: "flex-end" }}>
                <Text style={{ padding: 10, backgroundColor: "#6E71E5", fontFamily: FONTS.FONT_POPPINS_REGULAR, color: "#FAFBFF", fontSize: 14, borderRadius: 20, borderTopRightRadius: 0 }}>{message}</Text>
                <Text style={{ fontFamily: FONTS.FONT_POPPINS_REGULAR, color: "#343965", fontSize: 10, marginTop: 4 }}>{date}</Text>
            </View>
        </View>
    )
}