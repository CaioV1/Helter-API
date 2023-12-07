const logger = require('../config/logger.config');
const ArtistModel = require("../model/artist.model");

class ArtistController {
  async insertArtist(req, res) {
    try {
      const artistModel = new ArtistModel(req.body);
      await artistModel.save();

      res.status(201).json({msg: `The artist ${req.body.artistic_name} was inserted with success.`});
    } catch (error) {
      const GENERIC_ERROR_MESSAGE = 'An error has occurred on inserting the artist';
      logger.error(error.message)
      response.status(500).json({error: GENERIC_ERROR_MESSAGE});
    }
  }

  async getArtists(_req, res) {
    try {
      const listArtists = await ArtistModel.find();
      res.json(listArtists).status(200);
    } catch (error) {
      const GENERIC_ERROR_MESSAGE = 'An error has occurred on getting the artists';
      logger.error(error.message)
      response.status(500).json({error: GENERIC_ERROR_MESSAGE});
    }
  }

  async removeArtist(req, res) {
    try {
      await ArtistModel.deleteOne({_id: req.params.id});
      res.status(200).json({msg: `O Artista ${req.body.title} foi removido com sucesso.`});
    } catch (error) {
      const GENERIC_ERROR_MESSAGE = 'An error has occurred on deleting the artist';
      logger.error(error.message)
      res.status(500).json({error: GENERIC_ERROR_MESSAGE});
    }
  }
}

module.exports = new ArtistController();