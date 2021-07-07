const fs = require('fs/promises')
const path = require('path')
const { v4: uuidv4 } = require('uuid')

const contactsPath = path.join(__dirname, 'db', 'contacts.json')

async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath, 'utf8')
    return JSON.parse(contacts)
  } catch (e) {
    console.error(e.message)
  }
}

async function getContactById(contactId) {
  try {
    const contactsFromFile = await fs.readFile(contactsPath, 'utf8')
    const contacts = JSON.parse(contactsFromFile)
    const contact = contacts.find(item => item.id === contactId)
    return contact
  } catch (e) {
    console.error(e.message)
  }
}

async function removeContact(contactId) {
  try {
    const contactsFromFile = await fs.readFile(contactsPath, 'utf8')
    const contacts = JSON.parse(contactsFromFile)
    const newContacts = contacts.filter(item => item.id !== contactId)
    await fs.writeFile(contactsPath, JSON.stringify(newContacts))
    return newContacts
  } catch (e) {
    console.error(e.message)
  }
}

async function addContact(name, email, phone) {
  try {
    const contactsFromFile = await fs.readFile(contactsPath, 'utf8')
    const contacts = JSON.parse(contactsFromFile)
    const newContact = { id: uuidv4(), name, email, phone }
    contacts.push(newContact)
    await fs.writeFile(contactsPath, JSON.stringify(contacts))
    return contacts
  } catch (e) {
    console.error(e.message)
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
}
