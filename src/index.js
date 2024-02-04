import { program } from "commander";
import { getAll, getById, add, updateById, deleteById } from "./contacts";

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

invokeAction(options);


async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await getAll();
      return console.log(allContacts);
      
    case "get":
      const oneContact = await getById(id);
      return console.log(oneContact);
      
    case "add":
      const newContact = await add({name, email, phone });
      return console.log(newContact);

    case "update":
      const updateContact = await updateById(id, {name, email, phone });
      return console.log(updateContact);

    case "remove":
      const removeContact = await deleteById(id);
      return console.log(removeContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}



