import { defineEventHandler, useMethod } from 'h3';

export default defineEventHandler((event) => {
  const method = useMethod(event);
  const res = event.res;
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.setHeader('Access-Control-Max-Age', '86400');
  if (
    event.req.headers['Access-Control-Request-Method'] !== null &&
    event.req.headers['Access-Control-Request-Headers'] !== null
  ) {
    res.setHeader(
      'Access-Control-Allow-Headers',
      event.req.headers.headers['Access-Control-Request-Headers']
    );
  }
  if (method === 'OPTIONS') return '';
});
