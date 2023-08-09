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

// PutDb is used to save the content of the editor to the indexedDB database
export const putDb = async (content) => {
  const putdb = await openDB('jate', 1);
  // calls putdb when the db opens
  const tx = putdb.transaction('jate', 'readwrite');
  // opens a transaction on the jate object store
  const store = tx.objectStore('jate');
  // opens the jate object store
  const request = store.put({value: content, id:1});
  // puts the content of the editor into the jate object store
  const result = await request;
  // waits for the request to complete
  console.log (result);
};


export const getDb = async () => {
  console.log('GETTING DB');
  const getDb = await openDB('jate', 1);
  // calls getdb when the db opens
  const tx = getDb.transaction('jate', 'readonly');
  // opens a transaction on the jate object store
  const store = tx.objectStore('jate');
  // opens the jate object store
  const request = store.get(1);
  // gets the content of the editor from the jate object store
  const result = await request;
  // waits for the request to complete
  console.log(result);
  return result;
};
initdb();
