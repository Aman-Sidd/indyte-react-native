import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import TextH4 from '../Text/TextH4'
import WhiteGraph from '../../../assets/icons/WhiteGraph.svg'
import { COLORS } from '../../constants/Colors';
import { FONTS } from '../../constants/Fonts';
import TextMedium from '../Text/TextMedium';
import LargeText from '../Text/LargeText';
const { width, height } = Dimensions.get('window');
const SleepMeasureCard = ({ title, SleepTime }) => {
    return (
        <View style={{ backgroundColor: COLORS.PRIMARY_BUTTON_GRADIENT.BLUE1, marginHorizontal: 20, borderRadius: 15, }}>
            <View style={{ marginHorizontal: 15, marginVertical: 15 }}>
                <LargeText style={{ color: "white", FontSize: FONTS.FONT_POPPINS_MEDIUM, marginBottom: 5 }}>{title}</LargeText>
                <LargeText style={{ color: "white", FontSize: FONTS.FONT_POPPINS_BOLD }}>{SleepTime}</LargeText>
            </View>
            <WhiteGraph width={width} height={80} />
        </View>

    )
}

export default SleepMeasureCard

const styles = StyleSheet.create({})