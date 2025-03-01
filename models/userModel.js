const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required:[true,"Please enter a name"]
    },

    email:{
        type: String,
        required:[true,"Please enter a email"],
        unique: [true,"Email already taken"]
    },

    phone:{
        type: String,
        required:[true,"Please enter a phone number"],
        unique: [true,"Phone already taken"]
    },

    password:{
        type: String,
        required:[true,"Please enter a password"]
    },

   },
  {
     timestamps:true
  }
);

module.exports = mongoose.model('User',userSchema);