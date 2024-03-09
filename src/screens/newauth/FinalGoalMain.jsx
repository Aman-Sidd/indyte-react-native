import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ImageBackground } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { SCREENS } from '../../constants/Screens'

const FinalGoalMain = ({ navigation }) => {
    return (
        <ImageBackground source={require('../../../assets/images/FInalImage.png')} style={{ width: "100%", height: "100%" }}>
            <TouchableOpacity style={styles.MainTxt} onPress={() => { navigation.navigate(SCREENS.LOGIN) }}>
                <Text style={{ color: "#7265E3", fontSize: 16, fontWeight: "500" }}>Get Statrted!</Text>
            </TouchableOpacity>
        </ImageBackground>
    )
}

export default FinalGoalMain

const styles = StyleSheet.create({
    MainTxt: {
        width: "60%",
        backgroundColor: "white",
        alignSelf: "center",
        alignItems: "center",
        position: "absolute",
        bottom: "20%",
        paddingVertical: 15,
        borderRadius: 10
    }
})