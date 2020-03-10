/**
 * AES加密
 */
const CryptoJS = require('./aes.js')
const encryptAes = (word, key) => {
  //console.log(CryptoJS)
  const keys = CryptoJS.enc.Utf8.parse(key)
  const ivs = CryptoJS.enc.Utf8.parse('tstlafljatwea')
  let encryptedWord = CryptoJS.enc.Utf8.parse(word)
  var encrypted = CryptoJS.AES.encrypt(encryptedWord, keys, { iv: ivs, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  return encrypted.toString()
}

/**
 * AES解密
*/
const decryptAes = (encrypted, key) => {
  const keys = CryptoJS.enc.Utf8.parse(key)
  const ivs = CryptoJS.enc.Utf8.parse('tstlafljatwea')
  var decrypted = CryptoJS.AES.decrypt(encrypted, keys, { iv: ivs, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  //console.log(decrypted)
  //console.log(decrypted.toString(CryptoJS.enc.Utf8))
  return decrypted
}
module.exports = {
  encryptAes: encryptAes,
  decryptAes: decryptAes
}