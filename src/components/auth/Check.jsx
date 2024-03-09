import { StyleSheet, Text, View } from 'react-native'
import React,{useState} from 'react'
import CheckBox from '@react-native-community/checkbox';
const Check = () => {
    const [isSelected, setSelection] = useState(false);
  return (
    <View >
       <CheckBox 
          value={isSelected}
          onValueChange={setSelection}
          style={{height:20,width:35}}
        />
    </View>
  )
}

export default Check

const styles = StyleSheet.create({
})