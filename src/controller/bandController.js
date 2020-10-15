const BandModel = require("../model/bandModel.js").bandModel;

exports.insertBand = async (request, response, next) => {

    try {

        const bandModel = new BandModel(request.body);

        await bandModel.save();

        response.status(201);
        response.send(`A banda ${request.body.name} foi inserida com sucesso.`);
        
    } catch (error) {

        genericMessage = "Ocorreu um erro ao inserir a banda. Segue o erro: \n";

        console.log(genericMessage);
        console.log(error.message);

        response.status(500);
        response.send(`${genericMessage} ${error.message}`)
        
        
    }

}

exports.getBands = async(request, response, next) => {

    try {

        BandModel.find((error, band) => {

            if(error) throw error;

            response.json(band).status(200);

        })
        
    } catch (error) {

        genericMessage = "Ocorreu um erro ao obter as bandas. Segue o erro:\n";

        console.log(genericMessage);
        console.log(error.message);

        response.status(500);
        response.send(`${genericMessage} ${error.message}`)       
        
    }

}