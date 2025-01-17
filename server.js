const app= require('./app');
const port = 8000;
app.listen(port, () => {
  console.log(`Started on port ${port}`);
});