import { KvStore } from './store';
import { randomString } from './utils';

interface Submission {
  token: string;
  lang: string;
  body: string;
}

const subStore = new KvStore<Submission>(XLORPASTE, 'sub');

export async function updateSub(lang: string, body: string) {
  const token = await genToken();
  const sub = { token, lang, body };
  await subStore.put(token, sub);
  return sub;
}

export async function getSub(key: string) {
  return await subStore.get(key);
}

async function genToken() {
  let token = randomString();
  while (await subStore.has(token)) {
    token = randomString();
  }
  return token;
}
