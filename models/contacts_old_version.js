const fs = require("fs/promises");
const path = require("node:path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve("./models/contacts.json");

async function readDb() {
  const dbRaw = await fs.readFile(contactsPath, { encoding: "utf8" });
  const db = JSON.parse(dbRaw);
  return db;
}
async function writeDB(data) {
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
}

const listContacts = async () => {
  try {
    const data = await readDb();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await readDb();

    return data.find((item) => item.id == contactId);
  } catch (error) {
    console.error(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await readDb();

    const index = data.findIndex((item) => item.id == contactId);
    if (index !== -1) {
      const removed = data.splice(index, 1);
      await writeDB(data);
      return removed;
    }

    return null;
  } catch (error) {
    console.error(error);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const data = await readDb();

    // const lastContactId = data.slice(-1).find((el) => el).id;
    const id = nanoid();
    // const id = JSON.stringify(Number(lastContactId) + 1);
    const newContact = {
      id: id,
      name,
      email,
      phone,
    };
    // const updateContacts = [...data, newContact];
    data.push(newContact);
    await writeDB(data);

    return newContact;
  } catch (error) {
    console.error(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const data = await readDb();

    const result = data.find((item) => item.id === contactId);
    if (result) {
      Object.assign(result, body);

      await writeDB(data);
    }
    return result;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
