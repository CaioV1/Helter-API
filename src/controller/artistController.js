const ArtistModel = require("../model/artistModel.js").artistModel;

class ArtistController {

    async insertArtist(req, res, next){

        try {
    
            const artistModel = new ArtistModel(req.body);
    
            await artistModel.save();
    
            res.status(201);
            res.send(`O(A) artista ${req.body.artistic_name} foi criado(a) com sucesso.`);
            
        } catch (error) {
    
            res.status(500);
    
            console.log("\nOcorreu um erro ao inserir o(a) artista");
            console.log(error.message);
            res.send(`Ocorreu um erro ao inserir o(a) artista. Segue o erro: \n ${error.message}`);
            
        }
    
    }
    
    async getArtists(req, res, next) {
    
        try {
    
            ArtistModel.find((error, artist) => {
    
                if(error) throw error;
    
                res.json(artist).status(200);
    
            })
            
        } catch (error) {
    
            res.status(500);
    
            console.log("\nOcorreu um erro ao obter os artistas");
            console.log(error.message);
            res.send(`Ocorreu um erro ao obter os artistas. Segue o erro: \n ${error.message}`); 
            
        }
    
    }

    async removeArtist(req, res, next){

        try {

            ArtistModel.remove(req.paramas.id, (error) => {

                if(error) throw error;

                res.status(200);
                res.send(`O Artista ${req.body.title} foi removido com sucesso.`);

            });
            
        } catch (error) {

            genericMessage = "Ocorreu um erro ao remover o artista. Segue o erro:\n";
    
            console.log(genericMessage);
            console.log(error.message);
    
            response.status(500);
            response.send(`${genericMessage} ${error.message}`)
            
        }

    }

}

module.exports = new ArtistController();