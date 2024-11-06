import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

app.get('/records/:id?', async (req, res): Promise<void> => {

  const { id } = req.params;

  res.status(200).json({ message: 'Id was sent as params' });
  return;

});

app.post('/records', async (req, res): Promise<void> => {

  const { name, age } = req.body;
  //add send msg
});



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
