import React from 'react';
import { StyleSheet,View,ScrollView, Dimensions } from 'react-native';
import { COLORS } from '../../constants/Colors';
import GradientLabel from '../../components/Label/GradientLabel';
import TextCenterHeader from '../../screens/header/TextCenterHeader';
import BackSvg from '../../../assets/icons/ArrowLeft.svg';
import LoadMoreSvg from '../../../assets/icons/MoreSquare.svg';
import AnimatedLineChart from '../Utils/LineChart';


function WorkoutTracker(props) {
    return (
        <>
        <GradientLabel
        colors={[COLORS.PRIMARY_BUTTON_GRADIENT.BLUE1,COLORS.PRIMARY_BUTTON_GRADIENT.BLUE2]}
        conatinerStyle={styles.container}
        >
            <View style={styles.paddedContainer}>
                <TextCenterHeader
                icon1={<BackSvg width={20} height={20}/>}
                icon2={<LoadMoreSvg width={20} height={20}/>}
                title='Workout Tracker'
                textStyle={{color:'white'}}
                />
                <AnimatedLineChart
                labelStyleX={{color:'white'}}
                labelStyleY={{color:'white'}}
                color='white'
                width={300}
                />
            </View>
            
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
    detailContainer:{
        width:Dimensions.get('window').width,
        borderTopRightRadius:30,
        borderTopLeftRadius:30,
        backgroundColor:'white',
        paddingTop:50,
        paddingLeft:35,
        
    },
    
})
export default WorkoutTracker;