export const MAX_PHOTOS = 5;
export const MAX_SOURCE_BYTES = 8 * 1024 * 1024; // 8 MB
export const MAX_LONG_EDGE = 2400;
export const JPEG_QUALITY = 0.82;

export const ACCEPTED_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
];

export const ACCEPT_ATTR = ACCEPTED_TYPES.join(",") + ",.heic,.heif";

export function isAcceptedImage(file: File): boolean {
  if (file.type && ACCEPTED_TYPES.includes(file.type.toLowerCase())) return true;
  // some browsers report an empty type for .heic/.heif
  return /\.(jpe?g|png|webp|heic|heif)$/i.test(file.name);
}

/**
 * Resize/compress client-side with canvas.
 * - never enlarges
 * - preserves aspect ratio; EXIF orientation is applied by createImageBitmap/decode
 * - falls back to the original file when the browser can't decode (e.g. HEIC on Chrome)
 */
export async function compressImage(file: File): Promise<File> {
  try {
    const bitmap = await createImageBitmap(file);
    const { width, height } = bitmap;
    const scale = Math.min(1, MAX_LONG_EDGE / Math.max(width, height));
    const w = Math.round(width * scale);
    const h = Math.round(height * scale);

    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.drawImage(bitmap, 0, 0, w, h);
    bitmap.close?.();

    const type = "image/jpeg";
    const blob: Blob | null = await new Promise((res) => canvas.toBlob(res, type, JPEG_QUALITY));
    if (!blob) return file;
    // keep the original when compression didn't help and it's already a web format
    if (blob.size >= file.size && scale === 1 && file.type !== "image/heic" && file.type !== "image/heif") {
      return file;
    }
    const name = file.name.replace(/\.[^.]+$/, "") + ".jpg";
    return new File([blob], name, { type, lastModified: Date.now() });
  } catch {
    return file;
  }
}

export function fileKey(f: File) {
  return `${f.name}|${f.size}|${f.lastModified}`;
}
