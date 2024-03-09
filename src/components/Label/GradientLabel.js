import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';


function GradientLabel({colors,conatinerStyle,children,vertical=false}) {
    if(vertical)
    return <LinearGradient
            colors={colors} style={conatinerStyle}>
            {children}
        </LinearGradient>
    return (
        <LinearGradient
            start={{x: 0, y: 0}} end={{x: 1, y: 0}}
            colors={colors} style={conatinerStyle}>
            {children}
        </LinearGradient>
    );
}
GradientLabel.propTypes = {
    colors:PropTypes.array.isRequired,
    conatinerStyle:PropTypes.object.isRequired,
}

export default GradientLabel;