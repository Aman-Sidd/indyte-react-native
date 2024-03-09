import React from 'react';
import { View,StyleSheet } from 'react-native';
import TextH4 from './TextH4';
import SmallText from './SmallText';
import PropTypes from 'prop-types';

function Heading({heading,subheading,containerStyle,headingStyle,subHeadingStyle}) {
    return (
        <View style={[styles.container,containerStyle]}>
            <TextH4 style={headingStyle}>{heading}</TextH4>
            <SmallText style={subHeadingStyle}>{subheading}</SmallText>
        </View>
    );
}
Heading.propTypes = {
    containerStyle:PropTypes.object,
    headingStyle:PropTypes.object,
    subHeadingStyle:PropTypes.object
}
const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
        marginBottom:30
    }
})
export default Heading;