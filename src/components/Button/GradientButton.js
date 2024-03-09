import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';
import { TouchableHighlight, TouchableOpacity } from 'react-native';



function GradientButton({colors,conatinerStyle,children,onPress}) {
    return (
        <TouchableOpacity onPress={onPress} underlayColor={'transparent'}>
            <LinearGradient
                start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                colors={colors} style={conatinerStyle}>
                {children}
            </LinearGradient>
        </TouchableOpacity>
        
    );
}
GradientButton.propTypes = {
    colors:PropTypes.array.isRequired,
    conatinerStyle:PropTypes.object.isRequired,
}

export default GradientButton;