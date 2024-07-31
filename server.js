const dotenv = require('dotenv').config();
const express =  require('express');
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./config/dbConfig');
const morgan = require('morgan');
const logger = require('./utils/logger');
connectDb();
const app = express();

const version = 'v1';
const contact  = `/api/${version}/contacts`;
const users  = `/api/${version}/users`;

app.use(morgan('combined', {
  stream: {
    write: (message) => logger.info(message.trim())
  }
}));

app.use(express.json());
app.use(`${contact}`,require("./routes/contactRouters"));
app.use(`${users}`,require("./routes/userRouters"));
app.use(errorHandler);




const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`);
});