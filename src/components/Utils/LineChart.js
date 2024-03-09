import {LineChart, yAxisSides} from 'react-native-gifted-charts';
import {COLORS} from '../../constants/Colors';
import {FONTS} from '../../constants/Fonts';

function AnimatedLineChart({
  labelStyleX,
  labelStyleY,
  width,
  height,
  color = COLORS.PRIMARY_BUTTON_GRADIENT.BLUE1,
  data = [
    {value: 10, label: 'Sun'},
    {value: 50, label: 'Mon'},
    {value: 10, label: 'Tue'},
    {value: 20, label: 'Wed'},
    {value: 10, label: 'Thr'},
    {value: 50, label: 'Fri'},
    {value: 50, label: 'Sat'},
  ],
  hideRules = false,
}) {
  return (
    <LineChart
      curved
      data={data}
      scrollToEnd
      width={width}
      height={height}
      isAnimated
      xAxisLabelTextStyle={{
        color: '#7B6F72',
        fontFamily: FONTS.FONT_POPPINS_MEDIUM,
        ...labelStyleX,
      }}
      hideRules={hideRules}
      yAxisSide={'right'}
      yAxisTextStyle={{
        color: 'black',
        fontFamily: FONTS.FONT_POPPINS_MEDIUM,
        ...labelStyleY,
      }}
      xAxisThickness={0}
      yAxisThickness={0}
      thickness1={3}
      color1={color}
    />
  );
}

export default AnimatedLineChart;
