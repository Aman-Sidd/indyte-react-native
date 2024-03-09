import React from 'react';
import { TouchableOpacity,View,StyleSheet } from 'react-native';

function SolidButton({children,onPress,containerStyle}) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[styles.container,containerStyle]}>
                {children}
            </View>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:40,
        backgroundColor:'#F7F8F8',
        justifyContent:'center',
        alignItems:'center'
    }
})
export default SolidButton;