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

  // const resetScanner = () => {
  //   setScanned(false);
  //   setProduct(null);
  // };
  

  useFocusEffect(
    React.useCallback(() => {
     setScanned(false);
     setProduct(null);
      return () => {
        // Optional cleanup function
        // Vous pouvez ajouter une logique de nettoyage ici si nécessaire
      };
    }, [])
  );

  const [hasPermission, setHasPermission]= useState(null);
  const [scanned, setScanned]= useState(false);
  const [product, setProduct]= useState(null);
  const [historique, setHistorique] = useState([]);

  const addHistorique = (product)=>{
    setHistorique((prevHistorique) =>{
      const isAlreadyInHistory = prevHistorique.some(
        (item) => item.code === product.code
      );

      if (!isAlreadyInHistory) {
        return [...prevHistorique, product];
      }

      return prevHistorique;
    });
  };

  useEffect(()=>{
    (async () =>{
      const {status} = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({type, data})=>{
    setScanned(true);
    //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    const url = `https://world.openfoodfacts.org/api/v2/product/${data}.json`;
    const response = await axios.get(url);
    setProduct(response?.data?.product); // use optional chaining operator to handle undefined response object
    // navigation.navigate("comptageGlucide", {product});

    addHistorique(response?.data?.product);

    // setHistorique((prevHistorique) => [...prevHistorique, response?.data?.product]);

  };

  const suppScan = () =>{
    setHistorique([]);
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  if (scanned && product) {
    navigation.navigate('comptageGlucide', {  product  }); // replace 'Details' with the name of the screen you want to navigate to
    // navigation.navigate('comptageGlucide', { product: scannedProduct, historique: historique });
    return null;
  };

  const resetScanner = () =>{
    setScanned(false);
  }

  return (
    <View className="mt-2 items-center">
      <View className="bg-white items-center justify-center h-[300px] w-[300px]  rounded-3xl">
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          className="h-[350%] w-[350%]"
        />
      </View>
      
      {scanned && 
        <>
          {/* <View>
            <Text>{product?.product_name || 'Product not found'}</Text>
            <Text>{product?.quantity || ''}</Text>
            <Text>{product?.product_nutriments_carbohydrates || ''}</Text>
            <Image source={{ uri:product?.image_small_url }} className="object-scale-down h-32 w-32 left-0"/>
            
          </View>
           */}
           <TouchableOpacity 
            onPress={()=>setScanned(false)} 
            className="container  bg-red-400 items-center justify-center w-[100px] h-[40px] rounded-sm">
            <Text>Scan again</Text>
          </TouchableOpacity>
        </>
      }
      <Historique historique={historique} suppScan={suppScan}/>
    </View>
  );
}

export default Scanner;

//import { View, Text, TouchableOpacity} from 'react-native'
// import React, { useContext, useEffect, useState } from 'react'
// import { BarCodeScanner } from 'expo-barcode-scanner'
// import { Button } from '@material-tailwind/react';
// import * as Animatable from 'react-native-animatable';
// import axios from 'axios';


// function scanner({navigation}){

// const [hasPermission, setHasPermission]= useState(null);
// const [scanned, setScanned]= useState(false);
// const [product, setProduct] = useState(null);
// // const [product, setProduct]= useState(null);
// // const {setBarcode, setSearchQuery} = useContext(Context);

// useEffect(()=>{
//   (async () =>{
//     const {status} = await BarCodeScanner.requestPermissionsAsync();
//     setHasPermission(status === 'granted');
//   })();
// }, []);

// const handleBarCodeScanned = ({type, data})=>{
//   setScanned(true);
//   alert(`Bar code with type ${type} and barcode ${data} has been scanned!`);
  
//   try {

//     const response = axios.get(
//       `https://off:off@world.openfoodfacts.org/api/v2/product/${data}.json`
//     );
//     // console.log(response.data.product);

//     setProduct(response?.data?.product)
    
//   } catch (error) {
//     console.log(error);
//   }
//   // const url = `https://world.openfoodfacts.org/api/v2/product/${barcode}.json`;
//   // const response = axios.get(url);
//   // setProduct(response.barcode.product);
//   // try {
    
//   //   const response = axios.get(
//   //         `https://world.openfoodfacts.org/api/v2/product/${barcode}`
//   //   );
//   // } catch (error) {

//   //   console.log(error);
    
//   // }
// };

// if (hasPermission === null) {
//   return <Text>Requesting for camera permission</Text>;
// }
// if (hasPermission === false) {
//   return <Text>No access to camera</Text>;
// }

// // const scanner = () => {
//   return (
//     <View className="mt-16 items-center">
//     <View className="bg-white items-center justify-center h-[350px] w-[350px] overflow-hidden rounded-3xl">
//     <BarCodeScanner
//         onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
//         className="h-[400px] w-[400px]"
//       />
//     </View>
      
//       {scanned && 
       
//         <>

//         <View>
//           <Text>{product?.product.name || 'Produit non trouvé'}</Text>
//           {/* {/* <Text>{product?.nutriments || ''}</Text> */}
//         </View>
//         {/* <View>
//           <Text>{product?.product_name || 'Produit non trouvé'}</Text>
//           <Text>{product?.quantity || ''}</Text>
//         </View> */}
//         <TouchableOpacity 
//           onPress={()=>setScanned(false)} className="container  bg-red-400 items-center justify-center"><Text>Scanner à nouveau</Text></TouchableOpacity>
//         {/* //  onPress={()=> navigation.navigate("navigation")}
//         //  className="absolute bottom-20 w-52 h-20 border-r-2 border-t-4 border-[#85C1E9] rounded-2xl items-center justify-center">
//         //  <Animatable.View 
//         //  animation={"pulse"}
//         //  easing={"ease-in-out"}
//         //  iterationCount={"infinite"}
//         //  className="w-48 h-16 items-center justify-center rounded-2xl bg-[#85C1E9]">
//         //   <Text className="text-white text-[24px] font-semibold">Commencer</Text>
//         // </Animatable.View> */}
//         <View className="justify-center mt-6 w-20">
//             <TouchableOpacity onPress={()=>{
//               setBarcode(text);
//               navigation.navigate("infos")
//             }}></TouchableOpacity>
//         </View>
                    
//         </>
        
//         }
//     </View>
//   );
// // }
// }
// export default scanner