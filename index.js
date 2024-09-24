import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'node:fs';
import https from 'node:https';

const url = 'https://memegen-link-examples-upleveled.netlify.app/';
const dir = './memes';

fs.mkdirSync(dir, { recursive: true });

const imgArray = [];

// Function to download image
const downloadImage = (imageUrl, index) => {
  const fileName = `memes/${String(index + 1).padStart(2, '0')}.jpg`;


  https.get(imageUrl, (res) => {
    const filePath = fs.createWriteStream(fileName);
    res.pipe(filePath);

    filePath.on('finish', () => {
      filePath.close();
      console.log(`Downloaded: ${fileName}`);
    });
  }).on('error', (err) => {
    console.error(`Error downloading ${imageUrl}:`, err.message);
  });
};

// init the axios with the url
axios
  .get(url)
  .then((response) => {
    // loading the data
    const $ = cheerio.load(response.data);
    // getting all the img with id #images in the html
    const images = '#images img';
    $(images).each((index, img) => {
      // pushing all the images into the array
      imgArray.push($(img).attr('src'));
    });
    // returning the array to proceed into the next .then promise
    return imgArray;
  })
  // slicing the array to include only first 10 and returning it
  .then((imageArray) => {
    const tenArray = imageArray.slice(0, 10);
    return tenArray;
  })
  // using forEach to iterate over each URL and initiate the download
  .then((tenArray) => {
    tenArray.forEach(downloadImage);
    //  tenArray.forEach((url, index) => downloadImage(url, index));
  })
  .catch((err) => console.error('Error processing the request:', err));
