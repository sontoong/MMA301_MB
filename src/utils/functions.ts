import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getStorageData(key: string) {
  try {
    const item = await AsyncStorage.getItem(key);
    return item === null ? null : JSON.parse(item);
  } catch (e) {
    console.log(e);
  }
}

export async function setStorageData(key: string, data: Object | string) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.log(e);
  }
}

export async function clearAS() {
  await AsyncStorage.clear();
}
