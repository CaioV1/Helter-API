const request = require("supertest");
const serverConfig = require("../../src/config/Server");

describe("Test the artist route", () => {

    it("Insert a artist", (done) => {

        const artist = {

            artistic_name : "Paul McCartney",
            complete_name : "James Paul McCartney",
            main_band : "5ed1bbacbdfe21180c026fa4",
            pathImage : "../",
            originCountry : "Reino Unido",
            birthDate : "1942-06-18",
            
        }

        request(serverConfig.app)
            .post("/api/artist")
            .send(artist)
            .set("Accept", "application/json")
            .expect(201)
            .end((err, res) => {

                if(err) done(err);

                done();

            });

    });

    it("Get all the artist", (done) => {

        request(serverConfig.app)
            .get("/api/artist")
            .expect("Content-Type", "application/json; charset=utf-8")
            .expect(200, done);

    });

});