import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NotifImage from '../../../assets/icons/NotifImage.svg'
import { FONTS } from '../../constants/Fonts'
import PrimaryButton from '../Button/PrimaryButton'
import { useNavigation } from '@react-navigation/native'
import { SCREENS } from '../../constants/Screens'
import { Image } from 'react-native';

const ProfileTop = ({ name, Program,image }) => {
    const navigation=useNavigation();

    return (
        <View style={styles.Container}>
            <Image source={image} width={50} height={50} style={styles.profileImage}/>
            <View style={styles.NotifText}>
                <Text style={{ fontSize: 14, fontFamily: FONTS.FONT_POPPINS_BOLD, color: "black" }}>{name}</Text>
                <Text style={{ fontSize: 12, fontFamily: FONTS.FONT_POPPINS_MEDIUM, color: "grey" }}>{Program}</Text>
            </View>
            <View style={{ width: "25%", }}>
                <PrimaryButton onPress={()=>navigation.navigate(SCREENS.EDITPROFILE)} title={'Edit'} containerStyle={{ height: 30, dispaly: "flex", alignItems: "center" }} />
            </View>
        </View>
    )
}

export default ProfileTop

const styles = StyleSheet.create({
    Container: {
        dispaly: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 20
    },
    profileImage:{
        borderRadius:9999,
        borderWidth:1,
        borderColor:'black'
    },
    NotifText: {
        width: "55%",
        // borderWidth: 1,
        marginLeft: 10
    }
})
