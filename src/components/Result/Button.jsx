import { StyleSheet, Text, View,Dimensions } from 'react-native'
import React from 'react'
import PrimaryButton from '../Button/PrimaryButton'
import SolidButton from '../Button/SolidButton';
import SmallText from '../Text/SmallText';
import TextMedium from '../Text/TextMedium';
import { useState } from 'react';
const { width, height } = Dimensions.get('window');

function CatgeoryItems({title,active,setActive}){
  if(active === title)
    return <PrimaryButton title={title} containerStyle={{...styles.containerStyle,...styles.activeButton}}/>
  else
    return (
      <SolidButton containerStyle={{...styles.containerStyle}} onPress={()=>setActive(title)}>
          <TextMedium style={{color:'#ADA4A5'}}>{title}</TextMedium>
      </SolidButton>
    )
}
const Button = ({category,active,setActive}) => {
  
  return (
    <View style={styles.container}>
      {
        category.map((item,index)=><CatgeoryItems  key={index} title={item} active={active} setActive={setActive}/>)
      }
    </View>
  )
}

export default Button

const styles = StyleSheet.create({
  containerStyle:{
    width:(315/2) - 20,
  },
  activeButton:{
    height:50,
    elevation:0
  },
  container:{
    backgroundColor:"#F7F8F8",
    paddingVertical:10,
    minWidth:315,
    borderRadius:99,
    alignSelf:'center',
    flexDirection:'row',
    justifyContent:'space-evenly',    
    alignItems:'center',
  }
})