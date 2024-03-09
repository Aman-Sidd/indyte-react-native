import React from 'react';
import {View, StyleSheet, Touchable, TouchableOpacity} from 'react-native';
import SolidContainer from '../../components/container/SolidContainer';
import LargeText from '../../components/Text/LargeText';
import {FONTS} from '../../constants/Fonts';
import {useNavigation} from '@react-navigation/native';

function TextCenterHeader({
  icon1,
  icon2,
  title = '',
  textStyle,
  containerStyle,
  headerContainerStyle,
}) {
  const navigation = useNavigation();
  const handleBackNavigation = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      console.log("Can't navigate back");
      // Handle the case where there is no previous screen
    }
  };
  return (
    <View style={[styles.header, headerContainerStyle]}>
      {icon1 && (
        <TouchableOpacity
          onPress={() => {
            console.log('ehe');
          }}>
          <SolidContainer
            containerStyle={{
              width: 40,
              height: 40,
              borderRadius: 10,
              ...containerStyle,
            }}>
            {icon1}
          </SolidContainer>
        </TouchableOpacity>
      )}
      <LargeText style={{...styles.headingText, ...textStyle}}>
        {title}
      </LargeText>
      {icon2 && (
        <SolidContainer
          containerStyle={{
            width: 40,
            height: 40,
            borderRadius: 10,
            ...containerStyle,
          }}>
          {icon2}
        </SolidContainer>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  headingText: {
    flexGrow: 1,
    color: 'black',
    textAlign: 'center',
    fontFamily: FONTS.FONT_POPPINS_BOLD,
  },
});
export default TextCenterHeader;
