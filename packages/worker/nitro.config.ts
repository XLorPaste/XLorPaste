import path from 'path';
import { defineNitroConfig } from 'nitropack';

export default defineNitroConfig({
  errorHandler: './error',
  alias: {
    '~': `${path.resolve(__dirname, 'src')}`
  },
  replace: {
    __DEV__: process.env.NODE_ENV === 'DEV' ? `true` : `false`
  }
});
