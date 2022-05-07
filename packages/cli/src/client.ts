import axios, { AxiosInstance } from 'axios';
import { Base64 } from 'js-base64';

import type { Payload, UploadResponse, Submission, FetchError, FetchSubmission } from './types';

export interface ClientOptions {
  /**
   * XLorPaste API url
   *
   * @default 'https://api.xlorpaste.cn'
   */
  apiURL?: string;

  /**
   * Max code length
   *
   * @default 1048576
   */
  maxLength?: number;

  /**
   * Admin key
   */
  adminKey?: string;
}

export class XLorPasteClient {
  private readonly api: AxiosInstance;

  private readonly option: Required<ClientOptions>;

  constructor(option: Required<ClientOptions>) {
    this.option = option;
    this.api = axios.create({
      baseURL: option.apiURL
    });
  }

  private format(code: string) {
    return code.replace(/\r\n|\n\r|\n|\r/g, '\n').trim();
  }

  private encode(lang: string, code: string) {
    const text = Base64.encode(this.format(code));
    if (lang === 'json') {
      return JSON.stringify(JSON.parse(text));
    } else {
      return text;
    }
  }

  private decode(lang: string, code: string) {
    const text = this.format(Base64.decode(code));
    if (lang === 'json') {
      return JSON.stringify(JSON.parse(text), null, 2);
    } else {
      return text;
    }
  }

  async upload(
    lang: string,
    body: string,
    options: Pick<Submission, 'once' | 'pass'> = {}
  ): Promise<UploadResponse> {
    if (body.length > this.option.maxLength) {
      throw new Error(`Your code is too long.`);
    }

    const payload: Payload = {
      lang,
      body: this.encode(lang, body),
      timestamp: new Date().toISOString(),
      once: options.once,
      pass: options.pass
    };
    const { data } = await this.api.post<UploadResponse>('/', payload);

    return data;
  }

  async fetch(token: string): Promise<FetchSubmission> {
    const { data } = await this.api.get<FetchSubmission | FetchError>(`/${token}`);
    if ('status' in data) {
      throw data;
    } else {
      data.body = this.decode(data.lang, data.body);
      return data;
    }
  }

  async remove(token: string): Promise<boolean> {
    try {
      const { data } = await this.api.delete<{ status: 'OK' | '404' }>(`/${token}`);
      return data.status === 'OK';
    } catch {
      return false;
    }
  }

  async list({ start = 0, count = 10 }: { start: number; count: number }): Promise<Submission[]> {
    try {
      const { data } = await this.api.get<{
        submissions: Submission[] | undefined;
        status: 'OK' | '403';
      }>('/admin/list', {
        params: {
          start,
          count
        },
        headers: { Authorization: this.option.adminKey }
      });

      const subs = data.submissions ?? [];
      for (const sub of subs) {
        sub.body = this.format(Base64.decode(sub.body));
      }

      return subs.sort((lhs, rhs) => {
        const a = new Date(lhs.timestamp).getTime();
        const b = new Date(rhs.timestamp).getTime();
        return b - a;
      });
    } catch {
      return [];
    }
  }
}

export function client(options: ClientOptions = {}) {
  if (!options.apiURL) {
    options.apiURL = 'https://api.xlorpaste.cn';
  }
  if (!options.maxLength) {
    options.maxLength = 1048576;
  }
  if (!options.adminKey) {
    options.adminKey = '';
  }
  return new XLorPasteClient(options as Required<ClientOptions>);
}
