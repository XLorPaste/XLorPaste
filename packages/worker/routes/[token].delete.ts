import { defineEventHandler } from 'h3';

import { delStore, subStore } from '~/storage';

export default defineEventHandler(async (event) => {
  const token = event.context.params.token;
  return await removeSub(token);
});

export async function removeSub(delToken: string) {
  const token = (await delStore.getItem(delToken)) as string;
  if (!!token) {
    await delStore.removeItem(delToken);
    await subStore.removeItem(token);
    return { status: 'OK' };
  } else {
    return { status: '404' };
  }
}
