import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const SmallProgressBar = ({bgColorInner,bgColorOuter,percentage}) => {
    return (
        <View style={[styles.outerBar,{backgroundColor:bgColorOuter,}]}>
            <View 
                style={[styles.innerBar,{backgroundColor:bgColorInner,width:`${percentage}%`,}]}
            />
        </View>
    )
}
const styles=StyleSheet.create({
    outerBar:{
        width:"100%",
        height:4,
        borderRadius:2
    },
    innerBar:{
        height:4,
        borderRadius:2
    }
})
export default SmallProgressBar