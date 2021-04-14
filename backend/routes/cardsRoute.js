const express= require('express');

const myFunctions1= require('../controllers/cardsController');
const myFunctions2= require( '../middlewares/verifyAuth');

const router = express.Router();

// Cards Routes

router.post('/cards',myFunctions2.verifyToken,myFunctions1.AddCard);
router.get('/cards/:user_id',myFunctions2.verifyToken,myFunctions1.getAllCards);
router.delete('/cards',myFunctions2.verifyToken,myFunctions1.deleteCard);
router.post('/cards/:card_id/statements/:year/:month',myFunctions1.AddStatement);
router.get('/cards/:card_id/statements/:year/:month',myFunctions2.verifyToken,myFunctions1.getAllStatements);
router.get('/cards/:card_id/statements/:year/:month/summary',myFunctions2.verifyToken,myFunctions1.getSummary);
router.post('/cards/:card_id/pay',myFunctions2.verifyToken,myFunctions1.PayBill);

module.exports= router;
