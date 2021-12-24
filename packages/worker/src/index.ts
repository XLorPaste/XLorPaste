import { getSub, updateSub } from "./model";
import { Context, Worker } from "./worker"

const worker = new Worker();

worker.get('/', async (ctx: Context) => {
  return 'Hello, this is XLorPaste Workers API!'
});

worker.get('/:id', async (ctx: Context) => {
  const sub = await getSub(ctx.params.id);
  if (!!ctx.query.raw) {
    return sub?.body ?? 'Not - Found';
  } else {
    return sub ?? {};
  }
})

worker.post('/', async (ctx: Context) => {
  await updateSub();
  return {
    status: 'ok'
  }
});

addEventListener('fetch', event => {
  event.respondWith(worker.handle(event.request))
});
