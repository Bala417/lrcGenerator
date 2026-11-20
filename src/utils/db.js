// db.js
import { openDB } from "idb";

export const dbPromise = openDB("lrc-tool", 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("audio")) db.createObjectStore("audio");
    if (!db.objectStoreNames.contains("draft")) db.createObjectStore("draft");
  },
});
