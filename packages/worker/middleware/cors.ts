import { defineEventHandler, getMethod } from 'h3';

export default defineEventHandler((event) => {
  const res = event.res;
  const method = getMethod(event);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.setHeader('Vary', 'Origin');
  if (
    !!event.req.headers['Access-Control-Request-Headers'] ||
    !!event.req.headers['access-control-request-headers']
  ) {
    res.setHeader(
      'Access-Control-Allow-Headers',
      event.req.headers['Access-Control-Request-Headers'] ??
        event.req.headers['access-control-request-headers']
    );
  } else {
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin,X-Requested-With,Content-Type,Accept,content-type'
    );
  }
  if (method === 'OPTIONS') return '';
});
