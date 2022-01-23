export function getAdminKey(): string | null {
  return window.localStorage.getItem('ADMIN_KEY');
}

export function setAdminKey(key: string) {
  window.localStorage.setItem('ADMIN_KEY', key);
}

(window as any).setAdminKey = setAdminKey;
