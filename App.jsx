import 'react-native-url-polyfill/auto';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTab from './src/Navigators/BottomTab';
import AuthStack from './src/Navigators/Stacks/AuthStack';
import MedicineStack from './src/Navigators/Stacks/MedicineStack';
import {SCREENS} from './src/constants/Screens';
import {createContext, useEffect, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {getDataFromAsyncStorage} from './src/utils/common';
import {storageKeyName} from './src/constants/Data';
import {getUser} from './src/backend/utilFunctions';
import SIgnin from './src/screens/newauth/SIgnin';
import ProfileImage from './src/screens/newauth/ProfileImage';
import SelectGender from './src/screens/newauth/SelectGender';
import Weight from './src/screens/newauth/Weight';
import GoalWeight from './src/screens/newauth/GoalWeight';
import Height from './src/screens/newauth/Height';
import Heights from './src/screens/newauth/Height';
import NewGoal from './src/screens/newauth/NewGoal';
import FinalGoalMain from './src/screens/newauth/FinalGoalMain';
import FoodDiskike from './src/screens/newauth/FoodDiskike';
import FoodAllergy from './src/screens/newauth/FoodAllergy';
import MedicalHistory from './src/screens/newauth/MedicalHistory';
import Supplement from './src/screens/newauth/Supplement';
import SupplementMain from './src/screens/newauth/Supplement';
import SkipMealPage from './src/screens/newauth/SkipMealPage';
import FoodFrequency from './src/screens/newauth/FoodFrequency';
import OfficeTiming from './src/screens/newauth/OfficeTiming';
import Occupation from './src/screens/newauth/Occupation';
import Location from './src/screens/newauth/Location';
import NewAuthStack from './src/Navigators/Stacks/NewAuthStack';
import StepTracker from './src/screens/DashBoard/StepTracker';
import WaterDrink from './src/screens/DashBoard/WaterDrink';
import ActivityTracker from './src/screens/DashBoard/ActivityTracker';
import Dashboard from './src/screens/DashBoard/Dashboard';
import DashboardStack from './src/Navigators/Stacks/DashboardStack';
import WorkoutStack from './src/Navigators/Stacks/WorkoutStack';
import MealStack from './src/Navigators/Stacks/MealStack';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {store} from './src/store';
import Stepcounter from './src/components/Stepcounter/Stepcounter';
import StepCounter from './src/components/Stepcounter/Stepcounter';
import SleepScheduler from './src/screens/Sleep/SleepScheduler';
import MedicineScheduler from './src/screens/Medicine/MedicineScheduler';
import ConsultantStack from './src/Navigators/Stacks/ConsultantStack';

import ProgressStack from './src/Navigators/Stacks/ProgressStask';

import WeightUpdate from './src/screens/progressTracker/WeightUpdate';
import LottieView from 'lottie-react-native';
import {getProfileDetails} from './src/services';
import {userSlice} from './src/store/userSlice';
import OnboardingOne from './src/screens/Onboarding/OnboardingOne';
import OnboardingTwo from './src/screens/Onboarding/OnboardingTwo';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const GlobalContext = createContext();

const Stack = createNativeStackNavigator();
const OnboardingStack = createNativeStackNavigator();

function AppNavigation() {
  const user = useSelector(state => state.user.user);
  const [autoLoginInProgress, setAutoLoginInProgress] = useState(true);
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      const token = await getDataFromAsyncStorage('access_token');
      console.log(token);
      if (token) {
        setAutoLoginInProgress(true);
        const userDetails = await getProfileDetails();

        if (userDetails.data) {
          dispatch(userSlice.actions.userLogin(userDetails.data.user));
          setAutoLoginInProgress(false);
        }
      }
      setAutoLoginInProgress(false);
    } catch (error) {
      setAutoLoginInProgress(false);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    getData();
  }, [dispatch]);

  if (autoLoginInProgress) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        <LottieView
          source={require('./assets/lottieanimations/FoodSplash.json')}
          style={{width: '40%', height: '40%'}}
          autoPlay
          loop
        />
      </View>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {user ? (
        <Stack.Screen name={SCREENS.BOTTOMTAB} component={BottomTab} />
      ) : (
        <Stack.Screen name={SCREENS.AUTHSTACK} component={AuthStack} />
      )}
    </Stack.Navigator>
  );
}

const OnboardingNavigation = ({setInitial}) => {
  return (
    <OnboardingStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <OnboardingStack.Screen
        name={SCREENS.ONBOARDINGONE}
        component={OnboardingOne}
      />
      <OnboardingStack.Screen name={SCREENS.ONBOARDINGTWO}>
        {() => <OnboardingTwo setInitial={setInitial} />}
      </OnboardingStack.Screen>
      <OnboardingStack.Screen name={SCREENS.AUTHSTACK} component={AuthStack} />
    </OnboardingStack.Navigator>
  );
};
function App() {
  const [user, setUser] = useState(null);
  const [initial, setInitial] = useState(false);

  const checkInitial = async () => {
    try {
      const tempinitial = await getDataFromAsyncStorage('initial_setup');

      if (tempinitial == 'true') {
        setInitial(true);
      } else {
        setInitial(false);
      }
    } catch (error) {}
  };

  useEffect(() => {
    checkInitial();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        user: user,
        setLoggedInUser: userObj => {
          setUser(userObj);
        },
        setInitial,
      }}>
      <Provider store={store}>
        <NavigationContainer>
          {!initial ? (
            <OnboardingNavigation setInitial={setInitial} />
          ) : (
            <AppNavigation />
          )}
        </NavigationContainer>
      </Provider>
    </GlobalContext.Provider>
  );
}
export default App;
