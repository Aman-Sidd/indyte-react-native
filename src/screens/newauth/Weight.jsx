import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useDerivedValue,
  useAnimatedGestureHandler,
  runOnJS,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import SlideHeader from '../../components/header/SlideHeader';
import TextH4 from '../../components/Text/TextH4';
import NewButtob from '../../components/Button/NewButtob';
import SmallText from '../../components/Text/SmallText';
import LiftMan from '../../../assets/images/LiftMan.svg';
import Input from '../../components/Form/Input';
import { SCREENS } from '../../constants/Screens';
import { useRoute } from '@react-navigation/native';
import { useRef } from 'react';
import CustomToast from '../../components/common/Toast';
const Weight = ({ navigation }) => {
  const route = useRoute();
  const values = route.params?.values;
  const [lbs, setlbs] = useState(true);
  const [kg, setkg] = useState(false);
  const [MainWeightVal, setMainWeightVal] = useState(50);

  const tick = require('../../../assets/images/strip.png');
  const pointer = require('../../../assets/images/pointer.png');
  const pressed = useSharedValue(false);
  const offset = useSharedValue(-183);
  const [counter, setCounter] = useState(50);

  const someFunc = val => {
    // console.log('====================================');
    // console.log(val, "Vak");
    // console.log('====================================');
    setMainWeightVal(currentValue => currentValue + (parseInt(val) * -1));
  };

  const childRef = useRef(null);
  const [toastColorState, setToastColorState] = useState('');
  const [toastTextColorState, setToastTextColorState] = useState('white');
  const [toastMessage, setToastMessage] = useState('');


  const pan = Gesture.Pan()
    .onBegin(() => {
      pressed.value = true;
    })
    .onChange(event => {
      let newX = offset.value + event.changeX * 7.8;
      if (newX > -1825 && newX < 148) {
        console.log(newX, "NEWX");
        offset.value = newX;
        // someWorklet(event.changeX);
        runOnJS(someFunc)(event.changeX);
      }
    })
    .onFinalize(() => {
      pressed.value = false;
    });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));


  const handlePress = () => {
    if (MainWeightVal.length < 1) {
      setToastMessage('Weight is required');
      setToastTextColorState('white');
      setToastColorState('red');
      childRef.current.showToast();
      return
    }

    navigation.navigate(SCREENS.GOALWEIGHT, { values: { ...values, current_weight: JSON.stringify(MainWeightVal), weight: JSON.stringify(MainWeightVal) } });
  };

  return (
    <ScrollView style={{ backgroundColor: 'white', height: '100%' }}>
      <CustomToast
        toastColor={toastColorState}
        toastTextColor={toastTextColorState}
        toastMessage={toastMessage}
        ref={childRef}
      />
      <SlideHeader />
      <LiftMan
        width={124}
        height={189}
        style={{ alignSelf: 'center', marginVertical: 20 }}
      />
      <View style={styles.ProfileView}>
        <TextH4 style={{ marginTop: '20%' }}>What is your current weight?</TextH4>
        <View style={styles.InnerMain}>
          <TouchableOpacity
            onPress={() => {
              setlbs(true);
              setkg(false);
            }}
            style={[
              styles.InnerMainView,
              { backgroundColor: lbs ? '#8C80F8' : 'white' },
            ]}>
            <Text
              style={{
                fontSize: 13,
                color: lbs ? 'white' : 'black',
                fontWeight: '500',
              }}>
              lbs
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setlbs(false);
              setkg(true);
            }}
            style={[
              styles.InnerMainView,
              { backgroundColor: kg ? '#8C80F8' : 'white' },
            ]}>
            <Text
              style={{
                fontSize: 13,
                color: kg ? 'white' : 'black',
                fontWeight: '500',
              }}>
              kg
            </Text>
          </TouchableOpacity>
        </View>

        <GestureHandlerRootView style={styles.container}>
          <View style={styles.innerContainer}>
            <GestureDetector gesture={pan}>
              <View style={{ marginHorizontal: '5%' }}>
                <Animated.View
                  style={{
                    height: 0,
                    width: '100%',
                    // backgroundColor: 'red',
                    zIndex: 100,
                  }}
                />
                <Animated.View style={[styles.circle, animatedStyles]}>
                  <Image
                    source={tick}
                    style={{
                      height: 300,
                      width: 1680,
                      flexDirection: 'row',
                      marginTop: -90,
                    }}
                    resizeMode="contain"
                  />
                </Animated.View>
              </View>
            </GestureDetector>
          </View>
          <View
            style={{
              position: 'absolute',
              alignSelf: 'center',
              alignItems: 'center',
              width: '100%',
              zIndex: -999,
              bottom: -10,
            }}>
            <Image
              source={pointer}
              style={{ height: 120 }}
              resizeMode="contain"
            />
            <Animated.Text style={{ fontSize: 28, color: "#000" }}>{MainWeightVal}</Animated.Text>
          </View>
        </GestureHandlerRootView>

        <NewButtob title={'Continue'} onPress={handlePress} />
      </View>
    </ScrollView>
  );
};

export default Weight;

const styles = StyleSheet.create({
  ProfileView: {
    alignItems: "center"
  },
  InnerMain: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 15
  },
  InnerMainView: {
    width: "20%",
    marginHorizontal: 20,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 11,
  },
  container: {
    // overflow: 'hidden',
    // margin:50,
    height: 150,
    marginVertical: '5%',
    width: Dimensions.get('window').width,
    // backgroundColor:"yellow",
  },
  innerContainer: {
    overflow: 'hidden',
    // margin:50,
    height: 100,
    marginHorizontal: '5%',
    // width:Dimensions.get("window").width,
    // backgroundColor:"yellow",
  },
  circle: {
    flexDirection: 'row',
    height: 50,
    width: 100,
    // backgroundColor: 'blue',
    borderRadius: 500,
    cursor: 'grab',
  },
});
