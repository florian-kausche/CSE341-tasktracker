// Import the local 'database' module for MongoDB connection.
const mongodb = require('../data/database');

// Import the 'ObjectId' class from the 'mongodb' module for handling MongoDB document IDs.
const ObjectId = require('mongodb').ObjectId;

// Function to get all posts from the 'posts' collection.
const getAll = async (req, res) => {
    // Fetch all documents in the 'posts' collection.
    const result = await mongodb.getDatabase().collection('posts').find();
    // Convert the result to an array and send as JSON response.
    result.toArray().then((posts) => {
        res.setHeader('Content-Type', 'application/json'); // Set response type to JSON.
        res.status(200).json(posts); // Respond with status 200 and the posts.
    });
}

// Function to get a single post by its ID.
const getSingle = async (req, res) => {
    // Create a new ObjectId from the ID provided in the request parameters.
    const postId = new ObjectId(req.params.id);
    // Find a specific post by ID in the 'posts' collection.
    const result = await mongodb.getDatabase().collection('posts').find({ _id: postId });
    // Convert the result to an array and send the first post as a JSON response.
    result.toArray().then((posts) => {
        res.setHeader('Content-Type', 'application/json'); // Set response type to JSON.
        res.status(200).json(posts[0]); // Respond with status 200 and the single post.
        
    });
}

// Function to create or replace a post in the database.
const createPost = async (req, res) => {
    const post = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthdate: req.body.birthdate  // Ensure this matches your request field name
    };

    try {
        const response = await mongodb.getDatabase().collection('posts').insertOne(post);
        if (response.acknowledged) {
            res.status(201).json({ id: response.insertedId, ...post });
        } else {
            res.status(500).json('Failed to create the post');
        }
    } catch (error) {
        res.status(500).json(`Error: ${error.message}`);
    }
};


// Function to update an existing post.
const UpdatePost = async (req, res) => {
    const postId = new ObjectId(req.params.id);

    const post = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthdate: req.body.birthdate 
    };  

    try {
        const response = await mongodb.getDatabase().collection('posts').updateOne(
            { _id: postId }, // Filter to find the post by ID
            { $set: post }   // Update operation
        );

        if (response.matchedCount > 0) {
            res.status(200).json(post);  // Respond with the updated post.
        } else {
            res.status(404).json('post not found');
        }
    } catch (error) {
        res.status(500).json(`Error: ${error.message}`);
    }
};

// Function to delete a post.
const deletePost = async (req, res) => {
    const postId = new ObjectId(req.params.id); // Create an ObjectId from the request parameter.

    try {
        const response = await mongodb.getDatabase().collection('posts').deleteOne({ _id: postId });
        if (response.deletedCount > 0) {
            res.status(204).send(); // Respond with status 204 (no content).
        } else {
            res.status(404).json('post has been deleted');
        }
    } catch (error) {
        res.status(500).json(`Error: ${error.message}`);
    }
};

// Export the functions so they can be used in other parts of the application.
module.exports = {
    getAll,
    getSingle,
    createPost,
    UpdatePost,
    deletePost
};
