import { Router } from 'express'
import { TableFields, TableField } from '../models/table_fields'
import { TableFieldXs, TableFieldX } from '../models/table_field_xs'
import { TableFieldYs, TableFieldY } from '../models/table_field_ys'
import { TableValues, TableValue } from '../models/table_values'
import _ from 'lodash'

const router = Router()


router.post('/table_values/:id', async function (req, res, next) {
  // req.body.change_value [{table_field_x_id: 1, value: []}, {table_field_x_id: 1, value: []}]
  try {
    var table_field = (await TableField.forge().query((qb) => {
      qb.where({field: req.params.id});
    }).fetch()).toJSON();      
    
    var obj = req.body.change_value
    console.log(obj)
    for(var i=0; i<obj.length; i++){
      var id = obj[i].id
      var table_values = obj[i].table_values
      await TableValue.forge().where({table_field_id: table_field.id, table_field_x_id: id, year_place_id: req.body.yearPlaceId}).upsert({table_field_id: table_field.id, table_field_x_id: id, year_place_id: req.body.yearPlaceId, value: JSON.stringify(table_values)})
    }
    res.status(200).send("ok")
  } catch(e) {
    console.log(e)
    res.status(500).json(e);
  }
})

router.post('/table_values/updateSubField/:id', async function (req, res, next) {
  // req.body.change_value [{table_field_x_id: 1, value: []}, {table_field_x_id: 1, value: []}]
  try {
    var table_field = (await TableField.forge().query((qb) => {
      qb.where({field: req.params.id, sub_field: req.body.subField});
    }).fetch()).toJSON();      
    
    var obj = req.body.change_value 
    for(var i=0; i<obj.length; i++){
      var id = obj[i].id
      var table_values = obj[i].table_values
      console.log({table_field_id: table_field.id, table_field_x_id: id, year_place_id: req.body.yearPlaceId})
      await TableValue.forge().where({table_field_id: table_field.id, table_field_x_id: id, year_place_id: req.body.yearPlaceId}).upsert({table_field_id: table_field.id, table_field_x_id: id, year_place_id: req.body.yearPlaceId, value: JSON.stringify(table_values)})
    }
    res.status(200).send("ok")
  } catch(e) {
    console.log(e)
    res.status(500).json(e);
  }
})


export default router
