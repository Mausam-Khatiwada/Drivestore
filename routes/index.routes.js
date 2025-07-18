const express = require('express');
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const File = require('../models/file.model');
const isAuthenticated = require('../middlewares/auth.middleware');
const user = require('../models/user.model');

const router = express.Router();

router.get('/home', isAuthenticated, async(req,res)=>{
    try{
    const files =await File.find({userId: req.user.userId}).sort({uploadDate: -1});
    res.render('home', {files , user: req.user});
    }
    catch(err){
        console.error(err);
    }

})

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        const folder = `uploads/${req.user.userId}`
        fs.mkdirSync(folder, {recursive:true})
        cb(null, folder)
    },
    filename:(req,file,cb)=>{
        const uniqueName = `${Date.now()+'-'+file.originalname}`;
        cb(null, uniqueName)
    }
})
const upload = multer({ storage: storage });



router.post('/upload-file', isAuthenticated, upload.single('file'),async (req, res)=>{
    try{
        const file = new File({
            userId : req.user.userId,
            originalName : req.file.originalname,
            storedName: req.file.filename,
            path: req.file.path,
            size: req.file.size,
            mimeType: req.file.mimetype
        })
        await file.save();
        res.redirect('/home')
        console.log("File uploaded successfully", file);
    }
    catch(err){
        console.error(err);
        res.status(500).send("upload failed");
    }

})


module.exports = router;