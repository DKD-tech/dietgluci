const mongoose = require('mongoose');

const glucidesSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  quantite: { type: Number, required: true },
  image: { type: String },
  produit:{type: String},
  portion: { type: String },
});

const Glucides = mongoose.model('Glucides', glucidesSchema);
