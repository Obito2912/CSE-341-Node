const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');

const getAll = async (_req, res) => {
  try {
    const result = await mongodb.getDb().collection('rpg').find({}).toArray();
    if (result.length === 0) {
      return res.status(404).json({ message: 'No RPG characters found' });
    }
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const rpgId = ObjectId.createFromHexString(req.params.id);
    const result = await mongodb
      .getDb()
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

const createGame = async (req, res) => {
  try {
    const rpgGame = {
      name: req.body.name,
      genre: req.body.genre,
      developer: req.body.developer,
      releaseDate: req.body.releaseDate,
      platforms: req.body.platforms,
      rating: req.body.rating,
      price: req.body.price,
    };

    const result = await mongodb.getDb().collection('rpg').insertOne(rpgGame);

    if (result.acknowledged) {
      return res.status(201).json({
        message: 'RPG game created successfully.',
        id: result.insertedId,
      });
    }
    return res.status(500).json({ message: 'Failed to create the RPG game.' });
  } catch (err) {
    return res.status(500).json({
      message: 'An error occurred while creating the RPG game.',
      error: err.message,
    });
  }
};

const updateGame = async (req, res) => {
  try {
    const rpgGameId = ObjectId.createFromHexString(req.params.id);
    const rpgGame = {
      name: req.body.name,
      genre: req.body.genre,
      developer: req.body.developer,
      releaseDate: req.body.releaseDate,
      platforms: req.body.platforms,
      rating: req.body.rating,
      price: req.body.price,
    };

    const result = await mongodb
      .getDb()
      .collection('rpg')
      .replaceOne({ _id: rpgGameId }, rpgGame);

    if (result.modifiedCount > 0) {
      return res.status(200).json({
        message: 'RPG game updated successfully.',
        id: rpgGameId,
      });
    }
    return res.status(500).json({ message: 'Failed to update RPG game.' });
  } catch (err) {
    return res.status(500).json({
      message: 'An error has occurred while updating the RPG game',
      error: err.message,
    });
  }
};

const deleteGame = async (req, res) => {
  try {
    const rpgGameId = ObjectId.createFromHexString(req.params.id);
    const result = await mongodb
      .getDb()
      .collection('rpg')
      .deleteOne({ _id: rpgGameId });

    if (result.deletedCount > 0) {
      return res.status(200).json({
        message: 'RPG game deleted successfully.',
      });
    }
    return res.status(500).json({ message: 'Failed to delete RPG game.' });
  } catch (err) {
    return res.status(500).json({
      message: 'An error has occurred while deleting the RPG game.',
      error: err.message,
    });
  }
};

module.exports = {
  getAll,
  getById,
  createGame,
  updateGame,
  deleteGame,
};
