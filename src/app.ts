import express, { Request, Response } from 'express';

const app = express();
const port = 3000;
app.use(express.json());

app.get('/',async (req, res): Promise<void> => {

  res.status(200).json({ message: 'hello world' });
  return;

});

app.get('/employees/:emp_id?', async (req, res): Promise<void> => {

  const { emp_id } = req.params;

  res.status(200).json({ message: 'Id was sent as params', emp_id : emp_id });
  return;

});

app.post('/employees', async (req, res): Promise<void> => {

  const { name, age } = req.body;
  //add send msg
  res.status(200).json({ message: 'Your req is successful' , data :[{
    name, 
    age
}]});
  return;
});



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
