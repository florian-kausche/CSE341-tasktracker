const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const authorController = require('../controllers/authors');

// Validation middleware
const validateAuthor = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('birthDate').isISO8601().withMessage('Valid birth date is required'),
  body('nationality').trim().notEmpty().withMessage('Nationality is required'),
  body('biography').trim().notEmpty().withMessage('Biography is required'),
  body('website').optional().isURL().withMessage('Invalid website URL'),
  body('genres').isArray({ min: 1 }).withMessage('At least one genre is required'),
  body('genres.*').trim().notEmpty().withMessage('Genre cannot be empty')
];

router.get('/', authorController.getAllAuthors);
router.get('/:id', authorController.getAuthorById);
router.post('/', validateAuthor, authorController.createAuthor);
router.put('/:id', validateAuthor, authorController.updateAuthor);
router.delete('/:id', authorController.deleteAuthor);

module.exports = router; 