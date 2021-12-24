import { Worker } from "./worker"

const worker = new Worker();

worker.get('/', async (req: Request) => {
  return 'Hello, this is XLorPaste Workers API!'
});

worker.post('/', async (req: Request) => {
  
});

addEventListener('fetch', event => {
  event.respondWith(worker.handle(event.request))
});
