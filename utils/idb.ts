import { Platform } from 'react-native';

const DB_NAME = 'app-storage';
const STORE_NAME = 'images';
const DB_VERSION = 1;

function openDB(): Promise<IDBDatabase> {
  if (Platform.OS !== 'web') {
    return Promise.reject(new Error('IndexedDB is only available on web platform'));
  }
  return new Promise((resolve, reject) => {
    try {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error ?? new Error('IndexedDB open error'));
    } catch (e) {
      reject(e as Error);
    }
  });
}

export async function idbSet(key: string, value: string): Promise<void> {
  if (Platform.OS !== 'web') return;
  const db = await openDB();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const req = store.put(value, key);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error ?? new Error('IndexedDB set error'));
  });
}

export async function idbGet<T = string>(key: string): Promise<T | null> {
  if (Platform.OS !== 'web') return null as T | null;
  const db = await openDB();
  return await new Promise<T | null>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const req = store.get(key);
    req.onsuccess = () => {
      resolve((req.result as T) ?? null);
    };
    req.onerror = () => reject(req.error ?? new Error('IndexedDB get error'));
  });
}

export async function idbDelete(key: string): Promise<void> {
  if (Platform.OS !== 'web') return;
  const db = await openDB();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const req = store.delete(key);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error ?? new Error('IndexedDB delete error'));
  });
}

export async function idbClearStore(): Promise<void> {
  if (Platform.OS !== 'web') return;
  const db = await openDB();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const req = store.clear();
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error ?? new Error('IndexedDB clear error'));
  });
}
