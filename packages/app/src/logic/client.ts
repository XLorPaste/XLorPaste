import { client } from 'xlorpaste';
import { getAdminKey } from './admin';

const xlorpaste = client();

export async function upload(lang: string, body: string) {
  return await xlorpaste.upload(lang, body);
}

export async function fetch(token: string) {
  return await xlorpaste.fetch(token);
}

export async function list() {
  const key = getAdminKey();
  if (key && key.length > 0) {
    return await xlorpaste.list(key);
  } else {
    return [];
  }
}
