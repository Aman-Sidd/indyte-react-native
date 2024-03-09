import { StyleSheet, Text, View,ScrollView,Dimensions } from 'react-native'
import React from 'react'
import { FONTS } from '../../constants/Fonts'
import Google from '../../../assets/icons/Google.svg'

const { width, height } = Dimensions.get('window');
const EditCard = ({  value,icon }) => {
    return (
       
           <View style={[styles.Container]}>
            <View style={{marginTop:7,marginLeft:"15%",width:85}}>
               <Text style={[{ fontSize: 13, color: "#1D1617", fontFamily: FONTS.FONT_POPPINS_MEDIUM }]}>{value} </Text>
            </View>
            <View style={styles.image}>
                {icon}
              </View>
           </View>
       
    )
}

export default  EditCard

const styles = StyleSheet.create({
    Container: {
        paddingVertical: 5,
        borderRadius: 14,
        width: width/2.6,
        height:height/16.5,
        backgroundColor:"#ECF2FF",
        borderWidth:1,
        borderColor:"#ECF2FF",
        alignSelf:"center",
        display:"flex",
        flexDirection:"row",
        marginBottom:"4%",
        marginHorizontal:5
    },
    image:{
       
        marginTop:8,
        
    }
})