import React from 'react';
import { View } from 'react-native';
import LargeText from '../../components/Text/LargeText';
import TextMedium from '../../components/Text/TextMedium';
import SmallText from '../../components/Text/SmallText';
import Close from '../../../assets/icons/Close.svg';
function WeightMeasurement({title,subtitle,subtitle2,icon}) {
    return (
       <View style={{flexDirection:'row',alignItems:'center',padding:30}}>
        <View style={{flexGrow:1}}>
            <LargeText style={{color:'black',marginBottom:10}}>{title}</LargeText>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <TextMedium style={{fontSize:17}}>{subtitle}</TextMedium>
                <SmallText>{subtitle2}</SmallText>
            </View>
        </View>
            {icon ? icon : <Close width={25} height={25}/>}
       </View>
    );
}

export default WeightMeasurement;