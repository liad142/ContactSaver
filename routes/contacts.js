const express = require('express');
const router = express.Router()

//@route  GET api/contacts
//@desc   get all users contact
//@access  Private
router.get('/',(req,res)=>{
    res.send('get all contacts')
})


//@route  POST api/contacts
//@desc   add new contact
//@access  Private
router.post('/',(req,res)=>{
    res.send('add contact')
})


//@route  POST api/contacts/:id
//@desc   updtae contact
//@access  Private
router.put('/:id',(req,res)=>{
    res.send('update contact')
})


//@route  POST api/contacts/:id
//@desc   delete contact
//@access  Private
router.delete('/:id',(req,res)=>{
    res.send('delete contact')
})


module.exports = router
