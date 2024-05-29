const axios = require('axios');
const { DEEPL_API_KEY } = require("../dotenvconfig");

const translateText = async (text, targetLang) => {
  try {
    const response = await axios.post('https://api-free.deepl.com/v2/translate', null, {
      params: {
        auth_key: DEEPL_API_KEY, // Füge deinen Deepl API Schlüssel hier ein
        text: text,
        target_lang: targetLang,
      },
    });

    if (response.data && response.data.translations && response.data.translations.length > 0) {
      return response.data.translations[0].text;
    } else {
      throw new Error('Unexpected response format');
    }
  } catch (error) {
    if (error.response) {
      // Der Server hat mit einem Statuscode außerhalb des Bereichs von 2xx geantwortet
      console.error("Server responded with an error:", error.response.status, error.response.statusText);
      console.error("Response data:", error.response.data);
    } else if (error.request) {
      // Die Anfrage wurde gemacht, aber keine Antwort erhalten
      console.error("No response received:", error.request);
    } else {
      // Ein Fehler ist beim Einrichten der Anfrage aufgetreten
      console.error("Error setting up the request:", error.message);
    }
    console.error("Error translating text:", error.config);
    throw error;
  }
};

module.exports = translateText;
