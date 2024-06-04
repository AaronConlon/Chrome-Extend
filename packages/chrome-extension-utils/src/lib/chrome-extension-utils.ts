import { JsonValue } from 'type-fest';

interface SaveDataWithExpirationOptions {
  key: string;
  data: JsonValue;
  expiration: number;
  isSync?: boolean;
  isLocal?: boolean;
  isSession?: boolean;
}

export const saveDataWithExpiration = async ({
  key,
  data,
  expiration,
  isSync = false,
  isLocal = false,
  isSession = false,
}: SaveDataWithExpirationOptions) => {
  try {
    const now = new Date();
    const item = {
      value: data,
      expiration: now.getTime() + expiration,
    };
    if (isSync) {
      await chrome.storage.sync.set({ [key]: item });
    }
    if (isLocal) {
      await chrome.storage.local.set({ [key]: item });
    }
    if (isSession) {
      await chrome.storage.local.set({ [key]: item });
    }
  } catch (error) {
    throw Error('Error saving data with expiration');
  }
};
