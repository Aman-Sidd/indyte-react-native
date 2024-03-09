import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SmallText from '../Text/SmallText'
import LargeText from '../Text/LargeText'
import { FONTS } from '../../constants/Fonts'
import TextMedium from '../Text/TextMedium'

const WorkOutHeader = ({ title, ExerciseInformation }) => {
    return (
        <View style={{ marginHorizontal: "5%" }}>
            <LargeText style={{ fontFamily: FONTS.FONT_POPPINS_SEMIBOLD, color: "black", fontSize: 16 }}>{title}</LargeText>
            <TextMedium style={{ fontFamily: FONTS.FONT_POPPINS_REGULAR, color: "grey", fontSize: 12 }}>{ExerciseInformation}</TextMedium>
        </View>
    )
}

export default WorkOutHeader

const styles = StyleSheet.create({})