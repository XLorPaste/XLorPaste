import { Worker } from "./worker"

const worker = new Worker();

worker.get('/', async (req: Request) => {
  return 'Hello'
});

addEventListener('fetch', event => {
  event.respondWith(worker.handle(event.request))
});
