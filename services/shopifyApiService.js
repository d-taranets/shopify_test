const { shopify } = require('../config')
const {User, Setting} = require("../models");
const {createAdminRestApiClient} = require("@shopify/admin-api-client");


async function createProductInShopify(productData) {
  try {
    //Working with seeded data
    const user = await User.findOne({
      where: {
        id: 1
      },
      include: { model: Setting, as: 'settings', require: true }
    });

    const {store_path, access_key} = user?.settings;

    if (!store_path || !access_key) {
      throw new Error("Configuration missing!");
    }

    const client = createAdminRestApiClient({
      storeDomain: store_path,
      apiVersion: shopify.api_version,
      accessToken: access_key,
    });

    const response = await client.post('products', {
      path: 'products',
      data: {
        product: productData,
      }
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  createProductInShopify
};