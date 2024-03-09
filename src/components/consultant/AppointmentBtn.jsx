import { View, Text } from 'react-native'
import React from 'react'
import { FONTS } from '../../constants/Fonts'

export default function AppointmentBtn({ name, textStyles, isChecked = false, dotStyles }) {
    return (
        <View style={{ position: "relative" }}>
            <Text style={{
                color: "#343965", borderColor: "#9a9cb2", fontSize: 15, fontFamily: FONTS.FONT_POPPINS_MEDIUM, borderWidth: 1, padding: 8, paddingHorizontal: 18, borderRadius: 15,
                marginRight: 10, ...textStyles, textAlign: "center"
            }}>{name}</Text>
            {isChecked && <View style={{ width: 13, height: 13, backgroundColor: "#FF805D", borderRadius: 999, borderColor: "white", borderWidth: 2, position: "absolute", bottom: -7, left: 44, ...dotStyles }} />}

        </View>
    )
}