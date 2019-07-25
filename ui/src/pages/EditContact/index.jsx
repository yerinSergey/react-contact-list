import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

import ContactForm from '../../components/ContactForm';
import Container from '../../components/Container';
import contactsService from '../../services/contacts';

class EditContact extends Component {
	state = {
		isLoading: false,
		contact: {},
	}

	async componentWillMount() {
		document.title = 'Edit Contact';
		await this.loadContact();

		this.setState({ isLoading: true });
	}

	async loadContact() {
		const result = await contactsService.getById(this.props.match.params.id);
		const contact = await result.json();
		this.setState({ contact, isLoading: false });
	}

	renderActionButtons() {
		return [
			<Link to="/" className="btn btn-outline-light cancel-btn" key="Cancel">
				Cancel
			</Link>,
			<button type="submit" form="custom-form" className="btn btn-light" key="Save">
				Save
			</button>
		];
	}

	handleSubmit = async (data) => {
		await contactsService.update(this.props.match.params.id, data);
		this.props.history.push('/');
	}

	render() {
		const { name, phone } = this.state.contact;
		const { isLoading } = this.state;
		return (
			<Container title="Edit Contact" actionButtons={this.renderActionButtons()}>
				{isLoading ? <ContactForm name={name} phone={phone} onSubmit={this.handleSubmit}/> : null}
			</Container>
		);
	}
}

export default withRouter(EditContact)
