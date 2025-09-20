const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');

const getAll = async (_req, res) => {
  try {
    const result = await mongodb
      .getDb()
      .db()
      .collection('rpg')
      .find({})
      .toArray();
    if (result.length === 0) {
      return res.status(404).json({ message: 'No RPG characters found' });
    }
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getById = async (req, res) => {
  const rpgId = ObjectId.createFromHexString(req.params.id);
  try {
    const result = await mongodb
      .getDb()
      .db()
      .collection('rpg')
      .findOne({ _id: rpgId });
    if (!result) {
      return res.status(404).json({ message: 'RPG character not found' });
    }
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getById,
};
