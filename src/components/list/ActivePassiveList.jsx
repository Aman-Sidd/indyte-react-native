import React from 'react';
import { View,StyleSheet,Text } from 'react-native';
import TextMedium from '../Text/TextMedium';
import { COLORS } from '../../constants/Colors';
import LargeText from '../Text/LargeText';
import SmallText from '../Text/SmallText';

function ActivePassiveList({height=100,width=200,id="",title="",subtitle="",activeColor=COLORS.SECONDARY_BUTTON_GRADIENT.PURPLE1,passiveColor='#ADA4A5',isComplete,showLine=true}) {
    function getColorBasedOnStatus(){
        return isComplete?activeColor:passiveColor
    }
    return (
       <View style={[styles.container,{height,width}]}>
        <View style={styles.number}>
            <LargeText style={{color:getColorBasedOnStatus()}}>{id}</LargeText>
        </View>
        <View style={styles.bullet}>
            <View style={[styles.outerRing,{borderColor:getColorBasedOnStatus()}]}>
                <View style={[styles.innerRing,{backgroundColor:getColorBasedOnStatus()}]}/>
            </View>
            {showLine && <View style={[styles.line,{borderColor:getColorBasedOnStatus()}]}/>}
        </View>
        <View style={styles.info}>
            <TextMedium>{title}</TextMedium>
            <SmallText>{subtitle}</SmallText>
        </View>
       </View>
    );
}
const styles = StyleSheet.create({
    container:{
        height:100,
        flexDirection:'row',
        
        
    },
    number:{
       width:25,
       paddingTop:5
    },
    info:{
        padding:10,
        paddingTop:0,
        // flexGrow:1,
        width:'80%',
        
    },
    outerRing:{
        justifyContent:'center',
        alignItems:'center',
        width:25,
        height:25,
        borderRadius:999,
        borderWidth:2,
        
    },
    innerRing:{
        width:10,
        height:10,
        borderRadius:9999,
        
    },
    line:{
        width:1,
        borderLeftWidth:2,
        borderStyle:'dashed',
        borderColor:COLORS.SECONDARY_BUTTON_GRADIENT.PURPLE1,
        left:'45%',
        flexGrow:1,
        
    }
})
export default ActivePassiveList;