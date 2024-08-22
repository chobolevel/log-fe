import CryptoJS from "crypto-js";

export const fillZero = (num: number, len: number) => {
  return num.toString().padStart(len, "0");
};

export function encryptString(text: string, key: string) {
  const encrypted = CryptoJS.AES.encrypt(text, key).toString();
  return encrypted;
}

export function decryptString(encryptedText: string, key: string) {
  const decrypted = CryptoJS.AES.decrypt(encryptedText, key).toString(
    CryptoJS.enc.Utf8
  );
  return decrypted;
}
