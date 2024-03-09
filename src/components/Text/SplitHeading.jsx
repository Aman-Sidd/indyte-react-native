import React from 'react';
import { View,StyleSheet } from 'react-native';
import TextMedium from './TextMedium';
import SmallText from './SmallText';

function SplitHeading({title,subtitle1,subtitle2,headingStyle,subHeadingStyle,containerStyle}) {
    return (
        <View style={[styles.info,containerStyle]}>
                <TextMedium style={headingStyle}>{title}</TextMedium>
                <SmallText style={subHeadingStyle}>{subtitle1} | {subtitle2}</SmallText>
        </View>
    );
}
const styles = StyleSheet.create({
    info:{
        flexGrow:1
    }
})
export default SplitHeading;