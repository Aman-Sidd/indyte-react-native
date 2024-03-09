import React from 'react';
import { View,StyleSheet } from 'react-native';
import LargeText from '../Text/LargeText';
import SmallText from '../Text/SmallText';
import ProgressBar from './ProgressBar';
import { FONTS } from '../../constants/Fonts';

function HeadingProgressBar({heading,percentage1,percentage2}) {
    return (
        <View style={styles.container}>
            <LargeText style={{textAlign:'center',marginBottom:10,fontFamily:FONTS.FONT_POPPINS_REGULAR}}>{heading}</LargeText>
            <View style={styles.progressContainer}>
            <SmallText>{percentage1}</SmallText>
            <ProgressBar 
            containerStyle={{...styles.progressBar}} 
            gradientContainerStyle={{width:percentage1}}
            colors={['#FFB3B3','#FFB3B3']}
            />
            <SmallText>{percentage2}</SmallText>
            </View>
            
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        marginBottom:30
    },
    progressContainer:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    progressBar:{
        width:'80%',
        height:15,
        backgroundColor:'#92A3FD'
    },
    
})
export default HeadingProgressBar;