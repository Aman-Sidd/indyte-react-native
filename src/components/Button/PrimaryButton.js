import React from 'react';
import { StyleSheet,Text,View} from 'react-native';
import { FONTS } from '../../constants/Fonts';
import GradientButton from './GradientButton';
import PropTypes from 'prop-types';
import { COLORS } from '../../constants/Colors';

function PrimaryButton({title,onPress,containerStyle,textStyle,children}) {
    return (
        <GradientButton
            onPress={onPress}
            colors={[COLORS.PRIMARY_BUTTON_GRADIENT.BLUE1,COLORS.PRIMARY_BUTTON_GRADIENT.BLUE2]}
            conatinerStyle={{...styles.container,...containerStyle}}
        >
            <View style={styles.buttonTextContainer}>
            <Text style={{...styles.buttonText,...textStyle}}>
                {title}
            </Text>
            {children}
            </View>
        
        </GradientButton>
    );
}
PrimaryButton.propTypes = {
    title:PropTypes.string,
    style:PropTypes.object
}
const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:60,
        borderRadius:30,
        justifyContent:'center',
        alignItems:'center',
        elevation:15
    },
    buttonTextContainer:{
        flexDirection:'row',
        alignItems:'center'
    },
    buttonText:{
        fontSize:16,
        fontFamily:FONTS.FONT_POPPINS_BOLD,
        color:'white',
    }
})
export default PrimaryButton;