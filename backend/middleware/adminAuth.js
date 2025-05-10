import jwt from 'jsonwebtoken'

//middleware for admin authentication 
//this middleware will check if the token is valid or not
//if the token is valid then only the admin can access the route
//if the token is not valid then the admin can not access the route
//this middleware is used in the productRoute.js file
const adminAuth = async(req,res,next)=>{
    try{
        //get the token from the header of the request
        const {token} = req.headers
        if(!token)
        {
            return res.json({success:false,message:"Not Authorized"})
        }
        const token_decode = jwt.verify(token,process.env.JWT_SECRET);
        /*process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD 
        here we concatinate these two because we have created the token of email+password
        so while decode it we will do the reverse thing
        form the userController.js file we can see that we have created the token using email+password
        */
        if(token_decode !== process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD){
            return res.json({success:false,message:"Not Authorized"})
        }
        next()
    }
    catch(error)
    {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export default adminAuth