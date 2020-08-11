const RecordModel = require("../model/recordModel.js").recordModel;

exports.insertRecord = async (req, res, next) => {

    try {

        res.setHeader("Access-Control-Allow-Headers", "Content-Type");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Credentials", true);

        const recordModel = new RecordModel(req.body);

        await recordModel.save();

        res.status(201);
        res.send(`O disco ${req.body.title} foi criado com sucesso.`);
        
    } catch (error) {

        genericMessage = "Ocorreu um erro ao inserir o disco. Segue o erro:\n";

        console.log(genericMessage);
        console.log(error.message);

        res.status(500);
        res.send(`${genericMessage} ${error.message}`)
        
    }

}

exports.getRecords = async(req, res, next) => {

    try {

        res.setHeader("Access-Control-Allow-Headers", "Content-Type");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Credentials", true);

        RecordModel.find((error, record) => {

            if(error) return handleError(error);

            res.json(record).status(200);

        })
        
    } catch (error) {

        genericMessage = "Ocorreu um erro ao obter os discos. Segue o erro:\n";

        console.log(genericMessage);
        console.log(error.message);

        res.status(500);
        res.send(`${genericMessage} ${error.message}`)
        
    }

}

exports.getOneRecord = async(request, response, next) => {

    try {

        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Credentials", true);

        RecordModel.findById(request.params.id, (error, record) => {

            if (error) return handleError(error);

            response.json(record).status(200);

        });
        
    } catch (error) {

        genericMessage = "Ocorreu um erro ao obter o disco. Segue o erro:\n";

        console.log(genericMessage);
        console.log(error.message);

        response.status(500);
        response.send(`${genericMessage} ${error.message}`)
        
    }

}