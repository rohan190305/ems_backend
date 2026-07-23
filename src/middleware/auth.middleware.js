import * as jwt from 'jsonwebtoken'
export const authMiddler = (req ,res, next)=>{
    try {
        const authHeader = req.headers.authorization
        if(!authHeader){
            return res.status(401).json({message:"unauthorized access"})
        }
        if(!authHeader.startsWith("Bearer ")){
            return res.status(400).json({message:"format invalid"})
        }
             const token = authHeader.split(" ")[1]
             if(!token){
                return res.status(401).json({message:"invalid token"})
             }
             const decode = jwt.verify(token,process.env.JWT_SECRET_KEY)
             req.user = decode
             next()
    } catch (error) {
        return res.status(500).json({message:"internal server error"})
    }
}

export const asynHandler = (fn)=> (req , res ,next)=>{
    Promise.resolve(fn(req, res, next)).catch((err)=>next(err))

}