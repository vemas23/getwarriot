import { TextFormatter } from "tm-essentials";

const JSON_URL = "https://rawcdn.githack.com/ezio416/tm-json/refs/heads/main/weekly.json";

async function getJsonData() {
    try {
        const response = await fetch(JSON_URL);
        
        if (!response.ok) {
            throw new Error(`HTTP Fehler! Status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error("Fehler beim Laden der JSON-Datei:", error);
        throw error;
    }
}

// ...existing code...

function cleanColorCodes(text) {
  return text.replace(/\$[a-zA-Z0-9]/g, '');
}

try {
  const jsonData = await getJsonData();
  const playerData = jsonData.TC9XtumnamhM8kRlPsuQVpwTUc7;
  let formattedName = TextFormatter.formatAnsi(playerData.name);
  formattedName = cleanColorCodes(formattedName);
  
  console.log(formattedName);
} catch (error) {
  console.error("Fehler bei der Verarbeitung:", error);
}


