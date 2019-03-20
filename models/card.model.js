const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  position: Number,
  description: String,
  imageUrl: String,
  label: String,
  title: {
    type: String,
    required: 'Title is required',
    maxlength: 15
  },
  column :{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Column' 
  }
}, { 
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      //cambiamos el campo _id por id a secas
      ret.id = doc._id
      // quitamos los campos que no queremos
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
 });

const Card = mongoose.model('Card', cardSchema);
module.exports = Card;