const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const folderPath = './images';
const origin = 'https://master.spicaengine.com';

async function uploadImages() {
  try {
    const result = [];
    const files = fs.readdirSync(folderPath);

    for (const file of files) {

      const form = new FormData();
      form.append('files', fs.createReadStream(`./images/${file}`));

      const headers = {
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'en-US,en;q=0.9,tr;q=0.8',
        'authorization': 'YOUR API KEY',
        'origin': origin,
        'priority': 'u=1, i',
        'referer': `${origin}/spica/storage/`,
        'sec-ch-ua': '"Chromium";v="130", "Google Chrome";v="130", "Not?A_Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
        ...form.getHeaders()
      };

      await axios.post(`${origin}/api/storage`, form, { headers })
        .then(response => {
          const res = response.data?.[0]
          result.push({ name: res.name, url: res.url })
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  } catch (error) {
    console.error('Eror:', error.message);
  }
}

uploadImages();
