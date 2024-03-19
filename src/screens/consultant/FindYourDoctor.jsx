import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  FlatList,
  ScrollView,
  Dimensions,
  Pressable,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import TextCenterHeader from '../header/TextCenterHeader';
import Back from '../../../assets/icons/BackLeft.svg';
import Notification from '../../../assets/icons/Notification.svg';
import ScreenContainer from '../../components/container/ScreenContainer';
import {FONTS} from '../../constants/Fonts';
import SolidButton from '../../components/Button/SolidButton';
import {SCREENS} from '../../constants/Screens';
import Heading from '../../components/Text/Heading';
import LargeText from '../../components/Text/LargeText';
import ConsultantResultCard from '../../components/consultant/ConsultantResultCard';
import {DESIGNATOINS} from '../../constants/Data';
import DoctorCard from '../../components/consultant/DoctorCard';
import SolidContainer from '../../components/container/SolidContainer';
import TextMedium from '../../components/Text/TextMedium';
import PrimaryButton from '../../components/Button/PrimaryButton';
import AllDoctorsCard from '../../components/consultant/AllDoctorsCard';
import {getDieticians, getProfileDetails} from '../../services';
import {ActivityIndicator} from 'react-native-paper';
import {
  CometChatCallButtons,
  CometChatConversationsWithMessages,
  CometChatIncomingCall,
  CometChatUIEventHandler,
  CometChatUIKit,
} from '@cometchat/chat-uikit-react-native';
import {useDispatch, useSelector} from 'react-redux';

import {CometChat} from '@cometchat/chat-sdk-react-native';
import {getUser} from '../../backend/utilFunctions';
import {GlobalContext} from '../../../App';
import {setCallReceived} from '../../store/chatSlice';
const {width, height} = Dimensions.get('window');

export default function FindYourDoctor({navigation}) {
  const DESIGNATOINS = [
    {
      icon: require('../../../assets/images/tooth.png'),
      value: 'Dentist',
      iconBgColor: '#bae7df',
    },
    {
      icon: require('../../../assets/images/medicine.png'),
      value: 'Psychologist',
      iconBgColor: '#ffd9ce',
    },
    {
      icon: require('../../../assets/images/heart-pulse.png'),
      value: 'Cardiology',
      iconBgColor: '#cdcef7',
    },
    {
      icon: require('../../../assets/images/medicine.png'),
      value: 'Dermatologist',
      iconBgColor: '#bae7df',
    },
  ];
  const [dieticians, setDieticians] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [callRecevied, setCallReceived] = useState(false);
  const callRecevied = useSelector(state => state.chat.callReceived);
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const incomingCall = useRef(null);
  var listnerID = 'UNIQUE_LISTENER_ID';

  useEffect(() => {
    const fetchDieticians = async () => {
      try {
        setLoading(true);
        const response = await getDieticians();
        setDieticians(response.data.dieticians);
        // console.log('RESPONSE: ', response.data);
      } catch (err) {
        console.log('Error fetching dieticians: ', err);
      } finally {
        setLoading(false);
      }
    };
    // let userDetails = null;
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await getProfileDetails();
        console.log('USER:', response.data.user);
        setUser(response.data.user);
        const user = response.data.user;
        const user_id = user.id;
        // let cometUser = new CometChat.User('456');
        // cometUser.setName(user.name);
        // console.log('USER:', user);

        // CometChatUIKit.createUser(cometUser).then(
        //   user => {
        //     // Alert.alert('Successful', 'User has been created!');
        //   },
        //   error => {
        //     // Alert.alert('Error', 'Something went wrong!');
        //     console.log('error', error);
        //   },
        // );

        CometChatUIKit.getLoggedInUser().then(
          user => {
            if (!user) {
              // let uid = user_id;
              let uid = '456';

              CometChatUIKit.login({uid: uid})
                .then(user => {
                  Alert.alert('Successful', 'You are logged in successfully!');
                  console.log('User logged in successfully ', user.get());
                })
                .catch(error => {
                  Alert.alert('Error', 'Something went wrong!');

                  console.log('Login failed with exception:', error);
                });
            } else {
              Alert.alert(
                'User Already Exist',
                `User already exist with name: ${user.getUid()}`,
              );
            }
          },
          error => {
            console.log('Some Error Occured', {error});
          },
        );

        return response;
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    const logoutUser = async () => {
      CometChatUIKit.logout().then(
        () => {
          Alert.alert('Logout Successfull');
          console.log('Logout completed successfully');
        },
        error => {
          Alert.alert('Logout failed');
          console.log('Logout failed with exception:', {error});
        },
      );
    };
    let uikitSettings = {
      appId: '254245a92a6cb1bc', // Your appId goes here -->,
      authKey: 'c3a9f25a9e665c3d68ae21e38477b2a3da895405', // your app authKey goes here -->,
      region: 'in', // App region goes here -->,
    };

    CometChatUIKit.init(uikitSettings)
      .then(() => {
        console.log('CometChatUiKit successfully initialized');
      })
      .catch(error => {
        console.log('Initialization failed with exception:', error);
      });

    getPermissions();
    fetchUser();
    // logoutUser();
    fetchDieticians();

    CometChat.addCallListener(
      listnerID,
      new CometChat.CallListener({
        onIncomingCallReceived: call => {
          incomingCall.current = call;
          console.log('incoming call with session ID:', call);
          // setCallReceived(true);
          dispatch(setCallReceived(true));
        },
        onOutgoingCallRejected: call => {
          incomingCall.current = null;
          // setCallReceived(false);
          dispatch(setCallReceived(false));
        },
        onIncomingCallCancelled: call => {
          incomingCall.current = null;
          // setCallReceived(false);
          dispatch(setCallReceived(false));
        },
      }),
    );

    CometChatUIEventHandler.addCallListener(listnerID, {
      ccCallEnded: () => {
        incomingCall.current = null;
        // setCallReceived(false);
        dispatch(setCallReceived(false));
      },
    });
    return () => {
      CometChatUIEventHandler.removeCallListener(listnerID);
      CometChat.removeCallListener(listnerID);
    };
  }, []);

  const getPermissions = () => {
    if (Platform.OS == 'android') {
      PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);
    }
  };

  const handleSelectDietician = async id => {
    console.log('clicked...');
    const _id = '65ec65f80094789912038667';
    navigation.navigate('CHATSCREEN', {_id});
  };

  return loading ? (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  ) : callRecevied ? (
    <CometChatIncomingCall
      call={incomingCall.current}
      onDecline={call => {
        dispatch(setCallReceived(false));
      }}
      incomingCallStyle={{
        backgroundColor: 'white',
        titleColor: 'black',
        subtitleColor: 'gray',
        titleFont: {
          fontSize: 20,
          fontWeight: 'bold',
        },
      }}
    />
  ) : (
    <ScreenContainer scroll>
      <TextCenterHeader
        icon1={
          <View
            style={{
              borderColor: '#9a9cb2',
              borderWidth: 1,
              padding: 12,
              borderRadius: 10,
            }}>
            <Back width={15} height={15} />
          </View>
        }
        icon2={
          <SolidButton
            onPress={() => navigation.navigate(SCREENS.NOTIFICATION)}
            containerStyle={styles.solidButtonContainer}>
            <Notification width={30} height={30} />
          </SolidButton>
        }
        title="Find Your Doctor"
        textStyle={{fontFamily: FONTS.FONT_POPPINS_REGULAR, fontSize: 15}}
      />
      <View style={{flexDirection: 'row', gap: 8}}>
        <View style={{flex: 1}}>
          <TextInput
            style={{
              padding: 15,
              backgroundColor: '#ECF2FF',
              color: 'white',
              borderRadius: 12,
              paddingLeft: 50,
              position: 'relative',
              fontFamily: FONTS.FONT_POPPINS_REGULAR,
              color: '#343965',
            }}
            placeholder="Search a dietician"
          />
          <Image
            source={require('../../../assets/images/search.png')}
            style={{
              position: 'absolute',
              left: 18,
              top: 18,
              width: 22,
              height: 22,
            }}
          />
        </View>
        <Image source={require('../../../assets/images/setting.png')} />
      </View>
      {/* <View
        style={{
          marginVertical: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            fontSize: 20,
            fontFamily: FONTS.FONT_POPPINS_BOLD,
            color: '#343965',
          }}>
          Upcoming appointment
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontFamily: FONTS.FONT_POPPINS_REGULAR,
            color: '#585CE5',
          }}>
          See all
        </Text>
      </View> */}
      {/* <View style={{flex: 1, padding: 5}}>
        <ConsultantResultCard
          name={'Dr. Samantha'}
          designation={'Cardiologist'}
          rating={'4.9'}
          profilePath={require('../../../assets/images/doctor.png')}
          mapPath={require('../../../assets/icons/Vector.png')}
          containerStyle={{width: width - 45, borderColor: '#585CE5'}}
          statusStyle={{
            justifyContent: 'center',
            borderColor: '#585CE5',
            elevation: 1,
          }}
          mapImgStyle={{width: width / 3.5, height: 70}}
        />
      </View> */}
      {/* <View style={{marginTop: 30}}>
        <ScrollView horizontal>
          {DESIGNATOINS.map(item => (
            <View
              style={{
                backgroundColor: '#ECF2FF',
                padding: 20,
                paddingLeft: 10,
                paddingVertical: 10,
                flexDirection: 'row',
                gap: 10,
                borderRadius: 15,
                alignItems: 'center',
                height: 100,
                marginRight: 10,
                paddingRight: 40,
              }}>
              <View
                style={{
                  backgroundColor: item.iconBgColor,
                  height: 80,
                  width: 50,
                  paddingVertical: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 15,
                }}>
                <Image source={item.icon} />
              </View>
              <View style={{gap: 5}}>
                <Text
                  style={{fontSize: 14, fontFamily: FONTS.FONT_POPPINS_BOLD}}>
                  {item.value}
                </Text>
                <Text
                  style={{
                    fontSize: 10,
                    fontFamily: FONTS.FONT_POPPINS_REGULAR,
                    color: '#9a9cb2',
                  }}>
                  10 Doctors
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View> */}
      {/* <View style={{marginTop: 10}}>
        <Text
          style={{
            fontSize: 22,
            fontFamily: FONTS.FONT_POPPINS_BOLD,
            color: '#343965',
          }}>
          Nearby Doctors
        </Text>
        
        <ScrollView horizontal style={{flexDirection: 'row'}}>
          {dieticians.map((item, index) => (
            <Pressable
              onPress={() => {
                console.log("Pressed Dietician's ID:", item.id);
                handleSelectDietician(item.id);
              }}>
              <DoctorCard
                key={index}
                name={item.username}
                designation={'Cardiologist'}
                rating={'4.9'}
                experience={'8'}
                imagePath={require('../../../assets/images/fulldoctor1.png')}
              />
            </Pressable>
          ))}
        </ScrollView>
      </View> */}
      {/* <SolidContainer containerStyle={styles.solidcontainer}>
        <TextMedium style={{fontSize: 15}}>Appointment history</TextMedium>
        <PrimaryButton
          containerStyle={styles.targetButton}
          textStyle={styles.targetButtonText}
          title={'Check'}
          onPress={() => navigation.navigate(SCREENS.APPOINTMENTHISTORY)}
        />
      </SolidContainer> */}
      <View style={{marginBottom: 40}}>
        <Text
          style={{
            fontSize: 22,
            fontFamily: FONTS.FONT_POPPINS_BOLD,
            color: '#343965',
            marginTop: 10,
          }}>
          Available Dieticians
        </Text>
        <ScrollView style={{flexDirection: 'column'}}>
          {dieticians.map((item, index) => (
            <Pressable
              onPress={() => {
                console.log("Pressed Dietician's ID:", item.id);
                handleSelectDietician(item.id);
              }}>
              {/* <DoctorCard
                key={index}
                name={item.username}
                designation={'Cardiologist'}
                rating={'4.9'}
                experience={'8'}
                imagePath={require('../../../assets/images/fulldoctor1.png')}
              /> */}
              <View
                style={{
                  backgroundColor: '#ECF2FF',
                  padding: 5,
                  paddingHorizontal: 8,
                  borderRadius: 30,
                  marginVertical: 10,
                }}>
                <AllDoctorsCard
                  name={item.username}
                  // designation={'Cardiologist'}
                  rating={'4.9'}
                  profilePath={require('../../../assets/images/all-doctor1.png')}
                />
              </View>
            </Pressable>
          ))}
        </ScrollView>
        {/* <View
          style={{
            backgroundColor: '#ECF2FF',
            padding: 5,
            paddingHorizontal: 8,
            borderRadius: 30,
            marginVertical: 10,
          }}>
          <AllDoctorsCard
            name={'Dr Samantha'}
            designation={'Cardiologist'}
            rating={'4.9'}
            profilePath={require('../../../assets/images/all-doctor1.png')}
          />
        </View>
        <View
          style={{
            backgroundColor: '#ECF2FF',
            padding: 5,
            paddingHorizontal: 8,
            borderRadius: 30,
            marginVertical: 10,
          }}>
          <AllDoctorsCard
            name={'Dr Samantha'}
            designation={'Cardiologist'}
            rating={'4.9'}
            profilePath={require('../../../assets/images/all-doctor1.png')}
          />
        </View>
        <View
          style={{
            backgroundColor: '#ECF2FF',
            padding: 5,
            paddingHorizontal: 8,
            borderRadius: 30,
            marginVertical: 10,
          }}>
          <AllDoctorsCard
            name={'Dr Samantha'}
            designation={'Cardiologist'}
            rating={'4.9'}
            profilePath={require('../../../assets/images/all-doctor1.png')}
          />
        </View>
        <View
          style={{
            backgroundColor: '#ECF2FF',
            padding: 5,
            paddingHorizontal: 8,
            borderRadius: 30,
            marginVertical: 10,
          }}>
          <AllDoctorsCard
            name={'Dr Samantha'}
            designation={'Cardiologist'}
            rating={'4.9'}
            profilePath={require('../../../assets/images/all-doctor1.png')}
          />
        </View> */}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  solidButtonContainer: {
    width: 50,
    height: 50,
    borderRadius: 15,
  },
  solidcontainer: {
    flexDirection: 'row',
    borderRadius: 15,
    height: 70,
    padding: 15,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(157,206,255,0.2)',
    marginBottom: 10,
    marginTop: 10,
    justifyContent: 'space-between',
  },
  targetButton: {
    width: 100,
    height: 40,
    elevation: 0,
  },
  targetButtonText: {
    fontSize: 14,
  },
});
