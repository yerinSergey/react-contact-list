import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import ContactList from './pages/ContactList';
import CreateContact from './pages/CreateContact';
import EditContact from './pages/EditContact';

import './App.css';

class App extends Component {
	render() {
		return (
			<Router>
				<Route exact path="/" component={ContactList}/>
				<Route path="/create" component={CreateContact}/>
				<Route path="/edit/:id" component={EditContact}/>
			</Router>
		);
	}
}

export default App;
