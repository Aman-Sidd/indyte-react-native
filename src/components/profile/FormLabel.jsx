import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const FormLabel = ({ labelName }) => {
    return (
        <View>
            <Text style={{ fontSize: 15, marginLeft: "3%", color: "#92A3FD", marginVertical: 10 }}>{labelName}</Text>
        </View>
    )
}

export default FormLabel

const styles = StyleSheet.create({})