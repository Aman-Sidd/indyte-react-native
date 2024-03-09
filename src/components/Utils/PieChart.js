import { PieChart } from "react-native-gifted-charts";
import { FONTS } from "../../constants/Fonts";
import { COLORS } from "../../constants/Colors";


export default function CustomPieChart() {
  const pieData = [
    {value: 20, color:COLORS.SECONDARY_BUTTON_GRADIENT.PURPLE1,shiftX:3.5, shiftY: -5,text:20},
    {value: 80, color: 'white',text:""},
    ];
  
  return(
    <PieChart
      data={pieData}
      showText
      textColor="white"
      radius={50}
      textSize={16}
      focusOnPress
      showValuesAsLabels={false}
      font={FONTS.FONT_POPPINS_BOLD}
      
    />
  );
}