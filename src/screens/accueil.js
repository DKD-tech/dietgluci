import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { StatusBar } from 'expo-status-bar';
import { LogoImage } from '../../assets';


// La première qui s'affiche dans l'ordre d'affichage dans App.js 
const accueil = () => {

  // Creons une constante de navigation  pour naviguer de la page d'accueil a une page

    const navigation = useNavigation();

    useLayoutEffect(() =>{
         navigation.setOptions({
          headerShown: false,
         })
    },[])

  return (
    //Mis en place de notre view d'interface
    <SafeAreaView className="bg-white flex-1 relative">
      <StatusBar/>
        
      {/* Logo de diet~gluci */}
        <View className="mt-12">
          <Image  source={require("../../assets/images/dietgluci.png")} className="object-scale-down h-24 w-48  left-40 "/>
        </View>

        {/* Phrase d'accroche */}
        <View className="px-6 mt-4 space-y-2">
           <Text className="text-[#3C6072] text-[22px]">Identifiez la quantité de glucide</Text>
           <Text className="text-[#2E86C1] text-[18px] font-bold">Contenu dans vos repas en un  clic</Text>
        </View>

        {/* Decoration*/}
        <View className="w-[320px] h-[320px] bg-[#85C1E9] rounded-full absolute bottom-44 -right-36"></View>
        <View className="w-[300px] h-[300px] bg-[#154360] rounded-full absolute bottom-0.5 -left-36"></View>
        
        {/* Fond d'ecran */}
        <View className="flex-1 relative items-center justify-center">
         <Animatable.Image
         animation="fadeIn"
         easing="ease-in-out"

           source={LogoImage} className="w-[350px] h-[350px] object-cover mb-28"/>
         
         {/* Button commencer pour naviguer rs la page recherche */}
         <TouchableOpacity 
         onPress={()=> navigation.navigate("navigation")}
         className="absolute bottom-20 w-52 h-20 border-r-2 border-t-4 border-[#85C1E9] rounded-2xl items-center justify-center">
         <Animatable.View 
         animation={"pulse"}
         easing={"ease-in-out"}
         iterationCount={"infinite"}
         className="w-48 h-16 items-center justify-center rounded-2xl bg-[#85C1E9]">
          <Text className="text-white text-[24px] font-semibold">Commencer</Text>
        </Animatable.View>
         </TouchableOpacity>
        </View>

        
    </SafeAreaView>
  )
}

export default accueil