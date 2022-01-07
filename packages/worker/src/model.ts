import type { Submission } from 'xlorpaste';
import { KvStore } from './store';
import { randomString } from './utils';

const subStore = new KvStore<Submission>(XLORPASTE, 'sub');

const delStore = new KvStore<string>(XLORPASTE, 'del');

export async function updateSub(
  lang: string,
  body: string,
  timestamp: string = new Date().toISOString(), // Compatible with old version
  options: Pick<Submission, 'pass' | 'once'> = {}
) {
  const token = await genToken(subStore);
  const delToken = await genToken(delStore, 12);
  const sub = { token, lang, body, timestamp, delete: delToken, ...options };
  await subStore.put(token, sub);
  await delStore.put(delToken, token);
  return { token, lang, body, timestamp, delete: delToken, once: !!options.once };
}

export async function getSub(key: string) {
  const sub = await subStore.get(key);
  if (!!sub?.once) {
    await delStore.remove(sub.delete);
    await subStore.remove(key);
  }
  return sub;
}

export async function removeSub(delToken: string) {
  const token = await delStore.get(delToken);
  if (!!token) {
    await delStore.remove(delToken);
    await subStore.remove(token);
    return { status: 'OK' };
  } else {
    return { status: 'ERROR' };
  }
}

async function genToken<T>(store: KvStore<T>, len?: number) {
  let token = randomString();
  while (await store.has(token)) {
    token = randomString(len);
  }
  return token;
}
