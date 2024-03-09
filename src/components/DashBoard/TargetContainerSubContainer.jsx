import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

import GradientText from '../Text/GradientText';

import SmallText from '../Text/SmallText';
import TextH4 from '../Text/TextH4';

const TargetContainerSubContainer = ({number,label,image}) => {
    return (
        <View style={styles.container}>
            {
                image
            }
            <View style={{marginLeft:10,marginVertical:5,height:"100%",}}>
                <GradientText x={0} y={23} fontSize={"20"} text={number} colors={['#92A3FD', '#9DCEFF',]} />
                <SmallText style={styles.boxLabel}>{label}</SmallText>
            </View>
        </View>
    )
}
const styles=StyleSheet.create({
    container:{
        backgroundColor:"rgba(255, 255, 255, 1)",
        width:'47%',
        padding:15,
        flexDirection:"row",
        borderRadius:15,
        alignItems:"center",
        justifyContent:"center",
        height:80
    },
    boxLabel:{
        color:"rgba(123, 111, 114, 1)",
        fontWeight:"400",
        fontSize:12,
        marginTop:-22
    }
})
export default TargetContainerSubContainer