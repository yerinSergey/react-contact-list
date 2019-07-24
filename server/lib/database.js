const low = require('lowdb');
const shortid = require('shortid')
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync(__dirname+'/db.json');
const db = low(adapter);

const defaultState = {
	contacts: [
		{id: shortid.generate(), name: 'John Wilson', phone: ''},
		{id: shortid.generate(), name: 'Jane Wilson', phone: ''}
	]
};

db.defaults(defaultState).write();

exports.reset = () => {
	db.setState(defaultState).write();
};

const findContacts = () => {
	return db.get('contacts').value();
};

const createContact = data => {
	if(!data.name) {
		throw new Error('Contact name is required');
	}
	return db.get('contacts').push({ ...data, id: shortid.generate() }).write();
};

const editContact = async (id, data) => {
	if(!data.name) {
		throw new Error('Contact name is required');
	}
	await db.get('contacts').find({ id }).assign({ ...data, id }).write();

	return findContacts();
};

const deleteContact = async id => {
	await db.get('contacts').remove({ id }).write();

	return findContacts();
};

module.exports = {
	reset: exports.reset,
	findContacts,
	createContact,
	editContact,
	deleteContact
};