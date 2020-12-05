const { Router } = require('express');
const bodyParser = require('body-parser')
const router  = Router();
const User = require('../models/User');
const faker = require('faker');
const { db } = require('../models/User');
const jsonParser = bodyParser.json();

router.get('/api/users', async (req,res)=>{
    const users = await User.find();
    res.json({message:'These are all user in db',users});
});

router.get('/api/users/create',async (req,res)=>{
    for (let i = 0; i < 5; i++) {
        await User.create({
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            avatar: faker.image.avatar()
        });
    }

    res.json({ message: '5 users were created'})
});

router.post('/api/users/createone/',jsonParser,async(req,res) =>{
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        avatar: req.body.avatar
    } 
    if (user != null) {
        await User.create(user);
        return res
        .status(200)
        .json({message:'the user was created'});
    }
    else
    {
       return res
        .status(400)
        .json({message:'cannot create user where the user is null'});
    }
});
router.put('/api/users/put/:id',jsonParser,async(req,res) =>{
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        avatar: req.body.avatar
    } 
    if (user != null) {
        await User.findOneAndUpdate(req.params.id,user);
        return res
        .status(200)
        .json({message:'the user was upgraded'});
    }
    else
    {
       return res
        .status(400)
        .json({message:'cannot create user upgraded the user is null'});
    }
});

router.delete('/api/users/delete', async (req,res)=>{
    const users = await User.deleteMany();
    res.json({message:'all the users were deleted',users});
});
router.delete('/api/users/delete/:id', async (req,res)=>
{
    const users = await User.findByIdAndRemove(req.params.id);
    res.json({message:'this user was deleted',users});
});
module.exports = router;