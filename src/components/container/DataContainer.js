import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

function DataContainer({ containerStyle, children, onPress }) {
    return (
        <TouchableOpacity style={[styles.waterIntakeTracker, containerStyle]} onPress={onPress}>
            {children}
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    waterIntakeTracker: {
        padding: 15,
        borderRadius: 15,
        backgroundColor: 'white',
        elevation: 3,
        zIndex: 1,

    },
})
export default DataContainer;