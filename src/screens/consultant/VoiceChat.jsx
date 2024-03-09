import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, TextInput, ScrollView } from 'react-native'
import React, { useState } from 'react'
import ScreenContainer from '../../components/container/ScreenContainer'
import Back from "../../../assets/icons/BackLeft.svg"
import UpDownArrow from '../../../assets/icons/updownArrow.svg';
import { FONTS } from '../../constants/Fonts'
import DietitianChatHeader from '../../components/consultant/DietitianChatHeader'
import ChatMessage from '../../components/consultant/ChatMessage';
import VoiceMessage from '../../components/consultant/VoiceMessage';
const { width, height } = Dimensions.get("window")

export default function VoiceChat({ navigation }) {
  let interleavedMessages = [];
  const secondPersonMessages = [
    {
      message: "Not yet, Sarah. Planning to watch it this weekend.",
      date: "18:05",
    },
  ]

  const firstPersonMessages = [
    {
      message: "Hey Mike, have you watched the latest Marvel movie?",
      date: "18:05",
    },
    {
      message: "That's great! Let's discuss it next week.",
      date: "18:06",
    },
  ];

  const [inputText, setInputText] = useState("");
  const [clientChats, setClientChats] = useState(secondPersonMessages);

  const handleSendPress = () => {
    if (inputText.trim() !== "") {
      setClientChats([...clientChats, { message: inputText, date: getCurrentTime() }]);
      setInputText("");
    }
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };


  const renderChatMessages = () => {

    for (let i = 0; i < Math.max(firstPersonMessages.length, clientChats.length); i++) {
      if (firstPersonMessages[i]) {
        interleavedMessages.push(<ChatMessage key={`doctor-${i}`} message={firstPersonMessages[i].message} date={firstPersonMessages[i].date} name={"Sarah"} imgPath={require("../../../assets/images/VoiceChatProfile.png")} />);
      }

      if (clientChats[i]) {
        interleavedMessages.push(<ChatMessage key={`client-${i}`} message={clientChats[i].message} date={clientChats[i].date} containerStyles={{ justifyContent: "flex-end" }} contentStyles={{ alignItems: "flex-end" }} name={"Mike"} imgPath={require("../../../assets/images/VoiceChatProfile2.png")} textContainer={{ backgroundColor: "#2B5CED", color: "white" }} />);
      }
    }

    return interleavedMessages;
  };

  return (
    <View style={{ padding: 20, height, }}>
      <DietitianChatHeader
        name={"Voice Chat"}
        icon1={
          <Back width={20} height={20} />
        }
        icon3={<TouchableOpacity
        // onPress={() => navigation.navigate(SCREENS.CONFIRMINGAPPOINTMENT)}
        >
          <UpDownArrow width={20} height={20} />
        </TouchableOpacity>}
        headerContainerStyle={{ marginVertical: 10 }}
      />

      <View style={{ alignItems: "center", marginVertical: 20, gap: 20 }}>
        <Image source={require("../../../assets/images/VoiceChatProfile.png")} />
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 24, fontFamily: FONTS.FONT_POPPINS_BOLD, lineHeight: 30, color: "#0D121C" }}>Sarah</Text>
          <Text style={{ fontSize: 18, fontFamily: FONTS.FONT_POPPINS_REGULAR, color: "#4D5E99" }}>Online</Text>
        </View>
      </View>
      <ScrollView scroll style={{ overflow: "scroll", marginBottom: 60 }} >
        {renderChatMessages()}
        <VoiceMessage name={"Mike"} startValue={0.01} endValue={2.22} />
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
