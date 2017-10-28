var Knexfile = require('../../knexfile.js');
var knex = require('knex')(Knexfile);
import { Router } from 'express'
import { YearPlaces, YearPlace } from '../models/year_places'

import _ from 'lodash'

const router = Router()


/* GET users listing. */
router.get('/year_places', async function (req, res, next) {
    try {
      var year_place = (await YearPlaces.forge().fetch()).toJSON();
      var years = _(year_place).map((x) => {return {year: x.year, is_show: x.is_show, editable_at: x.editable_at}}).uniqWith(_.isEqual).orderBy('year').value()
      var places = _(year_place).map((x) => {return x.place}).uniq().value()
      res.status(200).json({years: years, places: places});
      

    } catch(e) {
      console.log(e)
      res.status(500).json(e);
 
    }

})

router.post('/year_places/getId', async function (req, res, next) {
  try {
    // var year_place = (await YearPlace.forge().where({place: req.body.place, year: parseInt(req.body.year)}).fetch()).toJSON();
    //
    // res.status(200).json(year_place);
    var year_place = (await YearPlace.forge().where({place: req.body.place, year: parseInt(req.body.year)}).fetch());
    if (year_place) {
      res.status(200).json(year_place);
    } else {
      res.status(200).json({id: 0});
    }
    

  } catch(e) {
    console.log(e)
    res.status(500).json(e);

  }

})

router.patch('/year_places/:year', async function (req, res, next) {
  try {

    await knex('year_places')
    .where('year', req.params.year)
    .update(req.body)

    res.status(200).send('ok');
  } catch(e) {
    console.log(e)
    res.status(500).json(e);
  }
})

router.delete('/year_places', async function (req, res, next) {

  var nowYear = req.query.year
  await knex('table_fields')
  .where('year', nowYear)
  .del()

  await knex('year_places')
  .where('year', nowYear)
  .del()

  res.status(200).send('ok');

})

router.post('/year_places', async function (req, res, next) {
  try {
    var year_place = (await YearPlaces.forge().fetch()).toJSON();
    var nowYear = (year_place.length > 0) ? (_(year_place).map((x) => {return x.year}).uniq().max() + 1).toString() : '106'

    var places = ['基隆市','台北市','新北市','桃園市','新竹市','新竹縣','苗栗縣','台中市','南投縣市','彰化縣市','雲林縣市','嘉義市','嘉義縣','台南市','高雄市','屏東縣市','台東縣市','花蓮縣市','宜蘭縣市','澎湖縣','金門縣','連江縣']
    var months = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
    var yearplaces = []
    for(var k=0; k<places.length; k++){
      yearplaces.push({year: nowYear, place: places[k]})
    }
      
    var yearPlaceIds = await knex.table('year_places').returning('id')
    .insert(yearplaces)

    var tableFieldId1 = await knex('table_fields').returning('id').insert(
      {year: nowYear, field: 'reading_activities_1'}
    )
    var tableFieldId2 = await knex('table_fields').returning('id').insert(
      {year: nowYear, field: 'reading_activities_2'}
    )
    var tableFieldId3 = await knex('table_fields').returning('id').insert(
      {year: nowYear, field: 'promotion_activities_1'}
    )
    var tableFieldId4 = await knex('table_fields').returning('id').insert(
      {year: nowYear, field: 'promotion_activities_2'}
    )    
    var tableFieldId5 = await knex('table_fields').returning('id').insert(
      {year: nowYear, field: 'promotion_activities_3'}
    )
    var tableFieldId5_2 = await knex('table_fields').returning('id').insert(
      {year: nowYear, field: 'promotion_activities_4'}
    )
    var tableFieldId6 = await knex('table_fields').returning('id').insert(
      {year: nowYear, field: 'funding_implementations', sub_field: '多元閱讀'}
    )
    var tableFieldId7 = await knex('table_fields').returning('id').insert(
      {year: nowYear, field: 'funding_implementations', sub_field: '本土語言'}
    )
    var tableFieldId8 = await knex('table_fields').returning('id').insert(
      {year: nowYear, field: 'bookstarts_1'}
    )
    var tableFieldId9 = await knex('table_fields').returning('id').insert(
      {year: nowYear, field: 'bookstarts_2'}
    )
    var tableFieldId10 = await knex('table_fields').returning('id').insert(
      {year: nowYear, field: 'bookstarts_3'}
    )
    var tableFieldId11 = await knex('table_fields').returning('id').insert(
      {year: nowYear, field: 'bookstarts_4'}
    )
    var tableFieldId12 = await knex('table_fields').returning('id').insert(
      {year: nowYear, field: 'bookstarts_5'}
    )
    var tableFieldId13 = await knex('table_fields').returning('id').insert(
      {year: nowYear, field: 'bookstarts_6'}
    )

      await knex('table_field_xs').insert([
        {table_field_id: tableFieldId1[0], location: 0, value: '兒童活動'},
        {table_field_id: tableFieldId1[0], location: 1, value: '親子活動'},
        {table_field_id: tableFieldId1[0], location: 2, value: '青少年活動'},
        {table_field_id: tableFieldId1[0], location: 3, value: '樂齡活動'},
        {table_field_id: tableFieldId1[0], location: 4, value: '多元文化'},
        {table_field_id: tableFieldId1[0], location: 5, value: '一般讀者活動'},
      ])
      await knex('table_field_xs').insert([
        {table_field_id: tableFieldId2[0], location: 0, value: '青少年專區'},
        {table_field_id: tableFieldId2[0], location: 1, value: '樂齡專區'},
        {table_field_id: tableFieldId2[0], location: 2, value: '多元文化'},
      ])
      await knex('table_field_xs').insert([
        {table_field_id: tableFieldId3[0], location: 0, value: '全縣市分館總數'},
        {table_field_id: tableFieldId3[0], location: 1, value: '參與館數'}
      ])
      await knex('table_field_xs').insert([
        {table_field_id: tableFieldId4[0], location: 0, value: '閩南語'},
        {table_field_id: tableFieldId4[0], location: 1, value: '客家語'},
        {table_field_id: tableFieldId4[0], location: 2, value: '原住民族語'},
        {table_field_id: tableFieldId4[0], location: 3, value: '其他'},
      ])
      await knex('table_field_xs').insert([
        {table_field_id: tableFieldId5[0], location: 0, value: '閩南語'},
        {table_field_id: tableFieldId5[0], location: 1, value: '客家語'},
        {table_field_id: tableFieldId5[0], location: 2, value: '原住民族語'},
        {table_field_id: tableFieldId5[0], location: 3, value: '其他語言'},
      ])
      await knex('table_field_xs').insert([
        {table_field_id: tableFieldId5_2[0], location: 0, value: '閩南語'},
        {table_field_id: tableFieldId5_2[0], location: 1, value: '客家語'},
        {table_field_id: tableFieldId5_2[0], location: 2, value: '原住民族語'},
        {table_field_id: tableFieldId5_2[0], location: 3, value: '其他語言'},
      ])
  
      var pp = []
      for(var k=0; k<months.length; k++){
        pp.push({table_field_id: tableFieldId6[0], location: k, value: months[k]})
      }
      await knex('table_field_xs').insert(pp)
      var kk = []
      for(var k=0; k<months.length; k++){
        kk.push({table_field_id: tableFieldId7[0], location: k, value: months[k]})
      }
      await knex('table_field_xs').insert([
        {table_field_id: tableFieldId8[0], location: 0, value: ''},
      ])
      await knex('table_field_xs').insert([
        {table_field_id: tableFieldId9[0], location: 0, value: ''},
      ])
      await knex('table_field_xs').insert([
        {table_field_id: tableFieldId10[0], location: 0, value: '當年度全縣市0~5歲嬰幼兒人數'},
        {table_field_id: tableFieldId10[0], location: 0, value: '當年度全縣市新增嬰幼兒辦證數'}        
      ])
      await knex('table_field_xs').insert([
        {table_field_id: tableFieldId11[0], location: 0, value: '全縣市分館總數'},
        {table_field_id: tableFieldId11[0], location: 0, value: '參與館數'}
        
      ])
      await knex('table_field_xs').insert([
        {table_field_id: tableFieldId12[0], location: 0, value: 'Bookstart專區建置數'},
      ])
      await knex('table_field_xs').insert([
        {table_field_id: tableFieldId13[0], location: 0, value: '地方配合款製作禮袋數'},
        {table_field_id: tableFieldId13[0], location: 0, value: '教育部分配禮袋數'}        
      ])

      await knex('table_field_xs').insert(kk)
  
      await knex('table_field_ys').insert([
        {table_field_id: tableFieldId1[0], location: 0, value: '辦理場次'},
        {table_field_id: tableFieldId1[0], location: 1, value: '參與人次'}
      ])
      await knex('table_field_ys').insert(
        {table_field_id: tableFieldId2[0], location: 0, value: '建置數'}
      )
      await knex('table_field_ys').insert(
        {table_field_id: tableFieldId3[0], location: 0, value: ''}
      )
      await knex('table_field_ys').insert(
        {table_field_id: tableFieldId4[0], location: 0, value: ''}
      )
      await knex('table_field_ys').insert([
        {table_field_id: tableFieldId5[0], location: 0, value: '辦理場次'},
        {table_field_id: tableFieldId5[0], location: 1, value: '參與人次'}
      ])
      await knex('table_field_ys').insert([
        {table_field_id: tableFieldId5_2[0], location: 0, value: '辦理場次'},
        {table_field_id: tableFieldId5_2[0], location: 1, value: '參與人次'}
      ])
      await knex('table_field_ys').insert([
        {table_field_id: tableFieldId6[0], location: 0, value: '經常門'},
        {table_field_id: tableFieldId6[0], location: 1, value: '資本門'}
      ])
      await knex('table_field_ys').insert([
        {table_field_id: tableFieldId7[0], location: 0, value: '經常門'},
        {table_field_id: tableFieldId7[0], location: 1, value: '資本門'}
      ])
      await knex('table_field_ys').insert([
        {table_field_id: tableFieldId8[0], location: 0, value: '辦理場次'},
        {table_field_id: tableFieldId8[0], location: 1, value: '參與人次'}
      ])
      await knex('table_field_ys').insert([
        {table_field_id: tableFieldId9[0], location: 0, value: '辦理場次'},
        {table_field_id: tableFieldId9[0], location: 1, value: '參與人次'}
      ])
      await knex('table_field_ys').insert(
        {table_field_id: tableFieldId10[0], location: 0, value: ''}
      )
      await knex('table_field_ys').insert(
        {table_field_id: tableFieldId11[0], location: 0, value: ''}
      )
      await knex('table_field_ys').insert(
        {table_field_id: tableFieldId12[0], location: 0, value: ''}
      )
      await knex('table_field_ys').insert(
        {table_field_id: tableFieldId13[0], location: 0, value: ''}
      )
    for(var i=0; i<yearPlaceIds.length; i++){
      var id = yearPlaceIds[i]
  
      // await knex('bookstarts').insert({
      //   year_place_id: id, value: JSON.stringify()
      // })
      await knex('activity_docs').insert({
        year_place_id: id, value: JSON.stringify()
      })
      await knex('send_activities').insert({
        year_place_id: id, file_name: ''
      })
      await knex('photos').insert([  
        {year_place_id: id, area: 'bookstart', file_name: '', description: ''},
        {year_place_id: id, area: 'young', file_name: '', description: ''},  
        {year_place_id: id, area: 'age', file_name: '', description: ''}   ,     
        {year_place_id: id, area: 'multi', file_name: '', description: ''}  ,      
        {year_place_id: id, area: 'origin', file_name: '', description: ''} 
      ])

    }
    
    // var year_place = (await YearPlaces.forge().fetch()).toJSON();
    // var years = _(year_place).map((x) => {return x.year}).uniq()
    res.status(200).send('ok');
    

  } catch(e) {
    console.log(e)
    res.status(500).json(e);

  }

})

'台北縣'
'台北市'
'新北市'
'桃園縣'

export default router
