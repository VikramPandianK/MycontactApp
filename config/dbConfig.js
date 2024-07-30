const mongoose = require('mongoose');

const connectDb = async ()=>{
 
 try{
   const db = await mongoose.connect(process.env.CONNECTION_STRING);
   //console.log("db connection established",db.connection.host,db.connection.name);
 }catch(e){
    console.log(e);
    process.exit(1);
 }
};

module.exports = connectDb;
