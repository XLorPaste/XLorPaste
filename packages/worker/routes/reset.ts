import { defineEventHandler } from 'h3';

import { subStore, delStore } from '~/storage';

export default defineEventHandler(async () => {
  const keys = (await XLORPASTE.list()).keys.map((k: any) => k.name);
  console.log(keys);
  for (const key of keys) {
    if (key.startsWith('sub/')) {
      await subStore.setItem(key.slice(4), await XLORPASTE.get(key));
      await XLORPASTE.delete(key);
    } else if (key.startsWith('del/')) {
      await delStore.setItem(key.slice(4), await XLORPASTE.get(key));
      await XLORPASTE.delete(key);
    }
  }
  return { status: 'ok', keys };
});
