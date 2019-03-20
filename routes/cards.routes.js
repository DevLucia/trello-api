const express = require('express');
const router = express.Router();
const secure = require('../middlewares/secure.mid')

// añadimos la configuracion de la api de multer y cloudinary para que funcione
const uploader = require('../configs/storage.config');
const cardsController = require('../controllers/cards.controller');

router.get('/', secure.isAuthenticated, cardsController.listCards);
// el attachment del middleware es el nombre del campo en el formulario
router.post('/',secure.isAuthenticated, uploader.single('attachment'),cardsController.newCard);
router.get('/:id', secure.isAuthenticated,cardsController.cardDetail);
router.put('/:id', secure.isAuthenticated,cardsController.updateCard);
router.delete('/:id', secure.isAuthenticated,cardsController.deleteCard);

module.exports = router;
