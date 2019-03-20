const express = require('express');
const router = express.Router();
const columnsController = require ('../controllers/columns.controller')
const secure = require('../middlewares/secure.mid')

router.get('/', secure.isAuthenticated, columnsController.listColumns);
router.post('/', secure.isAuthenticated,columnsController.newColumn);
router.get('/:id', secure.isAuthenticated,columnsController.columnDetail);
router.put('/:id', secure.isAuthenticated,columnsController.updateColumn);
router.delete('/:id', secure.isAuthenticated,columnsController.deleteColumn);

module.exports = router;
