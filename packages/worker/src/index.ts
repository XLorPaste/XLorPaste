import { getSub, removeSub, updateSub } from './model';
import { Context, Worker } from './worker';

const worker = new Worker();

addEventListener('fetch', (event) => {
  event.respondWith(worker.handle(event.request));
});

worker.get('/', async (ctx: Context) => {
  return 'Hello, this is XLorPaste Workers API!';
});

worker.get('/:token', async (ctx: Context) => {
  const sub = await getSub(ctx.params.token);
  if (!!ctx.query.raw) {
    return sub?.body ?? '';
  } else {
    return sub ?? { error: 'Not Found' };
  }
});

worker.post('/', async (ctx: Context) => {
  const payload = await ctx.json<IUploadPayload>();
  return await updateSub(payload.lang, payload.body, payload.timestamp);
});

worker.post('/once', async (ctx: Context) => {
  const payload = await ctx.json<IUploadPayload>();
  return await updateSub(payload.lang, payload.body, payload.timestamp, { once: true });
});

worker.delete('/:token', async (ctx: Context) => {
  return await removeSub(ctx.params.token);
});

interface IUploadPayload {
  lang: string;
  body: string;
  timestamp: string;
  title?: string;
  pass?: string;
}
