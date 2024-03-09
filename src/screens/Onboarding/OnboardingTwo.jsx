import {View, Text, StyleSheet, Button, Pressable} from 'react-native';
import React, {useState} from 'react';
import Onboardingtwo from '../../../assets/icons/Onboardingtwo.svg';
import Onboardingthree from '../../../assets/icons/Onboardingthree.svg';
import Onboardingfour from '../../../assets/icons/Onboardingfour.svg';
import Onboardingfive from '../../../assets/icons/OnboardingFive.svg';
import TextH4 from '../../components/Text/TextH4';
import {style} from 'deprecated-react-native-prop-types/DeprecatedViewPropTypes';
import CircularRing from '../../components/progress/CircularRing';
import {COLORS} from '../../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../../constants/Screens';
import {storeDataInAsyncStorage} from '../../utils/common';

const OnboardingTwo = ({setInitial}) => {
  const navigation = useNavigation();
  const [step, setStep] = useState(0);
  const title = ['Track Your Goal', 'Get Burn', 'Eat Well', 'Improve Sleep'];
  const description = [
    "Don't worry if you have trouble determining your goals, We can help you determine your goals and track your goals",
    'Let’s keep burning, to achive yours goals, it hurts only temporarily, if you give up now you will be in pain forever',
    "Let's start a healthy lifestyle with us, we can determine your diet every day. healthy eating is fun",
    'Improve the quality of your sleep with us, good quality sleep can bring a good mood in the morning',
  ];
  const [pieData, setPieData] = useState([
    {value: 0, color: COLORS.PRIMARY_BUTTON_GRADIENT.BLUE1},
    {value: 100, color: '#F7F8F8'},
  ]);

  const handleNextStep = async () => {
    if (step == 3) {
      setInitial(true);
      await storeDataInAsyncStorage('initial_setup', 'true');
    }
    const tempvalues = [
      {value: 0, color: COLORS.PRIMARY_BUTTON_GRADIENT.BLUE1},
      {value: 100, color: '#F7F8F8'},
    ];
    setStep(prev => prev + 1);
    tempvalues[0].value = (step + 1) * 25;
    tempvalues[1].value = 100 - (step + 1) * 25;
    setPieData(tempvalues);
  };
  return (
    <View style={styles.mainContainer}>
      <View>
        {step == 0 && <Onboardingtwo />}
        {step == 1 && <Onboardingthree />}
        {step == 2 && <Onboardingfour />}
        {step == 3 && <Onboardingfive />}
      </View>
      <View
        style={{
          alignItems: 'flex-start',
          paddingHorizontal: 15,
          marginTop: 20,
        }}>
        <TextH4>{title[step]}</TextH4>
        <Text style={{color: '#7B6F72'}}>{description[step]}</Text>
      </View>
      <Pressable
        style={{position: 'absolute', bottom: 20, right: 20}}
        onPress={() => handleNextStep()}>
        <CircularRing
          radius={40}
          fontSize={20}
          gap={7}
          label={` > `}
          pieData={pieData}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {flex: 1, alignItems: 'center'},
});

export default OnboardingTwo;
