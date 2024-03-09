import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import FinsihWorkOut from '../../../assets/icons/FinishWorkOut.svg';
import TextH4 from '../../components/Text/TextH4';
import SmallText from '../../components/Text/SmallText';
import PrimaryButton from '../../components/Button/PrimaryButton';
import {SCREENS} from '../../constants/Screens';
import {Image} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
const {width, height} = Dimensions.get('window');
import StarFill from '../../../assets/images/Star35.svg';
import Star from '../../../assets/images/Star37.svg';
import {TextInput} from 'react-native';
import {Updatemeal} from '../../backend/utilFunctions';
import {TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {markFinishedMeal} from '../../services';
import CustomToast from '../../components/common/Toast';
import {useNavigation} from '@react-navigation/native';
import {supabase} from '../../utils/supabase';

const FlnishMeal = ({route}) => {
  // const [modalVisible, setModalVisible] = useState(false);
  // const [photoResult, setPhotoResult] = useState(null);
  const navigation = useNavigation();
  const {meal} = route.params;
  console.log('meal', meal);

  const [galleryPhoto, setGalleryPhoto] = useState(
    meal?.meal_image_proof == undefined ? '' : meal?.meal_image_proof,
  );
  const [Comment, setComment] = useState(
    meal?.comment == undefined ? '' : meal?.comment,
  );
  const [Rating, setRating] = useState(Data);
  const [RatVal, setRatVal] = useState(
    meal.review == undefined ? '' : meal.review,
  );
  const childRef = useRef(null);
  const [toastColorState, setToastColorState] = useState('');
  const [toastTextColorState, setToastTextColorState] = useState('white');
  const [toastMessage, setToastMessage] = useState('');
  const [Photo, setPhoto] = useState(false);
  const [photoResult, setPhotoResult] = useState(null);
  const [MainImageVal, setMainImageVal] = useState([]);
  const [Loader, setLoader] = useState(false);
  let options = {
    saveToPhotos: true,
    mediaType: 'photo',
    includeBase64: true,
  };
  const user = useSelector(state => state.user.user);
  const OpenGallery = async () => {
    try {
      setPhoto(false);
      const result = await launchImageLibrary(options);
      console.log(result, 'i am res');
      setMainImageVal(result);
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
  const UpdateMeal = async () => {
    try {
      if (RatVal == '' || Comment == '' || !photoResult) {
        alert('Please fill all the required data');
      } else if (photoResult) {
        setLoader(true);
        const {error: uploadError, data: uploadData} = await supabase.storage
          .from('IndyteImages')
          .upload(`${user.id}/${Date.now()}`, photoResult, {
            contentType: photoResult.type,
          });

        if (uploadError) {
          throw uploadError;
        }
        const {error: urlError, data: urlData} = await supabase.storage
          .from('IndyteImages')
          .getPublicUrl(uploadData.path);

        if (urlError) {
          throw urlError;
        }

        const Rat = JSON.stringify(RatVal);

        const reqBody = {
          mealId: meal.mealId,
          userId: user.id,
          date: meal.date,
          mealTime: meal.mealTime,
          imgUrl: urlData?.publicUrl,
          comment: Comment,
          review: parseInt(Rat),
        };

        const resFinishMeal = await markFinishedMeal(reqBody);
        if (resFinishMeal.data) {
          console.log('update', resFinishMeal.data);
          setToastMessage(resFinishMeal.data.message);
          setToastTextColorState('white');
          setToastColorState('green');
          childRef.current.showToast();
          setLoader(false);
          navigation.navigate(SCREENS.FINISHMEAL);
        }
        setLoader(false);
      }
    } catch (error) {
      setToastMessage(error.response.data.message);
      setToastTextColorState('white');
      setToastColorState('red');
      childRef.current.showToast();
      console.log(error.response.data.message);
      setLoader(false);
    }
  };
  const StarActive = (mainIndex, item) => {
    let i = 0;
    setRatVal(mainIndex + 1);
    setRating(items =>
      items.map((value, index) => {
        if (index <= mainIndex) {
          value.isSelected = true;
        } else {
          value.isSelected = false;
        }
        return value;
      }),
    );
  };

  const covertReview = () => {
    if (meal.review) {
      resReviews = [];
      for (let i = 0; i < 5; i++) {
        const tempdata = {};
        tempdata.isSelected = false;
        if (i < meal.review) {
          tempdata.isSelected = true;
        }
        resReviews.push(tempdata);
      }

      setRating(resReviews);
    }
  };

  useEffect(() => {
    covertReview();
  }, []);
  return (
    <ScrollView
      style={{width: width, height: height, backgroundColor: 'white'}}>
      <CustomToast
        toastColor={toastColorState}
        toastTextColor={toastTextColorState}
        toastMessage={toastMessage}
        ref={childRef}
      />
      <View style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
        {
          // galleryPhoto?.length == 0 ? null : galleryPhoto.map((item, index) => (
          <View style={styles.imageContainer}>
            <View style={styles.imageBox}>
              <Image
                style={styles.image}
                source={{
                  uri: meal.imgUrl && !photoResult ? meal.imgUrl : galleryPhoto,
                }}
              />
            </View>
          </View>
          // ))
        }
      </View>

      <View style={{alignItems: 'center', marginTop: 22}}>
        <PrimaryButton
          containerStyle={{width: width - 30}}
          title={'Upload photos'}
          onPress={OpenGallery}
        />
      </View>

      <View style={{alignItems: 'center', marginTop: '10%'}}>
        <TextH4 style={{textAlign: 'center'}}>
          Congratulations, You Have Finished Your Meal
        </TextH4>
        <SmallText style={{width: '80%', textAlign: 'center', marginTop: 7}}>
          Please feel free to share your food and review
        </SmallText>
        {/* <SmallText style={{ width: "80%", textAlign: "center", marginTop: 7, }}>-Jack Lalanne</SmallText> */}
      </View>
      <View style={styles.rating}>
        {Rating.map((item, index) => (
          <TouchableOpacity
            onPress={() => {
              StarActive(index, item);
            }}>
            {item.isSelected ? <StarFill /> : <Star />}
          </TouchableOpacity>
        ))}
      </View>
      {meal?.rating ? (
        <Text
          style={{
            fontSize: 15,
            color: 'black',
            fontWeight: '500',
            textAlign: 'center',
            marginVertical: 15,
          }}>
          {' '}
          Rating is : {meal?.rating}
        </Text>
      ) : null}
      <View style={{paddingHorizontal: 20, marginTop: 20}}>
        <TextInput
          placeholder="Comment"
          value={Comment}
          multiline
          style={styles.commentBox}
          onChangeText={val => {
            setComment(val);
          }}
        />
      </View>
      <View style={{alignItems: 'center', marginTop: '10%'}}>
        {Loader ? (
          <ActivityIndicator size={22} color={'Blue'} />
        ) : (
          <PrimaryButton
            containerStyle={{width: width - 30}}
            title={'Update Meal'}
            onPress={() => {
              UpdateMeal();
            }}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default FlnishMeal;

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 50,
    alignItems: 'center',
    alignContent: 'center',
    width: '100%',
    justifyContent: 'center',
  },

  imageBox: {
    backgroundColor: 'lightgray',
    height: 135,
    flexBasis: '50%',
    borderRadius: 10,
    overflow: 'hidden',
  },

  image: {
    width: '100%',
    height: '100%',
  },

  rating: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'center',
    marginTop: 30,
    gap: 16,
  },

  commentBox: {
    borderWidth: 1,
    borderColor: '#173430',
    height: 90,
    borderRadius: 20,
    padding: 10,
    color: 'black',
  },
});

const Data = [
  {
    id: 0,
    isSelected: false,
  },
  {
    id: 1,
    isSelected: false,
  },
  {
    id: 2,
    isSelected: false,
  },
  {
    id: 3,
    isSelected: false,
  },
  {
    id: 4,
    isSelected: false,
  },
];
