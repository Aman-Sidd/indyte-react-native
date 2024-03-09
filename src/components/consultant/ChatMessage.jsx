import { View, Text, Image, Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import { FONTS } from '../../constants/Fonts'
const { width, height } = Dimensions.get('window');


export default function ChatMessage({ message, date, name, containerStyles, contentStyles, imgPath, textContainer }) {
    return (
        <View style={[style.container, containerStyles]}>
            <View style={[style.content, contentStyles]}>
                <Text style={{
                    fontFamily: FONTS.FONT_POPPINS_REGULAR,
                    color: "#343965",
                    fontSize: 13,
                    marginTop: 4,
                }}>{name}</Text>
                <Text style={[style.text, textContainer]}>{message}</Text>
                <Text style={{ fontFamily: FONTS.FONT_POPPINS_REGULAR, color: "#343965", fontSize: 10, marginTop: 4 }}>{date}</Text>
            </View>
            <Image style={{ width: 35, height: 35, marginBottom: 20 }} source={imgPath} />
        </View>
    )
}

const style = StyleSheet.create({
    content: {
        maxWidth: width / 1.3,
        width: width / 1.1
    },
    container: {
        alignItems: "flex-end",
        flexDirection: "row",
        gap: 10,
        marginBottom: 10,
        width: width / 1.1
    },
    text: {
        padding: 10,
        backgroundColor: "#E8EBF2",
        fontFamily: FONTS.FONT_POPPINS_REGULAR,
        color: "#343965",
        fontSize: 16,
        borderRadius: 20,
    }

})