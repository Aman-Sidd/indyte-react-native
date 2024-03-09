import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import { FONTS } from '../../constants/Fonts'
import SmallText from '../Text/SmallText'

export default function TimelineList({ height = 220, width , title = "", subtitle = "", showDate = true, isTodaysDate = false, outerRingStyle }) {
    return (
        <View style={[styles.container, { height, width }]}>
            <View>
                {showDate && <View style={{ ...styles.outerRing, ...outerRingStyle }}>
                    <Text style={{ fontFamily: FONTS.FONT_POPPINS_BOLD, color: isTodaysDate ? '#fff' : "black", fontSize: 20, textAlign: "center" }}>
                        {title}
                    </Text>
                    <SmallText style={{ fontFamily: FONTS.FONT_POPPINS_REGULAR, color: isTodaysDate ? '#fff' : "black", fontSize: 13, textAlign: "center" }}>{subtitle}</SmallText>
                </View>}
                {showDate && <View style={[styles.line,]} />}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 1,
        height: 100,
        flexDirection: 'row',
        marginLeft: 10,
    },
    outerRing: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 80,
        borderRadius: 20,
        backgroundColor: "#585CE5",
    },
    innerRing: {
        position: 'absolute',
        width: 10,
        height: 10,
        borderRadius: 9999,
    },
    line: {
        width: 1,
        borderLeftWidth: 2,
        borderStyle: 'solid',
        borderColor: "#DFE1FB",
        left: '45%',
        height: 500,
    }
})