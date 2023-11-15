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
const dbPromise = idb.openDB('text-editor-db', 1, {
  upgrade(db) {
    db.createObjectStore('notes', { keyPath: 'id', autoIncrement: true });
  },
});

export const putDb = async (content) => {
  try {
    const db = await dbPromise;
    const tx = db.transaction('notes', 'readwrite');
    const store = tx.objectStore('notes');

    const id = await store.add({ content, timestamp: new Date() });

    console.log(`Content added to the database with ID: ${id}`);
  } catch (error) {
    console.error('Error adding content to the database:', error);
    throw error; 
  }
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
    const db = await dbPromise;
    const tx = db.transaction('notes', 'readonly');
    const store = tx.objectStore('notes');

    // Retrieve all content from the database
    const allContent = await store.get(1);

    console.log('All content retrieved from the database:', allContent);
    return allContent;
  } catch (error) {
    console.error('Error retrieving content from the database:', error);
    throw error; // Optionally rethrow the error to handle it in the calling code
  }
};

initdb();
