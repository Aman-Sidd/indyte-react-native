import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import TextH4 from '../Text/TextH4'
import Check from '../auth/Check'
import TextMedium from '../Text/TextMedium'
import CheckBox from '@react-native-community/checkbox';

const NewGoalCard = ({ title, icon, bacckground, finalVal }) => {
    const [isSelected, setSelection] = useState(false);

    return (
        <View style={{ backgroundColor: bacckground, marginVertical: 10, borderRadius: 10, display: "flex", flexDirection: "row", width: "85%", alignItems: "center", paddingHorizontal: 15, paddingVertical: 20 }}>
            {
                icon
            }
            <TextMedium style={{ width: "70%", marginLeft: "5%", color: "white" }}>{title}</TextMedium>
            <View >
                <CheckBox
                    value={isSelected}
                    onValueChange={() => {
                        finalVal(title);
                        if (isSelected) {
                            setSelection(false)
                        }
                        else {
                            setSelection(true)
                        }
                    }}
                    style={{ height: 20, width: 35 }}

                />
            </View>
        </View>
    )
}

export default NewGoalCard

const styles = StyleSheet.create({})