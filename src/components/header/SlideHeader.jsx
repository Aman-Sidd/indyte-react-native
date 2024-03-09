import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Back from '../../../assets/icons/Back.svg';
import Step from '../../../assets/images/Step.svg';
import {TouchableOpacity} from 'react-native';

const SlideHeader = ({next}) => {
  return (
    <View style={styles.MainView}>
      <Back width={20} height={20} />
      <View style={{width: '85%', alignItems: 'center'}}>
        <View
          style={{
            width: 100,
            height: 10,
            backgroundColor: '#E1DDF5',
            borderRadius: 5,
          }}>
          <View
            style={{width: 50, backgroundColor: '#7265E3', borderRadius: 4}}>
            <Text></Text>
          </View>
        </View>
      </View>

      {next && (
        <TouchableOpacity>
          <Text style={styles.nextBtn}>Next</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SlideHeader;

const styles = StyleSheet.create({
  MainView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    justifyContent: 'space-between',
  },

  nextBtn: {
    color: '#7265E3',
    fontFamily: 'Rubik-Regular',
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 14,
    letterSpacing: 0.229,
  },
});
