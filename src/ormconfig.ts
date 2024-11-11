import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'satnam',
    password: 'password',
    database: 'satnam_db',
    synchronize: false,
    logging: false,
    entities: ['src/entity/**/*.ts'],
    migrations: ['src/migration/**/*.ts'],
    subscribers: ['src/subscriber/**/*.ts'],
});

AppDataSource.initialize()
    .then(() => {
        console.log('Data Source has been initialized!');
    })
    .catch((err) => {
        console.error('Error during Data Source initialization:', err);
    });


    //docker run --name my_postgres -e POSTGRES_USER=satnam -e POSTGRES_PASSWORD=password -e POSTGRES_DB=satnam_db -p 5432:5432  -d postgres
