const request = require('supertest');
const app = require("../server");

describe('GET basic conection', () => {
    it('should fetch te home text', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
      expect(response.text).toBe("Home page");
    });
    it('should return 404', async () => {
      const response = await request(app).get('/notExistsRoute');
      expect(response.status).toBe(404);
    });
  });