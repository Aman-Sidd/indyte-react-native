import React from 'react';
import { View,StyleSheet,Text } from 'react-native';

import SmallText from './SmallText';
import { FONTS } from '../../constants/Fonts';
function Tag({containerStyle,textStyle,tag,icon}) {
    return (
        <View style={[styles.container,containerStyle]}>
            {icon}
            <SmallText style={{...styles.tagText,...textStyle,marginLeft:icon?5:0}}>{tag}</SmallText>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'rgba(157,206,255,0.2)',
        height:50,
        alignSelf:'flex-start',
        paddingHorizontal:15,
        paddingVertical:10,
        borderRadius:10,
        marginRight:10,
        marginBottom:15
    },
    tagText:{
        color:'black',
        fontFamily:FONTS.FONT_POPPINS_MEDIUM
    }
})
export default Tag;