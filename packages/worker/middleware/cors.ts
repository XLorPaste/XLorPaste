import { defineEventHandler, useMethod } from 'h3';

export default defineEventHandler((event) => {
  const method = useMethod(event);
  const res = event.res;
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3100');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json'
  );
  if (method === 'OPTIONS') {
    return '';
  }
});
