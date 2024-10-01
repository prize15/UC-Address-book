
class Contact {
    constructor(firstName, lastName, address, city, state, zip, phoneNumber, email) {
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
const addressBook = new AddressBook();

const contact1 = new Contact('Prize', 'Aseeja', 'SGNR','GHARPE' ,'IN', '12345', '555-1234', 'prize15092000@gmail.com');
const contact2 = new Contact('Kunal', 'Aseeja', 'SGNR', 'GHARPE', 'IN', '67890', '555-5678', 'abhiaseeja@gmail.com');

addressBook.addContact(contact1);
addressBook.addContact(contact2);

console.log(addressBook.listContacts());
