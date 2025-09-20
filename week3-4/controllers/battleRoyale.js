const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');

const getAll = async (_req, res) => {
  try {
    const result = await mongodb
      .getDb()
      .db()
      .collection('battle_royale')
      .find({})
      .toArray();
    if (result.length === 0) {
      return res.status(404).json({ message: 'No Battle Royale games found' });
    }
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getById = async (req, res) => {
  const brGameId = ObjectId.createFromHexString(req.params.id);
  try {
    const result = await mongodb
      .getDb()
      .db()
      .collection('battle_royale')
      .findOne({ _id: brGameId });
    if (!result) {
      return res.status(404).json({ message: 'Battle Royale game not found' });
    }
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const createGame = async (req, res) => {
  try {
    const brGame = {
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
      .db()
      .collection('battle_royale')
      .insertOne(brGame);

    if (result.acknowledged) {
      res.status(201).json({
        message: 'Battle Royale game created successfully.',
        id: result.insertedId,
      });
    } else {
      res
        .status(500)
        .json({ message: 'Failed to create the battle royale game.' });
    }
  } catch (err) {
    res.status(500).json({
      message: 'An error occurred while creating the battle royale game.',
      error: err.message,
    });
  }
};

const updateGame = async (req, res) => {
  const brGameId = ObjectId.createFromHexString(req.params.id);
  try {
    const brGame = {
      name: req.body.name,
      genre: req.body.genre,
      developer: req.body.developer,
      releaseDate: req.body.releaseDate,
      platforms: req.body.platforms,
      rating: req.body.rating,
      price: req.body.price,
    };

    const result = mongodb
      .getDb()
      .db()
      .collection('battle_royale')
      .replaceOne({ id: brGameId, brGame });

    if (result.modifiedCount > 0) {
      res.status(200).json({
        message: 'Battle Royale game updated successfully.',
        id: result.insertedId,
      });
    } else {
      res.status(500).json({ message: 'Failed to update battle royale game.' });
    }
  } catch (err) {
    res.status(500).json({
      message: 'An error has occurred while updating the battle royale game',
      error: err.message,
    });
  }
};

const deleteGame = async (req, res) => {
  const brId = ObjectId.createFromHexString(req.params.id);
  try {
    const result = mongodb
      .getDb()
      .db()
      .collection('battle_royale')
      .deleteOne({ id: brId });

    if (result.deletedCount > 0) {
      res.status(200).json({
        message: 'Battle Royale game deleted successfully.',
      });
    } else {
      res.status(500).json({ message: 'Failed to delete battle royale game.' });
    }
  } catch (err) {
    res.status(500).json({
      message: 'An error has occurred while deleting the battle royale game.',
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
