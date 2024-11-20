import request from 'supertest';
import { setupTestDataSource } from '../../test-utils';
import app from '../app'; 
import { DataSource } from 'typeorm';

let AppDataSource: DataSource;

beforeAll(async () => {
  AppDataSource = await setupTestDataSource();
});

afterAll(async () => {
  if (AppDataSource) {
    await AppDataSource.destroy();
  }
});

describe('Student API Routes', () => {
  test('GET /students should return an empty array initially', async () => {
    const response = await request(app).get('/students');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  test('POST /students should create a new student', async () => {
    const response = await request(app)
      .post('/students')
      .send({
        firstName: 'Anita',
        lastName: 'Arora',
        age: 20,
      });

    expect(response.status).toBe(201);
    expect(response.body.firstName).toBe('Anita');
    expect(response.body.lastName).toBe('Arora');
  });

  test('GET /students should return the created student', async () => {
    const response = await request(app).get('/students');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].firstName).toBe('Anita');
  });

  test('PUT /students/:studentId should update a student', async () => {
    const studentResponse = await request(app)
      .post('/students')
      .send({
        firstName: 'Balraj',
        lastName: 'Singh',
        age: 22,
      });

    const studentId = studentResponse.body.studentId;

    const updateResponse = await request(app)
      .put(`/students/${studentId}`)
      .send({
        firstName: 'Balraj',
        lastName: 'Singh',
        age: 23,
      });

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.age).toBe(23);
  });

  test('DELETE /students/:studentId should delete a student', async () => {
    const studentResponse = await request(app)
      .post('/students')
      .send({
        firstName: 'Amar',
        lastName: 'Jot',
        age: 25,
      });

    const studentId = studentResponse.body.studentId;

    const deleteResponse = await request(app).delete(`/students/${studentId}`);

    expect(deleteResponse.status).toBe(200);

    const fetchResponse = await request(app).get(`/students/${studentId}`);
    expect(fetchResponse.status).toBe(404);
  });
});
