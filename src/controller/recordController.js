const RecordModel = require("../model/recordModel.js").recordModel;

class RecordController {

    async insertRecord(req, res, next){

        try {
    
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
    
    getRecords(req, res, next){
    
        try {
    
            RecordModel.find((error, record) => {
    
                if(error) throw error;
    
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
    
    getOneRecord(request, response, next){
    
        try {
    
            RecordModel.findById(request.params.id, (error, record) => {
    
                if (error) throw error;
    
                response.json(record).status(200);
    
            });
            
        } catch (error) {
    
            genericMessage = "Ocorreu um erro ao obter o disco. Segue o erro:\n";
    
            console.log(genericMessage);
            console.log(error.message);
    
            response.status(500);
            response.send(`${genericMessage} ${error.message}`);
            
        }
    
    }

}

module.exports = new RecordController();