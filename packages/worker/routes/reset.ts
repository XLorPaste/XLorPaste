import { defineEventHandler } from 'h3';

import { storage, subStore, delStore } from '~/storage';

export default defineEventHandler(async () => {
  const keys = await storage.getKeys();
  console.log(keys);
  for (const key of keys) {
    if (key.startsWith('sub/')) {
      await subStore.setItem(key.slice(4), await storage.getItem(key));
    } else if (key.startsWith('del/')) {
      await delStore.setItem(key.slice(4), await storage.getItem(key));
    }
  }
  return { status: 'ok' };
});
