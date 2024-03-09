import React, {useState} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

function TimePicker({setTime, label, label2}) {
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };
  const handleConfirm = time => {
    setTime({hr: time.getHours(), min: time.getMinutes()});
    hideTimePicker();
  };
  return (
    <View style={{marginBottom: 15, width: '100%'}}>
      <TouchableOpacity
        onPress={showTimePicker}
        style={{justifyContent: 'space-between'}}>
        <View>{label}</View>
        {label2 && (
          <View style={{position: 'absolute', right: 10, top: 20}}>
            <Text style={{color: 'black', fontWeight: '600'}}>{label2}</Text>
          </View>
        )}
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideTimePicker}
      />
    </View>
  );
}

export default TimePicker;
