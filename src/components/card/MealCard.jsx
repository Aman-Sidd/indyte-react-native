import { Image, StyleSheet, Text, TouchableOpacity, Dimensions, View } from 'react-native'
import React from 'react'
import { FONTS } from '../../constants/Fonts'
const { width, height } = Dimensions.get('window');

const MealCard = ({ Type, NOFood, backgroundColor, btnBackGround, img ,onPress}) => {
    return (
        <View style={[styles.Container, { backgroundColor: backgroundColor }]}>
            <View style={styles.ImageAlign}>
                <Image source={img} style={styles.FoodImage} />
            </View>
            <View style={{ marginHorizontal: 15 }}>
                <Text style={styles.Type}>{Type}</Text>
                <Text style={styles.NOF}>{NOFood}+ Foods</Text>
                <TouchableOpacity onPress={onPress} style={[styles.Btn, { backgroundColor: btnBackGround }]}>
                    <Text style={styles.btnText}>Select</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default MealCard

const styles = StyleSheet.create({
    FoodImage: {
        width: 110,
        height: 70,
        borderRadius: 10,
    },
    Container: {
        // borderWidth: 1,
        width: width / 1.5,
        marginRight: 30,
        borderRadius: 15,
        marginVertical: "1.5%"
    },
    ImageAlign: {
        display: "flex",
        alignItems: "flex-end"
    },
    Type: {
        fontFamily: FONTS.FONT_POPPINS_BOLD,
        color: "black",
        fontSize: 14
    },
    NOF: {
        fontSize: 12,
        fontFamily: FONTS.FONT_POPPINS_REGULAR,
        color: 'grey'
    },
    Btn: {
        backgroundColor: "blue",
        width: width / 3,
        borderRadius: 17,
        paddingVertical: 7,
        paddingHorizontal: 11,
        marginVertical: 10
    },
    btnText: {
        color: "white",
        fontFamily: FONTS.FONT_POPPINS_SEMIBOLD,
        textAlign: "center"
    }
})