import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  CometChatConversationsWithMessages,
  CometChatIncomingCall,
  CometChatUIEventHandler,
} from '@cometchat/chat-uikit-react-native';
import {CometChat} from '@cometchat/chat-sdk-react-native';
import {useSelector, useDispatch} from 'react-redux';
import {setCallReceived} from '../../store/chatSlice';

const ChatScreen = ({route}) => {
  const [dietician, setDietician] = useState(null);
  const incomingCall = useRef(null);
  useEffect(() => {
    const fetchDietician = async () => {
      const dieticianId = route.params._id;
      const cometDietician = await CometChat.getUser(dieticianId);
      setDietician(cometDietician);
    };
    fetchDietician();
    var listnerID = 'UNIQUE_LISTENER_ID';
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

  const callReceived = useSelector(state => state.chat.callReceived);

  return callReceived ? (
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
    <CometChatConversationsWithMessages user={dietician} />
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
