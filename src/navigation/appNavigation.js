import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import recherche from "../screens/recherche";
import React, {useLayoutEffect, useState} from "react";
import scanner from "../screens/scanner"
import Parametrage from "../screens/parametrages";


// Notre page de TabBar
//  Nous avons 3 tabBar

const appNavigation = ({navigation})=>{
    const Tab = createBottomTabNavigator();
    const [historique, setHistorique] = useState([]);

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerShown: false,
        })
    },[])

    return(

        // Nos tabBar, parametrer l'option d'affichage , icone et autre
        
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
                }else if(route.name === 'parametrage'){
                    iconName= focused ? "options": "options-outline";
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

{/* Nos tabScreen */}
        <Tab.Screen name="recherche" component={recherche}/>
        <Tab.Screen name="scanner" component={scanner}/>
 <Tab.Screen
          name="parametrage"
          component={Parametrage}
        />
        </Tab.Navigator>
    )
}

export default appNavigation