import { View, Text, Image, Dimensions, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import React, { useState } from 'react'
const { width, height } = Dimensions.get("window")
import Back from "../../../assets/icons/BackLeft.svg"
import { FONTS } from '../../constants/Fonts'
import DoctorMessage from '../../components/consultant/DoctorMessage'
import ClientMessage from '../../components/consultant/ClientMessage'


export default function ConsultationChat() {
  let interleavedMessages = [];
  const clientMsg = [
    {
      message: "ok thanks doc I will do it",
      date: "18:05",
    },
    {
      message: "yes, I feel it a little too and this is the rest of my medicine",
      date: "18:07",
    },
  ]

  const doctorMessages = [
    {
      message: "Thank you! but you should check up more often, Jessica.",
      date: "18:05",
    },
    {
      message: "Do you feel fever too?",
      date: "18:06",
    },
  ];

  const [inputText, setInputText] = useState("");
  const [clientChats, setClientChats] = useState(clientMsg);

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

    for (let i = 0; i < Math.max(doctorMessages.length, clientChats.length); i++) {
      if (doctorMessages[i]) {
        interleavedMessages.push(<DoctorMessage key={`doctor-${i}`} message={doctorMessages[i].message} date={doctorMessages[i].date} />);
      }

      if (clientChats[i]) {
        interleavedMessages.push(<ClientMessage key={`client-${i}`} message={clientChats[i].message} date={clientChats[i].date} />);
      }
    }

    return interleavedMessages;
  };

  return (
    <>
      <View style={{ padding: 20, backgroundColor: "#FAFBFF" }}>
        <View style={{ position: "relative" }}>
          <Image style={{ width: width / 1.1, borderRadius: 40 }} source={require("../../../assets/images/ChatDoctor.png")} />
          <View style={{ backgroundColor: "white", padding: 12, borderRadius: 10, position: "absolute", top: 20, left: 20 }}>
            <TouchableOpacity>
              <Back width={15} height={15} />
            </TouchableOpacity>
          </View>
          <View style={{ position: 'absolute', bottom: 50, left: 20 }}>
            <Text style={{ fontSize: 24, fontFamily: FONTS.FONT_POPPINS_SEMIBOLD, color: "#FFFFFF" }}>Dr Samantha</Text>
          </View>
          <View style={{ position: 'absolute', bottom: 40, left: 20 }}>
            <Text style={{ fontSize: 12, fontFamily: FONTS.FONT_POPPINS_REGULAR, color: "#FFFFFF" }}>Cardiologist</Text>
          </View>
          <View style={{ position: 'absolute', bottom: 14, left: 20, width: width / 6 }}>
            <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: "center", backgroundColor: "#a9acb3", borderRadius: 30, }}>
              <Image style={{ width: 14, height: 14 }} source={require("../../../assets/images/Ellipse.png")} />
              <Text style={{ fontFamily: FONTS.FONT_POPPINS_REGULAR, fontSize: 14, color: "white" }}>7:49</Text>
            </View>
          </View>
          <View style={{ position: "absolute", right: 20, top: 20 }}>
            <Image source={require("../../../assets/images/patient.png")} />
            <TouchableOpacity>
              <Image source={require("../../../assets/images/switch.png")} style={{ position: 'absolute', bottom: -10, left: 30 }} />
            </TouchableOpacity>
          </View>
          <View style={{ position: "absolute", bottom: 0, right: 0, gap: 10, backgroundColor: "#c2c4cc", margin: 20, padding: 10, borderRadius: 40 }}>
            <TouchableOpacity>
              <Image source={require("../../../assets/images/mic.png")} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={require("../../../assets/images/camera.png")} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={require("../../../assets/images/callend.png")} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginTop: 5, paddingBottom: 0, marginLeft: "auto", marginRight: "auto" }}>
          <Image style={{ height: 6, borderRadius: 9999, width: 60 }} source={require("../../../assets/images/bar.png")} />
        </View>
      </View>
      <View style={{
        position: "absolute", bottom: 0, padding:
          20, paddingHorizontal: 10, width, zIndex: 10, backgroundColor: "white", flexDirection: "row", alignItems: "center", gap: 8
      }}>
        <TextInput placeholderTextColor={"#aeb0c1"} placeholder='Type Messages' value={inputText} onChangeText={(text) => setInputText(text)} style={{ backgroundColor: "#F0F5FF", borderRadius: 30, padding: 15, fontFamily: FONTS.FONT_POPPINS_REGULAR, fontSize: 14, color: "black", paddingHorizontal: 30, flex: 1, position: "relative" }} />
        <TouchableOpacity>
          <Image style={{ position: "absolute", right: 30, top: -10 }} source={require("../../../assets/images/chatCamera.png")} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSendPress}>
          <Image source={require("../../../assets/images/send.png")} />
        </TouchableOpacity>
      </View>
      <ScrollView scroll style={{ overflow: "scroll", marginBottom: 100, backgroundColor: "white" }} >
        {renderChatMessages()}
      </ScrollView>
    </>

  )
}
