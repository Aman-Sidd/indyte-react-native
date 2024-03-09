import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { FONTS } from '../../constants/Fonts'


const ProgressReaminderCard = ({ Date }) => {
    return (
        <View style={styles.Container}>
            <Image source={require('../../../assets/images/alarmPR.png')} style={styles.ALarmImage} />
            <View style={{ marginLeft: "3%" }}>
                <Text style={styles.Remainder}>Remainder</Text>
                <Text style={styles.DateRemainder}>Next Photos Fall On {Date}</Text>
            </View>
            <View style={{ marginLeft: "auto", marginBottom: 45, marginRight: 5 }}>
                <Image source={require("../../../assets/icons/x.png")} style={{ width: 18, height: 18 }} />
            </View>
        </View>
    )
}

export default ProgressReaminderCard

const styles = StyleSheet.create({
    ALarmImage: {
        width: 60,
        height: 60
    },
    Container: {
        marginHorizontal: 20,
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 15,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFCBCB",
        elevation: 10,
        shadowColor: "red"
    },
    Remainder: {
        color: 'red',
        fontFamily: FONTS.FONT_POPPINS_REGULAR,
        fontSize: 12
    },
    DateRemainder: {
        fontSize: 14,
        fontFamily: FONTS.FONT_POPPINS_BOLD,
        color: "black"
    }
})