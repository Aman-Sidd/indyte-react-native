import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Alert,
  Modal,
  Pressable,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useContext, useRef, useState} from 'react';
import Header from '../../components/header/Header';
import EditPro from '../../components/profile/EditPro';
import EditCard from '../../components/profile/EditCard';
import Shape from '../../../assets/icons/Shape.svg';
import Account from '../../../assets/icons/Account.svg';
import Email1 from '../../../assets/icons/Email1.svg';
import Pass from '../../../assets/icons/Pass.svg';
import Apple from '../../../assets/icons/Apple.svg';
import Google from '../../../assets/icons/Google.svg';
import PrimaryButton from '../../components/Button/PrimaryButton';
import {GlobalContext} from '../../../App';
import {updateUser} from '../../backend/utilFunctions';
const {height, width} = Dimensions.get('window');
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import TextMedium from '../../components/Text/TextMedium';
import CustomToast from '../../components/common/Toast';
import {useDispatch, useSelector} from 'react-redux';
// import {supabase} from '../../utils/supabase';

import {createClient} from '@supabase/supabase-js';
import {fromByteArray} from 'base64-js';

import RNFS from 'react-native-fs';
import {getProfileDetails, updateProfileDetails} from '../../services';
import {userSlice} from '../../store/userSlice';
import {supabase} from '../../utils/supabase';

const EditProfile = () => {
  // const { user, setLoggedInUser } = useContext(GlobalContext)
  const childRef = useRef(null);
  const [toastColorState, setToastColorState] = useState('');
  const [toastTextColorState, setToastTextColorState] = useState('white');
  const [toastMessage, setToastMessage] = useState('');
  const [galleryPhoto, setGalleryPhoto] = useState();
  const [Photo, setPhoto] = useState(false);
  const [photoResult, setPhotoResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalloading, setModalloading] = useState(false);
  const dispatch = useDispatch();
  let options = {
    saveToPhotos: true,
    mediaType: 'photo',
    includeBase64: true,
  };

  const user = useSelector(state => state.user.user);

  const [tempFirstName, setTempFirstName] = useState(user?.name);

  // const [password, setPassword] = useState("")
  const [modalVisible, setModalVisible] = useState(false);
  const OpenGallery = async () => {
    try {
      setPhoto(false);
      const result = await launchImageLibrary(options);
      console.log(result.assets[0].type);
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
  const UpdateData = async () => {
    try {
      if (photoResult) {
        setLoading(true);
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
        console.log(urlData);
        const reqBody = {profile: urlData?.publicUrl};

        const updateprofile = await updateProfileDetails(user.id, reqBody);
        if (updateprofile.data) {
          setToastMessage(updateprofile?.data?.message);
          setToastTextColorState('white');
          setToastColorState('green');
          childRef.current.showToast();

          const userDetails = await getProfileDetails();

          if (userDetails.data) {
            dispatch(userSlice.actions.userLogin(userDetails.data.user));
          }
        }

        setLoading(false);
      } else {
        setToastMessage('Please select some image');
        setToastTextColorState('white');
        setToastColorState('red');
        childRef.current.showToast();
      }
    } catch (error) {
      setLoading(false);
      console.log(error.response.data);
      setToastMessage(error?.response?.data?.message);
      setToastTextColorState('white');
      setToastColorState('red');
      childRef.current.showToast();
    }
  };

  const updateName = async () => {
    try {
      setModalloading(true);
      if (tempFirstName != '') {
        const reqBody = {name: tempFirstName};
        const updateprofile = await updateProfileDetails(user.id, reqBody);
        if (updateprofile.data) {
          setToastMessage(updateprofile?.data?.message);
          setToastTextColorState('white');
          setToastColorState('green');
          childRef.current.showToast();

          const userDetails = await getProfileDetails();

          if (userDetails.data) {
            console.log(userDetails.data.user);
            dispatch(userSlice.actions.userLogin(userDetails?.data?.user));
          }
          setModalVisible(fasle);
        }

        setModalloading(false);
      } else {
        setModalloading(false);
        setToastMessage('Please enter valid name');
        setToastTextColorState('white');
        setToastColorState('red');
        childRef.current.showToast();
      }
    } catch (error) {
      setModalloading(false);
      console.log(error?.response?.data);
      setToastMessage(error?.response?.data?.message);
      setToastTextColorState('white');
      setToastColorState('red');
      childRef.current.showToast();
    }
  };

  return (
    <>
      <ScrollView style={styles.MainView}>
        <Header title={'Edit Profile'} />
        <CustomToast
          toastColor={toastColorState}
          toastTextColor={toastTextColorState}
          toastMessage={toastMessage}
          ref={childRef}
        />

        <TouchableOpacity style={styles.image}>
          {user?.profile && !photoResult ? (
            <Image
              source={{uri: user?.profile}}
              style={{width: 150, height: 150}}
            />
          ) : (
            <Image
              source={{uri: galleryPhoto}}
              style={{width: 150, height: 150, borderRadius: 70}}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={{position: 'absolute', right: 120, top: 180}}
          onPress={OpenGallery}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/1159/1159633.png',
            }}
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={UpdateData}>
          <TextMedium
            style={{
              textAlign: 'center',
              marginVertical: 20,
              marginBottom: 50,
              color: 'purple',
            }}>
            Update Profile Image
          </TextMedium>
        </TouchableOpacity>
        <View>
          <EditPro
            value={tempFirstName}
            icon={<Account width={18} height={18} Edit={'EditBtn'} />}
          />
          {/* <EditPro value={lastName} icon={<Account width={18} height={18} Edit={"EditBtn"} />} /> */}
          <EditPro
            value={user.email}
            icon={<Email1 width={18} height={18} Edit={'EditBtn'} />}
          />
          {/* <EditPro value={"Change Password"} icon={<Pass width={18} height={18} Edit={"EditBtn"} />} /> */}
        </View>
        {/* <View style={styles.card}>
          <EditCard value={"Connect"} icon={<Apple width={18} height={18} />} />
          <EditCard value={"Connect"} icon={<Google width={18} height={18} />} />
        </View> */}
        <View style={{alignItems: 'center', marginTop: '25%'}}>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <PrimaryButton
              containerStyle={{width: width - 80}}
              onPress={() => UpdateData()}
              title={'Save Profile'}
            />
          )}
        </View>
        <View
          style={{alignItems: 'center', marginTop: '5%', marginBottom: '15%'}}>
          <PrimaryButton
            containerStyle={{width: width - 80}}
            title={'Edit Profile'}
            onPress={() => setModalVisible(true)}
          />
        </View>
      </ScrollView>

      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TextInput
                placeholder="Full Name"
                placeholderTextColor={'grey'}
                style={styles.InputFields}
                onChangeText={value => setTempFirstName(value)}
                value={tempFirstName}
              />
              {/* <TextInput placeholder='Last Name' placeholderTextColor={"grey"} style={styles.InputFields} onChangeText={value => setTempLastName(value)} value={tempLastName} /> */}
              {/* <TextInput placeholder='Password (Optional)' placeholderTextColor={"grey"} style={styles.InputFields} onChangeText={value => setPassword(value)} /> */}
              <TouchableOpacity
                style={styles.BtnUpdate}
                onPress={() => !modalloading && updateName()}>
                {modalloading ? (
                  <ActivityIndicator />
                ) : (
                  <Text style={styles.BtnText}>Update Data</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.BtnUpdate}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.BtnText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  MainView: {
    backgroundColor: 'white',
    width: width,
    height: height,
  },
  image: {
    alignSelf: 'center',
    // marginVertical: 50,
    elevation: 5,
    overflow: 'hidden',
    borderRadius: 9999,
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  modalView: {
    width: '80%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  InputFields: {
    borderWidth: 1,
    width: '80%',
    marginVertical: '2%',
    borderRadius: 8,
    paddingHorizontal: 10,
    color: 'black',
  },
  BtnUpdate: {
    width: '80%',
    borderRadius: 8,
    padding: 7,
    alignItems: 'center',
    backgroundColor: '#92A3FD',
    marginVertical: 5,
  },
  BtnText: {
    fontSize: 14,
    color: 'white',
    fontWeight: '800',
  },
});
