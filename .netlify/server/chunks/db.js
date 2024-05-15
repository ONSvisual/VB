import Dexie from "dexie";
const db = new Dexie("VB");
db.version(1).stores({
  Templates: "chartName",
  // Primary key and indexed props
  Projects: "projectName"
});
export {
  db as d
};
