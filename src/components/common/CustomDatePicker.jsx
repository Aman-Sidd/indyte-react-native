import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {MONTHS_NAME, WEEK_DAYS_NAMES} from '../../data/CalenderData';
import GradientContainer from '../container/GradientContainer';

import Back from '../../../assets/icons/Back.svg';
import moment from 'moment/moment';

let DECREASE = 'Decrease';
let INCREASE = 'Increase';
let NONE = 'None';

var SELECTED_MONTH_INDEX = 0;
const CustomDatePicker = ({showMonth = true, setDate, FetchMeal}) => {
  let newDayDateArray = [];
  const d = new Date();

  const [dateStateArray, setDateStateArray] = useState([]);
  const [monthStateArray, setMonthArray] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const [currentMonth, setCurrentMonth] = useState(null);
  const [year, setYear] = useState(new Date().getFullYear());
  const [contentOffset, setcontentOffset] = useState(1100.3333129882812);
  useEffect(() => {
    setMonthArray(MONTHS_NAME);
    var currentMonthsObject = MONTHS_NAME.filter(item => {
      return item.index === d.getMonth();
    });
    SELECTED_MONTH_INDEX = currentMonthsObject[0].index;
    setMonthAsSelected(SELECTED_MONTH_INDEX, NONE);
    setCurrentMonth(currentMonthsObject[0]);
    setSelectedDate(d.getDate());
    setAsSelected({
      date: d.getDate(),
      day: d.getDay(),
      id: 0,
      isSelected: true,
    });
  }, []);
  const setAsSelected = (dateObj, index) => {
    setDateStateArray(seletedDate =>
      seletedDate.map(item => {
        if (item.date === dateObj.date) {
          item.isSelected = true;
        } else {
          item.isSelected = false;
        }
        return item;
      }),
    );
    // console.log(new Date(year,currentMonth?.index,dateObj.date));
    setSelectedDate(dateObj.date);
  };
  const setMonthAsSelected = (monthIndex, buttonType) => {
    let currentYear = year;
    if (monthIndex > 0 && monthIndex < 11) {
      if (buttonType === DECREASE) {
        SELECTED_MONTH_INDEX--;
      } else if (buttonType === INCREASE) {
        SELECTED_MONTH_INDEX++;
      }
    }
    if (monthIndex === 0 && buttonType === INCREASE) {
      SELECTED_MONTH_INDEX++;
    }
    if (monthIndex === 11 && buttonType === DECREASE) {
      SELECTED_MONTH_INDEX--;
    }
    if (monthIndex === 0 && buttonType === DECREASE) {
      currentYear--;
      SELECTED_MONTH_INDEX = 11;
      setYear(currentYear);
    }
    if (monthIndex === 11 && buttonType === INCREASE) {
      currentYear++;
      SELECTED_MONTH_INDEX = 0;
      setYear(currentYear);
    }
    var currentMonthsObject = MONTHS_NAME.filter(item => {
      return item.index === SELECTED_MONTH_INDEX;
    });
    setSelectedMonth(currentMonthsObject[0].index);
    setMonthArray(seletedMonth =>
      seletedMonth.map(item => {
        if (item.name === currentMonthsObject[0].name) {
          item.isSelected = true;
        } else {
          item.isSelected = false;
        }
        return item;
      }),
    );
    getSelectDateMonth(currentYear, currentMonthsObject[0]);
  };
  // const getArrayDataSet = (dayName, dayIndex, monthName) => {
  //   newDayDateArray = [];
  //   let isLooping = dayIndex;
  //   for (let i = 0; i < monthName.limit; i++) {
  //     if (isLooping === 7) {
  //       isLooping = 0;
  //     }
  //     newDayDateArray.push({
  //       id: i,
  //       date: i + 1,
  //       day: WEEK_DAYS_NAMES[isLooping],
  //       isSelected: false,
  //     });
  //     isLooping++;
  //   }
  //   setSelectedMonth(monthName.index);
  //   setDateStateArray(newDayDateArray);
  // };
  const getArrayDataSet = (dayName, dayIndex, monthName) => {
    newDayDateArray = [];
    let isLooping = dayIndex;
    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

    // Adjust February days for leap years
    const daysInFebruary =
      monthName.index === 1 && isLeapYear ? 29 : monthName.limit;

    for (let i = 0; i < daysInFebruary; i++) {
      if (isLooping === 7) {
        isLooping = 0;
      }

      newDayDateArray.push({
        id: i,
        date: i + 1,
        day: WEEK_DAYS_NAMES[isLooping],
        isSelected: false,
      });
      isLooping++;
    }
    setSelectedMonth(monthName.index);
    setDateStateArray(newDayDateArray);
  };

  const getSelectDateMonth = (year, monthName) => {
    function getFirstDayOfMonth(year, month) {
      return new Date(year, month, 1);
    }
    const firstDayIndex = getFirstDayOfMonth(year, monthName.index);
    getArrayDataSet(
      WEEK_DAYS_NAMES[firstDayIndex.getDay()],
      firstDayIndex.getDay(),
      monthName,
    );
  };

  const SetDateIndex = () => {
    // console.log('====================================');
    // console.log(moment(d).format('DD'), "DDDDDDDDDDDDDDDDDDDATE");
    // console.log('====================================');
    if (moment(d).format('DD') < 10) {
      if (moment(d).format('DD') <= 5) {
        setcontentOffset(0.3333129882812);
      } else {
        setcontentOffset(250.3333129882812);
      }
    } else if (moment(d).format('DD') < 20) {
      if (moment(d).format('DD') <= 15) {
        setcontentOffset(550.3333129882812);
      } else {
        setcontentOffset(800.3333129882812);
      }
    } else {
      if (moment(d).format('DD') <= 25) {
        setcontentOffset(2500.3333129882812);
      } else {
        setcontentOffset(2900.3333129882812);
      }
    }
  };
  useEffect(() => {
    SetDateIndex();
  }, []);

  return (
    <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
      {showMonth && (
        <View
          style={{
            flexDirection: 'row',
            padding: 10,
            alignItems: 'center',
            alignSelf: 'center',
            paddingVertical: 20,
          }}>
          <TouchableOpacity
            onPress={() => {
              setMonthAsSelected(SELECTED_MONTH_INDEX, DECREASE);
            }}>
            <Back width={30} height={30} />
          </TouchableOpacity>
          <Text
            style={[
              {
                fontWeight: 'bold',
                fontSize: 18,
                color: 'rgba(173, 164, 165, 1)',
                marginHorizontal: 10,
              },
            ]}>
            {MONTHS_NAME[selectedMonth]?.name} {year}
          </Text>
          <TouchableOpacity
            style={{transform: [{rotateZ: '180deg'}]}}
            onPress={() => setMonthAsSelected(SELECTED_MONTH_INDEX, INCREASE)}>
            <Back width={30} height={30} />
          </TouchableOpacity>
        </View>
      )}
      <ScrollView
        style={styles.container}
        horizontal={true}
        zIndex={-5}
        contentOffset={{x: contentOffset, y: contentOffset}}>
        {dateStateArray.length === 0
          ? null
          : dateStateArray.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setAsSelected(item, index);
                  // setDate(`${year}-${currentMonth.index + 1}-${item.date}`);

                  FetchMeal(
                    `${year}-${
                      currentMonth.index < 9
                        ? '0' + (currentMonth.index + 1).toString()
                        : currentMonth.index
                    }-${
                      item.date < 9 ? '0' + item.date.toString() : item.date
                    }`,
                  );
                }}>
                <GradientContainer
                  colors={
                    item.isSelected
                      ? ['rgba(146, 163, 253, 1)', 'rgba(157, 206, 255, 1)']
                      : ['rgba(247, 248, 248, 1)', 'rgba(247, 248, 248, 1)']
                  }
                  styles={styles.dateDayContainer}>
                  <Text
                    style={[
                      {fontWeight: 'bold', fontSize: 13},
                      item.isSelected
                        ? {color: 'white'}
                        : {color: 'rgba(173, 164, 165, 1)'},
                    ]}>
                    {item.day}
                  </Text>
                  <Text
                    style={[
                      {fontWeight: 'bold', fontSize: 20},
                      item.isSelected
                        ? {color: 'white'}
                        : {color: 'rgba(173, 164, 165, 1)'},
                    ]}>
                    {item.date}
                  </Text>
                </GradientContainer>
              </TouchableOpacity>
            ))}
      </ScrollView>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  dateDayContainer: {
    width: 70,
    paddingHorizontal: 5,
    paddingVertical: 15,
    margin: 4,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 85,
  },
  monthBox: {
    width: 50,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -5,
    },
    shadowOpacity: 0.58,
    shadowRadius: 20.0,
    elevation: 5,
  },
});
export default CustomDatePicker;
