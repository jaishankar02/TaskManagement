const bcrypt=require('bcrypt')

class passwordOperation{
    static hashPassword = async(password)=>{
        try{
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password,salt)
            return hashedPassword;
        }
        catch(error){
            console.log(error);
        }
    }
    

    static comparePassword = async (password,hashPassword)=>{
        try{
            let isPasswordCorrect = await bcrypt.compare(password,hashPassword)
            return isPasswordCorrect
        }
        catch(error){
            console.log(error)
        }
    }
}

module.exports=passwordOperation