import { View, Text, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner'
// import * as Animatable from 'react-native-animatable';
import axios from 'axios';
import { Image } from 'react-native-animatable'
import * as ImageManipulator from 'expo-image-manipulator';
import { useFocusEffect } from '@react-navigation/native';
import Historique from './historique';

function Scanner({navigation, ajouterProduitAHistorique}){

// Notre page scanner

// utiliser unfunction de retour pour initialiser notre appareil lorsqu'on revient sur la page
  useFocusEffect(
    React.useCallback(() => {
     setScanned(false);
     setProduct(null);
      return () => {
        
      };
    }, [])
  );

  // Configuration sur l'utilisation de la camera du telephone

  const [hasPermission, setHasPermission]= useState(null);
  const [scanned, setScanned]= useState(false);
  const [product, setProduct]= useState(null);
  const [historique, setHistorique] = useState([]);

  // Récuperer les produits scanner grace a cette fonction
  const addHistorique = (product)=>{
    setHistorique((prevHistorique) =>{
      const isAlreadyInHistory = prevHistorique.some(
        (item) => item.code === product.code
      );

      // verifier si le produit scanner est dans l'historique et affiche une seule fois dans la liste 

      if (!isAlreadyInHistory) {
        return [...prevHistorique, product];
      }

      return prevHistorique;
    });
  };

  // Recuperer la reponse de l'utilisateur en rapport d'utilisation de son appareil photo

  useEffect(()=>{
    (async () =>{
      const {status} = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({type, data})=>{

    // Comparer le produit scanner dans l'api open food facts
    setScanned(true);
    //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    const url = `https://world.openfoodfacts.org/api/v2/product/${data}.json`;

    // Envoie de la requete grace à l'utilisation d'axios et recuperer le retour de l'API en format json
    const response = await axios.get(url);
    setProduct(response?.data?.product);
    // navigation.navigate("comptageGlucide", {product});

    //  recuperer la reponse du produit scanner et l'ajouter dans l'historique
    addHistorique(response?.data?.product);


  };

  // Supprimer l'historique de scan

  const suppScan = () =>{
    setHistorique([]);
  }
  // verifier l'accès au camera de l'appereil

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  //  Si nous ans accès au camera et que l'on scan , naviguer vers la page comptageglucide tout en recuperant le produit scanner
  if (scanned && product) {
    navigation.navigate('comptageGlucide', {  product  }); 
    return null;
  };

  // const resetScanner = () =>{
  //   setScanned(false);
  // }

  return (
    // L'affiche view
    <View className="mt-2 items-center">
    {/* Section camera */}
      <View className="bg-white items-center justify-center h-[300px] w-[300px]  rounded-3xl">
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          className="h-[350%] w-[350%]"
        />
      </View>
      
      {/* Section si produit scanner sinon scanner encore */}
      {scanned && 
        <>
           <TouchableOpacity 
            onPress={()=>setScanned(false)} 
            className="container  bg-red-400 items-center justify-center w-[100px] h-[40px] rounded-sm">
            <Text>Scan again</Text>
          </TouchableOpacity>
        </>
      }
      {/* Recuperation des produits scanner  en l'affichage directement sur la page scanner */}
      <Historique historique={historique} suppScan={suppScan}/>
    </View>
  );
}

export default Scanner;

