const passwordOperation = require("./passwordController.js");
const db=require('../dbconfig/db.config.js')
const jwt =require('jsonwebtoken')

const User=db.users;
class userController{
    static userRegistration = async(req,res)=>{
        try{
            const {username,password,role}=req.body;
            if(username && password){
                const user = await User.findOne({
                    where: { username: username }
                });
                
                if(user){
                    res.status(200).send({
                        success:false,
                        message:'User Already Exist Please try to Login'
                    })
                }
                else{
                    const hashedPassword = await passwordOperation.hashPassword(password);
                    const newUser={
                        username:username,
                        password_hash:hashedPassword,
                        role:role
                    }
                    User.create(newUser).then((data)=>{
                        res.status(201).send({
                            success:true,
                            message:'User Successfully Created',
                            newUser
                        })
                    }).catch((error)=>{
                        res.status(500).send({
                            success:false,
                            message:'Error Occured',
                            error
                        })
                    })
                    
                }
            }
            else{
                res.status(400).send({
                    success:false,
                    meassage:'Please Provide All The required Fields'
                })
            }
        }
        catch(err){
            // if any server error occurs
            res.status(500).send({
                success:false,
                message:'An Error Occured During Registration',
                err
            })
        }
    }

    static userLogin = async(req,res)=>{
        try{
            const {username,password}=req.body
            if(username && password){
                const user = await User.findOne({
                    where: { username: username }
                });
                if(user){
                    console.log(user);
                    console.log(password);
                    const isPasswordCorrect= await passwordOperation.comparePassword(password,user.password_hash)
                    if(isPasswordCorrect){
                        const accessToken=jwt.sign({username:user.username,role:user.role,userid:user.id},process.env.JWT_SECRET,{expiresIn:'1d'})
                        res.status(200).send({
                            success:true,
                            meassage:'Login Successfull',
                            accessToken
                        })
                    }
                    else{
                        res.status(401).send({
                            success:false,
                            message:'Invalid Credential'
                        });
                    }
                }
                else{
                    res.status(401).send({
                        success:false,
                        message:'Invalid Credentials'
                    })
                }
            }
            else{
                res.status(401).send({
                    success:false,
                    message:'Please Provide All the Required Fields'
                })
            }
        }
        catch(error){
            res.status(500).send({
                success:false,
                message:'An Error Occured During Login',
                error
            })
        }
    }
}


module.exports= userController;