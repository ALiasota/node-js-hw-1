const fs = require("fs").promises;
const uniqid = require("uniqid");
const path = require("path");
const contactsPath = path.resolve("db", "contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");

    return JSON.parse(data);
  } catch (err) {
    console.log(err.message);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");

    const contacts = JSON.parse(data);

    return contacts.find(({ id }) => id === contactId);
  } catch (err) {
    console.log(err.message);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const newContacts = JSON.stringify(
      contacts.filter(({ id }) => id !== contactId),
      null,
      " "
    );

    const write = await fs.writeFile(
      contactsPath,
      newContacts,
      "utf8",
      (err) => {
        if (err) throw err;

        console.log("Done");
      }
    );
    const newData = await fs.readFile(contactsPath, "utf-8");

    return JSON.parse(newData);
  } catch (err) {
    console.log(err.message);
  }
}

async function addContact({ name, email, phone }) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    contacts.push({ id: uniqid(), name, email, phone });
    const newContacts = JSON.stringify(contacts, null, " ");

    const write = await fs.writeFile(
      contactsPath,
      newContacts,
      "utf8",
      (err) => {
        if (err) throw err;

        console.log("Done");
      }
    );

    const newData = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(newData);
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
