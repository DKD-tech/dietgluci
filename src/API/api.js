const axios = require('axios');
const Glucides = require('./glucideSchema');

// Fonction pour récupérer les informations du produit depuis l'API Open Food Facts
async function getProductInfo(productId) {
  try {
    const response = await axios.get(`https://world.openfoodfacts.org/api/v2/product/${productId}.json`);
    return response.data.product;
  } catch (error) {
    console.error('Erreur lors de la récupération des informations du produit:', error);
    return null;
  }
}

// Fonction pour enregistrer la consommation de glucides dans la base de données
async function saveGlucidesConsumption(quantite, productId) {
  try {
    const productInfo = await getProductInfo(productId);
    if (productInfo) {
      const image = productInfo.image_url;
      const portion = productInfo.serving_size;

      const newGlucides = new Glucides({
        quantite,
        image,
        produit,
        portion,
      });

      const savedGlucides = await newGlucides.save();
      console.log('Glucides saved:', savedGlucides);
    }
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement des glucides:', error);
  }
}

module.exports = {
  saveGlucidesConsumption,
};
