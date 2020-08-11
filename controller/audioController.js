const fs = require("fs");
const AudioModel = require("../model/audioModel.js").audioModel;

exports.insert = async (request, response, next) => {

    try {

        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Credentials", true);

        const audioModel = new AudioModel(request.body);

        await audioModel.save();

        response.status(201);
        response.send(`A canção ${request.body.title} foi inserida com sucesso.`)
        
    } catch (error) {

        genericMessage = "Ocorreu um erro ao inserir a canção. Segue o erro:\n";

        console.log(genericMessage);
        console.log(error.message);

        response.status(500);
        response.send(`${genericMessage} ${error.message}`)
        
    }

}

exports.getAudios = async (request, response, next) => {

    try {

        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Credentials", true);

        AudioModel.find((error, audio) => {

            if(error) return handleError(error);

            response.json(audio).status(200);

        })
        
    } catch (error) {

        genericMessage = "Ocorreu um erro ao obter as canções. Segue o erro:\n";

        console.log(genericMessage);
        console.log(error.message);

        response.status(500);
        response.send(`${genericMessage} ${error.message}`)
        
    }

}

exports.getAudioByRecord = async (request, response, next) => {

    try {

        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Credentials", true);

        AudioModel.find({"record": request.params.record_id}, (error, audio) => {

            if(error) return handleError(error);

            response.json(audio).status(200);

        });
        
    } catch (error) {

        genericMessage = "Ocorreu um erro ao obter as canções baseado no id do disco. Segue o erro:\n";

        console.log(genericMessage);
        console.log(error.message);

        response.status(500);
        response.send(`${genericMessage} ${error.message}`)
        
    }

}

exports.play = async (request, response, next) => {

    try {

        response.setHeader("ccess-Control-Allow-Headers", "Content-Type");
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Credentials", true);

        const audio = await getAudioById(request.params.id);

        const file = "/Users/caiomorais/Music" + audio.file_path + audio.filename;

        //Criando e lendo stream baseado no arquivo mp3 além de codificá-lo em base64
        const streamReader = fs.createReadStream(file);

        //************* Primeiro método para transmissão de arquivo. Mais simples e direto, sem grandes configurações.
        //Primeiro teste: 1m 37s

        //Nesse primeiro método definimos apenas o transmissor e receptor que no caso é a variável "streamReader" e "res" respectivamente.
        //streamReader.pipe(res); 

        let fileLength = 0;

        let chunkLength = 0;

        let progressLength = 0;

        //************* Segundo método onde é configurado cada passo provendo maior liberdade no processo de transmissão (stream) do arquivo
        //Primeiro teste: 1m 24s

        //Configurando evento para cada transmissão de pedaço de dado realizado
        streamReader.on("data", chunk => {

            //Entregando (escrevendo) um pedaço da stream para o endpoint
            response.write(chunk);

            fileLength = streamReader.readableLength;

            chunkLength = chunk.length / 1024

            progressLength = progressLength + (chunkLength / 1024)

            console.log("Recebido " + parseFloat(progressLength.toFixed(2)) 
                      + "MB no total. Pedaço do dado de " + parseFloat(chunkLength.toFixed(2)) + "KB");

        })

        //Configurando o evento de fim da transmissão
        streamReader.on("end", ()=>{

            //Finalizando a entrega (escrita) do stream.
            response.end();

            response.status(200);

            console.log("\nTransferência concluída.");
            

        })
        
    } catch (error) {

        response.status(500);

        console.log("Ocorreu um erro ao reproduzir a música");
        console.log(error.message);
        response.send(error.message);
        
    }

    function getAudioById(id){

        return new Promise((resolve, reject)=>{

            AudioModel.findById(id, (error, audio)=>{

                if(error) reject(error)

                resolve(audio.toJSON());

            })

        })

    }

}