const express=require('express');

const router=express.Router();

const metaDataController=require("../controllers/metadata.controller");
const {uploadFile}=require("../middlewares/uploadFile.middleware");
const {validateObjectId}=require('../middlewares/validateObjectId.middleware')

router.post('/metadata',uploadFile, metaDataController.createMetaData);

router.get('/metadata',metaDataController.getAllMetaData);

router.delete('/metadata/:id',validateObjectId,metaDataController.deleteMetaData);

module.exports=router