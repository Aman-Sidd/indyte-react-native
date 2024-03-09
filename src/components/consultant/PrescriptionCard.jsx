import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { FONTS } from '../../constants/Fonts'
import SmallText from '../Text/SmallText';
const { width, height } = Dimensions.get('window');


export default function PrescriptionCard({ name, dose, price, decimalPrice }) {
    const [count, setCount] = useState(1);

    return (
        <View style={{ paddingHorizontal: 10, marginVertical: 6, marginHorizontal: 20, backgroundColor: "#ECF2FF", borderRadius: 30, alignItems: "center", flexDirection: 'row' }}>
            <View style={{ alignItems: "flex-start" }}>
                <Image style={{ height: 90, borderRadius: 30, width: width / 4 }} source={require("../../../assets/images/prescribedMed.png")} />
            </View>
            <View style={{ justifyContent: "space-between", flexDirection: "column", gap: 10, marginLeft: 10, flex: 1 }}>
                <View style={{}}>
                    <Text style={{ fontFamily: FONTS.FONT_POPPINS_MEDIUM, color: "#343965", fontSize: 14 }}>
                        {name}
                    </Text>
                    <Text style={{ fontFamily: FONTS.FONT_POPPINS_REGULAR, color: "#9a9cb2", fontSize: 12 }}>
                        {dose}
                    </Text>
                </View>
                <View>
                    <Text style={{ color: "#343965", fontFamily: FONTS.FONT_POPPINS_SEMIBOLD }}>${price}.<SmallText style={{ color: "#343965" }}>{decimalPrice}</SmallText></Text>
                </View>
            </View>
            <View style={{ padding: 15, paddingRight: 8, gap: 40, alignItems: "flex-end", justifyContent: "flex-end" }}>
                <TouchableOpacity>
                    <Image source={require("../../../assets/images/wishlist.png")} />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', gap: 8 }}>
                    <TouchableOpacity onPress={() => setCount(count - 1)}>
                        <Text style={{ borderColor: "#343965", borderWidth: 1, width: width / 12, textAlign: "center", borderRadius: 20, color: "#343965" }}>-</Text>
                    </TouchableOpacity>
                    <Text>{count}</Text>
                    <TouchableOpacity onPress={() => setCount(count + 1)}>
                        <Text style={{ borderColor: "#343965", borderWidth: 1, width: width / 12, textAlign: "center", borderRadius: 20, color: "white", backgroundColor: "#343965" }}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}