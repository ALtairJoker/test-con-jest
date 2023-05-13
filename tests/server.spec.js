const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
    it("Testeando ruta GET /cafes", async () => {
        const {statusCode, body} = await request(server).get('/cafes').send();
        expect(statusCode).toBe(200)
        expect(body).toBeInstanceOf(Array)
        expect(body[0]).toBeInstanceOf(Object)
    })
    it("Testeando ruta DELETE /cafes/id", async () => {
        const id = 100; // id que no existe en el archivo cafes.json
        const {statusCode, body} = await request(server).delete(`/cafes/${id}`).set("Authorization", "jwt");
        expect(statusCode).toBe(404);
        expect(body).toEqual({ message: "No se encontró ningún cafe con ese id" });
    });
    it("Testeando ruta POST /cafes", async () => {
        const cafe = {id: 5, nombre: "cargado" };
        const {statusCode, body: cafes} = await request(server).post("/cafes").send(cafe);
        expect(statusCode).toBe(201);
        expect(cafes).toContainEqual(cafe)
    });
    it("Testeando ruta PUT /cafes/id", async () => {
        const cafe = { id: 4, nombre: "Café con leche" };
        const {statusCode, body} = await request(server).put("/cafes/3").send(cafe)
        expect(statusCode).toBe(400);
        expect(body).toEqual({ message: "El id del parámetro no coincide con el id del café recibido" });
    });
});
