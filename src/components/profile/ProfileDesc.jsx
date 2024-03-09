import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FONTS } from '../../constants/Fonts'

const ProfileDesc = ({ value, vauleOf, unit }) => {
    return (
        <View style={styles.Container}>
            <Text style={[{ textAlign: "center", fontSize: 14, color: "#92A3FD", fontFamily: FONTS.FONT_POPPINS_SEMIBOLD }]}>{value} {unit}</Text>
            <Text style={[{ textAlign: "center", fontSize: 12, color: "grey", fontFamily: FONTS.FONT_POPPINS_MEDIUM }]}>{vauleOf}</Text>
        </View>
    )
}

export default ProfileDesc

const styles = StyleSheet.create({
    Container: {
        paddingVertical: 10,
        borderWidth: 0.4,
        borderColor: "#D9D7D7",
        borderRadius: 8,
        width: "25%",

    }
})