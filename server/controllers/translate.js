const axios = require('axios');
const { DEEPL_API_KEY } = require("../dotenvconfig");


const translateText = async (text, targetLang) => {
  try {
    const response = await axios.post('https://api-free.deepl.com/v2/translate', null, {
      params: {
        auth_key: DEEPL_API_KEY , // Füge deinen Deepl API Schlüssel hier ein
        text: text,
        target_lang: targetLang,
      },
    });
    return response.data.translations[0].text;
  } catch (error) {
    console.error("Error translating text:", error);
    throw error;
  }
};

module.exports = translateText;
