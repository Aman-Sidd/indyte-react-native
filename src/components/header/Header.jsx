import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
const { width, height } = Dimensions.get('window');
import Back from '../../../assets/icons/Back.svg';
import { FONTS } from '../../constants/Fonts';

const Header = ({ title }) => {
    return (
        <View style={styles.MainView}>
            <Back width={20} height={20} />
            <Text style={styles.HeaderText}>{title}</Text>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    MainView: {
        width: width,
        height: height / 12,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10
    },
    HeaderText: {
        width: "90%",
        fontSize: 18,
        fontFamily: FONTS.FONT_POPPINS_BOLD,
        color: "black",
        textAlign: "center"
    }
}
)