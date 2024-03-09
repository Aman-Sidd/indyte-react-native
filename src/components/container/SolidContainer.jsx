import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

function SolidContainer({ children, containerStyle, onPress }) {
    return (

        <TouchableOpacity style={[styles.container, containerStyle]} onPress={onPress}>
            {children}
        </TouchableOpacity>

    );
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 40,
        backgroundColor: '#F7F8F8',
        justifyContent: 'center',
        alignItems: 'center',

    }
})
export default SolidContainer;