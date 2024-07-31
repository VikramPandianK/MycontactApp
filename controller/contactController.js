const asyncHandler = require('express-async-handler');
const contactModel = require('../models/contactModel');
const logger  = require('../utils/logger');
//@desc get all contacts
//@route GET api/v1/contacts
//@access private

const getContacts = asyncHandler(async (req,res)=>{
    const contacts = await contactModel.find({user_id:req.user.id});
    res.status(200).json(contacts);
});

//@desc get contact by id
//@route GET api/v1/contacts/:id
//@access private
const getContactsbyId = asyncHandler(async(req,res)=>{
    const contact = await contactModel.findById(req.params.id);
    if(!contact){
        res.status(404);
        
        throw new Error('Contact not found');
    }
   res.status(200).send({msg:"Success",details:contact});
});

//@desc create contact
//@route POST api/v1/contacts
//@access private
const createContact = asyncHandler(async(req,res)=>{
const {name,email,phone } = req.body;
if(!name || !email || !phone){
    res.status(404);
    throw new Error ("all fields are required");
}
const contact = await contactModel.create({name,email,phone,user_id:req.user.id});
res.status(201);
logger.info("Contact created " + contact + "Created by " + req.user.id);
res.send({msg: "created successfully",details: contact});
});

//@desc update contact
//@route PUT api/v1/contacts/:id
//@access private
const updateContact = asyncHandler(async(req,res)=>{
    const contact = await contactModel.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error('Contact not found');
    }

    if(contact.user_id.toString() !== req.user.id){
      res.status(403);
    throw new Error("User don't have to edit the contact")
    }

    const updateContact = await contactModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    )

res.status(200).send({msg: "update successfully for id: " + req.params.id,details:updateContact});
});

//@desc delete contact
//@route DELETE api/v1/contacts/:id
//@access public
const deleteContact = asyncHandler(async(req,res)=>{

     const contact = await contactModel.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error('Contact not found');
    }
   if(contact.user_id.toString() !== req.user.id){
      res.status(403);
    throw new Error("User don't have to delete the contact")
    }
    await contactModel.deleteOne({_id:req.params.id});
res.status(200).send({msg: "delete successfully for id: " + req.params.id,details:contact});
});


module.exports = {getContacts,getContactsbyId,createContact,updateContact,deleteContact};