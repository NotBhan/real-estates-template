import { writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';

/**
 * Saves a local image file to the public/uploads directory.
 * Returns the public relative URL string e.g. "/uploads/1723456789-photo.jpg".
 */
export async function saveUploadedImage(file: File): Promise<string | null> {
  if (!file || file.size === 0 || !file.name) {
    return null;
  }

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize filename and make unique
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const timestamp = Date.now();
    const filename = `${timestamp}-${sanitizedName}`;

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
