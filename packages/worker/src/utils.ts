import { defineEventHandler, EventHandler, useMethod } from 'h3';

export function defineGetHandler<T = any>(fn: EventHandler<T>) {
  return defineEventHandler((event) => {
    const method = useMethod(event);
    if (method === 'GET') {
      return fn(event);
    }
  });
}

export function definePostHandler<T = any>(fn: EventHandler<T>) {
  return defineEventHandler((event) => {
    const method = useMethod(event);
    if (method === 'POST') {
      return fn(event);
    }
  });
}

export function rand(l: number, r: number): number {
  return l + Math.round(Math.random() * (r - l));
}

const character_table = '0123456789abcdefghijklmnopqrstuvwxyz';
export function randomString(length = 6): string {
  return Array.apply(null, Array(length))
    .map(() => character_table[rand(0, character_table.length - 1)])
    .join('');
}

export function b64encode(s: string): string {
  return Buffer.from(s).toString('base64');
}

export function b64decode(s: string): string {
  return Buffer.from(s, 'base64').toString();
}
