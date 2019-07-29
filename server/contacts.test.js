const request = require('supertest');

const app = require('./app');

describe('Router Contacts', () => {
	it('It should response the GET method', () => {
		return request(app).get('/contacts').then(response => {
			expect(response.statusCode).toBe(200);
		});
	});

	it('It should create contact', () => {
		const data = { name: 'John Snow', phone: '1234567890' };

		return request(app)
			.post('/contacts')
			.send(data)
			.then(response => {
				expect(response.statusCode).toBe(200);
				expect(response.body[response.body.length - 1].name).toEqual(data.name);
				expect(response.body[response.body.length - 1].phone).toEqual(data.phone);
		});
	});

	it('It should remove one contact', async(done) => {
		const { body: contacts }  = await request(app).get(`/contacts`);

		const { body: newContacts } = await request(app).delete(`/contacts/${contacts[0].id}`);

		expect(contacts.length - 1).toEqual(newContacts.length);
		done();
	});

	it('It should update one contact', async(done) => {
		const data = { name: 'Sergey', phone: '0987654321' };
		const { body: contacts }  = await request(app).get(`/contacts`);

		const { body: newContacts } = await request(app)
			.put(`/contacts/${contacts[0].id}`)
			.send(data);

		expect(newContacts[0].name).toEqual(data.name);
		expect(newContacts[0].phone).toEqual(data.phone);
		done();
	});

	it('It should return one contact', async(done) => {
		const { body: contacts }  = await request(app).get(`/contacts`);

		const { body: newContact } = await request(app)
			.get(`/contacts/${contacts[0].id}`);

		expect(newContact.id).toEqual(contacts[0].id);
		done();
	});
});
