import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
} from 'react-native';
import Swiper from 'react-native-swiper'
import { SwiperImaage } from '../../data/swiperimages';
const { height } = Dimensions.get('window');


const HomeSwiper = () => {

    return (
        <Swiper
            containerStyle={styles.mainSwiperView}
            showsButtons={false}
            activeDotStyle={{ width: 8, height: 8, marginBottom: -15 }}
            dotStyle={{ marginBottom: -15 }}
            activeDotColor={"black"}
            dotColor={"rgba(0,0,0,0.3)"}
            autoplay={true}
            loop={true}
        >
            {
                SwiperImaage.map((item) => (
                    <View key={item.id} style={[styles.cardStyles, { backgroundColor: "white" }]}>
                        <Image
                            style={{ width: '100%', height: '100%', resizeMode: "contain", marginRight: 10, alignSelf: "flex-start", borderRadius: 10 }}
                            source={item.path}
                        />
                    </View>
                ))
            }
        </Swiper>
    )
}
const styles = StyleSheet.create({
    mainSwiperView: {
        height: height / 4.5,
        margin: 4,
        backgroundColor: "white",
        marginTop: 10,
        marginBottom: 30
    },
    cardStyles: {
        flex: 1,
        alignItems: 'center',
        flexDirection: "row",
        borderRadius: 10,
        marginHorizontal: 1
    },
    cardText: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
        width: 100,
        position: "absolute",
        right: 20
    }
})

export default HomeSwiper;