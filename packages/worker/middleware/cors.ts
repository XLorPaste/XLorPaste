import { defineEventHandler, useMethod } from 'h3';

export default defineEventHandler((event) => {
  const res = event.res;
  const method = useMethod(event);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.setHeader('Vary', 'Origin');
  console.log(event.req.headers, event.req.headers['Access-Control-Request-Headers']);
  if (!!event.req.headers['Access-Control-Request-Headers']) {
    res.setHeader(
      'Access-Control-Allow-Headers',
      event.req.headers['Access-Control-Request-Headers']
    );
  } else {
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin,X-Requested-With,Content-Type,Accept,content-type'
    );
  }
  if (method === 'OPTIONS') return '';
});
