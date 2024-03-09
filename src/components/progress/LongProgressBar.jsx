import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import SmallText from '../Text/SmallText'
import LinearGradient from 'react-native-linear-gradient';

const LongProgressBar = ({colors,percentage}) => {
    return (
        <View style={[styles.outerBar]}>
            <LinearGradient
                style={[styles.innerBar,{width:`${percentage}%`,}]}
                start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                colors={colors}
            >
                <SmallText style={styles.barstyle}>
                    {percentage}%
                </SmallText>
            </LinearGradient>
        </View>
    )
}
const styles=StyleSheet.create({
    outerBar:{
        width:"100%",
        height:22,
        borderRadius:10,
        backgroundColor:"rgba(247, 248, 248, 1)",
    },
    innerBar:{
        borderTopLeftRadius:11,
        borderBottomLeftRadius:11,
        alignItems:"center",
        justifyContent:"center",
        height:"100%",
    },
    barstyle:{
        color:"white",
    }
})
export default LongProgressBar