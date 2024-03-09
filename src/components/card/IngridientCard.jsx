import React from 'react';
import {View, StyleSheet} from 'react-native';
import SolidButton from '../Button/SolidButton';
import SmallText from '../Text/SmallText';
import TextMedium from '../Text/TextMedium';
import FlourSvg from '../../../assets/icons/Flour-Icon.svg';
function IngridientCard({icon, title, value, containerStyle}) {
  return (
    <View style={[styles.container, containerStyle]}>
      <SolidButton containerStyle={styles.iconContainer}>{icon}</SolidButton>
      <TextMedium style={{lineHeight: 12 * 1.5}}>{title}</TextMedium>
      <SmallText>{value}</SmallText>
    </View>
  );
}
const styles = StyleSheet.create({
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 15,
    marginBottom: 5,
  },
});
export default IngridientCard;
