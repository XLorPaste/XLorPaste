import fs from 'fs';
import { extname } from 'path';

export function getExt(filename?: string) {
  if (filename && filename.length > 0) {
    const ext = extname(filename);
    if (ext === 'cpp' || ext === 'hpp' || ext === 'c' || ext === 'h') {
      return 'cpp';
    }
    if (ext === 'py') {
      return 'py';
    }
    if (ext === 'java') {
      return 'java';
    }
    if (ext === 'js') {
      return 'javascript';
    }
    if (ext === 'md') {
      return 'markdown';
    }
    if (ext === 'json') {
      return 'json';
    }
    return 'text';
  } else {
    return 'text';
  }
}

export async function readCode(filename?: string): Promise<string> {
  if (filename) {
    return await fs.promises.readFile(filename, 'utf-8');
  } else {
    return new Promise((res, rej) => {
      const code: string[] = [];
      process.stdin.on('data', (data) => {
        code.push(data.toString('utf-8'));
      });
      process.stdin.on('end', () => {
        res(code.join(''));
      });
      process.stdin.on('error', (err) => {
        rej(err);
      });
    });
  }
}
