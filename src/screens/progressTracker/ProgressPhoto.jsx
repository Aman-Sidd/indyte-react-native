import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Image,
} from 'react-native';
import React from 'react';
import Header from '../../components/header/Header';
import ProgressReaminderCard from '../../components/card/ProgressReaminderCard';
import PTeachMonth from '../../components/card/PTeachMonth';
import SolidContainer from '../../components/container/SolidContainer';
import TextMedium from '../../components/Text/TextMedium';
import PrimaryButton from '../../components/Button/PrimaryButton';
import TextH4 from '../../components/Text/TextH4';
import SmallText from '../../components/Text/SmallText';
import GalleryPhotoCard from '../../components/card/GalleryPhotoCard';
import Camera from '../../../assets/icons/Camera.svg';
import FloatingGradingButton from '../../components/Button/FloatingGradingButton';

import {SCREENS} from '../../constants/Screens';
import ResultHeader from '../../components/Result/ResultHeader';
import BackSvg from '../../../assets/icons/ArrowLeft.svg';
import MoreInfo from '../../../assets/icons/MoreInfo.svg';
import {TouchableOpacity} from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('window');

const ProgressPhoto = ({navigation}) => {
  return (
    <>
      <ScrollView>
        {/* <Header title={""} /> */}
        <View style={{margin: 20}}>
          <ResultHeader
            icon1={<BackSvg width={20} height={20} />}
            icon3={<MoreInfo width={14} height={10} />}
            title="Progress Photo"
          />
        </View>
        <ProgressReaminderCard Date={'July 08'} />

        <PTeachMonth navigation={navigation} />

        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginVertical: '1%',
          }}>
          <SolidContainer
            containerStyle={[styles.solidcontainer, {marginHorizontal: 10}]}>
            <TextMedium style={{flexGrow: 1}}>Compare my Photo</TextMedium>
            <PrimaryButton
              containerStyle={styles.targetButton}
              textStyle={styles.targetButtonText}
              title={'Compare'}
              onPress={() => navigation.navigate(SCREENS.COMPARISION)}
            />
          </SolidContainer>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginVertical: '1%',
          }}>
          <SolidContainer
            containerStyle={[styles.solidcontainer, {marginHorizontal: 10}]}>
            <TextMedium style={{flexGrow: 1}}>Weight Target</TextMedium>
            <PrimaryButton
              containerStyle={styles.targetButton}
              textStyle={styles.targetButtonText}
              title={'Track'}
              onPress={() => navigation.navigate(SCREENS.WEIGHTTRACKERNEW)}
            />
          </SolidContainer>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: 30,
            marginVertical: '2%',
          }}>
          <TextH4>Gallery</TextH4>
          <SmallText>See More</SmallText>
        </View>
        <View>
          <GalleryPhotoCard Date={'8 June'} />
          <GalleryPhotoCard Date={'8 June'} />
        </View>
      </ScrollView>
      <FloatingGradingButton
        colors={['rgba(197, 139, 242, 1)', 'rgba(238, 164, 206, 1)']}>
        <Camera
          width={25}
          height={25}
          onPress={() => navigation.navigate(SCREENS.ADDPROGRESS)}
        />
      </FloatingGradingButton>
    </>
  );
};

export default ProgressPhoto;

const styles = StyleSheet.create({
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
