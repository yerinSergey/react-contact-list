import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles.css';

export default class Container extends Component {
	static propTypes = {
		title: PropTypes.string.isRequired,
		subTitle: PropTypes.string,
		actionButtons: PropTypes.arrayOf(PropTypes.element),
	};

	static defaultProps = {
		actionButtons: [],
	};

	render() {
		const { title, subTitle, actionButtons, children } = this.props;
		return (
			<main className="container">
				<header className="header">
					<div className="title-wrapper">
						<h1 className="title">{title}</h1>
						{subTitle ? <div className="sub-title">{subTitle}</div> : null}
					</div>
					<div className="button-groups">
						{actionButtons}
					</div>
				</header>
				<section>
					{children}
				</section>
			</main>
		);
	}
}
