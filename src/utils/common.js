import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeDataInAsyncStorage = async (key, value) => {
  return new Promise(async (resolve, reject) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      resolve({[key]: value});
    } catch (e) {
      reject({message: 'Something went wrong', error: e});
    }
  });
};

export const getDataFromAsyncStorage = async key => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

export const removeFromAsyncStorage = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    // remove error
  }
};
export function getAge(dateString) {
  const today = new Date();
  const birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}
export function getTimeInAMPMFormat(date) {
  // Get hours and minutes from the Date object
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Determine if it's AM or PM
  const period = hours >= 12 ? 'pm' : 'am';

  // Convert hours from 24-hour format to 12-hour format
  const hours12 = hours % 12 || 12;

  // Format the time as 'Xam' or 'Xpm'
  const formattedTime = `${hours12}:${minutes
    .toString()
    .padStart(2, '0')}${period}`;

  return formattedTime;
}

export function formatDate(isoDateString) {
  const date = new Date(isoDateString);
  const day = date.getDate();
  const month = date.getMonth() + 1; // Note: Months are zero-based (0 = January)
  const year = date.getFullYear();

  // Format the date components into "d/m/yyyy" format
  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
}

export function dateFormat(isoDateString) {
  const date = new Date(isoDateString);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString();
  const day = date.getDate().toString();

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}
