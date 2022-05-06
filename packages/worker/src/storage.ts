import { createStorage, prefixStorage, Storage, defineDriver } from 'unstorage';
import memoryDriver from 'unstorage/drivers/memory';

import { randomString } from './utils';

export async function genToken(store: Storage, len?: number) {
  let token = randomString(len);
  while (await store.hasItem(token)) {
    token = randomString(len);
  }
  return token;
}

const cloudflareKVDriver = defineDriver((opts?: { binding: KVNamespace }) => {
  const binding = opts?.binding!;

  async function getKeys(base?: string) {
    const kvList = await binding.list({ prefix: base });
    return kvList.keys.map((key: any) => key.name);
  }

  return {
    async hasItem(key) {
      return (await binding.get(key)) !== null;
    },
    getItem(key) {
      return binding.get(key);
    },
    setItem(key, value) {
      return binding.put(key, value);
    },
    removeItem(key) {
      return binding.delete(key);
    },
    // TODO: use this.getKeys once core is fixed
    getKeys,
    async clear() {
      const keys = await getKeys();
      await Promise.all(keys.map((key: any) => binding.delete(key)));
    }
  };
});

export const storage = createStorage({
  driver: __DEV__ ? memoryDriver() : cloudflareKVDriver({ binding: XLORPASTE })
});

export const subStore = prefixStorage(storage, 'sub');

export const delStore = prefixStorage(storage, 'del');
