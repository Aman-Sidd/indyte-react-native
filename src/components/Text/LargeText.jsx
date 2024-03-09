import React from 'react';
import { Text,StyleSheet } from 'react-native';
import { FONTS } from '../../constants/Fonts';
import PropTypes from 'prop-types';
import { COLORS } from '../../constants/Colors';
import { SIZES } from '../../constants/Size';

function LargeText({children,style}) {
    return (
        <Text style={[styles.font,style]}>{children}</Text>
    );
}

const styles = StyleSheet.create({
    font:{
        fontSize:SIZES.LARGE_HEADING_SIZE,
        fontFamily:FONTS.FONT_POPPINS_MEDIUM,
        color:COLORS.TITLE_GREY,
        lineHeight:SIZES.SMALL_HEADING_SIZE * 1.5
    }
})
export default LargeText;