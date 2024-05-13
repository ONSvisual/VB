// db.js
import Dexie from 'dexie';

export const db = new Dexie('VB');
db.version(1).stores({
  Templates: 'chartName', // Primary key and indexed props
  Projects: 'projectName'
});
