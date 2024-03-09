import React from 'react';
import { StyleSheet,Text} from 'react-native';
import { FONTS } from '../../constants/Fonts';
import PropTypes from 'prop-types';
import { COLORS } from '../../constants/Colors';
import GradientLabel from './GradientLabel';

function SecondaryLabel({title,containerStyle,textStyle}) {
    return (
        <GradientLabel
            colors={[COLORS.SECONDARY_BUTTON_GRADIENT.PURPLE2,COLORS.SECONDARY_BUTTON_GRADIENT.PURPLE1]}
            conatinerStyle={{...styles.container,...containerStyle}}
        >
        <Text style={{...styles.buttonText,...textStyle}}>
            {title}
        </Text>
        </GradientLabel>
    );
}
SecondaryLabel.propTypes = {
    children:PropTypes.string,
    style:PropTypes.object
}
const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:60,
        borderRadius:30,
        justifyContent:'center',
        alignItems:'center',
    },
    buttonText:{
        fontSize:16,
        fontFamily:FONTS.FONT_POPPINS_BOLD,
        color:'white',
    }
})
export default SecondaryLabel;