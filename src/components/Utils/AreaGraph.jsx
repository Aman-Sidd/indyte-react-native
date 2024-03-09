import React, {useEffect, useState} from 'react';

import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {LineChart} from 'react-native-gifted-charts';

const AreaGraph = ({lineData, lineData2, maxValue}) => {
  return (
    <View>
      <LineChart
        areaChart
        curved
        data={lineData}
        data2={lineData2}
        height={250}
        maxValue={maxValue}
        showVerticalLines
        spacing={44}
        initialSpacing={0}
        color1="rgba(157, 208, 48, 0.5)"
        color2="rgba(255, 57, 93, 0.5)"
        textColor1="green"
        dataPointsColor1="rgba(157, 208, 48, 0.5)"
        dataPointsColor2="rgba(255, 57, 93, 0.5)"
        startFillColor1="rgba(157, 208, 48, 1)"
        startFillColor2="rgba(255, 57, 93, 1)"
        startOpacity={0.8}
        endOpacity={0.3}
        hideAxesAndRules
      />
    </View>
  );
};

export default AreaGraph;
