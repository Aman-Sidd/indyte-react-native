import { View, Text, Dimensions, Image, ScrollView } from 'react-native'
import React from 'react'
const { width, height } = Dimensions.get('window');
import { StyleSheet } from 'react-native'
import Back from "../../../assets/icons/BackLeft.svg"
import { FONTS } from '../../constants/Fonts';
import PrescriptionCard from '../../components/consultant/PrescriptionCard';

export default function ConsultationResult() {
  return (
    <ScrollView>
      <View style={{ backgroundColor: "#FAFBFF" }}>
        <View style={styles.MainView}>
          <View style={{ borderColor: "#9a9cb2", borderWidth: 1, padding: 12, borderRadius: 10 }}>
            <Back width={15} height={15} />
          </View>
          <Text style={styles.HeaderText}>Consultation Result</Text>
        </View>
        <View style={{ marginHorizontal: 20,justifyContent:"center", flexDirection: "row", gap: 10 }}>
          <Image style={{ width: 200, height: 350 }} source={require("../../../assets/images/doctorProfile.png")} />
          <View style={{ marginTop: 40 }}>
            <Text style={{ fontFamily: FONTS.FONT_POPPINS_SEMIBOLD, color: "#343965", fontSize: 17, textAlign: "left" }}>Dr. Samantha</Text>
            <Text style={{ fontFamily: FONTS.FONT_POPPINS_REGULAR, color: "#343965", fontSize: 14, textAlign: "left" }}>Cardiologist</Text>
            <View style={{ flexDirection: "row" }}>
              <View style={{ backgroundColor: "#fee9dd", padding: 5, width: 28, height: 28, borderRadius: 8, alignItems: 'center', justifyContent: "center", marginRight: 6 }}>
                <Image style={{ width: 15, height: 15 }} source={require("../../../assets/icons/Vector.png")} />
              </View>
              <View>
                <Text style={{ flexDirection: "column", fontSize: 8 }}>Rating</Text>
                <Text style={{ flexDirection: "column", fontSize: 12, fontFamily: FONTS.FONT_POPPINS_SEMIBOLD, }}>4.9</Text>
              </View>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View style={{ backgroundColor: "#e6e6ff", padding: 5, width: 28, height: 28, borderRadius: 8, alignItems: 'center', justifyContent: "center", marginRight: 6 }}>
                <Image style={{ width: 15, height: 15 }} source={require("../../../assets/icons/health.png")} />
              </View>
              <View>
                <Text style={{ flexDirection: "column", fontSize: 8 }}>Experience</Text>
                <Text style={{ flexDirection: "column", fontSize: 12, fontFamily: FONTS.FONT_POPPINS_SEMIBOLD, }}>8 years+</Text>
              </View>
            </View>
            <Image style={{ width: width / 3.5, height: 70, borderRadius: 22, marginTop: 6 }} source={require("../../../assets/images/map.png")} />
            <View style={{ padding: 8, paddingBottom: 10, paddingTop: 10, backgroundColor: "#ECF2FF", borderRadius: 20, gap: 0, marginTop: 15, textAlign: "center" }}>
              <Text style={{ fontFamily: FONTS.FONT_POPPINS_MEDIUM, textAlign: "center", color: "#343965", fontSize: 12 }}>Total time</Text>
              <View style={{ flexDirection: 'row', justifyContent: "center", gap: 5, alignItems: "center" }}>
                <Image style={{ width: 15, height: 15 }} source={require("../../../assets/images/Ellipse.png")} />
                <Text style={{ fontFamily: FONTS.FONT_POPPINS_REGULAR, fontSize: 13, color: "#9a9cb2" }}>07:51</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{ borderBottomColor: "#343965", borderBottomWidth: 0.3, marginHorizontal: 30 }} />
        <View style={{ paddingHorizontal: 25, paddingVertical: 25 }}>
          <Text style={{ fontFamily: FONTS.FONT_POPPINS_SEMIBOLD, color: "#343965", fontSize: 18 }}>Summary</Text>
          <Text style={{ lineHeight: 20, fontSize: 15, fontFamily: FONTS.FONT_POPPINS_REGULAR, color: "#9a9cb2" }}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt nemo maiores deleniti culpa, id quidem nostrum harum expedita et laudantium dignissimos.
          </Text>
        </View>
        <View >
          <Text style={{ fontFamily: FONTS.FONT_POPPINS_SEMIBOLD, color: "#343965", fontSize: 18, paddingHorizontal: 25, paddingTop: 40 }}>Items prescribed</Text>
          <View >
            <View style={{ padding: 10, paddingBottom: 0, marginLeft: "auto", marginRight: "auto" }}>
              <Image style={{ height: 6, borderRadius: 9999, width: 60 }} source={require("../../../assets/images/bar.png")} />
            </View>
            <PrescriptionCard name={"Pronitol Edrocin"} dose={"30mg tablets"} price={"13"} decimalPrice={"00"} />
            <PrescriptionCard name={"Pronitol Edrocin"} dose={"30mg tablets"} price={"13"} decimalPrice={"00"} />
            <PrescriptionCard name={"Pronitol Edrocin"} dose={"30mg tablets"} price={"13"} decimalPrice={"00"} />
            <PrescriptionCard name={"Pronitol Edrocin"} dose={"30mg tablets"} price={"13"} decimalPrice={"00"} />
            <PrescriptionCard name={"Pronitol Edrocin"} dose={"30mg tablets"} price={"13"} decimalPrice={"00"} />
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  MainView: {
    width: width,
    height: height / 12,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 30,
    padding:10
  },
  HeaderText: {
    width: "80%",
    fontSize: 15,
    fontFamily: FONTS.FONT_POPPINS_REGULAR,
    color: "black",
    textAlign: "center",
  }
}
)