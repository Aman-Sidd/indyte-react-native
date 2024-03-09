import { View, Text } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';

const GradientContainer = ({colors,styles,children}) => {
    return (
        <LinearGradient
            start={{x: 0, y: 0}} end={{x: 1, y: 0}}
            colors={colors} style={styles}
        >
            {children}
        </LinearGradient>
    )
}

export default GradientContainer