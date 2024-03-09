import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import Header from '../../components/header/Header';
const { width, height } = Dimensions.get('window');
import Crown from '../../../assets/icons/crown.svg';
import TextH4 from '../../components/Text/TextH4';
import SmallText from '../../components/Text/SmallText';
import SubscriptionCard from '../../components/card/SubscriptionCard';
import SubBoy from '../../../assets/icons/SubBoy.svg';
import SubGirl from '../../../assets/icons/SubGirl.svg';
import ArrowRight from '../../../assets/icons/ArrowRight.svg';
import PrimaryButton from '../../components/Button/PrimaryButton';
const Subscription = () => {
    return (
        <View style={styles.Container}>
            <Header title="Subscription" />
            <View style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "60%", alignSelf: "center" }}>
                <Crown width={50} height={50} style={{ marginVertical: "10%" }} />
                <TextH4 style={{ textAlign: "center", marginTop: "10%" }}>Upgrade plan to
                    get the best of  INDYTE
                </TextH4>
                <SmallText style={{ textAlign: "center", marginTop: "10%" }}>
                    99% of our user recommended you to upgrade plan
                </SmallText>
            </View>
            <View style={{ marginTop: "8%" }}>
                <SubscriptionCard icon={<SubBoy width={59} height={82} />} PlanType={"One Month Plan"} Price={"18"} backGroundColor={"#E7FEFF"} />
                <SubscriptionCard icon={<SubGirl width={59} height={82} />} PlanType={"Six Month Plan"} Price={"199"} backGroundColor={"#FFF2FE"} />
            </View>
            <View style={{ alignItems: "center", marginTop: "10%" }}>
                <PrimaryButton containerStyle={{ width: width - 30, alignItems: "flex-start", paddingLeft: "8%" }} title={'Select Plan'} onPress={() => console.log('Hello')} >
                    <View style={{ width: '63%', alignItems: "flex-end" }}>
                        <ArrowRight width={24} height={24} />
                    </View>
                </PrimaryButton>
            </View>
        </View>
    )
}

export default Subscription

const styles = StyleSheet.create({
    Container: {
        height: height,
        borderWidth: 1,
        backgroundColor:"white"
    }
})