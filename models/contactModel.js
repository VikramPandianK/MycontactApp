const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({

    user_id:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref: 'User'
    },
    name:{
        type: String,
        required:[true,"Please enter a name"]
    },

    email:{
        type: String,
        required:[true,"Please enter a email"]
    },

    phone:{
        type: String,
        required:[true,"Please enter a phone number"]
    },

   },
  {
     timestamps:true
  }
);

module.exports = mongoose.model('Contact',contactSchema);