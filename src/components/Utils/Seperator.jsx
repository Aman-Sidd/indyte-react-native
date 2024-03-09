import React from 'react';
import SmallText from '../Text/SmallText';
import { StyleSheet,View } from 'react-native';
import Pointer from '../../../assets/icons/Pointer.svg';
function Seperator({min,max,color,width,showPointer=true,showMax,value}) {
    return (
        <View>
            {showPointer && <View style={{left:`${((parseInt(value) - parseInt(min))/(parseInt(max) - parseInt(min))*100)}%`}}>
                <Pointer width={10} height={10}/>
            </View>}
            <View style={[styles.wider,{backgroundColor:color,width}]}/>
                <View style={[styles.range,{width}]}>
                <SmallText>{min}</SmallText>
                {showMax && <SmallText>{max}</SmallText>}
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    wider:{
        width:150,
        height:6,
        backgroundColor:'red',
        borderRadius:30
    },
    range:{
        width:150,
        flexDirection:'row',
        justifyContent:'space-between'
    }
})
export default Seperator;