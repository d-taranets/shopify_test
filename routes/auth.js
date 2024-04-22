const express = require('express');
const router = express.Router();
const axios = require('axios');
const {app_url, shopify} = require('../config')
const {Setting} = require('../models')

// Handle OAuth callback after installation
router.get('/callback', async (req, res) => {

  const {shop, code} = req.query;
  const {client_id, client_secret} = shopify;

  const access_token_url = `https://${shop}/admin/oauth/access_token?client_id=${client_id}&client_secret=${client_secret}&code=${code}`;

  try {
    const response = await axios.post(access_token_url);
    const access_token = response.data.access_token;
    const setting = await Setting.findOne({where: {store_path: shop}});
    if (!setting) {
      await Setting.create({
        user_id: 1,
        store_path: shop,
        access_key: access_token
      })
    } else {
      setting.access_key = access_token;
      await setting.save();
    }

    console.log({access_token})
    // Redirect users to the external app dashboard
    res.redirect(app_url);
  } catch (error) {
    console.error(error)
    return res.redirect(`${app_url}/error`);
  }
});

module.exports = router;