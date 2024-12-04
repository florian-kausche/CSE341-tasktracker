const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contacts');


// Define routes
router.get('/contacts', contactsController.getAll);
router.get('/contacts/:id', contactsController.getSingle);
router.post('/contacts', contactsController.CreateContact);
router.put('/contacts/:id', contactsController.UpdateContact);
router.delete('/contacts/:id', contactsController.deleteContact);

router.get('/', (req, res) => {
    res.send('Hello World its me');
});

// router.use('/contacts', require('./contacts')); // Load 'contacts' routes

module.exports = router;
