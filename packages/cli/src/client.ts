import axios, { AxiosInstance } from 'axios';
import { Submission } from './types';

export class XLorPasteClient {
  private readonly api: AxiosInstance;

  constructor(apiURL?: string) {
    this.api = axios.create({
      baseURL: apiURL ?? 'https://api.xlorpaste.cn'
    });
  }

  async upload(lang: string, body: string, options: Pick<Submission, 'once' | 'pass'> = {}) {
    await this.api.post('/', {
      lang,
      body,
      timestamp: new Date().toISOString(),
      once: options.once,
      pass: options.pass
    });
  }

  async fetch(token: string): Promise<Submission> {
    const { data } = await this.api.get<Submission>(`/${token}`);
    return data;
  }
}

export interface ClientOptions {
  apiURL?: string;
}

export function client(options: ClientOptions = {}) {
  return new XLorPasteClient(options.apiURL);
}
