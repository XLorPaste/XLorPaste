import { Context, Worker } from "./worker"

const worker = new Worker();

worker.get('/', async (ctx: Context) => {
  return 'Hello, this is XLorPaste Workers API!'
});

worker.get('/:id', async (ctx: Context) => {
  if (!!ctx.query.raw) {
    return `Id: ${ctx.params.id}`;
  } else {
    return {
      id: ctx.params.id
    }
  }
})

worker.post('/', async (ctx: Context) => {
  return {
    status: 'ok'
  }
});

addEventListener('fetch', event => {
  event.respondWith(worker.handle(event.request))
});
