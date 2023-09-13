import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

class StorageUtils {
  static storage = new Storage({
    // maximum capacity, default 1000 key-ids
    size: 1000,

    // Use AsyncStorage for RN apps, or window.localStorage for web apps.
    // If storageBackend is not set, data will be lost after reload.
    storageBackend: AsyncStorage, // for web: window.localStorage

    // expire time, default: 1 day (1000 * 3600 * 24 milliseconds).
    // can be null, which means never expire.
    defaultExpires: null,

    // cache data in the memory. default is true.
    enableCache: true,

    // if data was not found in storage or expired data was found,
    // the corresponding sync method will be invoked returning
    // the latest data.
    sync: {
      // we'll talk about the details later.
    },
  });

  static setItem(key: string, value: any) {
    return StorageUtils.storage.save({
      key: key, // Note: Do not use underscore("_") in key!
      data: value,
    });
  }

  static getItem(key: string) {
    return StorageUtils.storage.load({
      key: key,
    });
  }

  static removeItem(key: string) {
    return StorageUtils.storage.clearMapForKey(key);
  }
}

export default StorageUtils;
