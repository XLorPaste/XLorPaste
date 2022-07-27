import type { InjectionKey } from 'vue';

export interface IGlobalSettings {
  tabwidth: string;
}

export const GlobalSettingsKey = Symbol() as InjectionKey<IGlobalSettings>;
