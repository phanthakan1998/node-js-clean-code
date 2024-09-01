import { createPrivateKey, privateDecrypt } from "crypto";
import { loadPrivateKey } from "../../utils/loadKeys";

const privateKeyPem = loadPrivateKey();

const passphrase = process.env.PASSPHRASE;

export const decryptWithPrivateKey = (encryptedData: string): string => {
  const privateKey = createPrivateKey({
    key: privateKeyPem,
    format: "pem",
    passphrase: passphrase,
  });
  const buffer = Buffer.from(encryptedData, "base64");
  const decrypted = privateDecrypt(privateKey, buffer);
  return decrypted.toString("utf8");
};
