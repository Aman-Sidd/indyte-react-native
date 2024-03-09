import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FONTS } from '../../constants/Fonts'

const SubscriptionCard = ({ icon, PlanType, Price, backGroundColor }) => {
    return (
        <View style={[styles.Container, { backgroundColor: backGroundColor }]}>
            <View style={{}}>
                <Text style={{ fontSize: 17, fontFamily: FONTS.FONT_POPPINS_SEMIBOLD, color: 'black' }}>{PlanType}</Text>
                <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ fontFamily: FONTS.FONT_POPPINS_SEMIBOLD, color: "black", fontSize: 30 }}>{Price}</Text>
                    <Text style={{ fontFamily: FONTS.FONT_POPPINS_REGULAR, color: "grey" }}>/month</Text>
                </View>
            </View>
            {
                icon
            }
        </View>
    )
}

export default SubscriptionCard

const styles = StyleSheet.create({
    Container: {
        marginHorizontal: "7%",
        // borderWidth: 1,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        paddingVertical: 20,
        borderRadius: 20,
        marginVertical: "5%"

    }
})