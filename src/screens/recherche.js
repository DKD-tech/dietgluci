
import React, { useCallback, useState, useLayoutEffect } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, ScrollView , Alert} from 'react-native';
import xlsx from 'xlsx';
import axios from 'axios';
import Modal from "react-native-modal";
import { SearchBar } from 'react-native-screens';
import { useNavigation } from '@react-navigation/native';
import { saveGlucidesConsumption } from '../API/api';
import { Image } from 'react-native-animatable'
import CalendarStrip from 'react-native-calendar-strip';
import { MaterialIcons } from '@expo/vector-icons';
import tailwind from 'twrnc';
import { FontAwesome } from '@expo/vector-icons';

const Recherche = () => {
  
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const navigation = useNavigation();
  const [savedProducts, setSavedProducts] = useState([]);
  // const [previousState, setPreviousState] = useState(null);
  const toggleSearchModal = (callback) => {
    setSearchModalVisible(!searchModalVisible);
    if(!searchModalVisible){
      setResults([]);
      setQuery('');
    }
    if (typeof callback === 'function') {
       callback();
    }
  };
  const handleSearchModalClose = useCallback(() => {
    setSearchModalVisible(false);
    setQuery('');
    setResults([]);
  }, []);

  const searchProducts = async (text) => {
    setQuery(text);
    

    if (text.trim() === '') {
      setResults([]);
      // setSearchPopupVisible(false);
      return;
    }

    const addProductToJournal = (product) => {
      setSavedProducts((prevProducts) => [...prevProducts, product]);
    };

    const openFoodFactsResults = await searchInOpenFoodFactsAPI(text);
    const cliqualResults = searchInCliqualExcel(text);

    const combinedResults = [...openFoodFactsResults, ...cliqualResults];

    setResults(combinedResults);
    // setSearchPopupVisible(true);
  };

  const searchInOpenFoodFactsAPI = async (text) => {
    try {
      const response = await axios.get(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${text}&search_simple=1&json=1`);
      const products = response.data.products;
      return products;
    } catch (error) {
      console.error('Erreur lors de la recherche dans l\'API Open Food Facts', error);
      return [];
    }
  };

  const searchInCliqualExcel = (text) => {
    try {
      const workbook = xlsx.readFile('../API/Table_Ciqual.xlsx');
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = xlsx.utils.sheet_to_json(worksheet);

      const results = data.filter((item) => {
        return item.alim_nom_fr.toLowerCase().includes(text.toLowerCase());
      });

      return results;
    } catch (error) {
      console.error('Erreur lors de la recherche dans le fichier Excel de Cliqual', error);
      return [];
    }
  };
  const handleSelectResult = async (results) => {
    // setSelectedProduct(product);
    setSearchModalVisible(false);
    navigation.navigate('comptageGlucide', { product: results});
    await saveGlucidesConsumption(result.glucides, result.productId);
    addProductToJournal(results);
  // Alert.alert('Consommation ajoutée', 'La consommation a été ajoutée avec succès.');
  };
  // const handleModalClose = () => {
  //   setSearchModalVisible(false);
  //   setQuery('');
  //   setResults([]);
  // };

  const clearSearchText = () => {
    setQuery('');
    setResults([]);
  };
  const saveProduct = useCallback((product) => {
    setSavedProducts([...savedProducts, product]);
  }, [savedProducts]);

  useLayoutEffect(() =>{
       navigation.setOptions({
       headerShown: false,
        })
     },[])
  return (

<SafeAreaView className="flex-1 bg-slate-100 relative">
<View>
  <View className="mt-16">
   <Image source={require("../../assets/images/dietgluci.png")} className="object-scale-down h-16 w-32 left-0 "/>
  </View>
</View>
<TouchableOpacity onPress={toggleSearchModal} className="flex-row items-center bg-white mx-4 rounded-lg py-1 px-4 shadow-lg mt-4 h-12">
  <Text className="">Rechercher un aliment</Text>
</TouchableOpacity>
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
   </View>                    
<Modal isVisible={searchModalVisible} onBackdropPress={toggleSearchModal}>
  <View className="bg-slate-50 items-center rounded-md w-auto h-auto">
  <TouchableOpacity onPress={toggleSearchModal} style={{ alignSelf: 'flex-end', marginRight: 10 }}>
  <FontAwesome name="close" size={18} color="black" />
          </TouchableOpacity>
    <TextInput
      placeholder="Recherchez un aliment"
      value={query}
      onChangeText={(text) => searchProducts(text)}
      style={{ borderWidth: 1, padding: 10, width: '80%' }}
    />
    <TouchableOpacity onPress={clearSearchText} style={{ marginLeft: 10 }}>
              <Text>Supprimer</Text>
            </TouchableOpacity>
            
    <ScrollView style={{ maxHeight: 300, marginTop: 10 }}>
      {results.map((item, index) => (
        <TouchableOpacity key={index.toString()} onPress={() => handleSelectResult(item)}>
          <Text>
            {item.product_name || item.alim_nom_fr || 'Non trouvé'} 
            {/* - {item.quantity || item.product_quantity || ''} */}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View>
</Modal>
 {/* {<ScrollView>
    {savedProducts.map((product, index) => (
      <View key={index}>
        <Text>{product.product_name || product.alim_nom_fr}</Text>
        {/* Affichez d'autres informations du produit */}
        {/* </View> */}
    {/* // ))} */}
  {/* // </ScrollView>} */} 

  <View className="flex-row items-center justify-between px-4 mt-4">
     <Text className="text-[#154360] text-[22px] font-bold">Mon Journal</Text>
       <TouchableOpacity className="flex-row items-center justify-center space-x-1"> 
        <Text  className="text-[#94b9cc] text-[14px] font-bold">Voir plus</Text>
       <MaterialIcons name="arrow-right" size={24} color="#94b9cc" />
      </TouchableOpacity>
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
);
};


export default Recherche;

