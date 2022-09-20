import type { FetchSubmission, Submission } from 'xlorpaste';
import { defineEventHandler, getQuery } from 'h3';

import { delStore, subStore } from '~/storage';

export default defineEventHandler(async (event) => {
  const token = event.context.params.token;
  if (token) {
    const query = getQuery(event);
    const result = await getSub(event.context.params.token);
    if (['', 'true'].some((k) => k === query.raw)) {
      return result?.body ?? '';
    } else {
      return result;
    }
  } else {
    return 'Hello, this is XLorPaste Workers API!';
  }
});

export async function getSub(key: string): Promise<FetchSubmission | null> {
  const sub = (await subStore.getItem(key)) as Submission;
  if (!!sub?.once) {
    await delStore.removeItem(sub.delete);
    await subStore.removeItem(key);
  }
  if (sub !== null) {
    return createFetchSub(sub);
  } else {
    throw new Error(`Can not find submission "${key}"`);
  }
}

function createFetchSub(sub: Submission): FetchSubmission {
  return {
    timestamp: sub.timestamp,
    token: sub.token,
    lang: sub.lang,
    body: sub.body
  };
}
