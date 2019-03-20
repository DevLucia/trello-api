const mongoose = require('mongoose');
const Card = require('../models/card.model');

const columnSchema = new mongoose.Schema({
  position: Number,
  title: {
    type: String,
    required: 'Title is required'
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

columnSchema.virtual('cards',{
  ref: Card.modelName,
  localField:'_id',
  foreignField: 'column',
  options: {sort: {position: -1}}
})

const Column = mongoose.model('Column', columnSchema);
module.exports = Column;