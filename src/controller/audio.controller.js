const fs = require("fs");
const logger = require('../config/logger.config');
const AudioModel = require("../model/audio.model");

class AudioController {
  constructor() {
    this.play = this.play.bind(this);
  }

  async insert(request, response) {
    try {
      const audioModel = new AudioModel(request.body);
      await audioModel.save();

      response.status(201);
      response.send({msg: `The song ${request.body.title} was inserted with success.`})
    } catch (error) {
      const GENERIC_ERROR_MESSAGE = 'An error has occurred on inserting the song';
      logger.error(error.message);
      response.status(500).json({error: GENERIC_ERROR_MESSAGE});
    }
  }

  async getAudios(_request, response) {
    try {
      const listAudios = await AudioModel.find();
      response.status(200).json(listAudios);
    } catch (error) {
      const GENERIC_ERROR_MESSAGE = 'An error has occurred on getting the songs';
      logger.error(error.message);
      response.status(500).json({error: GENERIC_ERROR_MESSAGE});
    }
  }

  async getAudioByRecord(request, response) {
    try {
      const audio = await AudioModel.find({ "record": request.params.record_id });
      response.status(200).json(audio);
    } catch (error) {
      const GENERIC_ERROR_MESSAGE = 'An error has occurred on getting the songs';
      logger.error(error.message);
      response.status(500).json({error: GENERIC_ERROR_MESSAGE});
    }
  }

  async getAudioById(id) {
    const audio = await AudioModel.findById(id);
    return audio;
  }

  async play(request, response) {
    try {
      const audio = await this.getAudioById(request.params.id);

      if(!audio){
        response.status(404).json({msg: 'Music not found'});
        return;
      }

      const file = process.env.MUSIC_PATH + audio.file_path + audio.filename;
      const streamReader = fs.createReadStream(file);

      streamReader.on("data", chunk => response.write(chunk));
      streamReader.on("end", () => response.end().status(200));
    } catch (error) {
      const GENERIC_ERROR_MESSAGE = 'An error has occurred on playing the songs';
      logger.error(error.message);
      response.status(500).json({error: GENERIC_ERROR_MESSAGE});
    }
  }

}

module.exports = new AudioController();