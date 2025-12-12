const Mkt = require('../models/mktModel.js');

module.exports = {

    getMkt: async (req, res) => {
        try {
        const mktView = await Mkt.getAll();
        res.json(mktView);
        } catch (err) {
        res.status(500).json({ error: err.message });
        }
  }
};