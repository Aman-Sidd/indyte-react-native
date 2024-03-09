import { StyleSheet, Text, View, Dimensions, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import ResultHeader from '../../components/Result/ResultHeader'
import BackSvg from '../../../assets/icons/ArrowLeft.svg';
import Share from '../../../assets/icons/Share.svg'
import MoreInfo from '../../../assets/icons/MoreInfo.svg'
import Button from '../../components/Result/Button';
import { FONTS } from '../../constants/Fonts';
import ScreenContainer from '../../components/container/ScreenContainer';
import PrimaryButton from '../../components/Button/PrimaryButton';
import LongProgressBar from '../../components/progress/LongProgressBar';
import AnimatedLineChart from '../../components/Utils/LineChart';
import ProgressBar from '../../components/progress/ProgressBar';
import LargeText from '../../components/Text/LargeText';
import HeadingProgressBar from '../../components/progress/HeadingProgressBar';
import { SCREENS } from '../../constants/Screens';
import { useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');
const Result = () => {
  const navigation = useNavigation();
  const category = ['Photo', 'Statistic']
  const [active, setActive] = useState(category[0]);
  return (
    <ScreenContainer scroll>
      <ResultHeader
        icon1={<BackSvg width={20} height={20} />}
        icon2={<Share width={20} height={20} />}
        icon3={<MoreInfo width={14} height={10} />}
        title='Result'
      />
      {/* <Button category={category} active={active} setActive={setActive} /> */}
      {active === category[0] &&
        <>
          <View style={{ display: "flex", flexDirection: "row", marginTop: 20, justifyContent: "space-between", marginHorizontal: 10 }}>
            <Text style={{ fontFamily: FONTS.FONT_POPPINS_BOLD, fontSize: 16, color: "#1D1617" }}>Average Progress</Text>
            <Text style={{ color: "#42D742", fontSize: 13, fontFamily: FONTS.FONT_POPPINS_MEDIUM, }}>Good</Text>
          </View>
          <LongProgressBar colors={['rgba(146, 163, 253, 100)', 'rgba(197, 139, 242, 1)']} percentage={96} />

          <View style={{ display: "flex", flexDirection: "row", marginTop: 20 }}>
            <Text style={{ color: "#7B6F72", fontFamily: FONTS.FONT_POPPINS_SEMIBOLD, fontSize: 16 }}>May</Text>
            <Text style={{ color: "#7B6F72", fontFamily: FONTS.FONT_POPPINS_SEMIBOLD, fontSize: 16, marginLeft: 260 }}>June</Text>
          </View>
          <View style={{ marginVertical: 20 }}>
            <Text style={{ color: "#7B6F72", fontSize: 16, fontFamily: FONTS.FONT_POPPINS_MEDIUM, textAlign: "center" }}>Front Facing</Text>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Image source={require('../../../assets/images/GirlImage.png')} style={styles.Image} />
              <Image source={require('../../../assets/images/GirlImage.png')} style={styles.Image} />
            </View>
            <Text style={{ color: "#7B6F72", fontSize: 16, fontFamily: FONTS.FONT_POPPINS_MEDIUM, textAlign: "center" }}>Back Facing</Text>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Image source={require('../../../assets/images/GirlImage.png')} style={styles.Image} />
              <Image source={require('../../../assets/images/GirlImage.png')} style={styles.Image} />
            </View>
          </View>

        </>}
      {
        active === category[1] &&
        <View style={styles.resultStatsContainer}>
          <AnimatedLineChart />
          <View style={styles.monthDuration}>
            <LargeText style={{ fontFamily: FONTS.FONT_POPPINS_SEMIBOLD }}>May</LargeText>
            <LargeText style={{ fontFamily: FONTS.FONT_POPPINS_SEMIBOLD }}>June</LargeText>
          </View>
          <HeadingProgressBar
            heading={'Lose Weight'}
            percentage1={'33%'}
            percentage2={'67%'}
          />
          <HeadingProgressBar
            heading={'Height Increase'}
            percentage1={'88%'}
            percentage2={'12%'}
          />
          <HeadingProgressBar
            heading={'Muscle Mass Increase'}
            percentage1={'57%'}
            percentage2={'43%'}
          />
          <HeadingProgressBar
            heading={'Abs'}
            percentage1={'89%'}
            percentage2={'11%'}
          />
        </View>
      }
      <View style={{ alignItems: "center", paddingBottom: 30 }}>
        <PrimaryButton containerStyle={{ width: width - 80, elevation: 5,marginTop:100 }} title={'Back to Home'} onPress={() => navigation.navigate(SCREENS.DASHBOARDSTACK)} />
      </View>
    </ScreenContainer>
  )
}

export default Result

const styles = StyleSheet.create({
  body: {
    backgroundColor: "white",
    width: width,
    height: height,
    flex: 1
  },
  Image: {
    width: 150,
    height: 150,
    borderWidth: 1,
    margin: 10
  },
  resultStatsContainer: {
    paddingTop: 30
  },

  monthDuration: {
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30
  }
})