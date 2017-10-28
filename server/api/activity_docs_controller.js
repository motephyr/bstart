import { Router } from 'express'
import { ActivityDoc, ActivityDocs } from '../models/activity_docs'

const router = Router()


/* GET users listing. */
router.post('/activity_docs', async function (req, res, next) {

  try {
    var json = JSON.stringify(req.body.value)
    await ActivityDoc.forge().where({year_place_id: req.body.yearPlaceId}).upsert({year_place_id: req.body.yearPlaceId, value: json})
    
    res.status(200).json(json)
  } catch(e) {
    console.log(e)
    res.status(500).json(e);
  
  }
    
    
})


export default router
