const logger = require('../config/logger.config');
const RecordModel = require("../model/record.model");

class RecordController {
  async insertRecord(req, res) {
    try {
      const recordModel = new RecordModel(req.body);
      await recordModel.save();

      res.status(201).json({msg: `O disco ${req.body.title} foi criado com sucesso.`});
    } catch (error) {
      const GENERIC_ERROR_MESSAGE = 'An error has occurred on inserting the record';
      logger.error(error.message)
      res.status(500).json({error: GENERIC_ERROR_MESSAGE});
    }
  }

  async getRecords(_req, res) {
    try {
      const listRecords = await RecordModel.find();
      res.status(200).json(listRecords);
    } catch (error) {
      const GENERIC_ERROR_MESSAGE = 'An error has occurred on getting the records';
      logger.error(error.message)
      res.status(500).json({error: GENERIC_ERROR_MESSAGE});
    }
  }

  async getOneRecord(req, res) {
    try {
      const record = await RecordModel.findById(req.params.id);
      res.status(200).json(record);
    } catch (error) {
      const GENERIC_ERROR_MESSAGE = 'An error has occurred on getting the record';
      logger.error(error.message)
      response.status(500).json({error: GENERIC_ERROR_MESSAGE});
    }
  }
}

module.exports = new RecordController();