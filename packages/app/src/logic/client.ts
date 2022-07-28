import { client, UploadResponse, FetchSubmission } from 'xlorpaste';

import { GlobalSettingsKey } from '~/composables';
import type { CodeLanguageType } from '~/constant';

import { getAdminKey } from './admin';

const adminKey = getAdminKey() ?? '';
const xlorpaste = client({ adminKey });

const lastSub = {
  lang: '',
  body: '',
  submission: undefined as UploadResponse | undefined
};

export async function upload(lang: string, body: string) {
  if (lastSub.submission && lastSub.lang === lang && lastSub.body === body) {
    return lastSub.submission;
  }
  lastSub.submission = await xlorpaste.upload(lang, body);
  lastSub.lang = lang;
  lastSub.body = body;
  return lastSub.submission;
}

export async function fetch(token: string) {
  return await xlorpaste.fetch(token);
}

export function useClient() {
  const subCache = useLocalStorage('cache:submission', new Map<string, FetchSubmission>());
  const formatedCache = useLocalStorage('cache:formated', new Map<string, string>());
  const renderedCache = useLocalStorage(
    'cache:rendered',
    {} as Record<CodeLanguageType, Map<string, string>>
  );
  const renderedDarkCache = useLocalStorage(
    'cache:rendered-dark',
    {} as Record<CodeLanguageType, Map<string, string>>
  );

  const globalSettings = inject(GlobalSettingsKey)!;
  watch(globalSettings, () => {
    formatedCache.value.clear();
  });

  return {
    async fetch(token: string) {
      if (subCache.value.has(token)) return subCache.value.get(token)!;
      const resp = await xlorpaste.fetch(token);
      subCache.value.set(resp.token, resp);
      return resp;
    },
    async format(body: string, lang: CodeLanguageType) {
      if (formatedCache.value.has(body)) return formatedCache.value.get(body)!;
      const { format } = await import('./format');
      const resp = await format(body, lang, globalSettings.value);
      formatedCache.value.set(body, resp);
      return resp;
    },
    async render(body: string, lang: CodeLanguageType, isDark = false) {
      const cache = isDark ? renderedDarkCache : renderedCache;
      if (cache.value[lang]?.has(body)) return cache.value[lang]!.get(body)!;
      const { highlight } = await import('./highlight');
      const resp = await highlight(body, lang, isDark);
      if (!cache.value[lang]) cache.value[lang] = new Map();
      cache.value[lang]!.set(body, resp);
      return resp;
    }
  };
}

export async function list(start: number = 0, count: number = 10) {
  if (adminKey && adminKey.length > 0) {
    return await xlorpaste.list({ start, count });
  } else {
    return [];
  }
}
