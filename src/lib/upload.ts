import { writeFile, mkdir } from 'node:fs/promises';
import { join, extname } from 'node:path';

const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
]);

const ALLOWED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);

// 5 MB maximum upload limit to protect against denial-of-service / memory exhaustion
export const MAX_UPLOAD_SIZE_BYTES = 5 * 1024 * 1024;

/**
 * Saves a validated local image file to the public/uploads directory.
 * Enforces size limits, strict MIME inspection, extension whitelisting, and path sanitization.
 * Returns the public relative URL string e.g. "/uploads/1723456789-photo.jpg".
 */
export async function saveUploadedImage(file: File): Promise<string | null> {
  if (!file || file.size === 0 || !file.name) {
    return null;
  }

  // 1. Enforce size limit (5MB)
  if (file.size > MAX_UPLOAD_SIZE_BYTES) {
    console.error(`Upload rejected: file size (${(file.size / 1024 / 1024).toFixed(2)} MB) exceeds 5MB limit`);
    return null;
  }

  // 2. Enforce MIME type
  if (!ALLOWED_MIME_TYPES.has(file.type)) {
    console.error(`Upload rejected: unsupported MIME type "${file.type}"`);
    return null;
  }

  // 3. Validate file extension
  const ext = extname(file.name).toLowerCase();
  if (!ALLOWED_EXTENSIONS.has(ext)) {
    console.error(`Upload rejected: disallowed file extension "${ext}"`);
    return null;
  }

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 4. Sanitize filename: strip path separators, non-alphanumeric chars
    const baseName = file.name
      .replace(/\.[^/.]+$/, '')
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .slice(0, 50); // limit filename length
    const timestamp = Date.now();
    const filename = `${timestamp}-${baseName}${ext}`;

    // Target path inside public/uploads
    const uploadsDir = join(process.cwd(), 'public', 'uploads');

    // Ensure uploads folder exists
    await mkdir(uploadsDir, { recursive: true });

    const filePath = join(uploadsDir, filename);
    await writeFile(filePath, buffer);

    return `/uploads/${filename}`;
  } catch (error) {
    console.error('Failed to save uploaded image:', error);
    return null;
  }
}
