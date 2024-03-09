import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import React from 'react'
import SmallText from '../Text/SmallText'
import { FONTS } from '../../constants/Fonts'

const GalleryPhotoCard = ({ Date }) => {
    return (
        <View>
            <SmallText style={{ fontFamily: FONTS.FONT_POPPINS_REGULAR, marginHorizontal: 30, marginTop: "5%" }}>{Date}</SmallText>
            <ScrollView horizontal style={{ marginHorizontal: 10 }}>
                <Image source={require('../../../assets/images/GirlImage.png')} style={styles.Image} />
                <Image source={require('../../../assets/images/GirlImage.png')} style={styles.Image} />
                <Image source={require('../../../assets/images/GirlImage.png')} style={styles.Image} />
                <Image source={require('../../../assets/images/GirlImage.png')} style={styles.Image} />
                <Image source={require('../../../assets/images/GirlImage.png')} style={styles.Image} />
                <Image source={require('../../../assets/images/GirlImage.png')} style={styles.Image} />
            </ScrollView>
        </View>
    )
}

export default GalleryPhotoCard

const styles = StyleSheet.create({
    Image: {
        width: 100,
        height: 100,
        borderWidth: 1,
        margin: 10
    }
})