import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import TextH4 from '../Text/TextH4'
import SmallText from '../Text/SmallText';
import ProgressBar from '../progress/ProgressBar';


const TodayMealPlannerCard = ({mealattributes,attributesvalue,attributeicon,progress}) => {
    return (
        <View style={styles.cardBody}>
            <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",margin:5}}>
                <View style={{flexDirection: 'row',}}>
                    <TextH4>
                        {mealattributes}
                    </TextH4>
                    <View style={{marginHorizontal:10}}>
                        {
                            attributeicon
                        }
                    </View>
                </View>
                <SmallText>{attributesvalue}</SmallText>
            </View>
            <ProgressBar containerStyle={{height:15,width:'100%'}} gradientContainerStyle={{width:progress}}/>     
        </View>
    )
}
const styles=StyleSheet.create({
    cardBody:{
        backgroundColor:"white",
        elevation:2,
        zIndex:100,
        marginVertical:10,
        padding:10,
        borderRadius:16,
        height:100,
        justifyContent:"center",
        paddingHorizontal:15,
        width:'98%',
        alignSelf:"center"
    }
})
export default TodayMealPlannerCard