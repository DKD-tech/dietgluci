import { View, Text, SafeAreaView, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Image } from 'react-native-animatable'
import CalendarStrip from 'react-native-calendar-strip';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import moment from 'moment';
import { MaterialIcons } from '@expo/vector-icons';
import tailwind from 'twrnc';
import { FontAwesome } from '@expo/vector-icons';

const recherche = () => {

  const navigation = useNavigation();

  useLayoutEffect(() =>{
    navigation.setOptions({
     headerShown: false,
    })
},[])
  return (
    <SafeAreaView className="flex-1 bg-slate-1100 relative">
    <View>
    <View className="mt-16">
        <Image  source={require("../../assets/images/dietgluci.png")} className="object-scale-down h-16 w-32 left-0 "/>
        
      </View>
    </View>

    <View>
      <View className="flex-row items-center bg-white mx-4 rounded-xl py-1 px-4 shadow-lg mt-4">
      <GooglePlacesAutocomplete
    placeholder='Recherchez un aliment'
    onPress={(data, details = null) => {
      // 'details' is provided when fetchDetails = true
      console.log(data, details);
    }}
    query={{
      key: "AIzaSyCEBADpNKvO2X9Zjwb9BpD9SCP3M2wqcw0",
      language: 'fr',
    }}
  />
      </View>
    </View>
    <View>
    <View className='bg-white mt-4'>
       <CalendarStrip
        scrollable
        calendarAnimation={{type: 'sequence', duration:0}}
        daySelectionAnimation={{type: 'border', duration:20, borderWidth:1, borderHighlightColor:'black'}}
        style={{height:80, paddingTop:1, paddingBottom: 10, marginTop:8}}
        // calendarColor={'#3343CE'}
        calendarHeaderStyle={{color:'black'}}
        dateNameStyle={{color:'black'}}
        dateNumberStyle={{color:'black'}}
        highlightDateNumberStyle={{color:'green'}}
        highlightDateNameStyle={{color:'green'}}
        // disabledDateNameStyle={{color:'grey'}}
        // disabledDateNumberStyle={{color:'grey'}}
        // datesBlacklist={datesBlacklist}
        // datesWhitelist={datesWhitelist}
        iconContainer={{className:"flex-1"}}
       />
    </View>
    <View className="flex-row items-center justify-between px-4 mt-4">
      <Text className="text-[#154360] text-[22px] font-bold">Historiques</Text>
      <TouchableOpacity className="flex-row items-center justify-center space-x-1"> 
        <Text  className="text-[#94b9cc] text-[14px] font-bold">Voir plus</Text>
        <MaterialIcons name="arrow-right" size={24} color="#94b9cc" />
      </TouchableOpacity>
    </View>
    </View>
    <ScrollView>
          
    <View className="items-center">
    <View className="bg-white rounded-xl w-[300px] mt-2 mx-7">
      <Text className="text-slate-900 text-lg font-bold p-4 flex-row items-center justify-between px-4">Sardine</Text>
       <Image
      source={{ uri: "https://source.unsplash.com/random" }}
      style={tailwind`w-full h-44 rounded-t-xl`}
      resizeMode="cover"
    />
      <View className="p-4 flex-row items-center justify-between px-4">
      <Text className="text-slate-900 text-lg font-bold">10g de glucide</Text>
      <TouchableOpacity className="flex-row items-center justify-center space-x-1">
      <Text>Modifier</Text>
      <FontAwesome name="edit" size={24} color="black" />
      </TouchableOpacity>
    </View>
    </View>
    </View>
    <View className="items-center">
    <View className="bg-white rounded-xl w-[300px] mt-2 mx-7">
      <Text className="text-slate-900 text-lg font-bold p-4 flex-row items-center justify-between px-4">Sardine</Text>
       <Image
      source={{ uri: "https://source.unsplash.com/random" }}
      style={tailwind`w-full h-44 rounded-t-xl`}
      resizeMode="cover"
    />
      <View className="p-4 flex-row items-center justify-between px-4">
      <Text className="text-slate-900 text-lg font-bold">10g de glucide</Text>
      <TouchableOpacity className="flex-row items-center justify-center space-x-1">
      <Text>Modifier</Text>
      <FontAwesome name="edit" size={24} color="black" />
      </TouchableOpacity>
    </View>
    </View>
    </View>
    <View className="items-center">
    <View className="bg-white rounded-xl w-[300px] mt-2 mx-7">
      <Text className="text-slate-900 text-lg font-bold p-4 flex-row items-center justify-between px-4">Sardine</Text>
       <Image
      source={{ uri: "https://source.unsplash.com/random" }}
      style={tailwind`w-full h-44 rounded-t-xl`}
      resizeMode="cover"
      // modification à faire
    />
      <View className="p-4 flex-row items-center justify-between px-4">
      <Text className="text-slate-900 text-lg font-bold">10g de glucide</Text>
      <TouchableOpacity className="flex-row items-center justify-center space-x-1">
      <Text>Modifier</Text>
      <FontAwesome name="edit" size={24} color="black" />
      </TouchableOpacity>
    </View>
    </View>
    </View>
    </ScrollView>
    
  </SafeAreaView>
  )
}

export default recherche