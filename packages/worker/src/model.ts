import { KvStore } from './store';
import { randomString } from './utils';

interface Submission {
  token: string;
  delete: string;
  lang: string;
  body: string;

  // for security
  pass?: string;
  once?: boolean;
}

const subStore = new KvStore<Submission>(XLORPASTE, 'sub');

const delStore = new KvStore<string>(XLORPASTE, 'del');

export async function updateSub(
  lang: string,
  body: string,
  options: Omit<Submission, 'token' | 'lang' | 'body' | 'delete'> = {}
) {
  const token = await genToken(subStore);
  const delToken = await genToken(delStore);
  const sub = { token, lang, body, delete: delToken, ...options };
  await subStore.put(token, sub);
  await delStore.put(delToken, token);
  return { token, lang, body, delete: delToken, once: !!options.once };
}

export async function getSub(key: string) {
  const sub = await subStore.get(key);
  if (!!sub?.once) {
    await subStore.remove(key);
  }
  return sub;
}

export async function removeSub(delToken: string) {
  const token = await delStore.get(delToken);
  if (!!token) {
    await subStore.remove(token);
    return { status: 'OK' };
  } else {
    return { status: 'ERROR' };
  }
}

async function genToken<T>(store: KvStore<T>) {
  let token = randomString();
  while (await store.has(token)) {
    token = randomString();
  }
  return token;
}
