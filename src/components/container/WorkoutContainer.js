import React from 'react';
import { View,StyleSheet,Text,Image } from 'react-native';
import DataContainer from './DataContainer';
import TextMedium from '../Text/TextMedium';
import SmallText from '../Text/SmallText';
import SwitchIconButton from '../Button/SwitchIconButton';
import CheckCircle from '../../../assets/icons/circle-svg.svg'
import CheckMark from '../../../assets/icons/check-mark.svg'
import ProgressBar from '../progress/ProgressBar';



function WorkoutContainer({containerStyle,img,imgStyle,imgBackground,title="",cal="", time="",onPress={onPress}}) {
    return (
        <DataContainer onPress={onPress} containerStyle={{...styles.container,...containerStyle}}>
            <View style={[styles.imageContainer,{backgroundColor:imgBackground}]}>
                <Image source={img} style={imgStyle}/>
            </View>
            <View style={styles.info}>
                <TextMedium>{title}</TextMedium>
                <SmallText style={{marginBottom:10}}>{cal} | {time}</SmallText>
                <ProgressBar containerStyle={{height:15,width:'97%'}} gradientContainerStyle={{width:50}}/>    
            </View>
            <SwitchIconButton
            containerStyle={{backgroundColor:'transparent'}}
            icon2={<CheckCircle width={30} height={30}/>}
            icon1={<CheckMark width={30} height={30}/>}
            />
            
        </DataContainer>
    );
}
const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:130,
        padding:15,
        flexDirection:'row',
        alignItems:'center',
        marginBottom:12
    },
    
    info:{
        marginLeft:15,
        flexGrow:1
    },
    imageContainer:{
        width:60,
        height:60,
        justifyContent:'center',
        alignItems:'center',
        overflow:'hidden',
        borderRadius:999
    }
})
export default WorkoutContainer;