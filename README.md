# Developer challenge
In this challenge you are going to build a contact list as a single-page-application. You will also build a api in the backend to store the contacts in. There is a mockup of the ui that you will need to mimic. Have a look here `https://marvelapp.com/b607214/screen/54554703`.

### To complete this challenge the following must be implemented:
* Required tasks UI:

	* Build the interface exactly as in the provided mockup
	* Sort the list by name when clicking name-header
		* Default sorting is A-Z
		* You can do the sorting fronted or backend
	* Handle errors (i.e. missing name)
		* If an error occurs it should be visible to the user
	* When successfully saving a contact the user should get redirected back to the list
	* Buttons in the header sould have some kind of hover-state
	* Write at least one test

* Bonus tasks UI:

	* Add the ability to delete contacts (from list and/or from contact details)
	* Placeholder in the list for when there are no contacts
	* Name-field is focused when opening the edit-view
	* Pressing enter in the edit-view saves the contact
	* Update the browser tab-title when the app state changes "Contacts","Edit contact","Create contact"

* Required tasks API:

	* A way to get a list of all contacts
	* A way to create a new a contact
	* A way to update a contact based on id
	* Write at least one test

* Bonus tasks API:

	* A way to delete contacts


# Setup
This task requires node 10 to be installed. To get started you need to install all dependencies in both /ui and /server folders. To help solve this task you have some preinstalled tools at your disposal. In the ui folder you have a webpack environment set up with live-reload. To start this simply navigate to the ui folder and run `npm start`. This will open a new browser tab with the ui. You will also find font-awesome and the needed roboto-font already set up. To use Font-awesome:	
```html
<b className='fa fa-chevron-down'>
```
Also see https://fontawesome.com/icons

On the server side we have prepared an express environment, but you are free to use whatever framework you want. We also have a database with a simple api set up that you will use to store contacts (se documentation below). To start the server navigate to the server folder and run `npm start`. The application will restart itself when you save a file. Server is running on localhost:9898. Navigate to `http://localhost:9898/contacts` in your browser.

Jest is preinstalled in both folders for testing. Run `npm test` to start it. you are free to use any other testing library to solve the test-tasks.

You can of corse use any public npm package to complete this challenge.

# Database api
A contact will look like this:
```json
{
	"id": "hFbt6Rlic",
	"name": "John Wilson",
	"phone": "1234567"
}
```

To use the api, require the following:
```javascript
const { findContacts, createContact, editContact, deleteContact } = require('./database');
```

*Note:*
If you need to restore the database to its initial state you can run `npm run restore` in the /server folder. The api must be restarted after this.

## Methods

### findContacts() - *returns a promise with all contacts*

### createContact(**data**) - *creates a contact with provided **data**. returns a promise with all contacts*

### editContact(**id**, **data**) - *updates the contact matching the provided **id** with provided **data**. returns a promise with all contacts*

### deleteContact(**id**) - *removes the contact matching the provided **id**. returns a promise with all contacts*
