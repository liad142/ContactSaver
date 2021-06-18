const jwt = require('jsonwebtoken')
const config = require('config')



module.exports = function (req,res,next){
    //משיג את הטוקן מהHEADER
    const token =req.header('x-auth-token')
    //בודק אם אין כבר טוקן כזה
    if(!token){
        return res.status(401).json({msg:'no token auth denied'})
    }
    //אם יש טוקן מוודא אותו
    try {
        const decoded = jwt.verify(token,config.get('jwtSecret')) // אחרי שמוודאים שהוא קיים שמים אותו במשתנה DECODED
        req.user = decoded.user
        next();
    }catch (err){
        res.status(401).json({msg:'token is not vaild'}) //אם הטוןקן כבר לא תקין שולחים לו הודעת שגיאה
    }
}
