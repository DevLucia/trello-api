
const Column = require('../models/column.model');
const createError = require('http-errors');

module.exports.listColumns = (req, res, next) => {
  Column.find()
  .populate('cards')
  .then(columns => {
    res.json(columns)
  })
  .catch (error => next(error))
}

module.exports.newColumn = (req, res, next) => {
  const column = new Column(req.body);
  column.save()
  .then(column => {
    if(!column){
      throw createError(404, 'column not found');
    }
    else {
      res.status(201).json(column)
    }
  })
  .catch (error => next(error))
}

module.exports.columnDetail = (req, res, next) => {
  Column.findById(req.params.id)
  .then(column => {
    if(!column){
      throw createError(404, 'column not found');
    }
    else {
      res.json(column)
    }
  })
  .catch(error => next(error))
}

module.exports.updateColumn = (req, res, next) => {
  const updatedColumn = req.body;
  Column.findByIdAndUpdate(req.params.id, updatedColumn, {new: true})
  .then(column => {
    res.json(column)
  })
  .catch(error => next(error))
}

module.exports.deleteColumn = (req, res, next) => {
  Column.findByIdAndDelete(req.params.id)
  .then(column => {
    if(!column){
      throw createError(404, 'column not found');
    }
    else {
      res.status(204).json()
    }
  })
  .catch(error => next(error))
}