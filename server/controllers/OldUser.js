const User = require('../models/User');

const SignUpUser = async(req,res) => {
    const {name , email , password , reenterpassword} = req.body;

    try{
        const user = User.create({
            name , email , password , reenterpassword
        });
        res.json({success : true , message : "New User Created"});
    }

    catch(err){
        res.json({success : false , message : err.message});
    }
}

const LoginUser = async(req,res) => {
    const {email , password} = req.body;

    try{
      const user =  await User.find({email , password});

        if(!user){
            res.json({success : false , message : "Invalid Credentials"});
        }
        res.json({success : true , message : "Logged In"});
    }
    catch(err){
        res.json({success : false , message : err.message}); 
    }
}   

module.exports = {
    SignUpUser , LoginUser
}