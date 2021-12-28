export class KvStore<V> {
  private readonly prefix: string;

  constructor(private readonly store: KVNamespace, prefix = '') {
    this.prefix = prefix + '/';
  }

  async get(key: string): Promise<V | null> {
    const text = await this.store.get(this.prefix + key);
    if (!!text) {
      return JSON.parse(text);
    } else {
      return null;
    }
  }

  async has(key: string): Promise<boolean> {
    return !!(await this.store.get(this.prefix + key));
  }

  async put(key: string, value: V): Promise<void> {
    await this.store.put(this.prefix + key, JSON.stringify(value));
  }

  async remove(key: string): Promise<void> {
    await this.store.delete(this.prefix + key);
  }
}
