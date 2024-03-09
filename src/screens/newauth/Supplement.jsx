import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SlideHeader from '../../components/header/SlideHeader'
import TextH4 from '../../components/Text/TextH4'
import Input from '../../components/Form/Input'
import NewButtob from '../../components/Button/NewButtob'
import Supplement from '../../../assets/images/Supplement.svg'
import { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import TextMedium from '../../components/Text/TextMedium'
import { SCREENS } from '../../constants/Screens'
import { useRoute } from '@react-navigation/native'

const SupplementMain = ({ navigation }) => {
    const route = useRoute();
    const data = route.params?.data;
    const [lbs, setlbs] = useState(true)
    const [kg, setkg] = useState(false)
    const [MainWeightVal, setMainWeightVal] = useState("")
    // const [Supplement, setSupplement] = useState("")
    const [SuppVal, setSuppVal] = useState("")
    console.log("OCCCU", data);

    return (
        <View>
            <SlideHeader />
            <Supplement width={170} height={189} style={{ alignSelf: "center", marginVertical: 20 }} />
            <View style={{ alignItems: "center", marginVertical: 10 }}>
                <TextH4 style={{ marginVertical: "10%", width: "80%", textAlign: "center" }}>Do you take any supplements of herbs?</TextH4>
                <View style={styles.InnerMain}>
                    <TouchableOpacity onPress={() => { setlbs(true); setkg(false) }} style={[styles.InnerMainView, { backgroundColor: lbs ? "#8C80F8" : "white" }]}>
                        <Text style={{ fontSize: 13, color: lbs ? "white" : "black", fontWeight: "500" }}>Yes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setlbs(false); setkg(true) }} style={[styles.InnerMainView, { backgroundColor: kg ? "#8C80F8" : "white" }]}>
                        <Text style={{ fontSize: 13, color: kg ? "white" : "black", fontWeight: "500" }}>No</Text>
                    </TouchableOpacity>
                </View>
                <TextMedium>If yes please mention</TextMedium>
                <Input
                    placeholder={"Mention here ...."}
                    onChangeText={(val) => { setSuppVal(val) }}
                    customStyle={{ width: "80%", marginVertical: 20, backgroundColor: "white", elevation: 5 }} />
                <NewButtob title={"Continue"} onPress={() => { navigation.navigate(SCREENS.LOCATION, { data: { ...data, supplements_or_herbs: SuppVal } }) }} />
            </View>

        </View>
    )
}

export default SupplementMain

const styles = StyleSheet.create({
    InnerMain: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        marginVertical: 15
    },
    InnerMainView: {
        width: "20%",
        marginHorizontal: 20,
        alignItems: "center",
        paddingVertical: 10,
        borderRadius: 11,

    }
})