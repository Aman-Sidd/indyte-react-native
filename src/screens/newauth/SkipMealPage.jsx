import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SlideHeader from '../../components/header/SlideHeader'
import TextH4 from '../../components/Text/TextH4'
import Input from '../../components/Form/Input'
import NewButtob from '../../components/Button/NewButtob'
import SkipMeal from '../../../assets/images/SkipMeal.svg'
import { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import TextMedium from '../../components/Text/TextMedium'
const SkipMealPage = () => {
    const [yes, setyes] = useState(true)
    const [no, setno] = useState(false)
    const [MainWeightVal, setMainWeightVal] = useState("")
    return (
        <View style={{ backgroundColor: "white", height: "100%" }}>
            <SlideHeader />
            <SkipMeal width={170} height={189} style={{ alignSelf: "center", marginVertical: 20 }} />
            <View style={{ alignItems: "center", marginVertical: 10 }}>
                <TextH4 style={{ marginVertical: "10%", width: "80%", textAlign: "center" }}>Do you skip meal?</TextH4>
                <View style={styles.InnerMain}>
                    <TouchableOpacity onPress={() => { setyes(true); setno(false) }} style={[styles.InnerMainView, { backgroundColor: yes ? "#8C80F8" : "white" }]}>
                        <Text style={{ fontSize: 13, color: yes ? "white" : "black", fontWeight: "500" }}>Yes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setyes(false); setno(true) }} style={[styles.InnerMainView, { backgroundColor: no ? "#8C80F8" : "white" }]}>
                        <Text style={{ fontSize: 13, color: no ? "white" : "black", fontWeight: "500" }}>No</Text>
                    </TouchableOpacity>
                </View>
                <NewButtob title={"Continue"} />
            </View>

        </View>
    )
}

export default SkipMealPage

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