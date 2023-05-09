import { View, Text, TouchableOpacity} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { Button } from '@material-tailwind/react';
import * as Animatable from 'react-native-animatable';
// import axios from 'axios';


function scanner({navigation}){

const [hasPermission, setHasPermission]= useState(null);
const [scanned, setScanned]= useState(false);
// const [product, setProduct]= useState(null);
// const {setBarcode, setSearchQuery} = useContext(Context);

useEffect(()=>{
  (async () =>{
    const {status} = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === 'granted');
  })();
}, []);

const handleBarCodeScanned = ({type, ean})=>{
  setScanned(true);
  alert(`Bar code with type ${type} and ean ${ean} has been scanned!`);
  // const url = `https://world.openfoodfacts.org/api/v2/product/${ean}.json`;
  // const response = axios.get(url);
  // setProduct(response.ean.product);
  // try {
    
  //   const response = axios.get(
  //         `https://world.openfoodfacts.org/api/v2/product/${ean}`
  //   );
  // } catch (error) {

  //   console.log(error);
    
  // }
};

if (hasPermission === null) {
  return <Text>Requesting for camera permission</Text>;
}
if (hasPermission === false) {
  return <Text>No access to camera</Text>;
}

// const scanner = () => {
  return (
    <View className="mt-16 items-center">
    <View className="bg-white items-center justify-center h-[350px] w-[350px] overflow-hidden rounded-3xl">
    <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        className="h-[400px] w-[400px]"
      />
    </View>
      
      {scanned && 
       
        <>
        {/* <View>
          <Text>{product?.product_name || 'Produit non trouvé'}</Text>
          <Text>{product?.quantity || ''}</Text>
        </View> */}
        <TouchableOpacity 
          onPress={()=>setScanned(false)} className="container  bg-red-400 items-center justify-center"><Text>Scanner à nouveau</Text></TouchableOpacity>
        {/* //  onPress={()=> navigation.navigate("navigation")}
        //  className="absolute bottom-20 w-52 h-20 border-r-2 border-t-4 border-[#85C1E9] rounded-2xl items-center justify-center">
        //  <Animatable.View 
        //  animation={"pulse"}
        //  easing={"ease-in-out"}
        //  iterationCount={"infinite"}
        //  className="w-48 h-16 items-center justify-center rounded-2xl bg-[#85C1E9]">
        //   <Text className="text-white text-[24px] font-semibold">Commencer</Text>
        // </Animatable.View> */}
        <View className="justify-center mt-6 w-20">
            <TouchableOpacity onPress={()=>{
              setBarcode(text);
              navigation.navigate("infos")
            }}></TouchableOpacity>
        </View>
                    
        </>
        
        }
    </View>
  );
// }
}
export default scanner