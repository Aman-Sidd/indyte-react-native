import React, {useEffect, useRef, useState, useCallback, useMemo} from 'react';
import {Dimensions, FlatList, ScrollView, StyleSheet, View} from 'react-native';
import {COLORS} from '../../constants/Colors';
import GradientLabel from '../../components/Label/GradientLabel';
import {Image} from 'react-native';
import {FONTS} from '../../constants/Fonts';
import LargeText from '../../components/Text/LargeText';
const {width, height} = Dimensions.get('window');
import CalenderOption from '../../../assets/images/CalenderOption.svg';
import Updown from '../../../assets/images/Updown.svg';
import Dumble from '../../../assets/icons/Dumble.svg';
import PrimaryButton from '../../components/Button/PrimaryButton';
import TextMedium from '../../components/Text/TextMedium';
import WorkOutHeader from '../../components/workout/WorkOutHeader';
import WorkoutOption from '../../components/workout/WorkoutOption';
import ExerciseItems from '../../components/card/ExerciseItems';
import ExerciseInfoCard from '../../components/card/ExerciseInfoCard';
import {SCREENS} from '../../constants/Screens';
import {useNavigation} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import useLayout from '../../hooks/useLayout';
import {useRoute} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';
import {markWorkoutFinished} from '../../services';
import {ActivityIndicator} from 'react-native-paper';
import CustomToast from '../../components/common/Toast';

function WorkOutInfo(props) {
  const navigation = useNavigation();

  const [viewHeight, getViewHeight] = useLayout();
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const moreInfo = route.params?.moreInfo;
  const sheetRef = useRef(null);
  const [calories, setCalories] = useState(0);
  const [equipments, setEquipments] = useState([]);
  const childRef = useRef(null);
  const [toastColorState, setToastColorState] = useState('');
  const [toastTextColorState, setToastTextColorState] = useState('white');
  const [toastMessage, setToastMessage] = useState('');

  const snapPoints = useMemo(() => ['60%', '60%', '100%'], []);

  const handleCompleted = async () => {
    try {
      setLoading(true);
      const date = new Date();
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are  0-indexed in JavaScript
      const day = date.getDate().toString().padStart(2, '0');
      const formateddate = `${year}-${month}-${day}`;

      const reqBody = {
        userId: moreInfo.userId,
        workoutId: moreInfo.workoutId,
        date: formateddate,
      };
      const workoutcompleted = await markWorkoutFinished(reqBody);
      if (workoutcompleted.data) {
        console.log('worktoutdata', workoutcompleted.data);
        setToastMessage(workoutcompleted.data.message);
        setToastTextColorState('white');
        setToastColorState('green');
        childRef.current.showToast();
        setLoading(false);
        navigation.navigate(SCREENS.FINISHWORKOUT);
      }
      setLoading(false);
    } catch (error) {
      console.log(error.response.data);
      setToastMessage(error.response.data.message);
      setToastTextColorState('white');
      setToastColorState('red');
      childRef.current.showToast();
      setLoading(false);
    }
  };
  const arrangeData = () => {
    if (moreInfo) {
      let tempcal = 0;
      let tempequip = [];
      moreInfo.workout.exercises.map(e => {
        console.log(e);
        tempcal += e.caloriesBurn;
        tempequip = [...tempequip, ...e.equipments];
      });
      console.log(tempequip);
      setCalories(tempcal);
      setEquipments(tempequip);
    }
  };

  const handleCompleteStep = index => {
    const tempsteps = [...mealDetails.steps];
    tempsteps[index].isComplete = !tempsteps[index].isComplete;
    setMealDetails(prev => ({...prev, steps: tempsteps}));
  };

  const handleSheetChange = useCallback(index => {
    console.log('handleSheetChange', index);
  }, []);
  useEffect(() => {
    arrangeData();
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <GradientLabel
        colors={[
          COLORS.PRIMARY_BUTTON_GRADIENT.BLUE1,
          COLORS.PRIMARY_BUTTON_GRADIENT.BLUE2,
        ]}
        conatinerStyle={styles.container}>
        <Image
          source={require('../../../assets/images/JumpBoy.png')}
          style={styles.image}
        />
        <CustomToast
          toastColor={toastColorState}
          toastTextColor={toastTextColorState}
          toastMessage={toastMessage}
          ref={childRef}
        />
        {/* <BottomSheet extraRequiredHeight={400}> */}
        <BottomSheet
          ref={sheetRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChange}>
          <BottomSheetScrollView
            contentContainerStyle={styles.contentContainer}>
            <WorkOutHeader
              title={moreInfo.workout.name}
              ExerciseInformation={`${moreInfo.workout?.exercises.length} Exercises | 32mins |${moreInfo.workout.totalCaloriesBurnt}  Calories Burn`}
            />
            <WorkoutOption
              title={'Schedule Workout'}
              icon={<CalenderOption width={22} height={22} />}
              Time={'5/27, 09:00 AM'}
              backgroundColor={'#E2EEFF'}
            />
            {/* <WorkoutOption
            title={'Difficulty'}
            icon={<Updown width={22} height={22} />}
            Time={moreInfo.workout.exercises[0].difficulty}
            backgroundColor={'#FFECF5'}
          /> */}

            <View
              style={{
                marginTop: '3%',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginHorizontal: '5.3%',
              }}>
              <LargeText
                style={{
                  fontFamily: FONTS.FONT_POPPINS_SEMIBOLD,
                  color: 'black',
                }}>
                You will need
              </LargeText>
              <TextMedium>{equipments.length} Items</TextMedium>
            </View>
            <ScrollView horizontal style={{margin: '5%'}}>
              {equipments &&
                equipments.map(equipment => {
                  if (equipment == 'None') {
                    return;
                  }
                  return (
                    <ExerciseItems
                      icon={<Dumble width={53} height={53} />}
                      title={equipment}
                      finished={true}
                    />
                  );
                })}
            </ScrollView>
            <View
              style={{
                marginTop: '3%',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginHorizontal: '5.3%',
              }}>
              <LargeText
                style={{
                  fontFamily: FONTS.FONT_POPPINS_SEMIBOLD,
                  color: 'black',
                }}>
                Exercises
              </LargeText>
              <TextMedium>5 Sets</TextMedium>
            </View>
            <View
              style={{
                marginTop: '3%',
                marginHorizontal: '5.3%',
                marginBottom: '20%',
              }}>
              <LargeText
                style={{
                  fontFamily: FONTS.FONT_POPPINS_SEMIBOLD,
                  color: 'black',
                }}>
                Set 1
              </LargeText>
              {moreInfo &&
              moreInfo?.workout?.exercises &&
              moreInfo?.workout?.exercises.length > 0 ? (
                <>
                  {moreInfo?.workout?.exercises.map((item, ind) => (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(SCREENS.WODKOUTDETAILS, {item})
                      }>
                      <ExerciseInfoCard
                        title={item.name}
                        img={require('../../../assets/icons/Girl.png')}
                        Time={`${item.reps} x`}
                        finished={true}
                      />
                    </TouchableOpacity>
                  ))}
                </>
              ) : null}
            </View>
            <View style={{position: 'absolute', bottom: '10%', width: '100%'}}>
              {loading ? (
                <ActivityIndicator />
              ) : (
                <PrimaryButton
                  onPress={() => handleCompleted()}
                  containerStyle={{width: '80%', alignSelf: 'center'}}
                  title={'Start Workout'}
                />
              )}
            </View>
            <View style={{marginBottom: '10%'}}></View>
          </BottomSheetScrollView>
        </BottomSheet>
      </GradientLabel>
    </GestureHandlerRootView>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  detailContainer: {
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: 'white',
    width: width,
    paddingTop: '10%',
  },
  image: {
    marginTop: 20,
    marginBottom: '-40%',
  },
  solidcontainer: {
    marginTop: 20,
    paddingRight: 35,
    backgroundColor: 'white',
    flexDirection: 'row',
    marginBottom: 10,
  },
  solidContainerStyle: {
    borderRadius: 10,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  solidcontainer: {
    flexDirection: 'row',
    borderRadius: 15,
    height: 70,
    padding: 15,
    paddingHorizontal: 20,
    marginTop: 10,
    backgroundColor: 'rgba(157,206,255,0.2)',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: width / 1.111,
  },
  targetButton: {
    width: width / 3.6,
    height: 40,
    elevation: 0,
  },
  targetButtonText: {
    fontSize: 14,
  },
});
export default WorkOutInfo;
