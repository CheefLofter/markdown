
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



const liner = new LineByLine(filePath);
let line;

Bun.write("output.html", "<!DOCTYPE html>\n<html>\n<head>\n<title>Converted Markdown</title>\n</head>\n<body>\n");

while (line = liner.next()) {

    await appendFile("output.html", convertToHTML(line.toString()));
    await appendFile("output.html", "\n");

}
await appendFile("output.html", "\n</body>\n</html>");