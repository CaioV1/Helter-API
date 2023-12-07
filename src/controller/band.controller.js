const logger = require('../config/logger.config');
const BandModel = require('../model/band.model');

class BandController {
  async insertBand(request, response) {
    try {
      const bandModel = new BandModel(request.body);
      await bandModel.save();

      response.status(201).json({msg: `A banda ${request.body.name} foi inserida com sucesso.`});
    } catch (error) {
      const GENERIC_ERROR_MESSAGE = 'An error has occurred on inserting the band';
      logger.error(error.message)
      response.status(500).json({error: GENERIC_ERROR_MESSAGE});
    }
  }

  async getBands(_request, response) {
    try {
      const listBands = await BandModel.find();
      response.status(200).json(listBands);
    } catch (error) {
      const GENERIC_ERROR_MESSAGE = 'An error has occurred on getting the bands';
      logger.error(error.message)
      response.status(500).json({error: GENERIC_ERROR_MESSAGE});
    }
  }
}

module.exports = new BandController();