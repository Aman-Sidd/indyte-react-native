import React from 'react';
import { View,StyleSheet } from 'react-native';
import ScreenContainer from '../../components/container/ScreenContainer';
import Edit from '../../../assets/icons/Icon_white.svg';
import EditPurple from '../../../assets/icons/Edit.svg';
import Dots from '../../../assets/icons/ThreeDots.svg';

import { AnimatedCircularProgress } from 'react-native-circular-progress';
import SmallText from '../../components/Text/SmallText';
import ActivePassiveMenu from '../../components/menu/ActivePassiveMenu';
import { useState } from 'react';
import TextMedium from '../../components/Text/TextMedium';
import SolidContainer from '../../components/container/SolidContainer';
import ActivitylineChats from '../../components/Utils/ActivityLineChats';
import WeightGoal from './WeightGoal';
import WeightMeasurement from './WeightMeasurement';
import { LineChart } from "react-native-gifted-charts";
import { Dimensions } from 'react-native';
import BMICard from '../../components/card/BMICard';
function WeightProgress(props) {
    const items = ['All','1M','6M','1Y']
    const [activeItem,setActiveItem] = useState(items[0])
    const data = [{value: 15}, {value: 30}, {value: 26}, {value: 40},{value: 15}, {value: 30}, {value: 26}, {value: 40}];
    return (
        <ScreenContainer scroll>
            <View style={styles.progressTrackerCircleContainer}>
                <View style={styles.circleProgressContainer}>
                    <AnimatedCircularProgress
                    size={80}
                    width={8}
                    fill={70}
                    tintColor="white"
                    lineCap='round'
                    onAnimationComplete={() => console.log('onAnimationComplete')}
                    backgroundColor="#BEC8FE"/>
                    <SmallText style={styles.percentageText}>60%</SmallText>
                </View>
                <SmallText style={{flex:0.8,color:'white'}}>You’re going to reach your goal soonkeep it up keep working out.</SmallText>
                <Edit width={25} height={25} />
            </View>
            <View style={{paddingHorizontal:10,paddingTop:30}}>
                <ActivePassiveMenu items={items} activeItem={activeItem} setActiveItem={setActiveItem}/>
            </View>
            <View style={styles.WeightProgressContainer}>
                <TextMedium>Weight progress</TextMedium>
                <SolidContainer containerStyle={styles.IconBox}>
                    <Dots width={20} height={20}/>
                </SolidContainer>
            </View>
            <View style={{right:60,paddingTop:30}}>
            <LineChart 
            data={data} 
            hideRules 
            areaChart 
            curved 
            color1='#C4B9FA'
            scrollToEnd
            isAnimated
            yAxisColor="#F1EFFE"
            xAxisColor="#F1EFFE"
            startFillColor="rgb(46, 217, 255)"
            startOpacity={0.8}
            endFillColor="rgb(203, 241, 250)"
            endOpacity={0.1}
            thickness1={5}
            hideYAxisText 
            width={Dimensions.get('screen').width}
            showVerticalLines
            backgroundColor={'#F1EFFE'}/>
            </View>
            <View style={styles.measurement}>
                <EditPurple width={20} height={20} style={styles.measurementEdit}/>
                <WeightGoal title={'72'} subtitle={'kg'} goalText={'Goal Weight'} progress={'50%'} subGoalText={'9w left'}/>
                <WeightGoal title={'65'} subtitle={'kg'} goalText={'Current Weight'} progress={'50%'} subGoalText={'70%'}/>
            </View>
            <TextMedium>History</TextMedium>
            <WeightMeasurement title={'Today'} subtitle={'65'} subtitle2={'kg'}/>
            <WeightMeasurement title={'27th March 2022'} subtitle={'62'} subtitle2={'kg'}/>
            <WeightMeasurement title={'26th March 2022'} subtitle={'60'} subtitle2={'kg'}/>
            <View style={{paddingBottom:60}}> 
                <TextMedium>Body Mass Index</TextMedium>
                <BMICard/>
            </View>
        </ScreenContainer>
    );
}
const styles = StyleSheet.create({
    progressTrackerCircleContainer:{
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#92A3FD',
        borderRadius:20,
        paddingVertical:30,
        paddingHorizontal:15,
        justifyContent:'space-around'
    },
    circleProgressContainer:{
        justifyContent:'center',
        alignItems:'center'
    },
    percentageText:{
        position:'absolute',
        color:'white',
        justifyContent:'center',
        alignItems:'center'
    },
    IconBox:{
        width:70,
        height:30,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'black',
        borderRadius:30
    },
    WeightProgressContainer:{
        marginTop:30,
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    measurement:{
        padding:15,
        paddingVertical:30,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    measurementEdit:{
        position:'absolute',
        top:10,
        right:0
    }
    
})
export default WeightProgress;