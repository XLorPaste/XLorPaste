import { KvStore } from './store';
import { randomString } from './utils';

interface Submission {
  token: string;
  lang: string;
  body: string;

  // for security
  pass?: string;
  once?: boolean;
}

const subStore = new KvStore<Submission>(XLORPASTE, 'sub');

export async function updateSub(
  lang: string,
  body: string,
  options: Omit<Submission, 'token' | 'lang' | 'body'> = {}
) {
  const token = await genToken();
  const sub = { token, lang, body, ...options };
  await subStore.put(token, sub);
  return sub;
}

export async function getSub(key: string) {
  const sub = await subStore.get(key);
  if (!!sub?.once) {
    await subStore.remove(key);
  }
  return sub;
}

async function genToken() {
  let token = randomString();
  while (await subStore.has(token)) {
    token = randomString();
  }
  return token;
}
