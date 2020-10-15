const UserModel = require("../model/userModel").userModel;

exports.insertUser = async (request, response, next) => {

    try {

        const userModel = new UserModel(request.body);

        await userModel.save();

        response.status(201);
        response.send("O usuário " + request.body.username + " foi salvo com sucesso.");

    } catch (error) {

        response.status(500);

        console.log("\nOcorreu um erro ao inserir usuário");
        console.log(error.message);
        response.send(error.message);

    }

}

exports.getUsers = (request, response, next) => {

    response.setHeader('Access-Control-Allow-Origin', '*');

    try {
    
        UserModel.find((error, user) => {

            if(error) throw error;

            response.json(user).status(200);

        });

    } catch (error) {

        response.status(500);

        console.log("\nOcorreu um erro ao obter os dados de usuário");
        console.log(error.message);
        response.send(error.message)

    }

}

exports.updateUser = (request, response, next) => {

    UserModel.findByIdAndUpdate(request.body._id, request.body, (error, user) => {

        if(error) {

            response.status(500);

            console.log("\nOcorreu um erro ao atualizar os dados do usuário");
            console.log(error.message);
            response.send(error.message)

        } else {

            response.status(200);
            response.send("O usuário " + request.body.username + " foi atualizado com sucesso.");

        }
        
    });

}

exports.deleteUser = (request, response, next) => {

    UserModel.findByIdAndDelete(request.body._id, (error, user) => {

        if(error) {

            response.status(500);

            console.log("\nOcorreu um erro ao remover o usuário");
            console.log(error.message);
            response.send(error.message)

        } else {

            response.status(200);
            response.send("O usuário " + request.body.username + " foi removido com sucesso.");

        }

    });

}