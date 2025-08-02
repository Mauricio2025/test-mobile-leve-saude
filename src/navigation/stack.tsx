// src/navigation/stack.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import FeedbackForm from '../screens/FeedbackForm';
import FeedbackList from '../screens/FeedbackList';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Form: undefined;
  List: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Form" component={FeedbackForm} />
      <Stack.Screen name="List" component={FeedbackList} />
    </Stack.Navigator>
  );
}
