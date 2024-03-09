import { Image, StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native'
import React,{useState}from 'react'
import TextH4 from '../../components/Text/TextH4';
import SmallText from '../../components/Text/SmallText';
import PrimaryButton from '../../components/Button/PrimaryButton';
import BoyGirl from "../../../assets/icons/BoyGirl.svg";
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { GlobalContext } from '../../../App';
const { width, height } = Dimensions.get('window');
const FinalAuth = () => {
    const {setLoggedInUser}=useContext(GlobalContext)
    const navigation=useNavigation();
    const [loading,setLoading]=useState(false)
    return (
        <View style={{ flex:1,backgroundColor: "white" }}>
            <View style={{ width: width, height: height / 2.2, marginTop: "10%" }}>
                <BoyGirl width={"100%"} height={"100%"} />
            </View>
            <View style={{ alignItems: "center", marginTop: "8%" }}>
                <TextH4>Welcome, Stefani</TextH4>
                <SmallText style={{ width: "60%", textAlign: "center", marginTop: 5 }}>You are all set now, let’s reach your goals together with us</SmallText>
            </View>
            <View style={{ alignItems: "center", marginTop: "50%" }}>
            {
                loading?
                <ActivityIndicator size={30} color="blue" />:
                <PrimaryButton containerStyle={{ width: width - 30, }} title={'Go To Home'} onPress={() => setLoggedInUser({uid:Math.random()*1000})} />
            }
            </View>
        </View>
    )
}
export default FinalAuth;