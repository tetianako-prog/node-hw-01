const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require('./contacts.js')
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv

let result = null
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      result = await listContacts()
      console.table(result)
      break

    case 'get':
      result = await getContactById(id)
      console.table(result)
      break

    case 'add':
      result = await addContact(name, email, phone)
      console.table(result)
      break

    case 'remove':
      result = await removeContact(id)
      console.table(result)
      break

    default:
      console.warn('\x1B[31m Unknown action type!')
  }
}

invokeAction(argv)
