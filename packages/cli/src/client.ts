import axios, { AxiosInstance } from 'axios';

class XLorPasteClient {
  private readonly api: AxiosInstance;

  constructor(apiURL?: string) {
    this.api = axios.create({
      baseURL: apiURL ?? 'https://api.xlorpaste.cn'
    });
  }

  async upload(lang: string, body: string) {
    await this.api.post('/', { body, lang });
  }

  async fetch(token: string) {
    const { data } = await this.api.get(`/${token}`);
    return data;
  }
}

export function client() {
  return new XLorPasteClient();
}
