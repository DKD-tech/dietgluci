
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const ParametragePage = () => {
  // Notre de parametrage specifique pour les Diabétiques 
  // ratio d'insuilne
  const [insulinRatio, setInsulinRatio] = useState('');

  // taux de sucre dans le sang
  const [bloodSugar, setBloodSugar] = useState('');

  // Dose d'insuline à administrer
  const [insulinDose, setInsulinDose] = useState('');

  // Quanités des glucides contenu dans les differents reépa
  const [carbohydrates, setCarbohydrates] = useState({
    breakfast: '',
    lunch: '',
    dinner: ''
  });

  useEffect(() => {
    calculateInsulinDose();
  }, [bloodSugar, insulinDose, carbohydrates]);

  // S'assurer de l'utilisation des valeurs numérique dans nos calculs
  const calculateInsulinDose = () => {
    const parsedInsulinRatio = parseFloat(insulinRatio);
    const parsedBloodSugar = parseFloat(bloodSugar);
    const parsedInsulinDose = parseFloat(insulinDose);
    const parsedBreakfastCarbs = parseFloat(carbohydrates.breakfast);
    const parsedLunchCarbs = parseFloat(carbohydrates.lunch);
    const parsedDinnerCarbs = parseFloat(carbohydrates.dinner);
  
    if (isNaN(parsedInsulinRatio) || isNaN(parsedBloodSugar) || isNaN(parsedInsulinDose) ||
        isNaN(parsedBreakfastCarbs) || isNaN(parsedLunchCarbs) || isNaN(parsedDinnerCarbs)) {
      // Les valeurs saisies ne sont pas des nombres valides
      console.log('Les valeurs de ratio d\'insuline, de glycémie, de dose d\'insuline et de glucides doivent être des nombres valides.');
      return;
    }

    // Calculer la dose d'insuline en utilisant le ratio d'insuline à glucides
    const totalCarbs = parsedBreakfastCarbs + parsedLunchCarbs + parsedDinnerCarbs;
    const insulinDoseNeeded = (totalCarbs / parsedInsulinRatio);

    // Ajuster la dose d'insuline en fonction de la glycémie et de la dose d'insuline injectée
    const adjustedInsulinDose = insulinDoseNeeded + ((parsedBloodSugar - 100) / 50) + (parsedInsulinDose / 2);
    setInsulinDose(adjustedInsulinDose.toFixed(2));
  };

  // Calcul d'insuline en fonction des differents données saisies
  const handleCarbsChange = (meal, value) => {
    setCarbohydrates(prevCarbs => ({
      ...prevCarbs,
      [meal]: value
    }));
  };

  return (

    // Page d'affichage à l'ecran
    <View>
      <Text>Ratio d'insuline à glucides :</Text>
      <TextInput
        value={insulinRatio}
        onChangeText={setInsulinRatio}
        keyboardType="numeric"
      />

      <Text>Glycémie avant le repas :</Text>
      <TextInput
        value={bloodSugar}
        onChangeText={setBloodSugar}
        keyboardType="numeric"
      />

      <Text>Dose d'insuline injectée :</Text>
      <TextInput
        value={insulinDose}
        onChangeText={setInsulinDose}
        keyboardType="numeric"
      />

      <Text>Quantité de glucides consommés au petit-déjeuner :</Text>
      <TextInput
        value={carbohydrates.breakfast}
        onChangeText={(value) => handleCarbsChange
            ('breakfast', value)}
keyboardType="numeric"
/>
<Text>Quantité de glucides consommés au déjeuner :</Text>
  <TextInput
    value={carbohydrates.lunch}
    onChangeText={(value) => handleCarbsChange('lunch', value)}
    keyboardType="numeric"
  />

  <Text>Quantité de glucides consommés au dîner :</Text>
  <TextInput
    value={carbohydrates.dinner}
    onChangeText={(value) => handleCarbsChange('dinner', value)}
    keyboardType="numeric"
  />

  <Text>Dose d'insuline nécessaire en unités:</Text>
  <Text>{insulinDose} </Text>
</View>
);
};

export default ParametragePage;
