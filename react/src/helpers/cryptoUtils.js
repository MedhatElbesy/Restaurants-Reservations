import CryptoJS from "crypto-js";

const secretKey = import.meta.env.VITE_REACT_APP_SECRET_KEY;

export const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
};

export const decryptData = (key) => {
  const ciphertext = sessionStorage.getItem(key);
  if (ciphertext) {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedData);
  }
  return null;
};
