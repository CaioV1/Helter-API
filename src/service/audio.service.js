class AudioService {
  async play(){
    try {

      const audio = await this.getAudioById(request.params.id);
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
      streamReader.on("end", () => {

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
  }
}