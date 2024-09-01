// generateKeys.ts
import { generateKeyPairSync } from "crypto";
import fs from "fs";

// Generate a new RSA key pair
const { publicKey, privateKey } = generateKeyPairSync("rsa", {
  modulusLength: 2048, // Key size in bits (2048 or 4096 is recommended)
  publicKeyEncoding: {
    type: "spki", // Recommended format for public key
    format: "pem",
  },
  privateKeyEncoding: {
    type: "pkcs8", // Recommended format for private key
    format: "pem",
    cipher: "aes-256-cbc", // Encryption for the private key
    passphrase: "your-passphrase", // Passphrase for encryption (optional)
  },
});

// Save the keys to files
fs.writeFileSync("publicKey.pem", publicKey);
fs.writeFileSync("privateKey.pem", privateKey);

console.log(
  "RSA key pair generated and saved to publicKey.pem and privateKey.pem"
);
