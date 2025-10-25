interface typeStorage {
  [key: string]: any;
}

export class MemoryStorage {
  private storage: typeStorage;

  constructor() {
    this.storage = {};
  }

  getItem(key: string): Promise<string | null> {
    return Promise.resolve(this.storage[key] || null);
  }

  setItem(key: string, value: string): Promise<string> {
    this.storage[key] = value;
    return Promise.resolve(value);
  }

  removeItem(key: string): Promise<void> {
    delete this.storage[key];
    return Promise.resolve()
  }
}
