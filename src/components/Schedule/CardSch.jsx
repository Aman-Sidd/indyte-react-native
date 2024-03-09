import { StyleSheet, Text, View,ScrollView,Dimensions,TouchableOpacity } from 'react-native'
import React from 'react'
import { FONTS } from '../../constants/Fonts'

const { width, height } = Dimensions.get('window');
const CardSch = ({  value,icon,subvalue,icon2 }) => {
    return (
       
           <TouchableOpacity style={[styles.Container]}>
             <View style={styles.image}>
                {icon}
              </View>
            <View style={{paddingHorizontal:10,marginTop:7,width:158}}>
               <Text style={[{ fontSize: 13, color: "#7B6F72", fontFamily: FONTS.FONT_POPPINS_REGULAR }]}>{value} </Text>
            </View>
            <View style={{marginLeft:20,marginTop:8,width:115,display:"flex",flexDirection:"row"}}>
               <Text style={[{ fontSize: 11, color: "#ADA4A5", fontFamily: FONTS.FONT_POPPINS_REGULAR }]}>{subvalue} </Text>
            </View>
            <View style={styles.image1}>
                {icon2}
            </View>
           </TouchableOpacity>
       
    )
}

export default  CardSch

const styles = StyleSheet.create({
    Container: {
        paddingVertical: 5,
        borderRadius: 14,
        // width: width/1.25,
        width: width/1.1,
        height:height/16.5,
        backgroundColor:"#F7F8F8",
        borderWidth:1,
        borderColor:"#F7F8F8",
        alignSelf:"center",
        display:"flex",
        flexDirection:"row",
        marginBottom:"4%"
    },
    image:{
        marginLeft:"6%",
        marginTop:8,
        display:"flex",
        flexDirection:"row",
    },
    image1:{
        marginTop:8,
        display:"flex",
        flexDirection:"row",
    }
})