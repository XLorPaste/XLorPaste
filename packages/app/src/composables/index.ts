import type { InjectionKey, Ref } from 'vue';

export interface IGlobalSettings {
  tabwidth: string;
}

export const GlobalSettingsKey = Symbol() as InjectionKey<Ref<IGlobalSettings>>;
