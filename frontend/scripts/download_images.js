const fs = require('fs');
const https = require('https');

const images = [
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Ni%C3%B1os_Kamentsa.JPG/1280px-Ni%C3%B1os_Kamentsa.JPG',
    filename: 'ninos_kamentsa.jpg',
  },
  {
    url: 'https://www.mineducacion.gov.co/1759/articles-104842_imagen_1.jpg',
    filename: 'mineducacion_1.jpg',
  },
  {
    url: 'https://www.mineducacion.gov.co/1759/articles-85984_imagen_1.jpg',
    filename: 'mineducacion_2.jpg',
  },
  {
    url: 'https://www.colombia.co/sites/default/files/articulos/2023-09/Kamentsa%CC%81%20Biyang%20-%20Amazonas%20Trave.jpg',
    filename: 'colombia_travel.jpg',
  },
];

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error('Request Failed With a Status Code: ' + res.statusCode));
        return;
      }

      const fileStream = fs.createWriteStream(filepath);
      res.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });

      fileStream.on('error', (err) => {
        fs.unlink(filepath, () => reject(err));
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
};

const downloadAllImages = async () => {
  const dir = './public/images/home';

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  for (const image of images) {
    try {
      const filePath = './public/images/home/' + image.filename;
      await downloadImage(image.url, filePath);
      console.log('Downloaded ' + image.filename);
    } catch (error) {
      console.error('Error downloading ' + image.filename + ': ' + error.message);
    }
  }
};

downloadAllImages();
