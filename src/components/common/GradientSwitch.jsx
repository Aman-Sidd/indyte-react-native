import React, { useState } from 'react';
import { View, Switch, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const GradientSwitch = () => {
    const [isEnabled, setIsEnabled] = useState(false);
  
    const toggleSwitch = () => {
      setIsEnabled((previousState) => !previousState);
    };
  
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['rgba(197, 139, 242, 1)', 'rgba(238, 164, 206, 1)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <Switch
            trackColor={{ false: 'transparent', true: 'transparent' }}
            thumbColor={'#f4f3f4'}
            ios_backgroundColor="transparent"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </LinearGradient>
      </View>
    );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    gradient: {
      borderRadius: 20,
    },
});
export default GradientSwitch