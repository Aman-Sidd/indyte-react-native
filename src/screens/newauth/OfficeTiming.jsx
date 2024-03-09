import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SlideHeader from '../../components/header/SlideHeader'
import TextH4 from '../../components/Text/TextH4'
import Input from '../../components/Form/Input'
import NewButtob from '../../components/Button/NewButtob'
import Running from '../../../assets/images/Running.svg'
import { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import TextMedium from '../../components/Text/TextMedium'
import { SCREENS } from '../../constants/Screens'
import { useRoute } from '@react-navigation/native'
const OfficeTiming = ({ navigation }) => {
    const route = useRoute();
    const data = route.params?.data;
    const [OffTiming, setOffTiming] = useState("")
    console.log("OCCCU", data);

    return (
        <View style={{ backgroundColor: "#F4F6FA", height: "100%" }}>
            <SlideHeader />
            <Running width={170} height={189} style={{ alignSelf: "center", marginVertical: 20 }} />
            <View style={{ alignItems: "center", marginVertical: 10 }}>
                <TextH4 style={{ marginVertical: "10%", width: "80%", textAlign: "center" }}>Office Timings</TextH4>
                <TextMedium>Eg- 9AM TO 5PM</TextMedium>
                <Input
                    placeholder={"enter office timing"}
                    onChangeText={(val) => { setOffTiming(val) }}
                    customStyle={{ width: "80%", marginVertical: 20, backgroundColor: "white", elevation: 5 }} />

                <NewButtob onPress={() => navigation.navigate(SCREENS.SUPPLEMENT, { data: { ...data, office_timing: OffTiming } })} title={"Continue"} />
            </View>

        </View>
    )
}

export default OfficeTiming

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