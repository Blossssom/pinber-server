import * as crypto from 'crypto';

export const decodeBookmark = <T>(bookmark: string, secret_key: string): T => {
  try {
    const combined = Buffer.from(bookmark, 'base64').toString();
    const [ivHex, encrypted] = combined.split(':');

    if (!ivHex || !encrypted) {
      throw new Error('Invalid bookmark format');
    }

    const key = crypto.scryptSync(secret_key, 'salt', 32);
    const iv = Buffer.from(ivHex, 'hex');
    const decipher = crypto.createDecipheriv('aes-256-ctr', key, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return JSON.parse(decrypted) as T;
  } catch (error) {
    try {
      const decoded = Buffer.from(bookmark, 'base64').toString();
      return JSON.parse(decoded) as T;
    } catch (err) {
      throw new Error(`Failed to decode bookmark: ${err} ${error}`);
    }
  }
};
