import React from 'react';
import { View,StyleSheet,Text } from 'react-native';
import WeightMeasurement from '../../../assets/icons/weightMeasurement.svg';
import LargeText from '../Text/LargeText';
import SmallText from '../Text/SmallText';
import { FONTS } from '../../constants/Fonts';
import Seperator from '../Utils/Seperator';
function BMICard(props) {
    return (
        <View style={{padding:20}}>
            <View style={styles.infoContainer}>
                <WeightMeasurement width={50} height={50}/>
                <View style={{marginLeft:10,flexGrow:1}}>
                    <LargeText style={{color:'black'}}>BMI Score</LargeText>
                    <SmallText>Normal</SmallText>
                </View>
                <Text style={{fontFamily:FONTS.FONT_POPPINS_MEDIUM,fontSize:25,color:'black'}}>21.2</Text>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:30,alignItems:'flex-end'}}>
                <Seperator min={15} color={'#FDC944'} width={50} showPointer={true} value={17}  showMax={false} max={18}/>
                <Seperator min={18} color={'#C58BF2'} width={100} showPointer={false} showMax={false} max={25}/>
                <Seperator min={25} color={'#FDC944'} width={45} showPointer={false} showMax={false} max={30}/>
                <Seperator min={30} color={'#7B61FF'} width={45} showPointer={false} showMax={false} max={35}/>
                <Seperator min={35} max={40} color={'#FF395D'}width={45} showPointer={false} showMax={true}/>

            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    infoContainer:{
        flexDirection:'row',
        alignItems:'center',
        marginBottom:15
    }
})
export default BMICard;