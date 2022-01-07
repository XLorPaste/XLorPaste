import { client } from 'xlorpaste';

const xlorpaste = client();

export async function upload(lang: string, body: string) {
  return await xlorpaste.upload(lang, body);
}

export async function fetch(token: string) {
  return await xlorpaste.fetch(token);
}
