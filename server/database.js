import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  openDB('contact', 1, {
    upgrade(db) {
      db.createObjectStore('contacts', { keyPath: 'id', autoIncrement: true });
    },
  })
    .then((contactDb) => {
      const tx = contactDb.transaction('contacts', 'readwrite');
      const store = tx.objectStore('contacts');
      return store.add({ content, timestamp: new Date() });
    })
    .then((result) => {
      console.log('Content added to the database with ID:', result);
      return result;
    })
    .catch((error) => {
      console.error('Error adding content to the database:', error);
    });
 
  console.error('putDb not implemented');}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');

  const contactDb = await openDB('contact', 1);

  const tx = contactDb.transaction('contacts', 'readonly'); // Use 'contacts' instead of 'contact'

  const store = tx.objectStore('contacts'); // Use 'contacts' instead of 'contact'

  const request = store.getAll();

  const result = await request;

  console.log('result.value', result.value);
  return result;
};
  
  
console.error('getDb not implemented');
  

initdb();