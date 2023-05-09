import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import accueil from './src/screens/accueil';
import appNavigation from './src/navigation/appNavigation';
import { TailwindProvider } from 'tailwindcss-react-native';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <TailwindProvider>
      <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name='accueil' component={accueil}/>
            <Stack.Screen name='navigation' component={appNavigation}/>
        </Stack.Navigator>
      </NavigationContainer>
    </TailwindProvider>
  );
}


