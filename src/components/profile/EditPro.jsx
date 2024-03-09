import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native'
import React from 'react'
import { FONTS } from '../../constants/Fonts'
import { TouchableOpacity } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');
const EditPro = ({ value, icon, Edit }) => {
    return (

        <View style={[styles.Container]}>
            <View style={styles.image}>
                {icon}
            </View>
            <View style={{ paddingHorizontal: 10, marginTop: 7, width: 220 }}>
                <Text style={[{ fontSize: 13, color: "#1D1617", fontFamily: FONTS.FONT_POPPINS_MEDIUM }]}>{value} </Text>
            </View>

        </View>

    )
}

export default EditPro

const styles = StyleSheet.create({
    Container: {
        paddingVertical: 5,
        borderRadius: 14,
        width: width / 1.25,
        minHeight: height / 16.5,
        backgroundColor: "#F7F8F8",
        borderWidth: 1,
        borderColor: "#F7F8F8",
        alignSelf: "center",
        display: "flex",
        flexDirection: "row",
        marginBottom: "4%"
    },
    image: {
        marginLeft: "3%",
        marginTop: 8,
        display: "flex",
        flexDirection: "row"
    }
})