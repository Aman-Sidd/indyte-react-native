import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useRef} from 'react';
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
import Edit from '../../../assets/icons/Edit.svg';
import {Updatemeal} from '../../backend/utilFunctions';
import {TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {
  createWeightLog,
  markFinishedMeal,
  updateProfileDetails,
} from '../../services';
import CustomToast from '../../components/common/Toast';

const WeightUpdate = ({navigation, route}) => {
  // const [modalVisible, setModalVisible] = useState(false);

  // const [photoResult, setPhotoResult] = useState(null);

  const meal = {meal_image_proof: ''};

  const [galleryPhoto, setGalleryPhoto] = useState(
    meal?.meal_image_proof == undefined ? '' : meal?.meal_image_proof,
  );
  const [Comment, setComment] = useState(
    meal?.comment == undefined ? '' : meal?.comment,
  );
  const [Rating, setRating] = useState(Data);
  const [RatVal, setRatVal] = useState(
    meal?.rating == undefined ? '' : meal?.rating,
  );
  const [currentweight, setCurrentweight] = useState();
  const [goalweight, setGoalweight] = useState();
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
  const UpdateWeight = async () => {
    try {
      if (
        RatVal == '' ||
        Comment == '' ||
        goalweight == '' ||
        currentweight == ''
      ) {
        setToastMessage('Please fill all the fields');
        setToastTextColorState('white');
        setToastColorState('red');
        childRef.current.showToast();
      } else {
        const Rat = JSON.stringify(RatVal);
        setLoader(true);
        console.log(meal);

        const tempbmi = currentweight / (user.height * user.height);
        const reqBody = {
          current_weight: parseInt(currentweight),
          goal_weight: parseInt(goalweight),
          weight_unit: 'kg',
          recordedAt: new Date().toISOString(),
          bmi: tempbmi,
          imageUrl: 'https://example.com/weightlog1.jpg',

          comment: Comment,
          review: parseInt(Rat),
        };
        console.log(reqBody);
        const resFinishMeal = await createWeightLog(user.id, reqBody);
        if (resFinishMeal.data) {
          console.log('update', resFinishMeal.data);
          setToastMessage('Weight Updated Successfully');
          setToastTextColorState('white');
          setToastColorState('green');
          childRef.current.showToast();
          setLoader(false);
          const profileupdate = await updateProfileDetails(user.id, {
            weight: parseInt(currentweight),
          });
          if (profileupdate.data) {
            navigation.goBack();
          }
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
              <Image style={styles.image} source={{uri: galleryPhoto}} />
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

      <View
        style={{width: '100%', alignItems: 'center', gap: 10, marginTop: 10}}>
        <View
          style={{
            backgroundColor: '#F6F7F7',
            width: '90%',
            height: 60,
            borderRadius: 25,
            paddingHorizontal: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TextInput
            placeholder="Current Weight"
            value={currentweight}
            onChangeText={val => setCurrentweight(val)}
            style={{color: 'black'}}
            placeholderTextColor={'#617D7999'}
            keyboardType="numeric"
          />
          <TouchableOpacity>
            <Edit />
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: '#F6F7F7',
            width: '90%',
            height: 60,
            borderRadius: 25,
            paddingHorizontal: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TextInput
            placeholder="Goal Weight"
            value={goalweight}
            onChangeText={val => setGoalweight(val)}
            style={{color: 'black'}}
            placeholderTextColor={'#617D7999'}
            keyboardType="numeric"
          />
          <TouchableOpacity>
            <Edit />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{alignItems: 'center', marginTop: '10%'}}>
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
            title={'Update Weight'}
            onPress={() => {
              UpdateWeight();
            }}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default WeightUpdate;

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
