import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

import ThreeDot from '../../../assets/icons/threedot.svg';
import TextH4 from '../Text/TextH4';
import SmallText from '../Text/SmallText';

const LatestActivityCard = ({title,timeago,bgcolor,selected=false}) => {
    return (
        <View style={[styles.cardBody,{elevation:selected?2:0}]}>
            <View style={{flexDirection:"row",alignItems:"center",}}>
                <View style={{width:70,height:70,borderRadius:35,backgroundColor:bgcolor}} />
                <View style={{marginLeft:10}}>
                    <TextH4 style={styles.cardTitle}>
                        {title}
                    </TextH4>
                    <SmallText>{timeago}</SmallText>
                </View>
            </View>
            <ThreeDot width={25} height={25}/>
        </View>
    )
}
const styles=StyleSheet.create({
    cardBody:{
        width:'100%',
        backgroundColor:"white",
        marginVertical:20,
        padding:15,
        justifyContent:"space-between",
        flexDirection:"row",
        borderRadius:10,
        zIndex:1,
    },
    cardTitle:{
        fontSize:15
    }
})
export default LatestActivityCard