import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SlideHeader from '../../components/header/SlideHeader'
import TextH4 from '../../components/Text/TextH4'
import Input from '../../components/Form/Input'
import NewButtob from '../../components/Button/NewButtob'
import FastFoodMan from '../../../assets/images/FastFoodMan.svg'
import { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import TextMedium from '../../components/Text/TextMedium'
const FoodFrequency = () => {
    const [yes, setyes] = useState(true)
    const [no, setno] = useState(false)
    const [MainWeightVal, setMainWeightVal] = useState("")
    return (
        <View style={{ backgroundColor: "white", height: "100%" }}>
            <SlideHeader />
            <FastFoodMan width={170} height={189} style={{ alignSelf: "center", marginVertical: 20 }} />
            <View style={{ alignItems: "center", marginVertical: 10 }}>
                <TextH4 style={{ marginVertical: "10%", width: "80%", textAlign: "center" }}>Fast food or any outer food frequency</TextH4>
                <TextMedium>Eg- 2 times a day or twice in a week</TextMedium>
                <Input
                    placeholder={"twice in a month"}
                    onChangeText={{}}
                    customStyle={{ width: "80%", marginVertical: 20, backgroundColor: "white", elevation: 5 }} />

                <NewButtob title={"Continue"} />
            </View>

        </View>
    )
}

export default FoodFrequency

const styles = StyleSheet.create({
    InnerMain: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        marginVertical: 15,
        marginBottom: "20%"
    },
    InnerMainView: {
        width: "20%",
        marginHorizontal: 20,
        alignItems: "center",
        paddingVertical: 10,
        borderRadius: 11,

    }
})