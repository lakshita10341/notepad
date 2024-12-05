import CryptoJS from 'crypto-js';
const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY || 'default_key';

export const encryptData = (data:string):string=>{
    return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
}

export const decryptData = (data:string): string=>{
    const bytes= CryptoJS.AES.decrypt(data, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
}