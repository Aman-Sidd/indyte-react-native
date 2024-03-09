import React from 'react';
import { View,StyleSheet } from 'react-native';
import GradientLabel from '../Label/GradientLabel';
import { COLORS } from '../../constants/Colors';

function ProgressBar({containerStyle,gradientContainerStyle,vertical=false,colors=[]}) {
    return (
        <View style={[styles.container,containerStyle]}>
            <GradientLabel 
            vertical={vertical}
            conatinerStyle={{...styles.gradientContainer,...gradientContainerStyle}}
            colors={colors.length > 0 ? colors:[COLORS.PROGRESS_BAR_GRADIENT.COLOR2,COLORS.PROGRESS_BAR_GRADIENT.COLOR1]}/>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:50,
        backgroundColor:'#F7F8F8',
        borderRadius:30,
        overflow:'hidden'
    },
    gradientContainer:{
        width:'100%',
        height:50
    }
})
export default ProgressBar;