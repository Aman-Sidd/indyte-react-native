import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import TextH4 from '../Text/TextH4'
import SmallText from '../Text/SmallText'
import SmallProgressBar from '../progress/SmallProgressBar'

const ScheduleMealProgress = ({unit,amount,daytime,mealpercentage,progressbar}) => {
    return (
        <View style={styles.contaienr}>
            <View style={{flexDirection:"row",alignItems:"flex-end",}}>
                <TextH4>
                    {amount}
                </TextH4>
                <SmallText>
                    {unit}
                </SmallText>
            </View>
            <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
                <TextH4 style={{fontSize:12}}>
                    {daytime}
                </TextH4>
                <SmallText style={{fontSize:12}}>
                    {mealpercentage}%
                </SmallText>
            </View>
            <SmallProgressBar bgColorInner={progressbar.innerColor} bgColorOuter={progressbar.outerColor} percentage={progressbar.percentage} />
        </View>
    )
}
const styles=StyleSheet.create({
    contaienr:{
        width:'45%',
        padding:10,
        marginVertical:10
    }
})
export default ScheduleMealProgress