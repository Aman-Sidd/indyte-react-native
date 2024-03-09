import React, { useState } from 'react';
import {StyleSheet} from 'react-native'
import SolidButton from './SolidButton';

function SwitchIconButton({icon1,icon2,containerStyle}) {
    const [image,setImage] = useState(false)
    return (
        <SolidButton containerStyle={{...styles.solidButtonContainer,...containerStyle}} onPress={()=>setImage(!image)}>
                    {image ? icon1:icon2}
        </SolidButton>
    );
}
const styles = StyleSheet.create({
    solidButtonContainer:{
        width:50,
        height:50,
        borderRadius:15,
    },
})
export default SwitchIconButton;