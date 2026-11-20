import { deserializePlanet, serializePlanet } from '../sim/serialize';
import type { PlanetState } from '../sim/types';

const DB_NAME = 'tiny-planet-factory';
const STORE = 'planets';
const KEY = 'current';

export class SaveStore {
  private db: IDBDatabase | null = null;
  private memory: PlanetState | null = null;
  readonly persistent: boolean;

  constructor() {
    this.persistent = typeof indexedDB !== 'undefined';
  }

  private async open(): Promise<IDBDatabase> {
    if (this.db) return this.db;
    this.db = await new Promise<IDBDatabase>((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, 1);
      request.onupgradeneeded = () => {
        if (!request.result.objectStoreNames.contains(STORE)) request.result.createObjectStore(STORE);
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
    return this.db;
  }

  async load(): Promise<PlanetState | null> {
    if (!this.persistent) return this.memory;
    try {
      const db = await this.open();
      return await new Promise<PlanetState | null>((resolve, reject) => {
        const request = db.transaction(STORE, 'readonly').objectStore(STORE).get(KEY);
        request.onsuccess = () => resolve(request.result ? deserializePlanet(request.result) : null);
        request.onerror = () => reject(request.error);
      });
    } catch {
      return this.memory;
    }
  }

  async save(state: PlanetState): Promise<void> {
    this.memory = state;
    if (!this.persistent) return;
    try {
      const db = await this.open();
      await new Promise<void>((resolve, reject) => {
        const transaction = db.transaction(STORE, 'readwrite');
        transaction.objectStore(STORE).put(serializePlanet(state), KEY);
        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject(transaction.error);
      });
    } catch {
      // Private-mode quota errors fall back to the in-memory copy.
    }
  }
}
