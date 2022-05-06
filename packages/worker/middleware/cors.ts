import { defineEventHandler, useMethod } from 'h3';

export default defineEventHandler((event) => {
  const res = event.res;
  const method = useMethod(event);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.setHeader('Vary', 'Origin');
  if (
    !!event.req.headers['Access-Control-Request-Method'] &&
    !!event.req.headers['Access-Control-Request-Headers']
  ) {
    res.setHeader(
      'Access-Control-Allow-Headers',
      event.req.headers['Access-Control-Request-Headers']
    );
  }
  if (method === 'OPTIONS') return '';
});
