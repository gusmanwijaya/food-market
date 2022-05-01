import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMessage} from '../showMessage';

export const storeData = async (storageKey, value) => {
  try {
    return await AsyncStorage.setItem(storageKey, JSON.stringify(value));
  } catch (error) {
    showMessage('Gagal menyimpan di local storage', 'danger');
  }
};

export const getData = async storageKey => {
  try {
    const jsonValue = await AsyncStorage.getItem(storageKey);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    showMessage('Gagal mengambil data dari local storage', 'danger');
  }
};
