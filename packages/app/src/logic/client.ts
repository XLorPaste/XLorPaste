import { client, UploadResponse } from 'xlorpaste';
import { getAdminKey } from './admin';

const xlorpaste = client();

const lastSub = {
  lang: '',
  body: '',
  submission: undefined as UploadResponse | undefined
};

export async function upload(lang: string, body: string) {
  if (lastSub.submission && lastSub.lang === lang && lastSub.body === body) {
    return lastSub.submission;
  }
  lastSub.submission = await xlorpaste.upload(lang, body);
  lastSub.lang = lang;
  lastSub.body = body;
  return lastSub.submission;
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
