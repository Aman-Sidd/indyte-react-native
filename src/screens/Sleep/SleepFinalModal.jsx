import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants/Colors'
const { width, height } = Dimensions.get('window');
import Moon from '../../../assets/images/moon.svg'
import TextH4 from '../../components/Text/TextH4';
import TextMedium from '../../components/Text/TextMedium';
import Button from '../../components/Result/Button';
import PrimaryButton from '../../components/Button/PrimaryButton';
import SolidButton from '../../components/Button/SolidButton';
import { SCREENS } from '../../constants/Screens';

const SleepFinalModal = ({ navigation }) => {
    return (
        <View style={styles.SleepModalMain}>
            <View style={styles.InnerModal}>
                <Moon width={100} height={100} style={{ marginVertical: 20 }} />
                <TextH4 style={styles.CardHeading}>Get a good night's</TextH4>
                <TextH4 style={styles.CardHeading}>sleep, every night</TextH4>
                <TextMedium style={styles.DescTxt}>Useful Tips : Poor sleep is one of the strongest risk factors for weight gain, so taking care of your sleep is important </TextMedium>
                <SolidButton containerStyle={styles.Btn} onPress={() => navigation.navigate(SCREENS.DASHBOARD)}>
                    <Text style={styles.TxtBtn}>Alright!</Text>
                </SolidButton>
            </View>
        </View>
    )
}

export default SleepFinalModal

const styles = StyleSheet.create({
    SleepModalMain: {
        backgroundColor: "white",
        height: height,
        alignItems: "center",
        justifyContent: "center",
    },
    InnerModal: {
        height: height / 1.7,
        width: width - 30,
        alignSelf: "center",
        alignContent: "center",
        borderRadius: 30,
        backgroundColor: "#8D81F8",
        alignItems: "center"
    },
    CardHeading: {
        color: "white"
    },
    DescTxt: {
        color: "white",
        width: width - 120,
        textAlign: "center",
        marginVertical: 20
    },
    Btn: {
        width: width - 150,
        borderRadius: 15,
        paddingVertical: 10
    },
    TxtBtn: {
        fontSize: 16,
        color: "#7265E3",
        fontWeight: "500",
    }
})