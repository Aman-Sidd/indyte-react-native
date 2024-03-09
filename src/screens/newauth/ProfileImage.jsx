import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, { useState } from 'react';
import SlideHeader from '../../components/header/SlideHeader';
import TextH4 from '../../components/Text/TextH4';
import TextMedium from '../../components/Text/TextMedium';
import SmallText from '../../components/Text/SmallText';
import NewButtob from '../../components/Button/NewButtob';
import { SCREENS } from '../../constants/Screens';
import { launchImageLibrary } from 'react-native-image-picker';
import { useRoute } from '@react-navigation/native';
import { useEffect } from 'react';
import CustomToast from '../../components/common/Toast';
import { useRef } from 'react';
const { height, width } = Dimensions.get('window');

const ProfileImage = ({ navigation }) => {
  const route = useRoute();
  const values = route.params?.data;
  useEffect(() => {
    console.log('values', values)
  })
  const [ImageData, setImageData] = useState(data);

  const childRef = useRef(null);
  const [toastColorState, setToastColorState] = useState('');
  const [toastTextColorState, setToastTextColorState] = useState('white');
  const [toastMessage, setToastMessage] = useState('');

  const SelectedItem = MainItem => {
    setImageData(item =>
      item.map((value, index) => {
        if (value.id == MainItem.id) {
          value.isSelected = true;
        } else {
          value.isSelected = false;
        }
        console.log(value);
        return value;
      }),
    );
  };

  const [galleryPhoto, setGalleryPhoto] = useState();
  const [Photo, setPhoto] = useState(false);
  const [photoResult, setPhotoResult] = useState(null);
  const [MainD, setMainD] = useState([])
  let options = {
    saveToPhotos: true,
    mediaType: 'photo',
  };

  const OpenGallery = async () => {
    try {
      setPhoto(false);
      const result = await launchImageLibrary(options);
      setMainD(result?.assets)
      console.log(MainD, "I am main");
      const data = result.assets[0].uri;
      setPhotoResult(
        result && result.assets && result.assets[0] ? result.assets[0] : null,
      );
      setGalleryPhoto(data);
      setPhoto(true);
    } catch (error) {
      setPhotoResult(null);
      console.log(error, 'error');
      setPhoto(false);
    }
  };

  const handlePress = () => {
    if (!MainD.length) {
      setToastMessage('Profile image is required');
      setToastTextColorState('white');
      setToastColorState('red');
      childRef.current.showToast();
      return
    }

    const ImgData = {
      uri: MainD[0]?.uri,
      name: MainD[0]?.fileName,
      type: MainD[0]?.type,
    }
    navigation.navigate(SCREENS.SELECTGENDER, { values: { ...values, profile_image: ImgData } });
  };
  return (
    <View style={{ backgroundColor: '#F4F6FA', height: height }}>
      <CustomToast
        toastColor={toastColorState}
        toastTextColor={toastTextColorState}
        toastMessage={toastMessage}
        ref={childRef}
      />
      <SlideHeader />
      <View style={styles.ProfileView}>
        <TextH4 style={{ marginTop: '30%' }}>Profile Image</TextH4>
        <ScrollView
          horizontal
          style={{ display: 'flex', flexDirection: 'row', marginVertical: 30 }}>
          {ImageData.map((item, index) => (
            <TouchableOpacity
              onPress={() => {
                SelectedItem(item);
              }}
              style={{
                padding: 20,
                borderRadius: 10,
                marginHorizontal: 10,
                backgroundColor: item.isSelected ? '#8FACFF' : 'white',
                elevation: 4,
                marginVertical: 10,
              }}>
              <Image source={item.image} style={{ width: 40, height: 40 }} />
            </TouchableOpacity>
          ))}
        </ScrollView>
        <SmallText
          style={{ width: '60%', textAlign: 'center', marginVertical: '10%' }}>
          You can select photo from one of this emoji or add your own photo as
          profile picture
        </SmallText>
        <Image
          source={{ uri: galleryPhoto }}
          style={{ width: 100, height: 100, borderRadius: 70, borderWidth: 1 }}
        />
        <TouchableOpacity onPress={OpenGallery}>
          <TextMedium style={{ color: '#7265E3', marginVertical: '10%' }}>
            Add Custom Photo
          </TextMedium>
        </TouchableOpacity>
        <NewButtob
          title={'SAVE'}
          onPress={() => {
            handlePress()

          }}
        />
      </View>
    </View>
  );
};

export default ProfileImage;

const styles = StyleSheet.create({
  ProfileView: {
    alignItems: 'center',
  },
});
const data = [
  {
    id: '1',
    image: require('../../../assets/images/Ghost.png'),
    isSelected: false,
  },
  {
    id: '2',
    image: require('../../../assets/images/Monkey.png'),
    isSelected: false,
  },
  {
    id: '3',
    image: require('../../../assets/images/Cat.png'),
    isSelected: false,
  },
];
