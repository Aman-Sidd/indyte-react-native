import { View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import { FONTS } from '../../constants/Fonts'
// import { Slider } from 'react-native-awesome-slider'
import { useSharedValue } from 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Slider } from '@react-native-assets/slider'

export default function VoiceMessage({name,startValue,endValue}) {
    const [sliderValue, setSliderValue] = useState(1.01);

    const handleSliderChange = (value) => {
        setSliderValue(value);
    };

    return (
        <View style={{ backgroundColor: "#E8EBF2", padding: 20, marginTop: 20, marginBottom: 30, borderRadius: 20 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 15, marginBottom: 20 }}>
                    <Image source={require("../../../assets/images/VoiceMessage.png")} />
                    <View>
                        <Text style={{ fontFamily: FONTS.FONT_POPPINS_BOLD, fontSize: 16, color: "#0D121C", lineHeight: 20 }}>Voice Message</Text>
                        <Text style={{ fontFamily: FONTS.FONT_POPPINS_REGULAR, fontSize: 14, color: "#4D5E99" }}>{name}</Text>
                    </View>
                </View>
                <Image source={require("../../../assets/images/VoiceMessagePlay.png")} />
            </View>
            <View style={{ marginHorizontal: 10 }}>
                <Slider
                    value={sliderValue}
                    minimumValue={startValue}
                    maximumValue={endValue}
                    step={0.01}
                    minimumTrackTintColor='blue'
                    maximumTrackTintColor='#b3b3ff'
                    thumbTintColor='blue'
                    thumbStyle={undefined}
                    trackStyle={undefined}
                    minTrackStyle={undefined}
                    maxTrackStyle={undefined}
                    vertical={false}
                    inverted={false}
                    enabled={true}
                    trackHeight={4}
                    thumbSize={15}
                    thumbImage={undefined}
                    slideOnTap={true}
                    onValueChange={handleSliderChange}
                    onSlidingStart={undefined}
                    onSlidingComplete={undefined}
                    CustomThumb={undefined}
                    CustomMark={undefined}
                />
                <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                    <Text style={{ color: "#4D5E99", fontFamily: FONTS.FONT_POPPINS_MEDIUM, fontSize: 14 }}>{sliderValue}</Text>
                    <Text style={{ color: "#4D5E99", fontFamily: FONTS.FONT_POPPINS_MEDIUM, fontSize: 14 }}>2.23</Text>
                </View>
            </View>
        </View>
    )
}