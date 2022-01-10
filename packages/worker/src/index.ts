import type { Payload } from 'xlorpaste';
import { getSub, removeSub, updateSub } from './service';
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
    return sub ?? { status: '404', message: 'Not Found' };
  }
});

worker.post('/', async (ctx: Context) => {
  const payload = await ctx.json<Payload>();
  return await updateSub(payload);
});

worker.post('/once', async (ctx: Context) => {
  const payload = await ctx.json<Payload>();
  payload.once = true;
  return await updateSub(payload);
});

worker.delete('/:token', async (ctx: Context) => {
  return await removeSub(ctx.params.token);
});
