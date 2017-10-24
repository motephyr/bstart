var Knexfile = require('../../knexfile.js');
var knex = require('knex')(Knexfile);
import { Router } from 'express'
import { TableFields, TableField } from '../models/table_fields'
import { TableFieldXs, TableFieldX } from '../models/table_field_xs'
import { TableFieldYs, TableFieldY } from '../models/table_field_ys'
import { TableValues, TableValue } from '../models/table_values'
import { YearPlaces, YearPlace } from '../models/year_places'

import _ from 'lodash'

const router = Router()


/* GET users listing. */
router.get('/table_fields/:id', async function (req, res, next) {
    try {
      // var result = await Domain.forge().query((qb) => {
      //   qb.where({id: 5});
      // }).fetch({withRelated: ['user']});
      var table_field = (await TableField.forge().query((qb) => {
        qb.where({field: req.params.id, year: req.query.year});
      }).fetch({withRelated: ['table_field_xs', 'table_field_ys',{'table_field_xs.table_values': (qb) => {
        qb.where({year_place_id: req.query.yearPlaceId})
      }}]})).toJSON();
      
      var ys = _(table_field.table_field_ys).orderBy('location')
      // var ys_value = _.chain(ys).orderBy('location').map((x) => {return x.value}).value()
      if (req.query.action == 'edit'){
        var xs = _(table_field.table_field_xs).orderBy('location')
      } else {
      var xs = _(table_field.table_field_xs).orderBy('location').filter((x) => {return !x.deleted_at})
      }
      // var xs_value = _.chain(xs).map((x) => {return x.value}).value()
      var value = _(xs).map((x) => {return x.table_values[0] && x.table_values[0].value != null ? x.table_values[0].value : [null,null] }).value()

      res.status(200).json({xaxio: xs, yaxio: ys, value: value});
      
    } catch(e) {
      console.log(e)
      res.status(500).json(e);
    }
})

router.get('/table_fields/all/:id', async function (req, res, next) {
  try {
    // var result = await Domain.forge().query((qb) => {
    //   qb.where({id: 5});
    // }).fetch({withRelated: ['user']});
    // var table_field = (await TableField.forge().query((qb) => {
    var table_field = (await TableFields.forge().query((qb) => {
      qb.where({field: req.params.id, year: req.query.year});
    // }).fetch({withRelated: ['table_field_xs', 'table_field_ys',{'table_field_xs.table_values': (qb) => {
    //   qb.where({year_place_id: req.query.yearPlaceId})
    // }}]})).toJSON();
    }).fetch({withRelated: ['table_field_xs', 'table_field_ys','table_field_xs.table_values']})).toJSON();

    // var ys = _(table_field.table_field_ys).orderBy('location')
    var ys = _(table_field[0].table_field_ys).orderBy('location')
    // var ys_value = _.chain(ys).orderBy('location').map((x) => {return x.value}).value()
    if (req.query.action == 'edit'){
      // var xs = _(table_field.table_field_xs).orderBy('location')
      var xs = _(table_field[0].table_field_xs).orderBy('location')
    } else {
      // var xs = _(table_field.table_field_xs).orderBy('location').filter((x) => {return !x.deleted_at})
      var xs = _(table_field[0].table_field_xs).orderBy('location').filter((x) => {return !x.deleted_at}).value()
    }
    // var xs_value = _.chain(xs).map((x) => {return x.value}).value()

    var mid_value = _(table_field).map((x) => {return _(x.table_field_xs).orderBy('location').map((y) => {return y.table_values}).value() }).value()
    
    var mid2_value = _(mid_value[0]).map((x) => {return _(x).map((y) => {return y.value}).value() }).value()

    var value = _(mid2_value).map((x) => {
      return _(x).reduce((sum, x) => {
        var m = x[0] ? parseInt(x[0]) : 0
        var n = x[1] ? parseInt(x[1]) : 0

        return [sum[0]+m, sum[1]+ n]
      },[0,0])
    }).value()
    
    res.status(200).json({xaxio: xs, yaxio: ys, value: value});

  } catch(e) {
    console.log(e)
    res.status(500).json(e);
  }
})

router.post('/table_fields/getSubField/all/:id', async function (req, res, next) {
  try {
    // var result = await Domain.forge().query((qb) => {
    //   qb.where({id: 5});
    // }).fetch({withRelated: ['user']});

    var table_field = (await TableFields.forge().query((qb) => {
      qb.where({field: req.params.id, year: req.body.year}).orderBy('id');
    }).fetch({withRelated: ['table_values']})).toJSON();

    var obj = [];
    for (var i=0;i<table_field.length; i++){
      // var subField = table_field[i].sub_field
      // var ys = _(table_field[i].table_field_ys).orderBy('location').value()
      // var ys_value = _.chain(ys).orderBy('location').map((x) => {return x.value}).value()
      // var xs = _(table_field[i].table_field_xs).orderBy('location').value()

      // var xs_value = _.chain(xs).map((x) => {return x.value}).value()
      // console.log(table_field[i])
      // console.log(table_field[i].table_values)
      var value = _(table_field[i].table_values).map((x) => {
        return {
        year_place_id: x.year_place_id, 
        value: x.value }}).value()
      obj.push(value)
    }
    var flatten = _.flatten(obj);

    var filter = _.groupBy(flatten, function(x){ return x.year_place_id})

    var value = _(filter).map((z) => {
      var sumArray =  _(z).reduce((sum, y) => {
        var x = y.value
        var m = x[0] ? parseInt(x[0]) : 0
        var n = x[1] ? parseInt(x[1]) : 0
        
        return [sum[0]+m, sum[1]+ n]
      },[0,0])

      return {year_place_id: z[0].year_place_id, value: sumArray}
    }).value()

    var result = [];
    for (var i = 0; i< value.length ; i++) {
      var x = value[i]
      var place = (await YearPlace.findById(x.year_place_id)).toJSON()
      console.log(place)
      result.push({local: place.place, RegularGoor: x.value[0], CapitalGate: x.value[1]})
    }
 
    res.status(200).json(result);
    
  } catch(e) {
    console.log(e)
    res.status(500).json(e);

  }
})


router.post('/table_fields/getSubField/:id', async function (req, res, next) {
  try {
    // var result = await Domain.forge().query((qb) => {
    //   qb.where({id: 5});
    // }).fetch({withRelated: ['user']});

    var table_field = (await TableFields.forge().query((qb) => {
      // qb.where({field: req.params.id, year: req.body.year});
      qb.where({field: req.params.id, year: req.body.year}).orderBy('id');
    }).fetch({withRelated: ['table_field_xs', 'table_field_ys',{'table_field_xs.table_values': (qb) => {
      qb.where({year_place_id: req.body.yearPlaceId})
    }}]})).toJSON();

    var obj = [];
    // console.log(table_field)
    for (var i=0;i<table_field.length; i++){
      var subField = table_field[i].sub_field
      var ys = _(table_field[i].table_field_ys).orderBy('location').value()
      // var ys_value = _.chain(ys).orderBy('location').map((x) => {return x.value}).value()
      var xs = _(table_field[i].table_field_xs).orderBy('location').value()

      // var xs_value = _.chain(xs).map((x) => {return x.value}).value()
      var value = _(xs).map((x) => {return x.table_values[0] && x.table_values[0].value != null ? x.table_values[0].value : [null,null] }).value()
      obj.push({sub_field: subField, xaxio: xs, yaxio: ys, value: value})
    }

    res.status(200).json(obj);
    
  } catch(e) {
    console.log(e)
    res.status(500).json(e);

  }
  router.post('/table_fields/postSubField/:id', async function (req, res, next) {
    try {
      // var result = await Domain.forge().query((qb) => {
      //   qb.where({id: 5});
      // }).fetch({withRelated: ['user']});


      var tableFieldId7 = await knex('table_fields').returning('id').insert(
        {year: req.body.year, field: req.params.id, sub_field: req.body.subField}
      )
      var months = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
      var kk = []
      for(var k=0; k<months.length; k++){
        kk.push({table_field_id: tableFieldId7[0], location: k, value: months[k]})
      }
      await knex('table_field_xs').insert(kk)
      await knex('table_field_ys').insert([
        {table_field_id: tableFieldId7[0], location: 0, value: '經常門'},
        {table_field_id: tableFieldId7[0], location: 1, value: '資本門'}
      ])
      res.status(200).send("ok")
    } catch(e) {
      console.log(e)
      res.status(500).json(e);
    }
  })

  router.delete('/table_fields/deleteSubField/:id', async function (req, res, next) {
    try {
      var table_field = (await TableFields.forge().query((qb) => {
        qb.where({field: req.params.id, year: req.query.year, sub_field: req.query.subField}).orderBy('id');
      }).fetchOne())

      await knex('table_fields')
      .where('id', table_field.id)
      .del()
      await knex('table_field_xs')
      .where('table_field_id', table_field.id)
      .del()
      await knex('table_field_ys')
      .where('table_field_id', table_field.id)
      .del()
      await knex('table_values')
      .where('table_field_id', table_field.id)
      .del()

      res.status(200).send("ok")
    } catch(e) {
      console.log(e)
      res.status(500).json(e);
    }
  })
})

export default router
