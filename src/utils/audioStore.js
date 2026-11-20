// audioStore.js
import { dbPromise } from "./db";

export async function saveAudio(file) {
  const buffer = await file?.arrayBuffer();
  await (
    await dbPromise
  ).put(
    "audio",
    {
      buffer,
      type: file.type,
      name: file.name,
      size: file.size,
    },
    "current",
  );
}

export async function loadAudio() {
  return (await dbPromise).get("audio", "current");
}

export async function clearAudio() {
  await (await dbPromise).delete("audio", "current");
}
