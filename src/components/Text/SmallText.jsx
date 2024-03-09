import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { FONTS } from '../../constants/Fonts';
import PropTypes from 'prop-types';
import { COLORS } from '../../constants/Colors';
import { SIZES } from '../../constants/Size';

function SmallText({ children, style, onPress }) {
    return (
        <Text style={[styles.font, style]} onPress={onPress}>{children}</Text>
    );
}
SmallText.propTypes = {
    style: PropTypes.object
}
const styles = StyleSheet.create({
    font: {
        fontSize: SIZES.SMALL_HEADING_SIZE,
        fontFamily: FONTS.FONT_POPPINS_REGULAR,
        color: COLORS.TITLE_GREY,
        lineHeight: SIZES.SMALL_HEADING_SIZE * 1.5
    }
})
export default SmallText;