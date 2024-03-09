import { View, Text } from 'react-native'
import React from 'react'
import TextH4 from '../Text/TextH4'
import SmallText from '../Text/SmallText'

const SubSectionTitle = ({title,mealgoal}) => {
    return (
        <View style={{padding:10,flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
            <TextH4 style={{fontSize:14}}>
                {title}   
            </TextH4>
            <SmallText style={{fontSize:12}}>{mealgoal}</SmallText>
        </View>
    )
}

export default SubSectionTitle