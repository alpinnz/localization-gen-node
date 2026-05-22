/**
 * Vitest setup: patch window.localStorage / window.sessionStorage with
 * a fully-functional in-memory implementation.
 *
 * jsdom's Storage implementation can silently drop setItem calls in some
 * configurations (e.g. when no url / origin is set up). Using a real
 * Map-backed mock avoids that fragility in tests.
 */
function makeStorageMock(): Storage {
  const store = new Map<string, string>();

  return {
    get length() {
      return store.size;
    },
    key(index: number): string | null {
      return [...store.keys()][index] ?? null;
    },
    getItem(key: string): string | null {
      return store.get(key) ?? null;
    },
    setItem(key: string, value: string): void {
      store.set(key, value);
    },
    removeItem(key: string): void {
      store.delete(key);
    },
    clear(): void {
      store.clear();
    }
  };
}

Object.defineProperty(globalThis, "localStorage", {
  value: makeStorageMock(),
  writable: true,
  configurable: true
});

Object.defineProperty(globalThis, "sessionStorage", {
  value: makeStorageMock(),
  writable: true,
  configurable: true
});

