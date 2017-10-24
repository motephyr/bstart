
exports.seed = async function(knex, Promise) {
  // Deletes ALL existing entries
  await knex('year_places').del()
  await knex('funding_implementation_plans').del()
  await knex('funding_implementations').del()
  await knex('bookstart_names').del()
  await knex('bookstarts').del()
  await knex('item_names').del()
  await knex('reading_activities').del()
  await knex('promotion_activities').del()
  await knex('activity_docs').del()
  await knex('send_activities').del()
  await knex('photos').del()
  await knex('table_fields').del()
  await knex('table_field_xs').del()
  await knex('table_field_ys').del()
  await knex('table_values').del()

  // await createUser(knex)

};

async function createUser (knex) {
  var nowYear = '106'
  var places = ['台北縣', '台北市', '新北市', '桃園縣']
  var months = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
  var yearplaces = []
  for(var k=0; k<places.length; k++){
    yearplaces.push({year: nowYear, place: places[k]})
  }
    
  var yearPlaceIds = await knex.table('year_places').returning('id')
  .insert(yearplaces)

  for(var i=0; i<yearPlaceIds.length; i++){
    var id = yearPlaceIds[i]

    await knex('bookstarts').insert({
      year_place_id: id, value: JSON.stringify()
    })
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
    var tableFieldId1 = await knex('table_fields').returning('id').insert(
      {year: nowYear, field: 'reading_activities_1'}
    )
    var tableFieldId2 = await knex('table_fields').returning('id').insert(
      {year: nowYear, field: 'reading_activities_2'}
    )
    var tableFieldId3 = await knex('table_fields').returning('id').insert(
      {year: nowYear, field: 'promotion_activities'}
    )
    var tableFieldId4 = await knex('table_fields').returning('id').insert(
      {year: nowYear, field: 'funding_implementations', sub_field: '多元閱讀'}
    )
    var tableFieldId5 = await knex('table_fields').returning('id').insert(
      {year: nowYear, field: 'funding_implementations', sub_field: '本土語言'}
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
      {table_field_id: tableFieldId3[0], location: 0, value: '閩南話'},
      {table_field_id: tableFieldId3[0], location: 1, value: '客家語'},
      {table_field_id: tableFieldId3[0], location: 2, value: '原住民族語'},
      {table_field_id: tableFieldId3[0], location: 3, value: '其他'},
    ])

    var pp = []
    for(var k=0; k<months.length; k++){
      pp.push({table_field_id: tableFieldId4[0], location: k, value: months[k]})
    }
    await knex('table_field_xs').insert(pp)
    var kk = []
    for(var k=0; k<months.length; k++){
      kk.push({table_field_id: tableFieldId5[0], location: k, value: months[k]})
    }
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
    await knex('table_field_ys').insert([
      {table_field_id: tableFieldId4[0], location: 0, value: '經常門'},
      {table_field_id: tableFieldId4[0], location: 1, value: '資本門'}
    ])
    await knex('table_field_ys').insert([
      {table_field_id: tableFieldId5[0], location: 0, value: '經常門'},
      {table_field_id: tableFieldId5[0], location: 1, value: '資本門'}
    ])
  }
  
  return 
}



  //   // Inserts seed entries
  //   return Promise.all([
  //     knex('year_places').insert([
  //       {id: 1, year: '106', place: '台北縣'},
  //       {id: 2, year: '106', place: '台北市'},
  //       {id: 3, year: '106', place: '新北市'},
  //       {id: 4, year: '106', place: '桃園縣'}
  //     ]),
  //     // knex('funding_implementation_plans').insert([
  //     //   {id: 1, year: '106', name: '多元閱讀'},
  //     //   {id: 2, year: '106', name: '本土語言'},
  //     // ]),
  //     // knex('funding_implementations').insert([
  //     //   {id: 1, funding_implementation_plan_id: 1, year_place_id: 1, month: 1,  current_account: 0, capital_account: 0},
  //     // ]),
  //     // knex('bookstart_names').insert([
  //     //   {id: 1, year_place_id: 1, name: JSON.stringify(["館員、閱讀志工及幼托相關部訓課程",
  //     //   "嬰幼兒閱讀推廣活動",
  //     //   "嬰幼兒辦證比", 
  //     //   "當年度全縣市0~5歲嬰幼兒人數", 
  //     //   "當年度全縣市新增嬰幼兒辦證數", 
  //     //   "嬰幼兒辦證比例", 
  //     //   "縣市分館參與度", 
  //     //   "全縣市分館總數", 
  //     //   "參與館數", 
  //     //   "分館參與比例", 
  //     //   "專區建置數", 
  //     //   "Bookstart專區建置數",
  //     //   "全縣市發放禮袋數", 
  //     //   "地方配合款製作禮袋數", 
  //     //   "教育部分配禮袋數", 
  //     //   "全縣市禮袋發放數"])}
  //     // ]),
  //     knex('bookstarts').insert([
  //       {id: 1, year_place_id: 1, value: JSON.stringify(["1234",
  //       "1234", 
  //       "1234", 
  //       "1234", 
  //       "1234", 
  //       "1234", 
  //       "28%", 
  //       "1234", 
  //       "1234", 
  //       "28%", 
  //       "123", 
  //       "1234", 
  //       "1234",
  //       "34234"])}
  //     ]),
  //     // knex('item_names').insert([
  //     //   {id: 1, year_place_id: 1, kind: 'reading_activities_state', name: "兒童活動"},
  //     //   {id: 2, year_place_id: 1, kind: 'reading_activities_state', name: "親子活動"},
  //     //   {id: 3, year_place_id: 1, kind: 'reading_activities_state', name: "青少年活動"},
  //     //   {id: 4, year_place_id: 1, kind: 'reading_activities_state', name: "樂齡活動"},
  //     //   {id: 5, year_place_id: 1, kind: 'reading_activities_state', name: "多元文化"},
  //     //   {id: 6, year_place_id: 1, kind: 'reading_activities_state', name: "一般讀者活動"},
  //     //   {id: 7, year_place_id: 1, kind: 'create_count', name: "閩南語"},
  //     //   {id: 8, year_place_id: 1, kind: 'create_count', name: "客家話"},
  //     //   {id: 9, year_place_id: 1, kind: 'create_count', name: "原住民族語"},
  //     //   {id: 10, year_place_id: 1, kind: 'create_count', name: "其他"}
  //     // ]),
  //     // knex('reading_activities').insert([
  //     //   {id: 1, year_place_id: 1, item_name_id: 1, value: JSON.stringify([1,2])},
  //     //   {id: 2, year_place_id: 1, item_name_id: 7, value: JSON.stringify([1])}
  //     // ]),
  //     // knex('promotion_activities').insert([
  //     //   {id: 1, year_place_id: 1, item_name_id: 1, value: JSON.stringify([1,2])},
  //     //   {id: 2, year_place_id: 1, item_name_id: 7, value: JSON.stringify([1])}
  //     // ]),
  //     knex('activity_docs').insert([
  //       {id: 1, year_place_id: 1, value: JSON.stringify()}
  //     ]),
  //     knex('send_activities').insert([
  //       {id: 1, year_place_id: 1, file_name: ''}        
  //     ]),
  //     knex('photos').insert([
  //       {id: 1, year_place_id: 1, area: 'bookstart', file_name: '', description: ''},
  //       {id: 2, year_place_id: 1, area: 'young', file_name: '', description: ''},  
  //       {id: 3, year_place_id: 1, area: 'age', file_name: '', description: ''}   ,     
  //       {id: 4, year_place_id: 1, area: 'multi', file_name: '', description: ''}  ,      
  //       {id: 5, year_place_id: 1, area: 'origin', file_name: '', description: ''}       
        
  //     ]),
  //     knex('table_fields').insert([
  //       {id: 1, year_place_id: 1, field: 'reading_activities_1'},
  //       {id: 2, year_place_id: 1, field: 'reading_activities_2'},
  //       {id: 3, year_place_id: 1, field: 'promotion_activities'},
  //       {id: 4, year_place_id: 1, field: 'funding_implementations', sub_field: '多元閱讀'},
  //       {id: 5, year_place_id: 1, field: 'funding_implementations', sub_field: '本土語言'}
  //     ]),
  //     knex('table_field_xs').insert([
  //       {table_field_id: 1, location: 0, value: '兒童活動'},
  //       {table_field_id: 1, location: 1, value: '親子活動'},
  //       {table_field_id: 1, location: 2, value: '青少年活動'},
  //       {table_field_id: 1, location: 3, value: '樂齡活動'},
  //       {table_field_id: 1, location: 4, value: '多元文化'},
  //       {table_field_id: 1, location: 5, value: '一般讀者活動'},

  //       {table_field_id: 2, location: 0, value: '青少年專區'},
  //       {table_field_id: 2, location: 1, value: '樂齡專區'},
  //       {table_field_id: 2, location: 2, value: '多元文化'},

  //       {table_field_id: 3, location: 0, value: '閩南話'},
  //       {table_field_id: 3, location: 1, value: '客家語'},
  //       {table_field_id: 3, location: 2, value: '原住民族語'},
  //       {table_field_id: 3, location: 3, value: '其他'},
 
  //       {table_field_id: 4, location: 0, value: '台北縣'},
  //       {table_field_id: 4, location: 1, value: '台北市'},
  //       {table_field_id: 4, location: 2, value: '新北市'},
  //       {table_field_id: 4, location: 3, value: '桃園縣'},
 
  //       {table_field_id: 5, location: 0, value: '台北縣'},
  //       {table_field_id: 5, location: 1, value: '台北市'},
  //       {table_field_id: 5, location: 2, value: '新北市'},
  //       {table_field_id: 5, location: 3, value: '桃園縣'}
        
  //     ]),
  //     knex('table_field_ys').insert([
  //       {table_field_id: 1, location: 0, value: '辦理場次'},
  //       {table_field_id: 1, location: 1, value: '參與人次'},

  //       {table_field_id: 2, location: 0, value: '建置數'},
        
        
  //       {table_field_id: 3, location: 0, value: ''},

  //       {table_field_id: 4, location: 0, value: '經常門'},
  //       {table_field_id: 4, location: 1, value: '資本門'},
 
  //       {table_field_id: 5, location: 0, value: '經常門'},
  //       {table_field_id: 5, location: 1, value: '資本門'},
         
  //     ])
  //     // ,
  //     // knex('table_values').insert([
  //     //   {table_field_x_id: 6, table_field_id: 1, value: JSON.stringify([12])},
  //     //   {table_field_x_id: 10, table_field_id: 3, value: JSON.stringify([4])},
  //     //   {table_field_x_id: 14, table_field_id: 4, value: JSON.stringify([8])},
  //     //   {table_field_x_id: 18, table_field_id: 5, value: JSON.stringify([8])}
  //     // ])
  //   ])
  // });