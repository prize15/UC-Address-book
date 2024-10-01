
class Contact {
    constructor(firstName, lastName, address, city, state, zip, phoneNumber, email) {
        if (!/^[A-Z][a-zA-Z]{2,}$/.test(firstName)) {
            throw new Error('First Name should start with a capital letter and have at least 3 characters.');
        }
        if (!/^[A-Z][a-zA-Z]{2,}$/.test(lastName)) {
            throw new Error('Last Name should start with a capital letter and have at least 3 characters.');
        }
        if (!/^.{4,}$/.test(address)) {
            throw new Error('Address should have at least 4 characters.');
        }
        if (!/^.{4,}$/.test(city)) {
            throw new Error('City should have at least 4 characters.');
        }
        if (!/^.{4,}$/.test(state)) {
            throw new Error('State should have at least 4 characters.');
        }
        if (!/^\d{5}$/.test(zip)) {
            throw new Error('Zip should be a 5-digit number.');
        }
        if (!/^\d{3}-\d{4}$/.test(phoneNumber)) {
            throw new Error('Phone Number should be in the format 555-1234.');
        }
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            throw new Error('Email is not valid.');
        }

        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.phoneNumber = phoneNumber;
        this.email = email;
    }
}

class AddressBook {
    constructor() {
        this.contacts = [];
    }

    addContact(contact) {
        this.contacts.push(contact);
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
}

// Example usage:
try {
    const addressBook = new AddressBook();

    const contact1 = new Contact('Prize', 'Aseeja', 'SGNR', 'GHARPE', 'IN', '12345', '555-1234', 'prize15092000@gmail.com');
    const contact2 = new Contact('Kunal', 'Aseeja', 'SGNR', 'GHARPE', 'IN', '67890', '555-5678', 'abhiaseeja@gmail.com');

    addressBook.addContact(contact1);
    addressBook.addContact(contact2);

    console.log(addressBook.listContacts());
} catch (error) {
    console.error(error.message);
}
