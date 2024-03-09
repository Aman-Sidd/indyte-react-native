import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';

const FloatingGradingButton = ({colors,conatinerStyle,children,onPress}) => {
    return (
        <TouchableOpacity onPress={onPress} >
            <LinearGradient
                start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                colors={colors} style={[conatinerStyle,styles.button]}>
                {children}
            </LinearGradient>
        </TouchableOpacity>
    )
}
const styles=StyleSheet.create({
    button:{
        width:60,
        height:60,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:30,
        position:"absolute",
        zIndex:1000,
        bottom:30,
        right:30
    }
})
export default FloatingGradingButton