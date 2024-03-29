const express = require('express')
const router = express.Router()
const members = require('../../Members')
const uuid = require('uuid')


//gets all members
router.get('/',(req,res)=>{
    console.log(req);
    res.json(members)
});

//get single member
router.get('/:id',(req,res)=>{

    const found = members.some(member => member.id === parseInt(req.param.id));

    if(found){
        res.json(members.filter(member => member.id=== parseInt(req.params.id) ))
    }else{
        res.status(400).json({msg:`Member ${req.params.id} not found`})
    }

});

//Create member
router.post('/',(req,res)=>{


    const newMember ={
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    if(!newMember.name||!newMember.email){
        return res.status(400).json({msg:`Please fill include a name and email`})
    }

    members.push(newMember)
    res.json(members)


})


module.exports = router;