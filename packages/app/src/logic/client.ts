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
  const subCache = useLocalStorage<Record<string, FetchSubmission>>('cache:submission', {});
  const formatedCache = useLocalStorage<Record<string, string>>('cache:formated', {});
  const renderedCache = useLocalStorage(
    'cache:rendered',
    {} as Record<CodeLanguageType, Record<string, string>>
  );
  const renderedDarkCache = useLocalStorage(
    'cache:rendered-dark',
    {} as Record<CodeLanguageType, Record<string, string>>
  );

  const globalSettings = inject(GlobalSettingsKey)!;
  watch(globalSettings, () => {
    formatedCache.value = {};
  });

  return {
    async fetch(token: string) {
      if (token in subCache.value && subCache.value[token]) return subCache.value[token]!;
      const resp = await xlorpaste.fetch(token);
      subCache.value[resp.token] = resp;
      return resp;
    },
    async format(body: string, lang: CodeLanguageType) {
      if (body in formatedCache.value && formatedCache.value[body])
        return formatedCache.value[body]!;
      const { format } = await import('./format');
      const resp = await format(body, lang, globalSettings.value);
      formatedCache.value[body] = resp;
      return resp;
    },
    async render(body: string, lang: CodeLanguageType, isDark = false) {
      const cache = isDark ? renderedDarkCache : renderedCache;
      const LangCache = cache.value[lang];
      if (LangCache && LangCache[body]) return LangCache[body]!;
      const { highlight } = await import('./highlight');
      const resp = await highlight(body, lang, isDark);
      if (!cache.value[lang]) cache.value[lang] = {};
      cache.value[lang]![body] = resp;
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
