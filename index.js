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

try {
    const jsonData = await getJsonData();
    const playerData = jsonData.xl5sQgfz4T6IkY_4K8Lv5iji8Ea;
    const formattedName = TextFormatter.formatAnsi(playerData.name);
    
    console.log(formattedName);
} catch (error) {
    console.error("Fehler bei der Verarbeitung:", error);
}


