import type { Payload, UploadResponse, Submission, FetchSubmission } from 'xlorpaste';
import { KvStore } from './store';
import { randomString } from './utils';

const subStore = new KvStore<Submission>(XLORPASTE, 'sub');

const delStore = new KvStore<string>(XLORPASTE, 'del');

async function createSub(payload: Payload): Promise<Submission> {
  const token = await genToken(subStore);
  const delToken = await genToken(delStore, 12);
  const sub: Submission = {
    token,
    delete: delToken,
    lang: payload.lang,
    body: payload.body,
    timestamp: payload.timestamp
  };
  if ('once' in payload && !!payload.once) {
    sub.once = payload.once;
  }
  if ('pass' in payload && !!payload.pass && payload.pass.length > 0) {
    sub.pass = payload.pass;
  }
  return sub;
}

function createUploadResp(sub: Submission): UploadResponse {
  return {
    timestamp: sub.timestamp,
    token: sub.token,
    delete: sub.delete,
    once: sub.once
  };
}

function createFetchSub(sub: Submission): FetchSubmission {
  return {
    timestamp: sub.timestamp,
    token: sub.token,
    lang: sub.lang,
    body: sub.body
  };
}

export async function updateSub(payload: Payload): Promise<UploadResponse> {
  const sub = await createSub(payload);
  await subStore.put(sub.token, sub);
  await delStore.put(sub.delete, sub.token);
  return createUploadResp(sub);
}

export async function getSub(key: string): Promise<FetchSubmission | null> {
  const sub = await subStore.get(key);
  if (!!sub?.once) {
    await delStore.remove(sub.delete);
    await subStore.remove(key);
  }
  if (sub !== null) {
    return createFetchSub(sub);
  } else {
    return null;
  }
}

export async function removeSub(delToken: string) {
  const token = await delStore.get(delToken);
  if (!!token) {
    await delStore.remove(delToken);
    await subStore.remove(token);
    return { status: 'OK' };
  } else {
    return { status: '404' };
  }
}

async function genToken<T>(store: KvStore<T>, len?: number) {
  let token = randomString(len);
  while (await store.has(token)) {
    token = randomString(len);
  }
  return token;
}
