const paths = require('express').Router();
const File = require('../modals/file');

paths.get('/:uuid', async (req,res) =>{
try{
const file = await File.findOne({ uuid: req.params.uuid});
        

        return res.render('receiverPage',{
                uuid: file.uuid,
                fileName: file.fileName,
                fileSize:file.size,
                downloadLink: `${process.env.DOWNLOAD_URL}/files/download/${file.uuid}`
                //http://localhost:3000/files/download/wiudiwjcihciuh
        });

}catch(err){
        return res.render('receiverPage',{ error:'OOPS!! we get some error.'});
}
});






module.exports = paths;