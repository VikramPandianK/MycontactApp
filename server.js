const dotenv = require('dotenv').config();
const express =  require('express');
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./config/dbConfig');
connectDb();
const app = express();

const version = 'v1';
const contact  = `/api/${version}/contacts`;
const users  = `/api/${version}/users`;
app.use(express.json());
app.use(`${contact}`,require("./routes/contactRouters"));
app.use(`${users}`,require("./routes/userRouters"));
app.use(errorHandler);




const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`);
});