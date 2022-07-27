import type { Payload, Submission, UploadResponse } from 'xlorpaste';
import { defineEventHandler, useBody, CompatibilityEvent, useMethod } from 'h3';

import { subStore, delStore, genToken } from '~/storage';

export default defineEventHandler(async (event) => {
  const method = useMethod(event);
  if (method === 'POST') {
    return await uploadSub(event);
  }
});

export async function uploadSub(event: CompatibilityEvent): Promise<UploadResponse> {
  const payload = await useBody<Payload>(event);
  const sub = await createSub(payload);
  sub.author = {
    ip: event.req.headers['x-real-ip'] as string | undefined
  };
  await subStore.setItem(sub.token, sub);
  await delStore.setItem(sub.delete, sub.token);
  return createUploadResp(sub);
}

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

  if (!sub.body) {
    throw new Error(`Payload does not have body`);
  }
  if (!sub.lang) {
    throw new Error(`Payload does not have lang`);
  }
  if (!sub.timestamp) {
    throw new Error(`Payload does not have timestamp`);
  }

  if (!!payload.once) {
    sub.once = payload.once;
  }
  if (!!payload.pass && payload.pass.length > 0) {
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
