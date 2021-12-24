import { KvStore } from './store';

interface Submission {
  token: string;
  lang: string;
  body: string;
}

const subStore = new KvStore<Submission>(XLORPASTE, 'sub');

export async function updateSub() {
  const sub = { token: 'key', lang: 'cpp', body: '123' }
  await subStore.put('key', sub)
  return sub
}

export async function getSub(key: string) {
  return await subStore.get(key);
}
