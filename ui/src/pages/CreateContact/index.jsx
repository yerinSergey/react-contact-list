import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ContactForm from '../../components/ContactForm';

import Container from '../../components/Container';
import contactsService from "../../services/contacts";

export default class CreateContact extends Component {
	componentWillMount() {
		document.title = 'Create Contact';
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
		await contactsService.create(data);
		this.props.history.push('/');
	}

	render() {
		return (
			<Container title="Create Contact" actionButtons={this.renderActionButtons()}>
				<ContactForm onSubmit={this.handleSubmit}/>
			</Container>
		);
	}
}
