const express = require('express');
const fs = require('fs');
const app = express();
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
app.use(express.json());
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours,
    },
  });
});
app.get('/api/v1/tours/:id', (req, res) => {
  const id = req.params.id * 1;
  if(id>tours.length){
    return res.status(404).json({
        status:'fail',
        message: 'Invalid ID'
    })
  }
  const tour = tours.find(el => el.id === id);
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});
app.post('/api/v1/tours', (req, res) => {
  const newID = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newID }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
});
// app.get('/', (req, res) => {
//   res.status(200).json({ message: 'Response from server', app: 'Natours' });
// });
// app.post('/',(req,res)=>{
//     res.send('Posting is available.')
// })
const port = 8000;
app.listen(port, () => {
  console.log(`Started on port ${port}`);
});
