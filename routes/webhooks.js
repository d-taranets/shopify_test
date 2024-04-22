const express = require('express');
const router = express.Router();

const {Order} = require('../models')

router.post('/new_order_hook', async (req, res) => {
  try {
    await Order.create({
      shopify_order_id: req.body.id,
      email: req.body.email,
      first_name: req.body.customer.first_name,
      last_name: req.body.customer.last_name,
      phone: req.body.customer.phone,
      address: JSON.stringify(req.body.customer.default_address),
    })

    res.json({ success: true});
  } catch (error) {
    console.error(error)
  }
});

module.exports = router;
