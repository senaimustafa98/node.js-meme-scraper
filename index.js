
/*
import fetch from 'node-fetch';

fetch('https://memegen-link-examples-upleveled.netlify.app/')
    .then((response) => response.text())
    .then((div) => {
      const htmlString = div
      console.log(htmlString)
    });
*/

import axios from 'axios';
import * as cheerio from 'cheerio';

const url = 'https://memegen-link-examples-upleveled.netlify.app/';

let emptyArray = [];
function slice() {
  emptyArray = emptyArray.slice(0, 11);
}

//init the axios with the url
axios.get(url)
    .then(response => {
      //loading the data
        const $ = cheerio.load(response.data);
        // getting all the img with id #images in the html
        const images = '#images img';
        $(images).each((_, img) => {
            // console.log({
            // src: $(img).attr('src'),
            //});
            //pushing all the img in the empty array and slicing with the predefined function and logging
            emptyArray.push($(img).attr('src'))
            slice(emptyArray)
            console.log(emptyArray)
        });

    })
//console.log(emptyArray)
