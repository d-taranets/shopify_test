const express = require('express');
const router = express.Router();
const ProductGenerator = require('../core/ProductGenerator');
const {createProductInShopify} = require("../services/shopifyApiService");
const {app_url, shopify: {client_id}} = require('../config')
const {User, Setting} = require("../models");

router.get('/install', (req, res) => {
  const shop = req.query.shop;
  const scopes = 'read_products,write_products'; // Specify required scopes
  const redirectUrl = `https://${shop}/admin/oauth/authorize?client_id=${client_id}&scope=${scopes}&redirect_uri=${app_url}/auth/callback`;
  res.redirect(redirectUrl);
});

router.get('/check-credentials', async (req, res) => {
  //Working with seeded data
  const user = await User.findOne({
    where: {
      id: 1
    },
    include: { model: Setting, as: 'settings', require: true }
  });

  const result = user?.settings?.store_path && user?.settings?.access_key

  return res.json({result: !!result});
})

router.post('/generate-product', async (req, res) => {
  const { title, price } = req.body;
  try {
    const productGenerator = new ProductGenerator(title, price);
    const product = await createProductInShopify(await productGenerator.generate());

    res.json({ success: true, message: 'Product template generated successfully', product });
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: error } );
  }
});

module.exports = router;