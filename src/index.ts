
import LineByLine from 'n-readlines';
import { appendFile } from 'node:fs/promises';
import { convertToHTML } from './html_converter';

const filePath = Bun.argv[2];
if (!filePath) {
    console.error("Usage: bun script.ts <file>");
    process.exit(1);
}

const file = Bun.file(filePath);

const exists = await file.exists();
if (!exists) {
    console.error(`File does not exist: ${filePath}`);
    process.exit(1);
}
if (!filePath.endsWith(".md")) {
    console.error(`File is not a markdown file`);
    process.exit(1);

}
if (Bun.argv[3] == "light" || Bun.argv[3] == "dark") {
    await convertToHTML(filePath, Bun.argv[3]);
} else {
    await convertToHTML(filePath);
}