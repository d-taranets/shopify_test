const { faker } = require('@faker-js/faker')
const axios = require("axios");

async function generateBase64Image(width = 640, height = 480, category = 'food') {
  const image = await axios.get(faker.image.urlLoremFlickr({width, height, category}), {responseType: 'arraybuffer'});
  return Buffer.from(image.data).toString('base64');
}

function generateParagraphs(count, separator = '\n') {
  return faker.lorem.paragraphs(count, separator)
    .split('\n')
    .map(str => `<p>${str}</p>`)
    .join(' ');
}

module.exports = {
  generateBase64Image,
  generateParagraphs
}


