import path from "path";
import fs from "fs";
import { exec } from "child_process";
import { fileURLToPath } from "url";
import consola from "consola";

if (process.env.NODE_ENV === "production") {
  consola.error("This script is not supposed to run on production.");
  process.exit();
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const directoryPath = path.join(__dirname, "../../dump-db");

fs.readdir(directoryPath, (err, files) => {
  files.forEach((file) => {
    const collection = file.replace(".json", "");
    const cmd = `mongoimport --db bossnet-db-dev --collection ${collection} dump-db/${file} --jsonArray`;

    exec(cmd);
  });

  consola.success("------- TEST DATA RESTORED -------");
});
