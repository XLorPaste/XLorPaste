import type { Payload } from 'xlorpaste';
import { getSub, listSub, removeSub, updateSub } from './service';
import { Context, Worker } from './worker';

const worker = new Worker();

addEventListener('fetch', (event) => {
  event.respondWith(worker.handle(event.request));
});

worker.get('/', async (ctx: Context) => {
  return 'Hello, this is XLorPaste Workers API!';
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

worker.get('/admin', async (ctx: Context) => {
  const auth = ctx.headers.get('Authorization');
  const key = ADMIN_KEY ?? '';
  if (key.length > 0 && auth === key) {
    return { status: 'OK', submissions: await listSub() };
  } else {
    return { status: '403', message: 'Forbidden' };
  }
});

worker.get('/:token', async (ctx: Context) => {
  const sub = await getSub(ctx.params.token);
  if (!!ctx.query.raw) {
    return sub?.body ?? '';
  } else {
    return sub ?? { status: '404', message: 'Not Found' };
  }
});

worker.delete('/:token', async (ctx: Context) => {
  return await removeSub(ctx.params.token);
});
