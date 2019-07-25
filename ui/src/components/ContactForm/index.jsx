import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import withValidation from '../../common/validation/with-validation';
import { createValidator } from '../../common/validation/validator';
import { validateFullName, validatePhone, validateRequired } from '../../common/validation/validators';

import './styles.css';

const validator = createValidator((state, addError) => {
	validateRequired('name', state.name, addError);
	validateFullName('name', state.name, addError);
	validateRequired('phone', state.phone, addError);
	validatePhone('phone', state.phone, addError);
});

class ContactForm extends Component {
	static propTypes = {
		name: PropTypes.string,
		phone: PropTypes.string,
		onSubmit: PropTypes.func,
	};

	static defaultProps = {
		onSubmit: () => {},
	};
	constructor(props) {
		super(props);
		this.state = {
			name: props.name,
			phone: props.phone,
		};
	}


	handleChange = (event) => {
		const { name, value } = event.target;
		this.setState({
			[name]: value,
		})
	}

	handleSubmit = (event) => {
		event.preventDefault();
		const isValid = this.props.validate(this.state);

		if(isValid) {
			this.props.onSubmit(this.state);
		}
	}

	renderErrors(field) {
		const validationErrors = this.props.getValidationErrors(field);
		let errors;

		if (validationErrors.length) {
			errors = validationErrors.map(item => item.message);
			return (
				<div className="help-block">
					<div className="text-danger">
						<i>{errors[0]}</i>
					</div>
				</div>
			);
		}

		return null;
	}

	render() {
		const { name, phone } = this.state;
		return (
			<form onSubmit={this.handleSubmit} id="custom-form">
				<div className="row">
					<div className="form-group col-5">
						<label htmlFor="full-name">Full name</label>
						<input
							autoFocus
							type="text"
							name="name"
							value={name}
							onChange={this.handleChange}
							className={classNames('form-control', {
								'is-invalid': !this.props.isValid('name'),
							})}
							id="full-name"
						/>
						{this.renderErrors('name')}
					</div>
					<div className="form-group col-5">
						<label htmlFor="phone-number">Phone number</label>
						<input
							type="tel"
							name="phone"
							value={phone}
							onChange={this.handleChange}
							className={classNames('form-control', {
								'is-invalid': !this.props.isValid('phone'),
							})}
							id="phone-number"
						/>
						{this.renderErrors('phone')}
					</div>
				</div>
			</form>
		);
	}
}

export default withValidation(validator)(ContactForm);
