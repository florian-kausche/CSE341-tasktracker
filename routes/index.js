const express = require('express');
const router = express.Router();
const postsController = require('../controllers/record');


// Define routes
router.get('/record', postsController.getAll);
router.get('/record/:id', postsController.getSingle);
router.post('/record', postsController.createPost);
router.put('/record/:id', postsController. UpdatePost);
router.delete('/record/:id', postsController.deletePost);

router.get('/', (req, res) => {
    res.send('This is Joleens School Management System');
});

module.exports = router;
