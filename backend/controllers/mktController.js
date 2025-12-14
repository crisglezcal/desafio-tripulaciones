const Mkt = require('../models/mktModel.js');

module.exports = {

  getSales: async (req, res) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;

      const result = await Mkt.getSalesPaginated(page, limit);

      res.json(result);
    } catch (err) {
      console.error('❌ getSales error:', err.message);
      res.status(500).json({ error: err.message });
    }
  },

 getCustomers: async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const result = await Mkt.getCustomersPaginated(page, limit);

    res.json(result);
  } catch (err) {
    console.error('❌ getCustomers error:', err.message);
    res.status(500).json({ error: err.message });
  }
},


  getProducts: async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const result = await Mkt.getProductsPaginated(page, limit);

    res.json(result);
  } catch (err) {
    console.error('❌ getProducts error:', err.message);
    res.status(500).json({ error: err.message });
  }
},
};
