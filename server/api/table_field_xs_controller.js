import { Router } from 'express'
import { TableFields, TableField } from '../models/table_fields'
import { TableFieldXs, TableFieldX } from '../models/table_field_xs'
import { TableFieldYs, TableFieldY } from '../models/table_field_ys'
import { TableValues, TableValue } from '../models/table_values'
import _ from 'lodash'

const router = Router()


router.post('/table_field_xs/:id', async function (req, res, next) {

  try {
    var table_field = (await TableField.forge().query((qb) => {
      qb.where({field: req.params.id, year: req.body.year});
    }).fetch({withRelated: ['table_field_xs']})).toJSON();      
    
    var max_location = _.chain(table_field.table_field_xs).map((x) => {return x.location}).max().value()
    
    await TableFieldXs.forge().create({table_field_id: table_field.id, value: req.body.xaxio_name, location: max_location + 1})
    
    var result = (await TableField.forge().query((qb) => {
      qb.where({field: req.params.id});
    }).fetch({withRelated: ['table_field_xs']})).toJSON();  
    
    var xs = _(result.table_field_xs).orderBy('location')
    // var xs_value = _.chain(xs).map((x) => {return x.value}).value()
    res.status(200).json(xs)
  } catch(e) {
    console.log(e)
    res.status(500).json(e);
 
  }

})

router.patch('/table_field_xs/:id', async function (req, res, next) {
  try {
    var table_field_x = (await TableFieldX.forge().query((qb) => {
      qb.where({id: req.params.id});
    }).fetch());
    await table_field_x.save({description: req.body.description},{patch: true}).toJSON()
    res.status(200).send("ok")
  } catch(e) {
    console.log(e)
    res.status(500).json(e);
  }

})

router.patch('/table_field_xs/showHide/:id', async function (req, res, next) {
  try {
    var table_field_x = (await TableFieldX.forge().query((qb) => {
      qb.where({id: req.params.id});
    }).fetch());
    var deleted_at = (table_field_x.toJSON().deleted_at) ? null : (new Date()).toISOString()
    
    await table_field_x.save({deleted_at: deleted_at},{patch: true}).toJSON()

    res.status(200).send("ok")
  } catch(e) {
    console.log(e)
    res.status(500).json(e);
 
  }

})

export default router
