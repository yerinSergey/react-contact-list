import config from '../../config';

const { baseUrl } = config;

class ContactsService {
	getAll() {
		return fetch(`${baseUrl}/contacts`);
	}

	getById(id) {
		return fetch(`${baseUrl}/contacts/${id}`);
	}

	create(data) {
		return fetch(`${baseUrl}/contacts`, {
			method: 'POST',
			mode: 'cors',
			cache: 'no-cache',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
			},
			redirect: 'follow',
			referrer: 'no-referrer',
			body: JSON.stringify(data),
		})
	}

	update(id, data) {
		return fetch(`${baseUrl}/contacts/${id}`, {
			method: 'PUT',
			mode: 'cors',
			cache: 'no-cache',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
			},
			redirect: 'follow',
			referrer: 'no-referrer',
			body: JSON.stringify(data),
		})
	}

	delete(id) {
		return fetch(`${baseUrl}/contacts/${id}`, {
			method: 'DELETE',
			mode: 'cors',
			cache: 'no-cache',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
			},
			redirect: 'follow',
			referrer: 'no-referrer',
		})
	}
}

export default new ContactsService();
