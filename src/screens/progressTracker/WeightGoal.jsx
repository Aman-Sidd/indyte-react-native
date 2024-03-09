import React from 'react';
import { View,StyleSheet } from 'react-native';
import LargeText from '../../components/Text/LargeText';
import SmallText from '../../components/Text/SmallText';
import TextMedium from '../../components/Text/TextMedium';
import ProgressBar from '../../components/progress/ProgressBar';

function WeightGoal({title,subtitle,goalText,subGoalText,progress}) {
    return (
        <View style={styles.container}>
            <View style={styles.weightLabels}>
                <LargeText style={styles.mainLabel}>{title}</LargeText>
                <SmallText style={styles.subLabel}>{subtitle}</SmallText>
            </View>
            <View>
                <View style={styles.textContainer}>
                <TextMedium style={styles.text}>{goalText}</TextMedium>
                <SmallText>{subGoalText}</SmallText>
                </View>
                <ProgressBar containerStyle={styles.progressContainer} 
                gradientContainerStyle={{width:progress}}
                colors={['#7B61FF','#7B61FF']}
                />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    weightLabels:{
        flexDirection:'row'
    },
    mainLabel:{
        fontSize:17,
        color:'black'
    },
    text:{
        marginRight:10
    },
    subLabel:{
        top:2
    },
    progressContainer:{
        height:3,
        backgroundColor:'#DDD9F9'
    },
    textContainer:{
        flexDirection:'row',
        alignItems:'center',
    }
})
export default WeightGoal;