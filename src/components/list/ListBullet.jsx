import React from 'react';
import { View,StyleSheet,Text } from 'react-native';
import { FONTS } from '../../constants/Fonts';
import { COLORS } from '../../constants/Colors';

function ListBullet({title,subTitle,showLine=true}) {
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <View style={styles.titleBullet}/>
                <Text style={styles.title}>{title}</Text>
            </View>
            <View style={[styles.subTitleContainer,{borderLeftWidth:showLine?1:0}]}>
                <Text style={styles.subtitle}>{subTitle}</Text>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    title:{
        fontFamily:FONTS.FONT_POPPINS_MEDIUM,
        fontSize:12
    },
    subtitle:{
        fontFamily:FONTS.FONT_POPPINS_MEDIUM,
        fontSize:12,
        color:COLORS.SECONDARY_BUTTON_GRADIENT.PURPLE1,
    },
    titleContainer:{
        flexDirection:'row',
        alignItems:'center'
    },
    titleBullet:{
        marginRight:5,
        width:10,
        height:10,
        backgroundColor:COLORS.SECONDARY_BUTTON_GRADIENT.PURPLE1,
        borderRadius:30,
    },
    subTitleContainer:{
        marginLeft:3.5,
        paddingLeft:10,
        // borderLeftWidth:1,
        borderColor:COLORS.SECONDARY_BUTTON_GRADIENT.PURPLE1,
        borderStyle:'dashed',
    }
})
export default ListBullet;