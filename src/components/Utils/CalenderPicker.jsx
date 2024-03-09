import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

function CalenderPicker({setDate, label, width, setActualdate}) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = date => {
    const year = date.getFullYear();
    const month = 1 + date.getMonth();
    const day = date.getDate();
    const new_date = day + '/' + month + '/' + year;
    setActualdate(date);
    setDate(new_date);
    hideDatePicker();
  };
  return (
    <View style={{marginBottom: 15, width}}>
      <TouchableOpacity onPress={showDatePicker}>{label}</TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
}

export default CalenderPicker;
