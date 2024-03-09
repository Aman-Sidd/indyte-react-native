import axios from 'axios';
import {getDataFromAsyncStorage} from '../utils/common';
import {apiSlice} from '../store/apiSlice';
const baseURL = 'https://indyte-backend.vercel.app';

const api = axios.create({baseURL});
// api.interceptors.request.use(
//   async config => {
//     // Fetch the token from AsyncStorage
//     const token = await getDataFromAsyncStorage('access_token');
//     // If a token exists, add it to the headers
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   error => {
//     // Handle errors here if needed
//     return Promise.reject(error);
//   },
// );

export const generateOTPPhone = data => {
  return api.post('/api/auth/otplogin', data);
};

export const userLogin = data => {
  return api.post('/api/auth/login', data);
};

export const verifyOTPPhone = data => {
  return api.post('/api/auth/verifylogin', data);
};

export const registerGenerateOTP = data => {
  return api.post('/api/auth/register', data);
};

export const registerVerifyOTP = data => {
  return api.post('/api/auth/registerverify', data);
};

export const getProfileDetails = async () => {
  try {
    // Fetch the token from AsyncStorage
    const token = await getDataFromAsyncStorage('access_token');

    const headers = {
      Authorization: token,
    };
    // Make the API call with the headers
    const response = await api.get('/api/profile', {headers});
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateProfileDetails = async (id, body) => {
  try {
    // Fetch the token from AsyncStorage
    const token = await getDataFromAsyncStorage('access_token');

    const headers = {
      Authorization: token,
    };
    // Make the API call with the headers
    const response = await api.put(`/api/profile/${id}`, body, {headers});
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserMealDetails = async userid => {
  return api.get(`/api/getusermeals?userId=${userid}`);
};

export const markFinishedMeal = async data => {
  return api.post('/api/markfinished', data);
};

export const getUserMealsByDay = async (userid, date) => {
  return api.get(`/api/getusermealsbydate?userId=${userid}&date=${date}`);
};

export const getUserMealLogByDate = async (userid, date) => {
  return api.get(`/api/getusermeallogbyday?userId=${userid}&date=${date}`);
};

export const postWaterIntake = async data => {
  return api.post('/api/water-intake', data);
};

export const getWaterLog = async (userid, date) => {
  return api.get(`/api/water-logs/${userid}/${date}`);
};

export const deleteWaterIntake = async id => {
  return api.delete(`/api/water-delete/${id}`);
};

export const spleepIntake = async data => {
  return api.post('/api/sleep-intake', data);
};

export const getSleepLog = async (userid, date) => {
  return api.get(`/api/sleep-logs/${userid}/${date}`);
};

export const getUserWorkouts = async (userid, date) => {
  return api.get(`/api/getworkoutfordate?userId=${userid}&date=${date}`);
};

export const markWorkoutFinished = async body => {
  return api.post('/api/markfinishedworkout', body);
};

export const getWeightLogs = async userid => {
  return api.get(`/api/get-weight-logs/${userid}`);
};

export const createWeightLog = async (userid, data) => {
  return api.post(`/api/weight-logs/${userid}`, data);
};

export const getMedicineRemainder = async (userid, date) => {
  return api.get(`api/getmedicines?userId=${userid}&date=${date}`);
};

export const createMedicineRemainder = async data => {
  return api.post(`/api/createmedicine`, data);
};

export const markMedicineFinished = async data => {
  return api.post(`/api/markmedicinetaken`, data);
};

export const getDailyWorkoutProgress = async (userid, date) => {
  return api.get(`/api/getdailyworkoutprogress?userId=${userid}&date=${date}`);
};

export const getWeeklyWorkoutProgress = async userid => {
  return api.get(`/api/getweeklyworkoutprogress?userId=${userid}`);
};
export const getMonthlyWorkoutProgress = async userid => {
  return api.get(`/api/getmonthlyworkoutprogress?userId=${userid}`);
};

export const getYearlyWorkoutProgress = async (userid, year) => {
  return api.get(`/api/getyearlyworkoutprogress?userId=${userid}&year=${year}`);
};

export const getDailyDietProgress = async (userid, date) => {
  return api.get(`/api/getdailydietprogress?userId=${userid}&date=${date}`);
};
export const getWeeklyDietProgress = async userid => {
  return api.get(`/api/getweeklydietprogress?userId=${userid}`);
};

export const getyearlydietprogress = async (userid, year) => {
  return api.get(`/api/getyearlydietprogress?userId=${userid}&year=${year}`);
};

export const getLastWeekWaterProgress = async userid => {
  return api.get(`/api/getlastweekwaterprogress?userId=${userid}`);
};

export const getLastMonthWaterProgress = async userid => {
  return api.get(`/api/getlastmonthwaterprogress?userId=${userid}`);
};

export const getLastWeekSleepProgress = async userid => {
  return api.get(`/api/getlastweeksleepprogress?userId=${userid}`);
};
export const getLastMonthSleepProgress = async userid => {
  return api.get(`/api/getlastmonthsleepprogress?userId=${userid}`);
};

export const getLastWeekWeightProgress = async userid => {
  return api.get(`/api/getlastweekweightprogress?userId=${userid}`);
};

export const forgotPassword = async body => {
  return api.post(`/api/auth/forgetpass`, body);
};

export const verifyPassword = async body => {
  return api.post(`/api/auth/resetpass`, body);
};

export const getDieticians = async () => {
  return api.get('/api/getdiet');
};
