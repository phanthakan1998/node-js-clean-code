import fs from "fs";
import path from "path";

export const loadPublicKey = (): string => {
  return fs.readFileSync(
    path.resolve(__dirname, "../../keys/public_key.pem"),
    "utf8"
  );
};

export const loadPrivateKey = (): string => {
  return fs.readFileSync(
    path.resolve(__dirname, "../../keys/new_private_key.pem"),
    "utf8"
  );
};
