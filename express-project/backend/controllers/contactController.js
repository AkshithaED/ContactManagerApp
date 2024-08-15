const asyncHandler=require("express-async-handler");
const Contact=require("../models/contactModel");
// @desc get all contacts
// @route GET  /api/contacts
// @access private
const getContacts= asyncHandler(async (req,res)=>{
    const contacts= await Contact.find({user_Id:req.user.id});
    res.status(200).json(contacts);
});

// @desc create  contacts
// @route post  /api/contacts
// @access private
const createContact= asyncHandler( async (req,res)=>{
    console.log(req.body);
    const {name,email,phone}=req.body;
    if(!name || !email || !phone){
         res.status(400);
         throw new Error("All fields are Required !!");
    }
    const contact=await Contact.create(
        {
             name,
             email,
             phone,
             user_Id:req.user.id,
        }
    );
    res.status(201).json(contact);
});

// @desc  get contact
// @route get  /api/contacts/:id
// @access private
const getContact= asyncHandler(async (req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact){
         res.status(404);
         throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});

// @desc  update contact
// @route put  /api/contacts/:id
// @access private
const updateContact= asyncHandler(async (req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact){
         res.status(404);
         throw new Error("Contact not found");
    }
     if(contact.user_Id.toString()!==req.user.id){
         res.send(403)//not authorized
         throw new Error("User don't have permission to update other user contacts");
     }
    const updatedContact=await Contact.findByIdAndUpdate(
         req.params.id,
         req.body,
         {
            new:true
         }
    )
    res.status(200).json(updatedContact);
});

// @desc  delete contact
// @route delete  /api/contacts/:id
// @access private
const deleteContact= asyncHandler(async (req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact){
         res.status(404);
         throw new Error("Contact not found");
    }
    if(contact.user_Id.toString()!==req.user.id){
        res.send(403)//not authorized
        throw new Error("User don't have permission to delete other user contacts");
    }
    await Contact.deleteOne({_id:req.params.id});
    res.status(200).json(contact);
});

module.exports = {getContacts,createContact,updateContact,getContact,deleteContact};//named export
