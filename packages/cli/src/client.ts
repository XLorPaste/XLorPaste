import axios, { AxiosInstance } from 'axios';
import { Base64 } from 'js-base64';
import type { Payload, UploadResponse, Submission, FetchError, FetchSubmission } from './types';

export class XLorPasteClient {
  private readonly api: AxiosInstance;

  constructor(apiURL?: string) {
    this.api = axios.create({
      baseURL: apiURL ?? 'https://api.xlorpaste.cn'
    });
  }

  private format(code: string) {
    return code.trim();
  }

  async upload(
    lang: string,
    body: string,
    options: Pick<Submission, 'once' | 'pass'> = {}
  ): Promise<UploadResponse> {
    const payload: Payload = {
      lang,
      body: Base64.encode(this.format(body)),
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
      data.body = this.format(Base64.decode(data.body));
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

  async list(adminKey: string): Promise<Submission[]> {
    try {
      const { data } = await this.api.get<{
        submissions: Submission[] | undefined;
        status: 'OK' | '403';
      }>('/admin', { headers: { Authorization: adminKey } });
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

export interface ClientOptions {
  apiURL?: string;
}

export function client(options: ClientOptions = {}) {
  return new XLorPasteClient(options.apiURL);
}
