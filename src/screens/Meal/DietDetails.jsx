import React, {useEffect, useState, useRef, useMemo, useCallback} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  ImageBackground,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import IngridientCard from '../../components/card/IngridientCard';
import EggsSvg from '../../../assets/icons/Eggs-Icon.svg';
import {COLORS} from '../../constants/Colors';
import {FONTS} from '../../constants/Fonts';
import LargeText from '../../components/Text/LargeText';
import SmallText from '../../components/Text/SmallText';
import Tag from '../../components/Text/Tag';
import FireSvg from '../../../assets/icons/Calories-Icon.svg';
import CarboSvg from '../../../assets/icons/Carbo-Icon.svg';
import ProteinSvg from '../../../assets/icons/Proteins-Icon.svg';
import FatSvg from '../../../assets/icons/trans-fat.svg';
import SolidContainer from '../../components/container/SolidContainer';
import PrimaryButton from '../../components/Button/PrimaryButton';
import Back from '../../../assets/icons/Back.svg';
import TwoDot from '../../../assets/icons/twodot.svg';
import TextH4 from '../../components/Text/TextH4';
import {useNavigation} from '@react-navigation/native';
import Background from '../../../assets/images/cake.png';
import Calories from '../../../assets/images/calories.png';
import ActivePassiveList from '../../components/list/ActivePassiveList';
import {SCREENS} from '../../constants/Screens';
import LottieView from 'lottie-react-native';
// import BottomSheet from '../../components/container/BottomSheet';
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import useLayout from '../../hooks/useLayout';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import GradientLabel from '../../components/Label/GradientLabel';

const {height, width} = Dimensions.get('window');
const tags = [
  {
    id: 1,
    icon: <FireSvg width={20} height={20} />,
    tag: '180kCal',
  },
  {
    id: 2,
    icon: <FatSvg width={20} height={20} />,
    tag: '30g fats',
  },
  {
    id: 3,
    icon: <ProteinSvg width={20} height={20} />,
    tag: '20g proteins',
  },
  {
    id: 4,
    icon: <CarboSvg width={20} height={20} />,
    tag: '180kCal',
  },
];

const temptags = {cal: 0, carbs: 3, fats: 1, protien: 2};
function DietDetails({route}) {
  const {meal} = route.params;

  const [options, setOptions] = useState(false);
  const navigation = useNavigation();
  const [expanddiscription, setExpanddiscription] = useState(false);
  const sheetRef = useRef(null);
  const [viewHeight, getViewHeight] = useLayout();

  console.log(viewHeight);

  const toggleOptions = () => {
    setOptions(prev => !prev);
  };

  // Simplified state and functions for demonstration purposes
  const [mealDetails, setMealDetails] = React.useState({...meal.meal});

  // Simplified function to navigate to another screen
  const navigateToMealFinal = () => {
    navigation.navigate('MealFinal');
  };

  // Simplified function to navigate to another screen
  const navigateToMealHome = () => {
    navigation.navigate('MealHome');
  };

  const convertData = () => {
    if (meal) {
      const tempNutrition = [];
      if (meal.meal.nutrition[0]) {
        Object.keys(meal.meal.nutrition[0]).map(k => {
          const tempdata = tags[temptags[k]];
          console.log(temptags);
          if (k in temptags) {
            tempdata.tag = meal.meal.nutrition[0][k] + ' ' + k;
            tempNutrition.push(tempdata);
          }
        });
      }
      const tempSteps = [];
      meal.meal.steps.map((i, idx) => {
        const tempdata = {
          isComplete: false,
          title: `Step ${idx + 1}`,
          subtitle: i,
        };
        tempSteps.push(tempdata);
      });
      setMealDetails(prev => ({
        ...prev,
        nutrition: tempNutrition,
        steps: tempSteps,
      }));
    }
  };

  useEffect(() => {
    convertData();
  }, []);

  const NutritionItems = data => {
    return (
      <View>
        <Image source={data.imageurl} style={{height: 40, width: 40}} />
        <Text style={{color: 'black'}}>{data.data}</Text>
      </View>
    );
  };

  const handleCompleteStep = index => {
    const tempsteps = [...mealDetails.steps];
    tempsteps[index].isComplete = !tempsteps[index].isComplete;
    setMealDetails(prev => ({...prev, steps: tempsteps}));
  };

  const handleSheetChange = useCallback(index => {}, []);
  const handleSnapPress = useCallback(index => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  const snapPoints = useMemo(() => ['60%', '100%'], []);
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',

          width: '100%',
          paddingHorizontal: 20,
          position: 'absolute',
          top: 20,
        }}>
        <SolidContainer containerStyle={styles.solidContainerStyle}>
          <Back width={16} height={16} />
        </SolidContainer>

        <SolidContainer
          containerStyle={styles.solidContainerStyle}
          onPress={() => toggleOptions()}>
          <TwoDot width={16} height={16} />
        </SolidContainer>
      </View>

      {options && (
        <View
          style={{
            position: 'absolute',
            right: 0,
            top: 70,
            width: '50%',
            zIndex: 100,
          }}>
          <PrimaryButton
            onPress={() => navigation.navigate(SCREENS.MEALSCHEDULER)}
            title={'Skip for Today'}
          />
        </View>
      )}
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <LottieView
          source={require('../../../assets/lottieanimations/Meal.json')}
          style={{width: '50%', height: '50%'}}
          autoPlay
          loop
        />
      </View>
      <BottomSheet
        ref={sheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChange}>
        <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
          <View style={{paddingHorizontal: 20, paddingTop: 10}}>
            {/* <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  width: 40,
                  height: 8,
                  backgroundColor: 'grey',
                  borderRadius: 20,
                }}></View>
            </View> */}
            <View style={{marginVertical: 10}}>
              <Text style={{fontSize: 27, color: 'black', fontWeight: '900'}}>
                {mealDetails.name}
              </Text>
              {/* <SmallText>cake</SmallText> */}
            </View>
            <View>
              <TextH4>Nutrition</TextH4>
              <BottomSheetFlatList
                data={mealDetails.nutrition}
                renderItem={({item}) => <Tag icon={item.icon} tag={item.tag} />}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </View>
            <View>
              <TextH4>Description</TextH4>

              {expanddiscription ? (
                <SmallText style={styles.descriptions}>
                  {mealDetails.description.substring(0, 150)}
                  <SmallText
                    style={{color: COLORS.PRIMARY_BUTTON_GRADIENT.BLUE1}}
                    onPress={() => setExpanddiscription(false)}>
                    Read More...
                  </SmallText>
                </SmallText>
              ) : (
                <SmallText style={styles.descriptions}>
                  {mealDetails.description}
                  <SmallText
                    style={{color: COLORS.PRIMARY_BUTTON_GRADIENT.BLUE1}}
                    onPress={() => setExpanddiscription(true)}>
                    Read Less...
                  </SmallText>
                </SmallText>
              )}
            </View>
            <View>
              <TextH4>Ingredients</TextH4>
              <BottomSheetFlatList
                data={mealDetails.ingredients}
                renderItem={({item}) => <Tag tag={`${item}`} />}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </View>
            <View>
              <TextH4>Step by Step</TextH4>
              {mealDetails?.steps?.map((item, index) => (
                <TouchableOpacity onPress={() => handleCompleteStep(index)}>
                  <ActivePassiveList
                    width={340}
                    key={index}
                    id={`${index < 9 ? '0' + (index + 1) : index + 1}`}
                    isComplete={item.isComplete}
                    title={item.title}
                    subtitle={item.subtitle}
                    showLine={
                      index === mealDetails.steps.length - 1 ? false : true
                    }
                  />
                </TouchableOpacity>
              ))}
              {
                <View style={{paddingBottom: 30, paddingRight: 30}}>
                  <PrimaryButton
                    onPress={() =>
                      navigation.navigate(SCREENS.MEALFINAL, {
                        meal: meal,
                      })
                    }
                    title={'Complete the meal'}
                  />
                </View>
              }
            </View>
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
      {/* </GradientLabel> */}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#F5FCFF',
  },
  solidcontainer: {
    marginTop: 20,
    paddingRight: 35,
    backgroundColor: 'white',
    flexDirection: 'row',
    marginBottom: 10,
  },
  image: {
    borderRadius: 20,

    // overflow: 'hidden',
  },

  descriptions: {
    fontFamily: FONTS.FONT_POPPINS_MEDIUM,
    flexGrow: 1,
    textAlign: 'left',
  },
  solidContainerStyle: {
    borderRadius: 10,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsContainer: {
    height: height * 0.6,
    backgroundColor: 'white',
    width: '100%',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingHorizontal: 20,
    paddingTop: 10,
    gap: 30,
    elevation: 20,
    shadowColor: 'black',
  },
  detailContainer: {
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: 'white',
    width: width,
    marginTop: height * 0.01,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
  },
});

export default DietDetails;
