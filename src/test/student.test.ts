import { DataSource } from 'typeorm';
import { setupTestDataSource } from '../../test-utils';
import { Student } from '../entity/Student';

let AppDataSource: DataSource;

beforeAll(async () => {
  AppDataSource = await setupTestDataSource();
});

afterAll(async () => {
  if (AppDataSource) {
    await AppDataSource.destroy();
  }
});

describe('Student Entity Tests', () => {
  test('should create and retrieve a student', async () => {
    const studentRepository = AppDataSource.getRepository(Student);

    const newStudent = studentRepository.create({
      firstName: 'satnam',
      lastName: 'singh',
      age: 20,
    });

    await studentRepository.save(newStudent);

    const savedStudent = await studentRepository.findOneBy({
      studentId: newStudent.studentId,
    });

    expect(savedStudent).not.toBeNull();
    expect(savedStudent?.firstName).toBe('satnam');
    expect(savedStudent?.lastName).toBe('singh');
    expect(savedStudent?.age).toBe(20);
  });

  test('should update a student', async () => {
    const studentRepository = AppDataSource.getRepository(Student);

    const newStudent = studentRepository.create({
      firstName: 'navtej',
      lastName: 'singh',
      age: 22,
    });

    await studentRepository.save(newStudent);

    newStudent.age = 23;
    await studentRepository.save(newStudent);

    const updatedStudent = await studentRepository.findOneBy({
      studentId: newStudent.studentId,
    });

    expect(updatedStudent?.age).toBe(23);
  });

  test('should delete a student', async () => {
    const studentRepository = AppDataSource.getRepository(Student);

    const newStudent = studentRepository.create({
      firstName: 'neelam',
      lastName: 'neelam',
      age: 25,
    });

    await studentRepository.save(newStudent);

    await studentRepository.delete(newStudent.studentId);

    const deletedStudent = await studentRepository.findOneBy({
      studentId: newStudent.studentId,
    });

    expect(deletedStudent).toBeNull();
  });
});
