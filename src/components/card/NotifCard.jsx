import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NotifImage from '../../../assets/icons/NotifImage.svg'
import OptionIcon from '../../../assets/icons/OptionIcon.svg'
import { FONTS } from '../../constants/Fonts'


const NotifCard = ({ item }) => {
    return (
        <View style={styles.MainContainer}>
            <NotifImage width={40} height={40} />
            <View style={styles.NotifText}>
                <Text style={{ fontSize: 12, fontFamily: FONTS.FONT_POPPINS_BOLD, color: "black" }}>{item.title}</Text>
                <Text style={{ fontSize: 10, fontFamily: FONTS.FONT_POPPINS_MEDIUM, color: "grey" }}>{item.Time}</Text>
            </View>
            <OptionIcon width={20} height={20} />
        </View>
    )
}

export default NotifCard

const styles = StyleSheet.create({
    MainContainer: {
        marginHorizontal: 20,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 18,
        borderBottomWidth: 0.5,
        borderColor: "#DDDADA"
    },
    NotifText: {
        marginLeft: "3%",
        width: "75%"
    }
})