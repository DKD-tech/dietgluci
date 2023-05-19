import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import accueil from "../screens/accueil";
import recherche from "../screens/recherche";
import React, {useLayoutEffect, useState} from "react";
import scanner from "../screens/scanner"
// import historique from "../screens/historique"
import Historique from "../screens/historique";
import Parametrage from "../screens/parametrages";


const appNavigation = ({navigation})=>{
    const Tab = createBottomTabNavigator();
    const [historique, setHistorique] = useState([]); 
    // const [historique, setHistorique] = useState([]);

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerShown: false,
        })
    },[])
// Fonction pour ajouter un produit à l'historique
// const ajouterProduitAHistorique = (product) => {
//     // Ajoutez le produit à l'historique
//     const nouvelHistorique = [...historique, product];
//     setHistorique(nouvelHistorique);
//   };
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