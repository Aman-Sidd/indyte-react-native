import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import LargeText from '../../components/Text/LargeText';
import { FONTS } from '../../constants/Fonts';
import ScreenContainer from '../../components/container/ScreenContainer';
import { MONTHS } from '../../constants/Data';
import { useState } from 'react';
import DropdownPicker from '../../components/Utils/DropdownPicker';
import Calender from '../../../assets/icons/Calendar.svg';
import Group from '../../../assets/icons/Group.svg'
import Age from '../../../assets/icons/Age.svg'
import Weight from '../../../assets/icons/Weight.svg'
import Height from '../../../assets/icons/Height.svg'
import Gender from '../../../assets/icons/Gender.svg'
import Edit from '../../../assets/icons/Edit.svg';
import ProfileCard from '../../components/profile/ProfileCard';
import PrimaryButton from '../../components/Button/PrimaryButton';

function AddProgress(props) {
    const [month, setMonth] = useState(MONTHS[0])
    return (
        <ScreenContainer scroll>
            <LargeText style={styles.headingText}>Add Progress Photo</LargeText>
            <DropdownPicker
                data={MONTHS}
                value={month}
                setValue={setMonth}
                placeholder='Choose Month 2'
                icon={<Calender width={20} height={20} />}
            />
            {/* <View style={{ display: "flex", flexDirection: "row", marginTop: 20 }}>
                <Text style={{ color: "#7B6F72", fontFamily: FONTS.FONT_POPPINS_SEMIBOLD, fontSize: 16 }}>May</Text>
                <Text style={{ color: "#7B6F72", fontFamily: FONTS.FONT_POPPINS_SEMIBOLD, fontSize: 16, marginLeft: 260 }}>June</Text>
            </View> */}
            <View style={{ marginVertical: 20 }}>
                <Text style={{ color: "#7B6F72", fontSize: 16, fontFamily: FONTS.FONT_POPPINS_MEDIUM, textAlign: "center" }}>Front Facing</Text>
                <View style={{ display: "flex", flexDirection: "row" }}>
                    <Image source={require('../../../assets/images/GirlImage.png')} style={styles.Image} />
                    <Image source={require('../../../assets/images/GirlImage.png')} style={styles.Image} />
                </View>
                <Text style={{ color: "#7B6F72", fontSize: 16, fontFamily: FONTS.FONT_POPPINS_MEDIUM, textAlign: "center", marginTop: 20 }}>Back Facing</Text>
                <View style={{ display: "flex", flexDirection: "row" }}>
                    <Image source={require('../../../assets/images/GirlImage.png')} style={styles.Image} />
                    <Image source={require('../../../assets/images/GirlImage.png')} style={styles.Image} />
                </View>
                {/* <View style={styles.categoryContainer}>
                    <LargeText style={{marginTop:40,marginBottom:20,color:'black'}}>Your Progress</LargeText>
                    <Edit width={20} height={20} style={{top:10}}/>
                </View>
                <View style={{marginBottom:30}}>
                    <ProfileCard  type={"Blood Pressure"} value={"Vegan"} icon={<Group width={20} height={20}/>}/>
                    <ProfileCard  type={"Sugar"} value={"123 cm"} icon={<Age width={20} height={20}/>}/>
                    <ProfileCard  type={"Weight"} value={"65 Kg"} icon={<Weight width={20} height={20}/>}/>
                    <ProfileCard  type={"Height"} value={"162 cm"} icon={<Height width={20} height={20}/>}/>
                    <ProfileCard  type={"Self Added"} value={"Female"} icon={<Gender width={20} height={20}/>}/>
                </View> */}
                <View style={styles.btnContainer}>
                    <PrimaryButton
                        title={'Add to Progress'}
                    />
                </View>
            </View>
        </ScreenContainer>
    );
}
const styles = StyleSheet.create({
    headingText: {
        fontFamily: FONTS.FONT_POPPINS_BOLD,
        color: 'black',
        textAlign: 'center',
        marginBottom: 20
    },
    Image: {
        width: 150,
        height: 150,
        borderWidth: 1,
        margin: 10
    },
    categoryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingRight: 30
    },
    btnContainer: {
        paddingHorizontal: 10,
        paddingBottom: 15,
        marginTop: 150
    }
})
export default AddProgress;