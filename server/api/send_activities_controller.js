import { Router } from 'express'
import { SendActivities, SendActivity } from '../models/send_activities'
import multer from 'multer'

const router = Router()


var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads')
  },
  filename: function(req, file, cb) {
    cb(null, req.body.year + '-' + Date.now() + '-' + file.originalname)
  }
})
var upload = multer({ storage: storage });



router.get('/send_activities/:yearPlaceId', async function (req, res, next) {
  
    try {
      var result = (await SendActivity.forge().where({year_place_id: req.params.yearPlaceId}).fetch()).toJSON()
      res.status(200).json(result)
    } catch(e) {
      console.log(e)
      res.status(500).json(e);
    
    }
      
      
  })


router.post('/send_activities/upload',upload.single('xlsxUp'), async function (req, res, next) {
  console.log(req.body.year)
  console.log(req.body.place)
  console.log(req.body.yearPlaceId)
  console.log('文件保存路径：%s', req.file.path);
  try {
    await SendActivity.forge().where({year_place_id: req.body.yearPlaceId}).upsert({year_place_id: req.body.yearPlaceId, file_name: req.file.path})
    
    res.status(200).send('ok')
  } catch(e) {
    console.log(e)
    res.status(500).json(e);
  
  }
    
    
})


export default router
