import { StyleSheet, Text, View, Dimensions } from 'react-native';
import React, { useContext, useState } from 'react';
import Header from '../../components/header/Header';
import Input from '../../components/Form/Input';
import Email from '../../../assets/icons/email.svg';
import FormLabel from '../../components/profile/FormLabel';
import { ScrollView } from 'react-native';
import TextMedium from '../../components/Text/TextMedium';
import PrimaryButton from '../../components/Button/PrimaryButton';
import { GlobalContext } from '../../../App';
import { useSelector } from 'react-redux';
const { height, width } = Dimensions.get("window");
const AdditionalInfo = () => {
  const user = useSelector((state)=>state.user.user)
    console.log('====================================');
    console.log(user, 'USER');
    console.log('====================================');
    const [Name, setName] = useState(null);
    const [Height, setHeight] = useState(user.height ? user.height : 50);
    const [Weight, setWeight] = useState(
        user?.intial_weight ? user?.intial_weight : null,
    );
    const [Age, setAge] = useState(null);
    const [Waist, setWaist] = useState(null);
    const [LifeStyle, setLifeStyle] = useState(null);
    const [DietaryHabits, setDietaryHabits] = useState(null);
    const [Dislikes, setDislikes] = useState(user?.food_dislikes ? user?.food_dislikes : null);
    const [FoodAllergy, setFoodAllergy] = useState(null);
    const [PhysicalActivity, setPhysicalActivity] = useState(null);
    const [MedicalActivity, setMedicalActivity] = useState(user?.medical_history ? user?.medical_history : null);
    const [AnyHerbs, setAnyHerbs] = useState(user?.supplements_or_herbs ? user?.supplements_or_herbs : null);
    const [SkipMeal, setSkipMeal] = useState(null);
    const [FastFood, setFastFood] = useState(null);
    const [OfficeTiming, setOfficeTiming] = useState(user?.office_timing ? user?.office_timing : null);
    const [Occupation, setOccupation] = useState(user?.occupation ? user?.occupation : null);
    const [EmailId, setEmailId] = useState(null);
    const [Location, setLocation] = useState(user?.location ? user?.location : null);
    const [HealthGoals, setHealthGoals] = useState(null);
    return (
        <>
            <View style={styles.AddiitonalInfoView}>
                <Header title="Additional Info" />
                <ScrollView style={{ marginBottom: '30%' }}>
                    {/* <View style={{ alignItems: 'center', marginVertical: 10 }}>
                        <TextMedium>
                            Please Fill all the information for better health
                        </TextMedium>
                    </View> */}
                    <View style={{ marginHorizontal: 20, padding: 7 }}>
                        {/* <View style={styles.InputView}>
                            <Input editable={false} placeholder={"Name"} onChangeText={(value) => setName(value)} customStyle={{ borderColor: '#92A3FD', borderWidth: 1 }} />
                        </View>
                        <View style={styles.InputView}>
                            <Input editable={false} placeholder={"Email id"} onChangeText={(value) => setEmailId(value)} customStyle={{ borderColor: '#92A3FD', borderWidth: 1 }} />
                        </View> */}
                        <View style={styles.InputView}>
                            <Input
                                value={`Age : ${JSON.stringify(Height)}`}
                                placeholder={'Height (in ft)'}
                                onChangeText={value => setHeight(value)}
                                customStyle={{ borderColor: '#92A3FD', borderWidth: 1 }}
                                keyboardType="numeric"
                            />
                        </View>
                        <View style={styles.InputView}>
                            <Input
                                value={`Weight : ${JSON.stringify(Weight)}`}
                                editable={false}
                                placeholder={'Weight (in kg)'}
                                onChangeText={value => setWeight(value)}
                                customStyle={{ borderColor: '#92A3FD', borderWidth: 1 }}
                                keyboardType="numeric"
                            />
                        </View>
                        {/* <View style={styles.InputView}>
                            <Input
                                editable={false}
                                placeholder={'Age'}
                                onChangeText={value => setAge(value)}
                                customStyle={{ borderColor: '#92A3FD', borderWidth: 1 }}
                                keyboardType="numeric"
                            />
                        </View> */}
                        {/* <View style={styles.InputView}>
                            <Input
                                editable={false}
                                placeholder={'Waist (in cm)'}
                                onChangeText={value => setWaist(value)}
                                customStyle={{ borderColor: '#92A3FD', borderWidth: 1 }}
                                keyboardType="numeric"
                            />
                        </View> */}
                        {/* <View style={styles.InputView}>
                            <Input
                                editable={false}
                                placeholder={'LifeStyle'}
                                onChangeText={value => setLifeStyle(value)}
                                customStyle={{ borderColor: '#92A3FD', borderWidth: 1 }}
                            /> */}
                        {/* </View> */}
                        {/* <View style={styles.InputView}>
                            <Input
                                editable={false}
                                placeholder={'Dietary habits'}
                                onChangeText={value => setDietaryHabits(value)}
                                customStyle={{ borderColor: '#92A3FD', borderWidth: 1 }}
                            />
                        </View> */}
                        <View style={styles.InputView}>
                            <Input
                                value={`Any Dislike : ${Dislikes[0]}`}
                                editable={false}
                                placeholder={'Dislikes'}
                                onChangeText={value => setDislikes(value)}
                                customStyle={{ borderColor: '#92A3FD', borderWidth: 1 }}
                            />
                        </View>
                        {/* <View style={styles.InputView}>
                            <Input
                                editable={false}
                                placeholder={'Any Food Allergy'}
                                onChangeText={value => setFoodAllergy(value)}
                                customStyle={{ borderColor: '#92A3FD', borderWidth: 1 }}
                            />
                        </View> */}
                        {/* <View style={styles.InputView}>
                            <Input
                                value={JSON.stringify(PhysicalActivity)}
                                editable={false}
                                placeholder={'Physical Activity'}
                                onChangeText={value => setPhysicalActivity(value)}
                                customStyle={{ borderColor: '#92A3FD', borderWidth: 1 }}
                            />
                        </View> */}
                        <View style={styles.InputView}>
                            <Input
                                value={`Medical History : ${MedicalActivity}`}
                                editable={false}
                                placeholder={'Any Medical History'}
                                onChangeText={value => setMedicalActivity(value)}
                                customStyle={{ borderColor: '#92A3FD', borderWidth: 1 }}
                            />
                        </View>
                        <View style={styles.InputView}>
                            <FormLabel labelName={'Do you take any supplements or herbs ?'} />
                            <Input
                                value={`${AnyHerbs}`}
                                editable={false}
                                placeholder={'Yes or No'}
                                onChangeText={value => setAnyHerbs(value)}
                                customStyle={{ borderColor: '#92A3FD', borderWidth: 1 }}
                            />
                        </View>
                        {/* <View style={styles.InputView}>
                            <FormLabel labelName={'Do you skip your meal ?'} />
                            <Input
                                editable={false}
                                placeholder={'Yes or No'}
                                onChangeText={value => setSkipMeal(value)}
                                customStyle={{ borderColor: '#92A3FD', borderWidth: 1 }}
                            />
                        </View> */}
                        {/* <View style={styles.InputView}>
                            <FormLabel
                                labelName={'Fast Food or any outer food frequency ?'}
                            />
                            <Input
                                editable={false}
                                placeholder={'Yes or No'}
                                onChangeText={value => setFastFood(value)}
                                customStyle={{ borderColor: '#92A3FD', borderWidth: 1 }}
                            />
                        </View> */}
                        <View style={styles.InputView}>
                            <Input
                                value={`Office Timing : ${OfficeTiming}`}
                                editable={false}
                                placeholder={'Office Timing (eg 9AM to 6PM)'}
                                onChangeText={value => setOfficeTiming(value)}
                                customStyle={{ borderColor: '#92A3FD', borderWidth: 1 }}
                            />
                        </View>
                        <View style={styles.InputView}>
                            <Input
                                value={`Occupation: ${Occupation}`}
                                editable={false}
                                placeholder={'Occupation'}
                                onChangeText={value => setOccupation(value)}
                                customStyle={{ borderColor: '#92A3FD', borderWidth: 1 }}
                            />
                        </View>

                        <View style={styles.InputView}>
                            <Input
                                value={`Location : ${Location}`}
                                editable={false}
                                placeholder={'Location'}
                                onChangeText={value => setLocation(value)}
                                customStyle={{ borderColor: '#92A3FD', borderWidth: 1 }}
                            />
                        </View>
                        <View style={styles.InputView}>
                            <Input
                                value={`Goal : ${user?.goal}`}
                                editable={false}
                                placeholder={' Health Goals'}
                                onChangeText={value => setHealthGoals(value)}
                                customStyle={{ borderColor: '#92A3FD', borderWidth: 1 }}
                            />
                        </View>
                        {/* <View style={styles.InputView}>
                            <PrimaryButton
                                title={'Submit Infomation'}
                                onPress={() => {
                                    console.log('hi');
                                }}
                            />
                        </View> */}
                    </View>
                </ScrollView >
            </View >
        </>
    );
};

export default AdditionalInfo;

const styles = StyleSheet.create({
    AddiitonalInfoView: {
        backgroundColor: 'white',
        height: height,
    },
    InputView: {
        marginVertical: 10,
    },
});
