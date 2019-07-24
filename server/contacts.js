const router = require('express').Router();
const { findContacts, createContact, editContact, deleteContact } = require('./lib/database');

router.get('/', (req, res) => {
	res.status(500).json({error: 'Please implement'});
});

module.exports = router;