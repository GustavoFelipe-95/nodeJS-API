require('./../setup/db')
const request = require("supertest");
const app     = require('./../server');

describe("Entrada no estacionamento", () => {
    it("Limpando testes anteriores", async () => {
        const response = await request(app).delete("/parking");
        expect(response.statusCode).toEqual(200);
    }, 15000);

    it("Entrada autorizada", async () => {
        const response = await request(app).post("/parking").send({plate: 'AAA-9999'});
        expect(response.statusCode).toEqual(201);
    }, 15000);

    it("Placa inválida", async () => {
        const response = await request(app).post("/parking").send({plate: '#####'});
        expect(response.statusCode).toEqual(406);
    }, 15000);

    it("Placa duplicada", async () => {
        const response = await request(app).post("/parking").send({plate: 'AAA-9999'});
        expect(response.statusCode).toEqual(428);
    }, 15000);
});

describe("Historico da placa no estacionamento", () => {
    it("Placa sem historico", async () => {
        const response = await request(app).get("/parking/AAA-8888");
        expect(response.statusCode).toEqual(422);
    }, 15000);

    it("Placa com historico", async () => {
        const response = await request(app).get("/parking/AAA-9999");
        expect(response.statusCode).toEqual(200);
    }, 15000);
});

describe("Saida do Estacionamento", () => {
    it("Placa sem registro", async () => {
        const response = await request(app).put("/parking/AAA-8888/out");
        expect(response.statusCode).toEqual(422);
    }, 15000);

    it("Solicitar pagamento antes de liberar", async () => {
        const response = await request(app).put("/parking/AAA-9999/out");
        expect(response.statusCode).toEqual(428);
    }, 15000);

    it("Tentativa de pagamento em placa sem registro", async () => {
        const response = await request(app).put("/parking/AAA-8888/pay");
        expect(response.statusCode).toEqual(422);
    }, 15000);

    it("Realizar pagamento", async () => {
        const response = await request(app).put("/parking/AAA-9999/pay");
        expect(response.statusCode).toEqual(200);
    }, 15000);

    it("Pagamento já realizado para esta placa", async () => {
        const response = await request(app).put("/parking/AAA-9999/pay");
        expect(response.statusCode).toEqual(428);
    }, 15000);

    it("Saída autorizada", async () => {
        const response = await request(app).put("/parking/AAA-9999/out");
        expect(response.statusCode).toEqual(200);
    }, 15000);
});