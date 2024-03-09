import { View, Text } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../../constants/Colors';

const GradientLine = () => {
    return (
        <LinearGradient
            style={{width:35,height:4}}
            start={{x: 0, y: 0}} end={{x: 1, y: 0}}
            colors={[COLORS.PRIMARY_BUTTON_GRADIENT.BLUE1,COLORS.PRIMARY_BUTTON_GRADIENT.BLUE2]}>
        </LinearGradient>
    )
}

export default GradientLine