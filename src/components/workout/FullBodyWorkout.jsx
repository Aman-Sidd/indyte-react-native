import React from 'react';
import { StyleSheet,View,ScrollView, Dimensions,Image } from 'react-native';
import { COLORS } from '../../constants/Colors';
import GradientLabel from '../../components/Label/GradientLabel';
import TextCenterHeader from '../../screens/header/TextCenterHeader';
import BackSvg from '../../../assets/icons/ArrowLeft.svg';
import LoadMoreSvg from '../../../assets/icons/MoreSquare.svg';



function FullBodyWorkout(props) {
    return (
        <>
        <GradientLabel
        colors={[COLORS.PRIMARY_BUTTON_GRADIENT.BLUE1,COLORS.PRIMARY_BUTTON_GRADIENT.BLUE2]}
        conatinerStyle={styles.container}
        >
            <View style={styles.paddedContainer}>
                <TextCenterHeader
                headerContainerStyle={{marginBottom:0}}
                icon1={<BackSvg width={20} height={20}/>}
                icon2={<LoadMoreSvg width={20} height={20}/>}
                title=''
                textStyle={{color:'white'}}
                />
            </View>
            <Image source={require('../../../assets/images/Skipping.png')} style={styles.image}/>
            
            <ScrollView contentContainerStyle={[styles.detailContainer]}>
                
                
            </ScrollView>
        </GradientLabel>
        
    </> 
    );
}
const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        flex:1,
    },
    paddedContainer:{
        width:'100%',
        padding:20
    },
    image:{
        position:'absolute',
        top:40
    },
    detailContainer:{
        width:Dimensions.get('window').width,
        borderTopRightRadius:30,
        borderTopLeftRadius:30,
        backgroundColor:'white',
        paddingTop:50,
        paddingLeft:35,
        marginTop:250,
    },
    
})
export default FullBodyWorkout;