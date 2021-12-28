import { getSub, updateSub } from './model';
import { Context, Worker } from './worker';

const worker = new Worker();

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
  const payload = await ctx.json<{ lang: string; body: string }>();
  return await updateSub(payload.lang, payload.body);
});

worker.post('/once', async (ctx: Context) => {
  const payload = await ctx.json<{ lang: string; body: string }>();
  return await updateSub(payload.lang, payload.body, { once: true });
});

addEventListener('fetch', (event) => {
  event.respondWith(worker.handle(event.request));
});
