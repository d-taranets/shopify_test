const {generateBase64Image, generateParagraphs} = require("../services/productGeneratorService")
class ProductGenerator {

  constructor(title, price) {
    this.title = title;
    this.price = price;
  }

  async generate() {
    const randomBase64Image = await generateBase64Image();
    const randomParagraphs = generateParagraphs(2);

    return  {
      title: this.title,
      images: [{attachment: randomBase64Image}],
      body_html: randomParagraphs,
      variants:[
        {"option1": "General","price": this.price, "sku":"123"},
      ],
    };
  }
}

module.exports = ProductGenerator;