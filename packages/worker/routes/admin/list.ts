import { defineEventHandler, getQuery } from 'h3';

import { subStore } from '~/storage';

export default defineEventHandler(async (event) => {
  const auth = event.req.headers['Authorization'] ?? event.req.headers['authorization'];
  const key = ADMIN_KEY ?? '';
  if (key.length > 0 && auth === key) {
    const query = getQuery(event);
    const { start = '0', count = '20' } = query;
    const keys = await subStore.getKeys();
    return {
      status: 'OK',
      submissions: await Promise.all(
        keys.slice(+start, +start + +count).map((k) => subStore.getItem(k))
      )
    };
  } else {
    throw new Error('Unauthorized');
  }
});
