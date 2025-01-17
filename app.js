const express = require('express');
const morgan = require('morgan');
const app = express();
const tourRouter=require('./routers/tourRouter')
const userRouter=require('./routers/userRouter')
app.use(express.json());
app.use(morgan('dev'));
app.use((req, res, next) => {
  console.log('Middleware executed');
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
// app.get('/api/v1/tours',getAllTours);
// app.get('/api/v1/tours/:id',getTour);
// app.post('/api/v1/tours',createTour);
// app.patch('/api/v1/tours/:id',updateTour)
// app.delete('/api/v1/tours/:id',deleteTour)

// app.get('/', (req, res) => {
//   res.status(200).json({ message: 'Response from server', app: 'Natours' });
// });
// app.post('/',(req,res)=>{
//     res.send('Posting is available.')
// })
