import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.join(__dirname, "/contacts.json");

export async function getAll() {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
}

export async function getById(id) {
    const contacts = await getAll();
    const result = contacts.find(item => item.id === id);
    return result || null;
}

export async function add(data) {
    const contacts = await getAll();
    const newContact = {
        id: nanoid(),
        ...data, 
    };

    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
}

export async function updateById(id, data) {
    const contacts = await getAll();
    const index = contacts.findIndex(item => item.id === id);
    if(index === -1){
        return null; 
    }
    contacts[index] = {id, ...data};
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[index];
}

export async function deleteById(id) {
    const contacts = await getAll();
    const index = contacts.findIndex(item => item.id === id)
    if(index === -1 ){
        return null; 
    }
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result; 
}
