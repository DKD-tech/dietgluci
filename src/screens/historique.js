import { View, Text, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { FontAwesome } from '@expo/vector-icons';
import { Image } from 'react-native-animatable'

const Historique = ({ historique, suppScan }) => {
  // ...
  return (
    <View  className="bg-slate-50  rounded-1xl opacity-75 px-4 h-72 w-80 rounded-xl items-center mt-6">
    <View className="flex-row justify-between bg-white rounded-xl w-80 items-center object-cover">
    <Text className="text-slate-900 text-lg font-bold p-4  justify-between px-4">Historique des scans</Text>
    <TouchableOpacity onPress={suppScan} className="mr-2">
    <FontAwesome name="close" size={18} color="black" />
      </TouchableOpacity>
    </View>
      {historique && historique.length > 0 ? (
        <Carousel
          data={historique.reverse()}
          renderItem={({ item, index }) => (
            <View key={index} className="p-4 space-y-14 flex-col justify-between px-4 bg-white rounded-xl mt-2 object-contain">
            <View>
              <Text>Nom du produit : {item.product_name || 'Non trouvé'}</Text>
              <Text>Quantité : {item.product_quantity || ''}</Text>
              <Text>Glucides pour 100g : {item.nutriments?.carbohydrates_100g || ''}</Text>
              <Text>--------------------</Text>
              </View>
              <TouchableOpacity className=" items-center  justify-center">
              <Text>Plus d'info..............</Text>
              {/* <FontAwesome name="edit" size={24} color="black" /> */}
              </TouchableOpacity>
            </View>
          )}
          sliderWidth={300}
          itemWidth={300}
        />
      ) : (
        <Text>Aucun scan dans l'historique</Text>
      )}
      
    </View>
  );
};

export default Historique;

