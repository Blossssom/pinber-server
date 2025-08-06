import * as crypto from 'crypto';

export const generateBookmark = (data, secret_key: string): string => {
  try {
    const jsonString = JSON.stringify(data);
    const key = crypto.scryptSync(secret_key, 'salt', 32);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-ctr', key, iv);
    let encrypted = cipher.update(jsonString, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    const combined = iv.toString('hex') + ':' + encrypted;
    return Buffer.from(combined).toString('base64');
  } catch (error) {
    console.error(`Failed to generate bookmark: ${error}`);
    return Buffer.from(JSON.stringify(data)).toString('base64');
  }
};
