import { createStorage, prefixStorage, Storage } from 'unstorage';
import cloudflareKVDriver from 'unstorage/drivers/cloudflare-kv';
import memoryDriver from 'unstorage/drivers/memory';

import { randomString } from './utils';

export const storage = createStorage({
  driver: __LOCAL__ ? memoryDriver() : cloudflareKVDriver({ binding: 'XLORPASTE' })
});

export const subStore = prefixStorage(storage, 'sub');

export const delStore = prefixStorage(storage, 'del');

export async function genToken(store: Storage, len?: number) {
  let token = randomString(len);
  while (await store.hasItem(token)) {
    token = randomString(len);
  }
  return token;
}
