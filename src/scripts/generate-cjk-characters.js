import { writeFile } from "node:fs/promises";
import { letters as CJKCharacters } from "cjk-regex";

writeFile("src/cjk-characters.js", `export default "${CJKCharacters().toString()}";`);
