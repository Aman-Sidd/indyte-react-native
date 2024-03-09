import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TextMedium from '../Text/TextMedium'
import SmallText from '../Text/SmallText'
import ArrowRight from '../../../assets/icons/ArrowRight.svg'
const WorkoutOption = ({ title, icon, Time, backgroundColor }) => {
    return (
        <View style={[styles.MainContainer, { backgroundColor: backgroundColor }]}>
            <View style={{ width: '10%', alignItems: "center" }}>
                {icon}
            </View>
            <TextMedium style={{ width: "50%", marginLeft: "2%" }}>{title}</TextMedium>
            <SmallText style={{ width: "30%" }} >{Time}</SmallText>
            <ArrowRight width={16} height={16} color={"black"} />
        </View>
    )
}

export default WorkoutOption

const styles = StyleSheet.create({
    MainContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        // justifyContent: "space-around",
        marginHorizontal: "5%",
        marginVertical: "3%",
        paddingVertical: "3%",
        borderRadius: 15,
        backgroundColor: "#9DCEFF"
    }
})