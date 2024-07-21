// models/Pet.js
import { Schema, model } from 'mongoose';

const PetSchema = new Schema({
  image: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  crossStreets: {
    type: String,
    required: true
  },
  details: {
    type: String,
    required: true
  }
});

export default model('Pet', PetSchema);
