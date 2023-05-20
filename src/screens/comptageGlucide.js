import { View, Text, TextInput, TouchableOpacity , SafeAreaView} from 'react-native';
import React, { useState } from 'react';
import { Image } from 'react-native-animatable';
import { useRoute } from '@react-navigation/native';
import { saveGlucidesConsumption } from '../API/api';

// Creation de la page comptage de glucide

const ComptageGlucide = (navigation) => {

  // Le chemin et la constante de recuperation du produit lorsque l'utilisateur scan un produit dans la page scanner 
  const route = useRoute();
  const { product } = route.params;

  //  declarons les variables taille de portion et glucides contenu dans une portion et leur fonction de mise à jour
    // Le useState va nous permettre d'initialiser leur etat à une valeur  vide
  const [portionSize, setPortionSize] = useState('');
  const [carbohydratesInPortion, setCarbohydratesInPortion] = useState('');
  
 
  
// Calcul de la quantité de glucide contenu dans un aliment en prenant en paramètre la portion saisit
  const calculateCarbohydrates = (portionSize) => {

  // declarer une variable recuperant soit la quantité de glucide contenu dans 100g ou il met zero
    const carbohydratesPer100g = product?.nutriments.carbohydrates_100g || 0;


// Nous allons nous assurer que la portion tapé soit une valeur numerique et ensuite proceder au cacul de glucide contenu dans une portion
    const parsedPortionSize = parseFloat(portionSize);
    if (parsedPortionSize && !isNaN(parsedPortionSize)) {
      const carbohydrates = (parsedPortionSize * carbohydratesPer100g) / 100;
      return carbohydrates.toFixed(2); // Arrondi à 2 décimales
    } else {
      return '';
    }
  };

//  En peaufinant notre application  nous allons créer une autre variable qui changera la ligne de resultat a chaque mis à jour de la quantité de glucide en fonction du portion
 const handlePortionSizeChange = (text)=>{
  setPortionSize(text);
  const carbohydrates = calculateCarbohydrates(text);
  setCarbohydratesInPortion(carbohydrates);
 }

//  Sinon cette variable mettra à défaut la quantité de glucide contenu dans 100g 
 const handleCarbohydrates100gChange = ()=>{
      setPortionSize('100');
      setCarbohydratesInPortion(product?.nutriments.carbohydrates_100g || '');
 }

//  Cette variable se chargera d'envoyer les informations du produit que nous souhaiter stocker dans le journal sur la page de recherche
 const addProductToJournal = ()=>{
  navigation.navigate('Recherche', {product: product, addProductToJournal: true});
 }
 
  return (

    // Notre Affichage  de la page ComptageGlucides
    <SafeAreaView className="bg-slate-100 flex-1 relative">
    <View>
    {/* Section Logo */}
      <View className="">
      <Image source={{ uri: product?.image_small_url }} className="w-full h-52 rounded-t-xl"
      resizeMode="contain"
      />
      {/* Section Information sur le produit scanner ou rechercher  */}
      <View className="flex-row  bg-white h-10 items-center">
      <Text className="text-[#154360] text-ellipsis font-extralight">{product.product_name || 'Product not found'}</Text>
      <Text className="absolute right-0 text-white text-[24px] font-semibold bg-[#85C1E9] rounded-bl-lg h-10 w-auto  text-center">{carbohydratesInPortion !== '' ? carbohydratesInPortion: (product?.nutriments.carbohydrates_100g || '')}{' g '}</Text>
      </View>
      </View>
      <View className="flex-row justify-between items-center mx-2 mt-8">
      <TouchableOpacity onPress={handleCarbohydrates100gChange} className="bg-[#85C1E9] w-[40%] rounded h-[30px] items-center">
        <Text className="text-[18px] font-bold text-white w-auto">100 g </Text>
      </TouchableOpacity>
      <TextInput
        placeholder=" ....g  "
        value={portionSize}
        onChangeText={handlePortionSizeChange}
        keyboardType="numeric"
        className='bg-[#85C1E9] w-[40%] rounded h-[30px] text-[18px] font-bold'
        style={{alignContent:'center', alignItems:'center', color:'#FFF', justifyContent:'center'}}
      />
      </View>
    
      <View  className="mt-5 border rounded p-2  divide-y-2 divide-dashed ">
        <View className=" flex-row justify-between">
          <Text  className=" font-bold">Glucides</Text>
          <Text className=" flex-1 text-right">{carbohydratesInPortion !== '' ? carbohydratesInPortion: (product?.nutriments.carbohydrates_100g || '')} g 
          </Text>
        </View>
        <View className=" flex-row justify-between mt-2">
          <Text  className=" font-bold mt-2">Indice Glycemique</Text>
          <Text className=" flex-1 text-right">{product?.nutriments.glycemic_index_100g || '0'} 
          </Text>
        </View>
        <View className=" flex-row justify-between mt-2">
          <Text  className=" font-bold mt-2">Sucre</Text>
          <Text className=" flex-1 text-right">{product?.nutriments.sugars || '0'} 
          </Text>
        </View>
        <View className=" flex-row justify-between mt-2">
          <Text  className=" font-bold mt-2">Proteïnes</Text>
          <Text className=" flex-1 text-right">{product?.nutriments.proteins || '0'}  
          </Text>
        </View>
        <View className=" flex-row justify-between mt-2">
          <Text  className=" font-bold mt-2">Calories</Text>
          <Text className=" flex-1 text-right">{product?.nutriments.calories || '0'}  
          </Text>
        </View>
        <View className=" flex-row justify-between mt-2">
          <Text  className=" font-bold mt-2">Matière grasse</Text>
          <Text className=" flex-1 text-right">{product?.nutriments.fat || '0'}  
          </Text>
        </View>
        <View className=" flex-row justify-between mt-2">
          <Text  className=" font-bold mt-2">Qualité Nutritionelles</Text>
          <Text>{product?.nutrition_grades}</Text>
        </View>
       
      </View>
      {/* Section ajout dans le journal */}
     
      <TouchableOpacity onPress={addProductToJournal} className="items-center mt-8 bg-[#85C1E9] rounded-full h-10 w-auto mx-10 justify-center">
        <Text className="font-bold text-1xl text-white">Enregistrer dans mon journal</Text>
      </TouchableOpacity>
      
    </View>
    </SafeAreaView>
  );
};

export default ComptageGlucide;

