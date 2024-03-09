import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FONTS } from '../../constants/Fonts'
import { Pressable } from 'react-native'

const ProfileOption = ({ leftIcon, rightIcon, Title, onPress }) => {
    return (
        <Pressable onPress={onPress} style={styles.Container}>
            {leftIcon}
            <Text style={styles.OptionTitle}>{Title}</Text>
            {rightIcon}
        </Pressable>
    )
}

export default ProfileOption

const styles = StyleSheet.create({
    Container: {
        display: "flex",
        flexDirection: 'row',
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginRight: "7%"
    },
    OptionTitle: {
        fontSize: 12,
        fontFamily: FONTS.FONT_POPPINS_MEDIUM,
        width: "80%",
        marginLeft: 10,
        color: "#7B6F72"
    }
})