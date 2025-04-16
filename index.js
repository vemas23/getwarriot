import { TextFormatter } from "tm-essentials";
import dotenv from 'dotenv';
import readline from 'readline';

// Load .env file
dotenv.config();

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to fetch map data
async function getMapData(uid) {
  const url = `https://live-services.trackmania.nadeo.live/api/token/map/${uid}`;
  const options = {
    method: 'GET',
    headers: {
      'user-agent': process.env.USER_AGENT,
      'authorization': `nadeo_v1 t=${process.env.LIVE_TOKEN}`
    }
  };

  let jsonData;
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const text = await response.text();
    try {
      jsonData = JSON.parse(text);
    } catch (parseError) {
      console.error('JSON Parse Error:', text);
      throw parseError;
    }
    return jsonData;
  } catch (error) {
    console.error('Fetch Error:', error);
    throw error;
  }
}

function cleanColorCodes(text) {
  return text.replace(/\$[a-zA-Z0-9]/g, '');
}

// Main program
rl.question('Please enter the map UID: ', async (uid) => {
  try {
    const jsonData = await getMapData(uid);
    let formattedName = TextFormatter.formatAnsi(jsonData.name);
    formattedName = cleanColorCodes(formattedName);
    console.log(formattedName);
  } catch (error) {
    console.error("Error during processing:", error);
  } finally {
    rl.close();
  }
});


