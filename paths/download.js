const paths = require('express').Router();
const File = require('../modals/file');



paths.get('/:uuid',async (req,res)=>{
    const file = await File.findOne({ uuid: req.params.uuid});
    if(!file) {
        return res.render('receiverPage',{ error:'Link is Expired.'});
    }
    const response = await file.save();
    const filePath = `${__dirname}/../${file.path}`;
    res.download(filePath);
});


module.exports = paths;