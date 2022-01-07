import axios, { AxiosInstance } from 'axios';
import { Base64 } from 'js-base64';
import type { Submission, FetchError } from './types';

export class XLorPasteClient {
  private readonly api: AxiosInstance;

  constructor(apiURL?: string) {
    this.api = axios.create({
      baseURL: apiURL ?? 'https://api.xlorpaste.cn'
    });
  }

  async upload(
    lang: string,
    body: string,
    options: Pick<Submission, 'once' | 'pass'> = {}
  ): Promise<Submission> {
    const { data } = await this.api.post<Submission>('/', {
      lang,
      body: Base64.encode(body),
      timestamp: new Date().toISOString(),
      once: options.once,
      pass: options.pass
    });
    return data;
  }

  async fetch(token: string): Promise<Submission> {
    const { data } = await this.api.get<Submission | FetchError>(`/${token}`);
    if ('status' in data) {
      throw data;
    } else {
      data.body = Base64.decode(data.body);
      return data;
    }
  }
}

export interface ClientOptions {
  apiURL?: string;
}

export function client(options: ClientOptions = {}) {
  return new XLorPasteClient(options.apiURL);
}
