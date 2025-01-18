const dotenv = require('dotenv');
dotenv.config({path:'./config.env'})
const app= require('./app');
// console.log(process.env);
const port = process.env.port||8000;
app.listen(port, () => {
  console.log(`Started on port ${port}`);
});