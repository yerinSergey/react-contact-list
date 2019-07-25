const router = require('express').Router();
const { findContacts, createContact, editContact, deleteContact, findById } = require('./lib/database');

router.get('/', (req, res) => {
	res.status(200).json(findContacts());
});

router.get('/:id', (req, res) => {
	res.status(200).json(findById(req.params.id));
});

router.post('/', (req, res) => {
	res.status(200).json(createContact(req.body));
});

router.put('/:id', async (req, res) => {
	const contacts = await editContact(req.params.id, req.body);

	res.status(200).json(contacts);
});

router.delete('/:id', async (req, res) => {
	const contacts = await deleteContact(req.params.id);

	res.status(200).json(contacts);
});

module.exports = router;
