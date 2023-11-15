import { openDB } from 'idb'
import { Workbox } from 'workbox-window';
import { getDb, putDb } from './database';
import Editor from './editor';
import './database';
import '../css/style.css';


getDb().then((data) => {
  console.log('Data from IndexedDB:', data);
});

const newData = 'Some new content';
putDb(newData).then(() => {
  console.log('Data added to IndexedDB');
});

const dbPromise = openDB('text-editor-db', 1, {
  upgrade(db) {
    db.createObjectStore('notes', { keyPath: 'id', autoIncrement: true });
  },
});


const main = document.querySelector('#main');
main.innerHTML = '';

const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
  main.appendChild(spinner);
};

const editor = new Editor();

if (typeof editor === 'undefined') {
  loadSpinner();
}

// Check if service workers are supported
if ('serviceWorker' in navigator) {
  // register workbox service worker
  const workboxSW = new Workbox('/src-sw.js');
  workboxSW.register();
} else {
  console.error('Service workers are not supported in this browser.');
}
