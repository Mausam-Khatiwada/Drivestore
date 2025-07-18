const jwt = require('jsonwebtoken')

function isAuthenticated(req,res,next){
    const token = req.cookies.token
    if(!token){
        return res.redirect('/user/login')
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    }
    catch(err){
        console.error(err)
        return res.redirect('/user/login')
    }
}

module.exports = isAuthenticated;