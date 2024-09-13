import axios from 'axios';
import * as cheerio from 'cheerio';
import { DownloaderHelper } from 'node-downloader-helper';

const url = 'https://memegen-link-examples-upleveled.netlify.app/';

const emptyArray = [];

const downloadImage = (imageURL, index) => {
  // file naming based on index
  const fileName = (index + 1).toString().padStart(2, 0) + '.jpg';
  const options = { override: true, fileName: fileName };
  const dl = new DownloaderHelper(imageURL, './memes', options);

  // event lister to catch errors
  dl.on('end', () =>
    console.log(`Image ${fileName} has been successfully downloaded`),
  );
  dl.on('error', (err) => console.log('Download Failed', err));

  dl.start().catch((err) => console.error(err));
};

// init the axios with the url
axios
  .get(url)
  .then((response) => {
    // loading the data
    const $ = cheerio.load(response.data);
    // getting all the img with id #images in the html
    const images = '#images img';
    $(images).each((_, img) => {
      // pushing all the images into the array
      emptyArray.push($(img).attr('src'));
    });
    // returning the array to proceed into the next .then promise
    return emptyArray;
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
