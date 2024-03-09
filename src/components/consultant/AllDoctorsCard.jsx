import { View, Text, Image } from 'react-native'
import React from 'react'
import { FONTS } from '../../constants/Fonts'

export default function AllDoctorsCard({ name, designation, rating, profilePath }) {
    return (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image style={{ width: 70, height: 70, borderRadius: 15 }} source={profilePath} />
            <View style={{ flexDirection: "column", padding: 8, }}>
                <View>
                    <Text style={{ fontFamily: FONTS.FONT_POPPINS_MEDIUM, color: "#343965", fontSize: 15, textAlign: "left" }}>{name}</Text>
                    <Text style={{ fontFamily: FONTS.FONT_POPPINS_REGULAR, color: "#343965", fontSize: 12, }}>{designation}</Text>
                </View>
                <View style={{ alignItems: "flex-start" }}>
                    <View style={{ flexDirection: "row", gap: 6, alignItems: "center" }}>
                        <Image style={{ width: 13, height: 13, alignItems: "center" }} source={require("../../../assets/icons/Vector.png")} />
                        <Text style={{ fontFamily: FONTS.FONT_POPPINS_MEDIUM, color: "black", fontSize: 14 }}>{rating}</Text>
                    </View>
                </View>
            </View>
            <Image style={{ height: 70, borderRadius: 20, marginLeft: "auto" }} source={require("../../../assets/images/all-doctor-map.png")} />
        </View>
    )
}