import React from 'react';
import { Text,StyleSheet } from 'react-native';
import { FONTS } from '../../constants/Fonts';
import PropTypes from 'prop-types';
import { COLORS } from '../../constants/Colors';
import { SIZES } from '../../constants/Size';

function TextH4({children,style}) {
    return (
        <Text style={[styles.font,style]}>{children}</Text>
    );
}
TextH4.propTypes = {
    children:PropTypes.string.isRequired,
    style:PropTypes.object
}
const styles = StyleSheet.create({
    font:{
        fontSize:SIZES.H4_HEADING_SIZE,
        fontFamily:FONTS.FONT_POPPINS_BOLD,
        color:COLORS.TITLE_BLACK,
        lineHeight:SIZES.H4_HEADING_SIZE * 1.5
    }
})
export default TextH4;