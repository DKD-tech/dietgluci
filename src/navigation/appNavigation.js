import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import accueil from "../screens/accueil";
import recherche from "../screens/recherche";
import React, {useLayoutEffect} from "react";
import scanner from "../screens/scanner"
import historique from "../screens/historique"


const appNavigation = ({navigation})=>{
    const Tab = createBottomTabNavigator();

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerShown: false,
        })
    },[])

    return(
        <Tab.Navigator
        
          screenOptions={({route})=>({
            tabBarIcon:({focused, size, color})=>{
                let iconName;
                if(route.name === 'recherche'){
                    iconName= focused ? "ios-home": "ios-home-outline";
                    size= focused ? size + 8 : size + 5;
                }else if(route.name === 'scanner'){
                    iconName= focused ? "md-scan": "md-scan-circle-outline";
                    size= focused ? size + 8 : size + 5;
                }else if(route.name === 'historique'){
                    iconName= focused ? "md-timer": "md-timer-outline";
                    size= focused ? size + 8 : size + 5;
                }
                return <Ionicons name={iconName} size={size} color={color}/>;
            },
          })}
          tabBarOptions={{
        activeTintColor:'#3372A7',
        inactiveTintColor: 'black',
        showLabel: false,
      }}

      barStyle={{backgroundColor:"#694fad"}}
        >

        <Tab.Screen name="recherche" component={recherche}/>
        <Tab.Screen name="scanner" component={scanner}/>
        <Tab.Screen name="historique" component={historique}/>

        </Tab.Navigator>
    )
}

export default appNavigation