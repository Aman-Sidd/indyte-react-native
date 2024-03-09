import React from 'react';
import { View,StyleSheet } from 'react-native';
import TextMedium from '../Text/TextMedium';
import { TouchableWithoutFeedback } from 'react-native';
import { TouchableOpacity } from 'react-native';

function Decider({activeItem,item,setActiveItem}){
    return (
        <TouchableOpacity style={{justifyContent:'center',alignItems:'center',flex:1}} onPress={()=>setActiveItem(item)}>
            <TextMedium  style={activeItem === item ? styles.activeItem:styles.itemText}>{item}</TextMedium>
        </TouchableOpacity>
    )
}
function ActivePassiveMenu({activeItem,items=[],setActiveItem}) {
    
    return (
        <View style={styles.container}>
            {items.map((item,index)=><Decider key={index} activeItem={activeItem} item={item} setActiveItem={setActiveItem}/>)}
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    itemText:{
        color:'#617D79',
       
    },
    activeItem:{
        backgroundColor:'black',
        color:'white',
        paddingHorizontal:30,
        paddingVertical:8,
        borderRadius:30,
        
    }
})
export default ActivePassiveMenu;