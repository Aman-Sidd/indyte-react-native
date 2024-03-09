import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SlideHeader from '../../components/header/SlideHeader'
import TextH4 from '../../components/Text/TextH4'
import Input from '../../components/Form/Input'
import NewButtob from '../../components/Button/NewButtob'
import { SCREENS } from '../../constants/Screens'
import { useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { updateSideProf } from '../../backend/utilFunctions'
import { storeDataInAsyncStorage } from '../../utils/common'

const Location = ({ navigation }) => {
    const route = useRoute();
    const data = route.params?.data;
    const [LocVal, setLocVal] = useState("")
    console.log("LOCA", data);

    //final api will call here
    const ProfComplete = async () => {
        let d = {}
        { d = { ...data, location: LocVal } }
        // await updateSideProf(d)
        //     .then(async res => {
        //         console.log(res, "I M RES");
        //         if (res.message == "User details updated successfully") {
        //             navigation.navigate(SCREENS.DASHBOARD)
        //             await storeDataInAsyncStorage("profComp", "true")
        //         }
        //         else {
        //             alert(res?.message)
        //         }
        //     })
        // console.log(d, "IAM");
    }
    return (
        <View style={{ backgroundColor: "white", height: "100%" }}>
            <SlideHeader />
            <View style={{ alignItems: "center", marginVertical: 10 }}>
                <TextH4 style={{ marginVertical: "10%", width: "80%", textAlign: "center" }}>Location</TextH4>
                <Input
                    placeholder={"Jaipur"}
                    onChangeText={(val) => { setLocVal(val) }}
                    customStyle={{ width: "80%", marginVertical: 20, backgroundColor: "white", elevation: 5 }} />
                <NewButtob title={"Continue"} onPress={ProfComplete} />
            </View>
        </View>
    )
}

export default Location

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