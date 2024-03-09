import React, { useState, forwardRef, useRef, useImperativeHandle, useEffect } from 'react';
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    Modal,
    Button,
    Pressable,
    Image
} from 'react-native';
import SolidContainer from '../container/SolidContainer';
import TextH4 from '../Text/TextH4';
const { width } = Dimensions.get("window");

import Back from '../../../assets/icons/Back.svg'
import TwoDot from '../../../assets/icons/twodot.svg';
import TimeCircle from '../../../assets/icons/TimeCircle.svg';

import PrimaryButton from '../Button/PrimaryButton';
import TextMedium from '../Text/TextMedium';
import SmallText from '../Text/SmallText';
import { COLORS } from '../../constants/Colors';

const WorkoutSchedultCompleteModal = forwardRef((props, ref) => {
    const [showmodal, setShowModal] = useState(false);
    useImperativeHandle(ref, () => ({
        showScheduleModal() {
            setShowModal(true)
        }
    }));
    return (
        <Modal onRequestClose={() => setShowModal(false)} visible={showmodal} animationType='slide' transparent={true}>
            <View style={styles.modeOuter}>
                <View style={styles.innnerModel}>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <SolidContainer containerStyle={styles.solidContainerStyle}>
                            <Back width={16} height={16} />
                        </SolidContainer>
                        <View style={{ alignItems: "center" }}>
                            <TextH4 >Workout Schedule</TextH4>
                        </View>
                        <SolidContainer containerStyle={styles.solidContainerStyle}>
                            <TwoDot width={16} height={16} />
                        </SolidContainer>
                    </View>
                    <View style={{ padding: 20 }}>
                        <TextMedium>Lowerbody Workout</TextMedium>
                        <View style={{ flexDirection: "row" }}>
                            <TimeCircle width={20} height={20} />
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                                <SmallText>Today</SmallText>
                                <View style={{ height: 10, width: 1, backgroundColor: '#7B6F72', marginHorizontal: 5 }} />
                                <SmallText>03:00PMt</SmallText>
                            </View>
                        </View>
                    </View>
                    <PrimaryButton containerStyle={{ width: '100%', marginTop: 0 }} title={'Mark as Done'} onPress={() => console.log('Hello')} />
                </View>
            </View>
        </Modal>
    )
})
const styles = StyleSheet.create({
    modeOuter: {
        backgroundColor: '#000000aa',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    innnerModel: {
        backgroundColor: 'white',
        borderRadius: 16,
        width: width - 20,
        padding: 20,
        paddingVertical: 25,
        elevation: 10,
        shadowColor: "white"
    },
    solidContainerStyle: {
        borderRadius: 10,
        width: 32,
        height: 32,
        alignItems: "center",
        justifyContent: "center",
    },
})

export default WorkoutSchedultCompleteModal;