const jwt = require('jsonwebtoken')
const secretKey='djalkfsdiaksdjfkasdifaksdfiaksd';
class authentication{
    static tokenVerify=async(req,res,next)=>{
        const authHeader = req.headers['authorization'];
        if(!authHeader){
           return res.status(403).send({
                message:'Authorization header is required'
            })
        }
        const token=authHeader.split(' ')[1];
        if(!token){
            return res.status(403).send({
                message:'Token is missing'
            })
        }
        
        try {
            const decoded = jwt.verify(token,secretKey);
            req.userData=decoded;
            next();
        }
        catch(err){
           return res.status(401).send({
                message:'Invalid Or expired token'
            })
        }
    }

    static adminVerify=async(req,res,next)=>{
        console.log(req.userData.role);
        if(req.userData.role==='admin'){
            next();
        }
        else{
            return res.status(403).send({
                success:false,
                message:'Admin privilege is required'
            })
        }
    }
}

module.exports=authentication