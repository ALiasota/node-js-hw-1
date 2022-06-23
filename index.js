const path = require("path");
const contactsPath = path.resolve("contacts.js");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require(contactsPath);

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts().then((list) => console.log(list));
      break;

    case "get":
      getContactById(id).then((contact) => console.log(contact));
      break;

    case "add":
      addContact({ name, email, phone }).then((list) => console.log(list));
      break;

    case "remove":
      removeContact(id).then((list) => console.log(list));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
