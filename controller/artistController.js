const ArtistModel = require("../model/artistModel.js").artistModel;

exports.insertArtist = async (req, res, next) => {

    try {

        res.setHeader("Access-Control-Allow-Headers", "Content-Type");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Credentials", true);

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

exports.getArtists = async(req, res, next) => {

    try {

        res.setHeader("Access-Control-Allow-Headers", "Content-Type");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Credentials", true);

        ArtistModel.find((error, artist) => {

            if(error) return handleError(error);

            res.json(artist).status(200);

        })
        
    } catch (error) {

        res.status(500);

        console.log("\nOcorreu um erro ao obter os artistas");
        console.log(error.message);
        res.send(`Ocorreu um erro ao obter os artistas. Segue o erro: \n ${error.message}`); 
        
    }

}