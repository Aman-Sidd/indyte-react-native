import { LineChart } from "react-native-gifted-charts"
import { COLORS } from "../../constants/Colors";

export default function LineGraphWithoutLabel(){
  const lineData = [
    {value: 0},{value: 20},
    {value: 10},{value: 15},
    {value: 10},{value: 30},
    {value: 54},{value: 45},
    {value: 24},{value: 45},
    {value: 34},{value: 45},
    ]
  return (
      
          <LineChart
              initialSpacing={0}
              isAnimated
              areaChart
              data={lineData}
              spacing={30}
            //   hideDataPoints
              width={320}
              height={150}
              thickness={3}
              pressEnabled
              scrollToEnd
              hideRules={false}
              hideYAxisText
              verticalLinesColor="rgba(14,164,164,0.5)"
              xAxisThickness={0}
              yAxisThickness={0}
              color={COLORS.PRIMARY_BUTTON_GRADIENT.BLUE2}
              startFillColor={'rgb(84,219,234)'}
              endFillColor={'rgb(84,219,234)'}
              startOpacity={0.2}
              endOpacity={0.0}
              showDataPointOnPress={true}
              onPress={()=>console.log("Hello")}
          />
      
  );
};