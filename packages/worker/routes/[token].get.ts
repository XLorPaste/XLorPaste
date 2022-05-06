import type { FetchSubmission, Submission } from 'xlorpaste';

import { defineGetHandler } from '~/utils';
import { delStore, subStore } from '~/storage';

export default defineGetHandler(async (event) => {
  const token = event.context.params.token;
  if (token) {
    return await getSub(event.context.params.token);
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
    return null;
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
