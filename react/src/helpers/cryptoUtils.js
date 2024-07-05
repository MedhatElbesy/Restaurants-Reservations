import CryptoJS from "crypto-js";

const secretKey = import.meta.env.VITE_REACT_APP_SECRET_KEY;

export const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
};

export const decryptData = (encryptedItem) => {
  const bytes = CryptoJS.AES.decrypt(encryptedItem, secretKey);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

export const getEncryptedItem = (key) => {
  const encryptedItem = sessionStorage.getItem(key);
  if (encryptedItem) {
    console.log(encryptedItem);
    try {
      return decryptData(encryptedItem);
    } catch (error) {
      console.error("Error decrypting data:", error);
    }
  }
  return null;
};
