import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import accueil from './src/screens/accueil';
import appNavigation from './src/navigation/appNavigation';
import { TailwindProvider } from 'tailwindcss-react-native';
import comptageGlucide from './src/screens/comptageGlucide';
import Historique from './src/screens/historique';
import { YellowBox } from 'react-native';

// Désactiver les avertissements en jaune
YellowBox.ignoreWarnings(['']);

// Désactiver les erreurs
console.error = () => {};

// App.js represente notre page principale  qui s'assure de  la navigation entre nos differents pages


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <TailwindProvider>
      <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name='accueil' component={accueil}/>
            <Stack.Screen name='navigation' component={appNavigation}/>
            <Stack.Screen name='comptageGlucide' component={comptageGlucide}/>
            <Stack.Screen name='historique' component={Historique}/>
            {/* <Stack.Screen name='Historique' component={Historique}/> */}
        </Stack.Navigator>
      </NavigationContainer>
    </TailwindProvider>
  );
}


