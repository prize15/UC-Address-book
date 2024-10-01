
class Contact {
    constructor(firstName, lastName, address, city, state, zip, phoneNumber, email) {
        this.setFirstName(firstName);
        this.setLastName(lastName);
        this.setAddress(address);
        this.setCity(city);
        this.setState(state);
        this.setZip(zip);
        this.setPhoneNumber(phoneNumber);
        this.setEmail(email);
    }

    setFirstName(firstName) {
        if (!/^[A-Z][a-zA-Z]{2,}$/.test(firstName)) {
            throw new Error('First Name should start with a capital letter and have at least 3 characters.');
        }
        this.firstName = firstName;
    }

    setLastName(lastName) {
        if (!/^[A-Z][a-zA-Z]{2,}$/.test(lastName)) {
            throw new Error('Last Name should start with a capital letter and have at least 3 characters.');
        }
        this.lastName = lastName;
    }

    setAddress(address) {
        if (!/^.{4,}$/.test(address)) {
            throw new Error('Address should have at least 4 characters.');
        }
        this.address = address;
    }

    setCity(city) {
        if (!/^.{4,}$/.test(city)) {
            throw new Error('City should have at least 4 characters.');
        }
        this.city = city;
    }

    setState(state) {
        if (!/^.{4,}$/.test(state)) {
            throw new Error('State should have at least 4 characters.');
        }
        this.state = state;
    }

    setZip(zip) {
        if (!/^\d{5}$/.test(zip)) {
            throw new Error('Zip should be a 5-digit number.');
        }
        this.zip = zip;
    }

    setPhoneNumber(phoneNumber) {
        if (!/^\d{3}-\d{4}$/.test(phoneNumber)) {
            throw new Error('Phone Number should be in the format 555-1234.');
        }
        this.phoneNumber = phoneNumber;
    }

    setEmail(email) {
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            throw new Error('Email is not valid.');
        }
        this.email = email;
    }
}

class AddressBook {
    constructor(name) {
        this.name = name;
        this.contacts = [];
    }

    addContact(contact) {
        if (this.isDuplicate(contact.firstName, contact.lastName)) {
            throw new Error('Duplicate contact found. Contact not added.');
        }
        this.contacts.push(contact);
    }

    isDuplicate(firstName, lastName) {
        return this.contacts.some(contact => contact.firstName === firstName && contact.lastName === lastName);
    }

    findContactByName(firstName, lastName) {
        return this.contacts.find(contact => contact.firstName === firstName && contact.lastName === lastName);
    }

    removeContact(firstName, lastName) {
        this.contacts = this.contacts.filter(contact => contact.firstName !== firstName || contact.lastName !== lastName);
    }

    listContacts() {
        return this.contacts;
    }

    editContact(firstName, lastName, newDetails) {
        const contact = this.findContactByName(firstName, lastName);
        if (contact) {
            if (newDetails.firstName) contact.setFirstName(newDetails.firstName);
            if (newDetails.lastName) contact.setLastName(newDetails.lastName);
            if (newDetails.address) contact.setAddress(newDetails.address);
            if (newDetails.city) contact.setCity(newDetails.city);
            if (newDetails.state) contact.setState(newDetails.state);
            if (newDetails.zip) contact.setZip(newDetails.zip);
            if (newDetails.phoneNumber) contact.setPhoneNumber(newDetails.phoneNumber);
            if (newDetails.email) contact.setEmail(newDetails.email);
        } else {
            throw new Error('Contact not found.');
        }
    }

    deleteContact(firstName, lastName) {
        const contactIndex = this.contacts.findIndex(contact => contact.firstName === firstName && contact.lastName === lastName);
        if (contactIndex !== -1) {
            this.contacts.splice(contactIndex, 1);
        } else {
            throw new Error('Contact not found.');
        }
    }

    countContacts() {
        return this.contacts.reduce((count) => count + 1, 0);
    }

    findContactsByCity(city) {
        return this.contacts.filter(contact => contact.city === city);
    }

    findContactsByState(state) {
        return this.contacts.filter(contact => contact.state === state);
    }

    viewContactsByCity() {
        return this.contacts.reduce((result, contact) => {
            if (!result[contact.city]) {
                result[contact.city] = [];
            }
            result[contact.city].push(contact);
            return result;
        }, {});
    }

    viewContactsByState() {
        return this.contacts.reduce((result, contact) => {
            if (!result[contact.state]) {
                result[contact.state] = [];
            }
            result[contact.state].push(contact);
            return result;
        }, {});
    }

    countContactsByCity() {
        return this.contacts.reduce((result, contact) => {
            result[contact.city] = (result[contact.city] || 0) + 1;
            return result;
        }, {});
    }

    countContactsByState() {
        return this.contacts.reduce((result, contact) => {
            result[contact.state] = (result[contact.state] || 0) + 1;
            return result;
        }, {});
    }
}

class AddressBookManager {
    constructor() {
        this.addressBooks = [];
    }

    createAddressBook(name) {
        const addressBook = new AddressBook(name);
        this.addressBooks.push(addressBook);
        return addressBook;
    }

    listAddressBooks() {
        return this.addressBooks;
    }
}

// Example usage:
try {
    const manager = new AddressBookManager();

    const personalBook = manager.createAddressBook('Personal');
    const workBook = manager.createAddressBook('Work');

    const contact1 = new Contact('Prize', 'Aseeja', 'SGNR', 'GHARPE', 'INDIA', '12345', '555-1234', 'prize15092000@gmail.com');
    const contact2 = new Contact('Kunal', 'Aseeja', 'SGNR', 'GHARPE', 'INDIA', '67890', '555-5678', 'abhiaseeja@gmail.com');

    personalBook.addContact(contact1);
    workBook.addContact(contact2);

    console.log(manager.listAddressBooks());
    console.log(personalBook.listContacts());
    console.log(workBook.listContacts());

    // Editing a contact
    personalBook.editContact('Prize', 'Aseeja', { city: 'NewCity', phoneNumber: '555-9999' });
    console.log(personalBook.listContacts());

    // Deleting a contact
    personalBook.deleteContact('Prize', 'Aseeja');
    console.log(personalBook.listContacts());

    // Counting contacts
    console.log(`Number of contacts in Personal Address Book: ${personalBook.countContacts()}`);
    console.log(`Number of contacts in Work Address Book: ${workBook.countContacts()}`);

    // Searching contacts by city
    console.log(`Contacts in city 'GHARPE':`, personalBook.findContactsByCity('GHARPE'));

    // Searching contacts by state
    console.log(`Contacts in state 'INDIA':`, personalBook.findContactsByState('INDIA'));

    // Viewing contacts by city
    console.log('Contacts grouped by city:', personalBook.viewContactsByCity());

    // Viewing contacts by state
    console.log('Contacts grouped by state:', personalBook.viewContactsByState());

    // Counting contacts by city
    console.log('Number of contacts by city:', personalBook.countContactsByCity());

    // Counting contacts by state
    console.log('Number of contacts by state:', personalBook.countContactsByState());

    // Trying to add a duplicate contact
    personalBook.addContact(contact1); // This will throw an error
} catch (error) {
    console.error(error.message);
}
