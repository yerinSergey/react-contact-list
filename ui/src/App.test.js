import React from 'react';
import { shallow } from 'enzyme';

import App from './App';
import ContactList from './pages/ContactList';

it('renders without crashing', () => {
		const wrapper = shallow(<App />);
		expect(wrapper.find(ContactList)).toBeDefined();
});
