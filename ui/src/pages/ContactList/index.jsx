import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import Container from '../../components/Container';
import contactsService from '../../services/contacts';

import './style.css';

export default class ContactList extends Component {
	state = {
		contacts: [],
		isLoading: false,
		order: 1,
	}

	async componentWillMount() {
		document.title = 'Contact List';
		await this.fetchContacts();

		this.setState({ isLoading: true });
	}

	async fetchContacts() {
		const { order } = this.state;
		const response = await contactsService.getAll();
		const contacts = await response.json();

		return this.setState({ contacts: this.sortContacts(order, contacts), isLoading: false });
	}

	handleDelete = async ({ target }) => {
		await contactsService.delete(target.dataset.id);

		this.fetchContacts();
	}

	sortContacts(order, contacts) {
		return contacts.sort((a, b) => {
			if (a.name > b.name) {
				return order ? 1 : -1;
			} else {
				return !order ? 1 : -1;
			}
		});
	}

	handleSort = () => {
		const { contacts, order } = this.state;
		const newOrder = +!order;

		this.setState({ contacts: this.sortContacts(newOrder, contacts), order: newOrder });
	}

	renderCells() {
		return this.state.contacts.map((contact) => (
			<tr key={contact.id}>
				<td width="40%">{contact.name}</td>
				<td width="40%">{contact.phone}</td>
				<td className="action-cell">
          <span>
             <Link to={`/edit/${contact.id}`} className="btn btn-link">
            Edit
          </Link>
          <button className="btn btn-link" data-id={contact.id} onClick={this.handleDelete}>
           <i className="far fa-trash-alt"/>
          </button>
          </span>
				</td>
			</tr>
		));
	}

	renderActionButtons() {
		return [
			<Link to="/create" className="btn btn-light py-2 px-5" key="create">
				Create
			</Link>
		];
	}

	render() {
		const { order, contacts } = this.state;
		return <Container title="Contacts" subTitle={`Showing ${contacts.length} contacts`}
											actionButtons={this.renderActionButtons()}>
			<table className="contacts-list table">
				<thead>
				<tr>
					<th className="column-title active-column-title" onClick={this.handleSort}>
						Name
						<i className={classNames('fas', { 'fa-caret-up': !order, 'fa-caret-down': order })}/>
					</th>
					<th className="column-title">Phone</th>
					<th></th>
				</tr>
				</thead>
				<tbody>
				{this.renderCells()}
				</tbody>
			</table>
		</Container>;
	}
}
