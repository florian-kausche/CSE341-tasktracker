// Import the local 'database' module for MongoDB connection.
const mongodb = require('../data/database');

// Import the 'ObjectId' class from the 'mongodb' module for handling MongoDB document IDs.
const ObjectId = require('mongodb').ObjectId;

// Function to get all contacts from the 'contacts' collection.
const getAll = async (req, res) => {
    // Fetch all documents in the 'contacts' collection.
    const result = await mongodb.getDatabase().collection('contacts').find();
    // Convert the result to an array and send as JSON response.
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json'); // Set response type to JSON.
        res.status(200).json(contacts); // Respond with status 200 and the contacts.
    });
}

// Function to get a single contact by its ID.
const getSingle = async (req, res) => {
    // Create a new ObjectId from the ID provided in the request parameters.
    const contactId = new ObjectId(req.params.id);
    // Find a specific contact by ID in the 'contacts' collection.
    const result = await mongodb.getDatabase().collection('contacts').find({ _id: contactId });
    // Convert the result to an array and send the first contact as a JSON response.
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json'); // Set response type to JSON.
        res.status(200).json(contacts[0]); // Respond with status 200 and the single contact.
    });
}

// Function to create or replace a contact in the database.
const CreateContact = async (req, res) => {
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthdate: req.body.birthdate  // Ensure this matches your request field name
    };

    try {
        const response = await mongodb.getDatabase().collection('contacts').insertOne(contact);
        if (response.acknowledged) {
            res.status(201).json({ id: response.insertedId, ...contact });
        } else {
            res.status(500).json('Failed to create the contact');
        }
    } catch (error) {
        res.status(500).json(`Error: ${error.message}`);
    }
};


// Function to update an existing contact.
const UpdateContact = async (req, res) => {
    const contactId = new ObjectId(req.params.id);

    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthdate: req.body.birthdate 
    };  

    try {
        const response = await mongodb.getDatabase().collection('contacts').updateOne(
            { _id: contactId }, // Filter to find the contact by ID
            { $set: contact }   // Update operation
        );

        if (response.matchedCount > 0) {
            res.status(200).json(contact);  // Respond with the updated contact.
        } else {
            res.status(404).json('Contact not found');
        }
    } catch (error) {
        res.status(500).json(`Error: ${error.message}`);
    }
};

// Function to delete a contact.
const deleteContact = async (req, res) => {
    const contactId = new ObjectId(req.params.id); // Create an ObjectId from the request parameter.

    try {
        const response = await mongodb.getDatabase().collection('contacts').deleteOne({ _id: contactId });
        if (response.deletedCount > 0) {
            res.status(204).send(); // Respond with status 204 (no content).
        } else {
            res.status(404).json('Contact has been deleted');
        }
    } catch (error) {
        res.status(500).json(`Error: ${error.message}`);
    }
};

// Export the functions so they can be used in other parts of the application.
module.exports = {
    getAll,
    getSingle,
    CreateContact,
    UpdateContact,
    deleteContact
};
