const UserModel = require("../../src/model/userModel").userModel;

describe("Test the mongoose user model object", () => {

    it("Insert user model in database", async () => {

        const user = {
	
            "name": "Arthur",
            "last_name": "Fleck",
            "username": "ArthurF1",
            "password": "12345"
            
        }

        const userModel = new UserModel(user);

        const document = await userModel.save();

        expect(document.active).toBe(true);

    });

});