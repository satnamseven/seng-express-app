import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from './ormconfig';
import { Student } from './entity/Student';

const app = express();
const port = 3000;

app.use(express.json());

// Endpoint to get all students
app.get('/students', async (req, res) => {
  const studentRepository = AppDataSource.getRepository(Student);
  const students = await studentRepository.find();
  res.json(students);
});

// Endpoint to create a student
app.post('/students', async (req, res) => {
  const studentRepository = AppDataSource.getRepository(Student);
  const { firstName, age, } = req.body;
  const newStudent = studentRepository.create({ firstName, age });
  await studentRepository.save(newStudent);
  res.status(201).json(newStudent);
});

// Initialize database and start the server
AppDataSource.initialize()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => console.log(error));
