import { parseDocument } from "htmlparser2";
import chalk from "chalk";
import { tmText } from "tm-text";



const jsonUrl = "https://rawcdn.githack.com/ezio416/tm-json/refs/heads/main/weekly.json";

async function getJsonData() {
    try {
        const response = await fetch(jsonUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        return jsonData;
    } catch (error) {
        console.error("Fehler beim Laden der JSON-Datei:", error);
        throw error;
    }
}
const jsonData = await getJsonData();



let unparsedName = tmText(jsonData.xl5sQgfz4T6IkY_4K8Lv5iji8Ea.name);
let parsedName = unparsedName.htmlify()
console.log(parsedName)
const dom = parseDocument(html).children;

let output = "";

for (const node of dom) {
  if (node.type === "tag" && node.name === "span") {
    const colorMatch = node.attribs.style?.match(/color:\s*(#[0-9a-fA-F]{6})/);
    const color = colorMatch?.[1];
    const text = node.children?.[0]?.data;

    if (color && text) {
      output += chalk.hex(color)(text);
    }
  }
}

console.log(output);
