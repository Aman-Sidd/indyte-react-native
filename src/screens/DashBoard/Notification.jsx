import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native'
import React from 'react'
import Header from '../../components/header/Header';
import NotifCard from '../../components/card/NotifCard';
import { NotifiactionData } from '../../data/Data';
const { width, height } = Dimensions.get('window');
const Notification = () => {
    return (
        <View style={{ height: height, backgroundColor: "white" }}>
            <Header title={"Notification"} />
            <ScrollView>
                {
                    NotifiactionData.map((item, index) => (
                        <NotifCard item={item} key={index} />
                    ))
                }
            </ScrollView>
        </View>
    )
}

export default Notification
