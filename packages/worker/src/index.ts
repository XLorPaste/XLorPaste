import { Worker } from "./worker"

const worker = new Worker();

worker.post('/', async (req: Request) => {
  return 'Hello'
});

addEventListener('fetch', event => {
  event.respondWith(worker.handle(event.request))
});
