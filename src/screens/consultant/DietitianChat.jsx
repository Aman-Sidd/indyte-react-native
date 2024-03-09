import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import ScreenContainer from '../../components/container/ScreenContainer'
import DietitianChatHeader from '../../components/consultant/DietitianChatHeader'
import Back from "../../../assets/icons/ArrowLeft.svg"
import Call from '../../../assets/icons/dietitionCall.svg';
import Camera from '../../../assets/icons/dietitionCamera.svg';
import { FONTS } from '../../constants/Fonts'
import SolidButton from '../../components/Button/SolidButton'
import { SCREENS } from '../../constants/Screens'
const { width, height } = Dimensions.get("window")

export default function DietitianChat({ navigation }) {
    const [inputText, setInputText] = useState("");
    const [clientChats, setClientChats] = useState([]);

    const getCurrentTime = () => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    const handleSendPress = () => {
        if (inputText.trim() !== "") {
            setClientChats([...clientChats, { message: inputText, date: getCurrentTime() }]);
            setInputText("");
        }
    };

    return (
        <View style={{ position: "relative", height, padding: 10, }}>
            <DietitianChatHeader
                name={"Sarah B."}
                imgPath={require("../../../assets/images/sarah.png")}
                icon1={
                    <Back width={25} height={25} />
                }
                icon2={<TouchableOpacity
                    onPress={() => navigation.navigate(SCREENS.CONFIRMINGAPPOINTMENT)}
                >
                    <Camera width={20} height={20} />
                </TouchableOpacity>}
                icon3={<TouchableOpacity
                    onPress={() => navigation.navigate(SCREENS.CONFIRMINGAPPOINTMENT)}
                >
                    <Call width={20} height={20} />
                </TouchableOpacity>}
            />

            <ScrollView style={{ marginBottom: 80 }}>
                <View style={{ alignItems: "flex-end", marginHorizontal: 20, paddingBottom: 10 }}>
                    {clientChats.map((item) => (
                        <View style={{ maxWidth: width / 1.15, alignItems: "flex-end", marginBottom: 10 }}>
                            <Text style={{ padding: 10, backgroundColor: "#6E71E5", fontFamily: FONTS.FONT_POPPINS_REGULAR, color: "#FAFBFF", fontSize: 14, borderRadius: 20 }}>{item.message}</Text>
                            <Text style={{ fontFamily: FONTS.FONT_POPPINS_REGULAR, color: "#343965", fontSize: 10, marginTop: 4 }}>{item.date}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
            <View style={{
                position: "absolute", bottom: 0, padding:
                    20, paddingHorizontal: 20, width, zIndex: 10, backgroundColor: "#FFFFFF", flexDirection: "row", alignItems: "center", gap: 15, justifyContent: "center",
            }}>
                <TouchableOpacity>
                    <Image source={require("../../../assets/images/outlineFile.png")} />
                </TouchableOpacity>
                <TextInput placeholderTextColor={"#686868"} placeholder='Message...' value={inputText} onChangeText={(text) => setInputText(text)} style={{ backgroundColor: "#FFFFFF", borderRadius: 30, padding: 8, fontFamily: FONTS.FONT_POPPINS_REGULAR, fontSize: 16, color: "black", paddingHorizontal: 20, flex: 1, position: "relative", borderColor: "#DDDDDD", borderWidth: 1 }} />
                <TouchableOpacity>
                    <Image style={{ position: "absolute", right: 30, top: -10 }} source={require("../../../assets/images/outlineMic.png")} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSendPress}>
                    <Image source={require("../../../assets/images/outlineSend.png")} />
                </TouchableOpacity>
            </View>
        </View>
    )
}
