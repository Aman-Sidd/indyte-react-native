// import { fetch } from 'react-native-ssl-pinning';
import { storageKeyName } from '../constants/Data';
import { getDataFromAsyncStorage } from '../utils/common';

const baseURL = 'https://13.127.229.77/api';
async function getBaseHeaders() {
  const baseHeaders = {
    Accept: 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    e_platform: 'mobile',
  };
  const jwt = await getDataFromAsyncStorage(storageKeyName);
  baseHeaders['Authorization'] = `Bearer ${jwt}`;
  return baseHeaders;
}

export async function generateRequest(url, method, body, headers = {}) {
  const config = {
    method: method,
    sslPinning: {
      certs: ['certificat'],
    },
    headers: { ...(await getBaseHeaders()), ...headers },
  };
  if ((method === 'POST' || method === 'PUT' || method === 'DELETE') && body)
    config.body = body;

  return new Promise(async (resolve, reject) => {
    try {
      // let result = await fetch(baseURL + url, config);
      const data = JSON.parse("");
      resolve(data);
    } catch (err) {
      const error = JSON.parse(err.bodyString);
      reject(error);
    }
  });
}

export async function getOtp(phone) {
  const data = new FormData();
  data.append('phone', phone);
  return await generateRequest('/sendotp', 'POST', data);
}
export async function registerUser(user) {
  console.log(user.datas, 'I ammm');
  const data = new FormData();
  data.append('hash', user?.datas?.hash);
  data.append('otp', user?.datas?.otp);
  data.append('phone', user?.datas?.phone);
  data.append('email', user?.datas?.email);
  data.append('full_name', user?.datas?.full_name);
  // data.append('last_name', user?.datas?.last_name);
  data.append('password', user?.datas?.password);
  data.append('gender', user?.datas?.gender);
  data.append('dob', user?.datas?.dob);
  data.append('weight', user?.datas?.weight);
  data.append('weight_unit', user?.datas?.weight_unit);
  data.append('height', user?.datas?.height);
  // data.append('height_unit', user?.datas?.height_unit);
  data.append('goal', user?.datas?.goal);
  data.append('goal_weight', user?.datas?.goal_weight);
  data.append('profile_image', user?.datas?.profile_image);
  data.append('current_weight', user?.datas?.current_weight);
  data.append('height_unit', user?.datas?.height_unit);

  console.log(data, 'i amd');
  // console.log(user.profile_image, "I am pro");

  return await generateRequest('/register-user', 'POST', data);
  // const res =  await generateRequest('/register-user', 'POST', data);
  // console.log(res)
}
export async function loginUser(credentials) {
  const data = new FormData();
  data.append('email', credentials.email);
  data.append('password', credentials.password);
  return await generateRequest('/login', 'POST', data);
}
export async function getUser() {
  return await generateRequest('/get-user-detail', 'GET');
}
export async function updateUser(updateUser) {
  // return console.log('test', updateUser)
  console.log('test', updateUser)
  const data = new FormData();
  data.append('full_name', updateUser?.first_name || updateUser?.full_name);
  // data.append('last_name', updateUser?.last_name);
  data.append('gender', updateUser?.gender);
  data.append('dob', updateUser?.dob);
  data.append('current_weight', updateUser?.current_weight?.toString());
  data.append('height', updateUser?.height?.toString());
  data.append('height_unit', updateUser?.height_unit);
  data.append('weight_unit', updateUser?.weight_unit);
  data.append('goal', updateUser?.goal);
  console.log(data, 'i amd');
  // return
  if (updateUser.profile_image)
    data.append('profile_image', updateUser?.profile_image);
  return await generateRequest('/update-user-profile', 'PUT', data);
}
export async function getUserRecommendedMeal(date) {
  // return await generateRequest("/get-assigned-Meal/","GET");
  return await generateRequest(
    '/get-assigned-Meal?type=date&value=' + date,
    'GET',
  );
}
export async function getMealDetails(id) {
  // return await generateRequest('/fetch-meal/' + id);
}
export async function forgotPassword(info) {
  const data = new FormData();
  data.append('phone', info.phone);
  data.append('hash', info.hash);
  data.append('otp', info.otp);
  data.append('email', info.email);
  data.append('password', info.password);
  data.append('confirm_password', info.confirmPassword);
  return await generateRequest('/forget-password', 'PUT', data);
}

export async function Updatemeal(info, mealid) {
  const data = new FormData();
  data.append('user_picked', 'true');
  data.append('comment', info.Comment);
  data.append('rating', info.Rat);
  data.append('meal_image_proof', info.Image);
  console.log(data, 'I AM DATA');
  return await generateRequest(
    `/update-assigned-Meal-status/${mealid}`,
    'POST',
    data,
  );
}
export async function Updatemealskip(mealid) {
  const data = new FormData();
  data.append('user_skip', 'false');
  console.log(data, 'I AM DATA');
  return await generateRequest(
    `/update-assigned-Meal-status/${mealid}`,
    'POST',
    data,
  );
}

export async function SendOTP(phone, type) {
  const data = new FormData();
  data.append('phone', phone);
  data.append('type', type);
  return await generateRequest('/sendotp', 'POST', data);
}

export async function updateSideProf(updateUser) {
  // return console.log('test', updateUser)
  console.log('====================================');
  console.log(updateUser, 'UOUSEE');
  console.log('====================================');
  const data = new FormData();
  data.append('food_dislikes', updateUser?.food_dislikes);
  data.append('medical_history', updateUser?.medical_history);
  data.append('supplements_or_herbs', updateUser?.supplements_or_herbs);
  data.append('occupation', updateUser?.occupation);
  data.append('office_timing', updateUser?.office_timing?.toString());
  data.append('location', updateUser?.location?.toString());
  // data.append('goal', updateUser?.goal);
  console.log(data, 'i amd');
  if (updateUser.profile_image)
    data.append('profile_image', updateUser?.profile_image);
  return await generateRequest('/update-user-profile', 'PUT', data);
}

export async function VerifyOtp(phone, otp, hash) {
  console.log('====================================');
  console.log(phone, otp, hash);
  console.log('====================================');
  const data = new FormData();
  data.append('phone', phone);
  data.append('otp', otp);
  data.append('hash', hash);

  return await generateRequest('/verify-otp-for-login', 'POST', data);
}

export async function SendOTPLogin(phone) {
  console.log('====================================');
  console.log(phone);
  console.log('====================================');
  const data = new FormData();
  data.append('phone', phone);

  return await generateRequest('/send-otp-for-login', 'POST', data);
}

export async function createMedicine(userId, name, quantity, date) {
  console.log('====================================');
  const data = new FormData();
  data.append('userId', userId);
  data.append("name", name)
  data.append("quantity", quantity)
  data.append("date", date)

  return await generateRequest("/createmedicine", 'POST', data)
}
