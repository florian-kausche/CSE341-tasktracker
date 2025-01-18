const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const bookController = require('../controllers/books');

// Validation middleware
const validateBook = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('author').notEmpty().withMessage('Author ID is required'),
  body('isbn').trim().notEmpty().withMessage('ISBN is required'),
  body('publishedYear').isInt({ min: 1000, max: new Date().getFullYear() })
    .withMessage('Invalid published year'),
  body('genre').trim().notEmpty().withMessage('Genre is required'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('review').trim().notEmpty().withMessage('Review is required'),
  body('pageCount').isInt({ min: 1 }).withMessage('Page count must be positive')
];

router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);
router.post('/', validateBook, bookController.createBook);
router.put('/:id', validateBook, bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

module.exports = router; 