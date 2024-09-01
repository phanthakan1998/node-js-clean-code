import dotenv from "dotenv";
import app from "./app";
import logger from "./infrastructure/logger";
import fs from "fs";
import path from "path";

dotenv.config();

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  logger.info(`Server is running on port ${PORT}`);
});
