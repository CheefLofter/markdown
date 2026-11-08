
import LineByLine from 'n-readlines';
import tokenizer from './tockenizer.ts';

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



const liner = new LineByLine('./data.txt');
let line;
while (line = liner.next()) {

    tokenizer(line.toString());

}