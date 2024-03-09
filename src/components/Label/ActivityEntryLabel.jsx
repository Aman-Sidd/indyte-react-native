import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'

const {width}=Dimensions.get("window");
const ActivityEntryLabel = ({title,amount,unit}) => {
    return (
        <View style={[styles.container,styles.alignmaent]}>
            <Text style={styles.mainTitle}>{title}</Text>
            <View style={styles.alignmaent}>
                <Text style={styles.mainTitle}>{amount}</Text>
                <Text style={styles.amountStyle}>{unit}</Text>
            </View>
        </View>
    )
}
const styles=StyleSheet.create({
    mainTitle:{
        color:"rgba(23, 52, 48, 1)",
        fontWeight:"700",
        fontSize:14
    },
    amountStyle:{
        color:"rgba(97, 125, 121, 1)",
        fontWeight:"500",
        fontSize:14,
        marginLeft:7
    },
    container:{
        width:'90%',
        paddingVertical:10
    },
    alignmaent:{
        flexDirection: 'row',
        alignItems:"center",
        justifyContent:"space-between",
    }
})
export default ActivityEntryLabel