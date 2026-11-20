import { parseBuffer, parseWebStream } from "music-metadata"; // Or 'music-metadata-browser'

export async function ExtractMetadata(arrayBuffer) {
  try {
    // Convert ArrayBuffer to Uint8Array/Buffer
    const blob = new Blob([arrayBuffer]);
    const stream = blob.stream(); // Returns ReadableStream<Uint8Array>

    // 2. Call parseWebStream
    const metadata = await parseWebStream(stream, {
      mimeType: "audio/mpeg",
    });

    console.log("metadataCommon", metadata);
    return metadata;
    // Get album art (if present)
    // const picture = metadata.common.picture?.[0];
    // if (picture) {
    //   // Convert to data URL for use in <img>
    //   const blob = new Blob([picture.data], { type: picture.format });
    //   const imageUrl = URL.createObjectURL(blob);
    // }
  } catch (error) {
    console.error("Failed to parse metadata:", error);
  }
}
