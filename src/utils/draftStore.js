// draftStore.js
import { dbPromise } from "./db";

export async function saveDraft(draft) {
  await (await dbPromise).put("draft", draft, "current");
}

export async function loadDraft() {
  return (await dbPromise).get("draft", "current");
}
