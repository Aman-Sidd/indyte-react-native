import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
const { width, height } = Dimensions.get('window');
import ScreenContainer from '../../components/container/ScreenContainer'
import Back from "../../../assets/icons/BackLeft.svg"
import { FONTS } from '../../constants/Fonts';
import ConsultantResultCard from '../../components/consultant/ConsultantResultCard';
import LinearGradient from 'react-native-linear-gradient';
import AllDoctorsCard from '../../components/consultant/AllDoctorsCard';


export default function MakeAppointment() {
  const [expanded, setExpanded] = useState(false);

  return (
    <ScreenContainer scroll paddingLeft={0} paddingRight={0}>
      <View style={styles.MainView}>
        <View style={{ borderColor: "#9a9cb2", borderWidth: 1, padding: 12, borderRadius: 10 }}>
          <Back width={15} height={15} />
        </View>
      </View>

      <View style={{ marginHorizontal: 20, flexDirection: "row", gap: 10, height: 330 }}>
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
          <Image style={{ width: width / 3, height: 135, borderRadius: 22, marginTop: 12 }} source={require("../../../assets/images/appointment_map.png")} />
        </View>
      </View>

      <View style={{ borderBottomColor: "#9a9cb2", borderBottomWidth: 0.3, marginHorizontal: 30 }} />

      <Text style={{ fontFamily: FONTS.FONT_POPPINS_SEMIBOLD, color: "#343965", fontSize: 18, paddingHorizontal: 25, paddingTop: 20 }}>Upcoming Schedule</Text>

      <View style={{ paddingHorizontal: 25, paddingTop: 30 }}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity>
            <ConsultantResultCard name={"Dr. Samantha"} designation={"Cardiologist"} rating={"4.9"} profilePath={require("../../../assets/images/doctor.png")} mapPath={require("../../../assets/icons/Vector.png")} containerStyle={{ width: width / 1.1, borderColor: "#585CE5", elevation: 8 }} statusStyle={{ justifyContent: "center", borderColor: "#585CE5", elevation: 1 }} mapImgStyle={{ width: width / 3.5, height: 70 }} />
          </TouchableOpacity>
        </View>
        <View style={{ padding: 10, paddingVertical: 15 }}>
          <Text style={{ fontFamily: FONTS.FONT_POPPINS_SEMIBOLD, color: "#343965", fontSize: 18 }}>Biography</Text>
          <Text
            style={{
              lineHeight: 20,
              fontSize: 15,
              fontFamily: FONTS.FONT_POPPINS_REGULAR,
              color: "#9a9cb2",
              paddingLeft: 10,
              flexDirection: "row",
            }}
          >
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt nemo maiores deleniti culpa, id quidem nostrum harum expedita et antium. {!expanded && <Text onPress={() => setExpanded(true)} style={{ color: 'blue', fontSize: 14 }}>Read More</Text>}
            {expanded && (
              <Text>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt nemo maiores deleniti culpa, id quidem nostrum harum expedita et laudantium dignissimos.
              </Text>
            )}
          </Text>
        </View>
      </View>
      <View style={{ marginTop: 20, marginHorizontal: 40, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Text style={{ fontFamily: FONTS.FONT_POPPINS_SEMIBOLD, color: "#343965", fontSize: 18 }}>Reviews</Text>
        <Text style={{ fontSize: 12, fontFamily: FONTS.FONT_POPPINS_REGULAR, color: "#585CE5" }}>See all</Text>
      </View>
      <View>
        <View style={{ backgroundColor: "#ECF2FF", padding: 5, paddingHorizontal: 8, borderRadius: 30, marginHorizontal: 20, marginBottom: 10 }}>
          <AllDoctorsCard name={"Dr Samantha"} designation={"Cardiologist"} rating={"4.9"} profilePath={require("../../../assets/images/all-doctor1.png")} />
        </View>
        <View style={{ backgroundColor: "#ECF2FF", padding: 5, paddingHorizontal: 8, borderRadius: 30, marginHorizontal: 20, marginBottom: 10 }}>
          <AllDoctorsCard name={"Dr Samantha"} designation={"Cardiologist"} rating={"4.9"} profilePath={require("../../../assets/images/all-doctor1.png")} />
        </View>
        <View style={{ backgroundColor: "#ECF2FF", padding: 5, paddingHorizontal: 8, borderRadius: 30, marginHorizontal: 20, marginBottom: 10 }}>
          <AllDoctorsCard name={"Dr Samantha"} designation={"Cardiologist"} rating={"4.9"} profilePath={require("../../../assets/images/all-doctor1.png")} />
        </View>
      </View>
      <View
        style={{
          justifyContent: 'flex-start',
          marginVertical: 30,
          paddingTop: 10,
          marginBottom: 60,
          height: 100,
          // position: "absolute",
          bottom: -20,
          width,
          alignItems: "center",
          backgroundColor: "white",
          elevation: 1,
          zIndex: 1,
          borderRadius: 40
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(SCREENS.DASHBOARD);
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: '#FAFBFF',
              fontWeight: 300,
              fontSize: 17,
              padding: 20,
              width: width * 9.5 / 10,
              backgroundColor: "#585CE5",
              elevation: 8,
              borderRadius: 30,
            }}>
            Make a Appointment
            <Image source={require('../../../assets/images/ArrowRight.png')} />
          </Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  MainView: {
    width: width,
    // height: height / 12,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 30,
  },
})