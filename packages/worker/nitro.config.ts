import path from 'path';
import { defineNitroConfig } from 'nitropack';

export default defineNitroConfig({
  alias: {
    '~/': `${path.resolve(__dirname, 'src')}/`
  }
});
