const paths = require('express').Router();
const multer = require('multer');
const path = require('path');
const File = require('../modals/file');
const { v4: uuid4} = require('uuid');

let store = multer.diskStorage({
    destination: (req, file, cb) => cb(null,'uploads/'),
    filename: (req,file,cb) =>{
        const specialName = `${Date.now()}-${MAth.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        cb(null, specialName);
    },
});

let upload = multer({
    storage:store,
    limit:{ fileSize:1000000*100},
}).single('myfile');





paths.post('/', (req,res) =>{
    //store file
upload(req, res, async (err) =>{
            //validate request
           

            if(err){
                return res.status(500).send({error: err.message})
            }

     // store in database
    const file = new File({
            filename: req.file.fileName,
            uuid: uuid4(),
            path: req.file.path,
            size: req.file.size
    });

    const response = await file.save();
    return res.json({ file:`${process.env.DOWNLOAD_URL}/files/${response.uuid}`});
    //http://localhost:3000/files/23464yfrfgy-hffdyh

});
});

paths.post('/give', async (req,res) =>{
    const { uuid, emailTo, emailFrom} = req.body;
    // validate data
   if(!emailTo || !uuid || !emailFrom){
       return res.status(422).send({ error: 'All information must be correct and are required.'});
   } 
   //get data from database
try{
   const file = new File.findOne({ uuid: uuid});
   if(file.sender){
    return res.status(422).send({ error: 'Email has been  sent already.'});
   }
   file.sender = emailFrom;
   file.receiver = emailTo;
   const response = await file.save();


   // Send email
   const sendMail = require('../email/sendEmail');
   sendMail({
       from: emailFrom,
       to: emailTo,
       subject: 'AllShare file sharing',
       text:`${ emailFrom }has sent you a file.`,
       html: require('../email/view')({
           emailFrom: emailFrom,
           downloadLink: `${process.env.DOWNLOAD_URL}/files/${file.uuid}`,
           size: parseInt(file.size/1000) + 'kb',
           expires: '24 hrs'
        })
   }).then(()=>{
       return res.json({success:true});
   }).catch(err =>{
       return res.status(500).json({error: 'Error in sending'});
   });
} catch(err){
    return res.status(500).send({error:'something went wrong'});
}
   
});

module.exports = paths;