import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import ScreenContainer from "../container/ScreenContainer";
import TextCenterHeader from "../../screens/header/TextCenterHeader";
import LoadMoreSvg from "../../../assets/icons/MoreSquare.svg";
import CloseSvg from "../../../assets/icons/cross.svg";
import VideoPlayer from "react-native-video-player";
import LargeText from "../Text/LargeText";
import { FONTS } from "../../constants/Fonts";
import SmallText from "../Text/SmallText";
import { COLORS } from "../../constants/Colors";
import ActivePassiveList from "../list/ActivePassiveList";
import ScrollPicker from "react-native-wheel-scrollview-picker";
import FireSvg from "../../../assets/icons/Calories-Icon.svg";
import TextMedium from "../Text/TextMedium";
import { useState } from "react";
import PrimaryButton from "../Button/PrimaryButton";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SCREENS } from "../../constants/Screens";
const stepData = [
  {
    title: "Spread Your Arms",
    subtitle:
      "To make the gestures feel more relaxed, stretch your arms as you start this movement. No bending of hands.",
    isComplete: true,
  },
  {
    title: "Rest at The Toe",
    subtitle:
      "The basis of this movement is jumping. Now, what needs to be considered is that you have to use the tips of your feet",
    isComplete: true,
  },
  {
    title: "Adjust Foot Movement",
    subtitle:
      "Jumping Jack is not just an ordinary jump. But, you also have to pay close attention to leg movements.",
    isComplete: true,
  },
  {
    title: "Clapping Both Hands",
    subtitle:
      "This cannot be taken lightly. You see, without realizing it, the clapping of your hands helps you to keep your rhythm while doing the Jumping Jack",
    isComplete: true,
  },
];
const selectorValues = [
  {
    calories: "450",
    times: 29,
  },
  {
    calories: "450",
    times: 30,
  },
  {
    calories: "450",
    times: 31,
  },
];
const description =
  `A jumping jack, also known as a star jump and called a side-straddle hop in the US military, is a physical jumping exercise performed by jumping to a position with the legs spread wide `;
function WorkoutDetails(props) {
  const navigation = useNavigation();
  const [steps, setSteps] = useState([]);
  const [selectedScrollIndex, setSelectedScrollIndex] = useState(1);

  const route = useRoute();
  const workOutDetail = route.params?.item;
  console.log("egergedrgdrfgf", workOutDetail);


  const handleCompleted = () =>{
     
  }
  const arrangeData = () => {
    if (workOutDetail) {
      const tempsteps  =[]
      workOutDetail.steps.map((step,idx) => {
        const tempObj = { isComplete: false, title: "", description: "" };
        tempObj.title=`Step ${idx}` 
        tempObj.description=step
        tempsteps.push(tempObj)
      });
      setSteps(tempsteps)
    }
  };
  useEffect(() => {
    arrangeData;
  }, []);
  return (
    <ScreenContainer scroll={true}>
      <TextCenterHeader
        icon1={<CloseSvg width={20} height={20} />}
        icon2={<LoadMoreSvg width={20} height={20} />}
      />
      <View style={styles.videoContainer}>
        <VideoPlayer
          video={{ uri: "https://www.youtube.com/watch?v=dG9g5y-4m_Y" }}
          videoWidth={300}
          videoHeight={180}
          resizeMode="contain"
          thumbnail={{ uri: "https://i.picsum.photos/id/866/1600/900.jpg" }}
          fullScreenOnLongPress={true}
        />
      </View>
      <LargeText style={styles.boldText}>{workOutDetail.name}</LargeText>
      <SmallText style={{ marginBottom: 30 }}>
        {workOutDetail.difficulty} |{" "}
        {`${workOutDetail.caloriesBurn} Calories Burn`}
      </SmallText>
      <LargeText style={{ ...styles.boldText, marginBottom: 5 }}>
        Descriptions
      </LargeText>
      <SmallText style={{ marginBottom: 20 }}>
        {workOutDetail.description}
        <SmallText style={{ color: COLORS.PRIMARY_BUTTON_GRADIENT.BLUE1 }}>
          Read More ...
        </SmallText>
      </SmallText>
      <LargeText style={{ ...styles.boldText, marginBottom: 15 }}>
        How To Do It
      </LargeText>
      <View style={{ marginBottom: 30 }}>
        {workOutDetail?.steps?.map((item, index) => (
          <ActivePassiveList
            width={340}
            key={index}
            // id={`${index < 10 ? '0' + (index + 1) : index}`}
            isComplete={true}
            title={`Step ${index+1}`}
            subtitle={item}
            // showLine={(index === stepData.length - 1) ? false : true}
          />
        ))}
      </View>
     {/* <ScrollPicker
        dataSource={selectorValues}
        selectedIndex={selectedScrollIndex}
        renderItem={(data, index) => {
          return (
            <View
              style={[styles.sliderValues, {
                opacity: index !== selectedScrollIndex ? 0.4 : 1,
              }]}
            >
              <FireSvg
                width={index !== selectedScrollIndex ? 15 : 20}
                height={index !== selectedScrollIndex ? 15 : 20}
              />
              <TextMedium
                style={{ color: "#ADA4A5", marginLeft: 5, marginRight: 10 }}
              >
                {`${data.calories} Calories Burn`}
              </TextMedium>
              <LargeText
                style={{
                  fontSize: index !== selectedScrollIndex ? 14 : 16,
                  fontFamily: FONTS.FONT_POPPINS_BOLD,
                  marginRight: 5,
                }}
              >
                {data.times}
              </LargeText>
              <LargeText
                style={{ fontSize: index !== selectedScrollIndex ? 14 : 16 }}
              >
                times
              </LargeText>
            </View>
          );
        }}
        onValueChange={(data, selectedIndex) => {
          setSelectedScrollIndex(selectedIndex);
        }}
        wrapperHeight={180}
        wrapperWidth={150}
        wrapperColor="white"
        itemHeight={80}
        highlightColor="#d8d8d8"
        highlightBorderWidth={2}
        activeItemTextStyle={{ color: "#ADA4A5" }}
        itemTextStyle={{ opacity: 0.2 }}
      />*/}
      <View style={{ position: "absolute", bottom: "12%", width: "100%" }}>
        <PrimaryButton
          onPress={() =>handleCompleted()}
          containerStyle={{ width: "80%", alignSelf: "center" }}
          title={"Mark as Completed"}
        />
      </View>
       <View style={{ position: "absolute", bottom: "4%", width: "100%" }}>
        <PrimaryButton
          onPress={() => navigation.navigate(SCREENS.WORKOUTHOME)}
          containerStyle={{ width: "80%", alignSelf: "center" }}
          title={"Skip"}
        />
      </View>
       
      <View style={{ marginBottom:120,marginTop:60 }} ></View>
    </ScreenContainer>
  );
}
const styles = StyleSheet.create({
  boldText: {
    fontFamily: FONTS.FONT_POPPINS_BOLD,
    color: "black",
    marginBottom: 5,
  },
  videoContainer: {
    borderRadius: 15,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 30,
  },
  sliderValues: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
export default WorkoutDetails;
