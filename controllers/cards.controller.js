const createError = require('http-errors');

const Card = require('../models/card.model');

module.exports.listCards = (req, res, next) => {
  Card.find()
  .then(cards => {
    res.json(cards)
  })
  .catch (error => next(error))
}

module.exports.newCard = (req, res, next) => {
  const card = new Card(req.body);
  // añadimos la logica para la inclusion del archivo
  // de esta manera soportamos que si el usuario mete una url funciona, y si metemos un form-data también
  //si existe req.file guardamos la url en el campo del modelo de la card y asi es como guardamos la card
  // pero newCard ahora recibiría un form-data
  if(req.file){
    card.imageURL = req.file.secure_url;
  }

  card.save()
  .then(card => {
    res.status(201).json(card)
  })
  .catch (error => next(error))
}

module.exports.cardDetail = (req, res, next) => {
  Card.findById(req.params.id)
  .then(card => {
    if(!column){
      throw createError(404, 'card not found');
    }
    else {
      res.json(card)
    }  
  })
  .catch(error => next(error))
}

module.exports.updateCard = (req, res, next) => {
  const updatedCard = req.body;
  Card.findByIdAndUpdate(req.params.id, updatedCard, {new: true})
  .then(card => {
    if(!column){
      throw createError(404, 'card not found');
    }
    else {
      res.json(card)
    }
  })
  .catch(error => next(error))
}

module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndDelete(req.params.id)
  .then(card => {
    if(!column){
      throw createError(404, 'card not found');
    }
    else {
      res.status(204).json({})
    }
  })
  .catch(error => next(error))
}