import { View, Text, Image } from 'react-native'
import React from 'react'
import { FONTS } from '../../constants/Fonts'

export default function DoctorCard({ name, designation, rating, experience, imagePath }) {

    return (
        <View style={{ marginRight:10, backgroundColor: "#ECF2FF", width: 230, height: 360, justifyContent: "center", alignItems: "center", borderRadius: 20 }}>
            <Image style={{ width: 200, height: 300, position: 'relative', borderRadius: 20 }} source={imagePath} />
            <View style={{ alignItems: "center", justifyContent: "center" }}>
                <View style={{ position: "absolute", top: -60, left: -60, alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ fontFamily: FONTS.FONT_POPPINS_SEMIBOLD, color: "#fff", fontSize: 17, textAlign: "center" }}>{name}</Text>
                    <Text style={{ fontFamily: FONTS.FONT_POPPINS_REGULAR, color: "#fff", fontSize: 14, textAlign: "left" }}>{designation}</Text>
                </View>
            </View>


            <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", gap: 20, marginRight: 10,marginTop:10 }}>
                <View style={{ flexDirection: "row",gap:10 }}>
                    <View style={{ backgroundColor: "#fee9dd", padding: 5, width: 28, height: 28, borderRadius: 8, alignItems: 'center', justifyContent: "center", }}>
                        <Image style={{ width: 15, height: 15 }} source={require("../../../assets/icons/Vector.png")} />
                    </View>
                    <View>
                        <Text style={{ flexDirection: "column", fontSize: 8 }}>Rating</Text>
                        <Text style={{ flexDirection: "column", fontSize: 14, fontFamily: FONTS.FONT_POPPINS_BOLD, }}>{rating}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: "row",gap:10 }}>
                    <View style={{ backgroundColor: "#dedefa", padding: 5, width: 28, height: 30, borderRadius: 8, alignItems: 'center', justifyContent: "center", }}>
                        <Image style={{ width: 15, height: 15 }} source={require("../../../assets/icons/health.png")} />
                    </View>
                    <View>
                        <Text style={{ flexDirection: "column", fontSize: 8 }}>experience</Text>
                        <Text style={{ flexDirection: "column", fontSize: 14, fontFamily: FONTS.FONT_POPPINS_SEMIBOLD, }}>{experience} years+</Text>
                    </View>
                </View>
            </View>

        </View>
    )
}