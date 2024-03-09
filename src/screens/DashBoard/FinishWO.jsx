import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import FinsihWorkOut from '../../../assets/icons/FinishWorkOut.svg'
import TextH4 from '../../components/Text/TextH4';
import SmallText from '../../components/Text/SmallText';
import PrimaryButton from '../../components/Button/PrimaryButton';
const { width, height } = Dimensions.get('window');

const FinishWO = () => {
    return (
        <View style={{ width: width, height: height, backgroundColor: "white" }}>
            <View style={{ width: width, height: height / 2.2, marginTop: "10%" }}>
                <FinsihWorkOut width={"100%"} height={"100%"} />
            </View>
            <View style={{ alignItems: "center", marginTop: "10%" }}>
                <TextH4 style={{ textAlign: "center" }}>Congratulations, You Have Finished Your Workout</TextH4>
                <SmallText style={{ width: "80%", textAlign: "center", marginTop: 7 }}>Exercises is king and nutrition is queen. Combine the two and you will have a kingdom
                </SmallText>
                <SmallText style={{ width: "80%", textAlign: "center", marginTop: 7, }}>-Jack Lalanne</SmallText>
            </View>
            <View style={{ alignItems: "center", marginTop: "30%" }}>
                <PrimaryButton containerStyle={{ width: width - 30, }} title={'Back To Home'} onPress={() => console.log('Hello')} />
            </View>
        </View>
    )
}

export default FinishWO

const styles = StyleSheet.create({})