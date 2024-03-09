import {View, StyleSheet, Pressable, Text, Modal} from 'react-native';
import React, {useState} from 'react';

import ThreeDot from '../../../assets/icons/threedot.svg';
import TextH4 from '../Text/TextH4';
import SmallText from '../Text/SmallText';
import GradientSwitch from '../common/GradientSwitch';
import PrimaryButton from '../Button/PrimaryButton';

const MedicineRemainderCard = ({
  title,
  timeat,
  icon,
  time,
  status,
  finished,
  handleButton,
}) => {
  return (
    <View style={styles.cardBody}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View
          style={{
            backgroundColor: 'red',
            width: 50,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            backgroundColor: '#CACFD2',
          }}>
          {icon}
        </View>
        <View style={{marginLeft: 10, gap: 5}}>
          <View style={{alignItems: 'flex-start'}}>
            <TextH4 style={styles.cardTitle}>{`${title}`}</TextH4>
            <SmallText>{time}</SmallText>
          </View>
          <SmallText style={styles.timeat}>{timeat}</SmallText>
        </View>
      </View>
      {status && (
        <Pressable
          style={[
            styles.btn,
            {
              backgroundColor: finished ? '#92A3FD' : '#FF0000',
            },
          ]}
          onPress={() => handleButton()}>
          <Text style={styles.btnText}>
            {finished ? 'completed' : 'pending'}
          </Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardBody: {
    width: '98%',
    backgroundColor: 'white',
    marginVertical: 10,
    padding: 15,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderRadius: 20,
    zIndex: 1,
    alignSelf: 'center',
    elevation: 2,
    height: 100,
  },
  cardTitle: {
    fontSize: 15,
    marginRight: 5,
  },
  timeat: {
    fontSize: 14,
    fontWeight: '500',
  },
  // btn: {
  //   width: 100,
  //   height: 30,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // btnText: {
  //   fontSize: 12,
  //   color: 'white',
  // },
  btn: {
    position: 'absolute',
    right: 20,
    top: '55%',
    width: 80,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  btnText: {
    fontSize: 12,
    color: 'white',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
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
});
export default MedicineRemainderCard;
