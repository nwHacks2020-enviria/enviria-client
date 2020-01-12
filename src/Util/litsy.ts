import LegacyStorage from '@react-native-community/async-storage-backend-legacy';
import AsyncStorageFactory from '@react-native-community/async-storage'

const legacyStorage = new LegacyStorage();
export const storage = AsyncStorageFactory.create(legacyStorage, {});

export const events: Map<string, Function> = new Map()
export const states: Map<string, any> = new Map()