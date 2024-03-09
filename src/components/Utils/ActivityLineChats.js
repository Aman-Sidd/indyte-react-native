import {LineChart} from 'react-native-gifted-charts';
import {Dimensions, View} from 'react-native';

const ActivitylineChats = () => {
  const breakfast = [
    {value: 0, dataPointText: '0'},
    {value: 10, dataPointText: '10'},
    {value: 58, dataPointText: '58'},
    {value: 78, dataPointText: '78'},
  ];

  const lunch = [
    {value: 0, dataPointText: '0'},
    {value: 20, dataPointText: '20'},
    {value: 70, dataPointText: '70'},
    {value: 60, dataPointText: '60'},
  ];
  // const dinner = [
  //     {value: 0, dataPointText: '0'},
  //     {value: 15, dataPointText: '20'},
  //     {value: 36, dataPointText: '36'},
  //     {value: 80, dataPointText: '80'},
  // ];
  // const other = [
  //     {value: 0, dataPointText: '0'},
  //     {value: 10, dataPointText: '10'},
  //     {value: 20, dataPointText: '20'},
  //     {value: 50, dataPointText: '50'},
  // ];
  return (
    <View>
      <LineChart
        curved
        data={breakfast}
        data2={lunch}
        // data3={dinner}
        // data4={other}

        height={200}
        showVerticalLines
        initialSpacing={0}
        color1="rgba(255, 57, 93, 1)"
        color2="rgba(157, 208, 48, 1)"
        // color3="rgba(57, 172, 255, 1)"
        // color4="rgba(132, 57, 255, 1)"

        dataPointsHeight={6}
        dataPointsWidth={6}
        dataPointsColor1="rgba(157, 208, 48, 1)"
        dataPointsColor2="rgba(25, 184, 136, 1)"
        dataPointsColor3="rgba(57, 172, 255, 1)"
        dataPointsColor4="rgba(132, 57, 255, 1)"
        textFontSize={13}
        width={Dimensions.get('window').width - 150}
        xAxisThickness={0}
        yAxisThickness={0}
        xAxisLabelTextStyle={{color: 'transparent'}}
        yAxisTextStyle={{color: 'transparent'}}
        thickness1={3}
        thickness2={3}
        thickness3={3}
        thickness4={3}
      />
    </View>
  );
};

export default ActivitylineChats;
