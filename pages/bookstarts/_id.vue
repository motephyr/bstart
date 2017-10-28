<template>
  <div>
    <div class="nuxtMainPanel">
      <div class="pd20">
        <!--<div class="container">-->
          <!--<div class="row">-->
            <!--<h2>館員、閱讀志工及幼托相關培訓課程</h2>-->

            <!--<div v-for="y in bookstarts_1.yaxio" :key="y.id">{{y.value}}~</div>-->
            <!--<div v-for="(x, ix) in bookstarts_1.xaxio" :key="x.id">-->
              <!--<div>{{x.value}}Q</div>-->
              <!--<div v-for="(y, iy) in bookstarts_1.yaxio" :key="y.id">-->
                <!--<div v-if="bookstarts_1.value.length > ix && bookstarts_1.value[ix]">-->
                  <!--<el-input type="text" v-model="bookstarts_1.value[ix][iy]" ></el-input>-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->

          <!--</div>-->
        <!--</div>-->
        <table class="gTable noEl w100">
          <thead>
          <tr>
            <th width="320"><h2>館員、閱讀志工及幼托相關培訓課程</h2></th>
            <th v-for="y in bookstarts_1.yaxio" :key="y.id">{{(y.value == '辦理場次') ? '辦理場次' : '參與人次'}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(x, ix) in bookstarts_1.xaxio" :key="x.id">
            <td>{{x.value}}</td>
            <td v-for="(y, iy) in bookstarts_1.yaxio" :key="y.id">
              <div v-if="bookstarts_1.value.length > ix && bookstarts_1.value[ix]">
                <input type="text" v-model="bookstarts_1.value[ix][iy]" @keyup="inputChange" :disabled="isAdmin"/>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
        <table class="gTable noEl w100">
          <thead>
          <tr>
            <th width="320"><h2>嬰幼兒閱讀推廣活動</h2></th>
            <th v-for="y in bookstarts_2.yaxio" :key="y.id">{{y.value}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(x, ix) in bookstarts_2.xaxio" :key="x.id">
            <td>{{x.value}}</td>
            <td v-for="(y, iy) in bookstarts_2.yaxio" :key="y.id">
              <div v-if="bookstarts_2.value.length > ix && bookstarts_2.value[ix]">
                <input type="text" v-model="bookstarts_2.value[ix][iy]" @keyup="inputChange" :disabled="isAdmin"/>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
        <table class="gTable noEl w100">
          <thead>
          <tr>
            <th></th>
            <th v-for="y in bookstarts_3.yaxio" :key="y.id">{{y.value}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(x, ix) in bookstarts_3.xaxio" :key="x.id">
            <td width="320">{{x.value}}</td>
            <td v-for="(y, iy) in bookstarts_3.yaxio" :key="y.id">
              <div v-if="bookstarts_3.value.length > ix && bookstarts_3.value[ix]">
                <input type="text" v-model="bookstarts_3.value[ix][iy]" @keyup="inputChange" :disabled="isAdmin"/>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
        <table class="gTable noEl w100">
          <thead>
          <tr>
            <th></th>
            <th v-for="y in bookstarts_4.yaxio" :key="y.id">{{y.value}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(x, ix) in bookstarts_4.xaxio" :key="x.id">
            <td width="320">{{x.value}}</td>
            <td v-for="(y, iy) in bookstarts_4.yaxio" :key="y.id">
              <div v-if="bookstarts_4.value.length > ix && bookstarts_4.value[ix]">
                <input type="text" v-model="bookstarts_4.value[ix][iy]" @keyup="inputChange" :disabled="isAdmin"/>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
        <table class="gTable noEl w100">
          <thead>
          <tr>
            <th></th>
            <th v-for="y in bookstarts_5.yaxio" :key="y.id">{{y.value}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(x, ix) in bookstarts_5.xaxio" :key="x.id">
            <td width="320">{{x.value}}</td>
            <td v-for="(y, iy) in bookstarts_5.yaxio" :key="y.id">
              <div v-if="bookstarts_5.value.length > ix && bookstarts_5.value[ix]">
                <input type="text" v-model="bookstarts_5.value[ix][iy]" @keyup="inputChange" :disabled="isAdmin"/>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
        <table class="gTable noEl w100">
          <thead>
          <tr>
            <th></th>
            <th v-for="y in bookstarts_6.yaxio" :key="y.id">{{y.value}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(x, ix) in bookstarts_6.xaxio" :key="x.id">
            <td width="320">{{x.value}}</td>
            <td v-for="(y, iy) in bookstarts_6.yaxio" :key="y.id">
              <div v-if="bookstarts_6.value.length > ix && bookstarts_6.value[ix]">
                <input type="text" v-model="bookstarts_6.value[ix][iy]" @change="inputChange" :disabled="isAdmin"/>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div id="footerBar">
      <!--<div class="ftBt" onClick="javascript:history.back(-1);"><i class="icon-chevron-thin-left"></i> 返回</div>-->
      <div class="ftBt" @click="update_data()"><i class="icon-checkmark5"></i>儲存</div>
    </div>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import _ from 'lodash'
export default {
  data () {
    return {
      bookstarts_1: {
        xaxio: [],
        yaxio: [],
        value: []
      },
      bookstarts_2: {},
      bookstarts_3: {},
      bookstarts_4: {},
      bookstarts_5: {},
      bookstarts_6: {},
      vuexData: this.$store.state,
      isAdmin: (this.$store.state.authUser.area === '中央')
    }
  },
  watch: {
    'vuexData.year': {
      handler: function(newValue, oldValue) { // 可以获取新值与老值两个参数
        this.getData()
      }
    },
    'vuexData.place': {
      handler: function(newValue, oldValue) { // 可以获取新值与老值两个参数
        this.getData()
      }
    }
  },
  methods: {
    inputChange(e) {
      e.target.value = e.target.value.replace(/[^\d]/g, '')
    },
    async update_data() {
      var msg
      var updateArray = ['bookstarts_1', 'bookstarts_2', 'bookstarts_3', 'bookstarts_4', 'bookstarts_5', 'bookstarts_6']
      var self = this
      var all = function () {
        for (var i = 0; i < updateArray.length; i++) {
          var name = updateArray[i]
          var changeValue = _(self[name].xaxio).map((x, i) => {
            x.table_values = self[name].value[i]
            return x
          }).value()
          axios.post('/api/table_values/' + name, {
            change_value: changeValue,
            yearPlaceId: self.$store.state.yearPlaceId
          }).catch((e) => {
            console.log(e)
          })
        }
      }
      await all()
      this.$notify({
        title: '已更新',
        message: msg,
        type: 'success'
      });
    },
    async getData () {
      try {
        let bookstarts1
        let bookstarts2
        let bookstarts3
        let bookstarts4
        let bookstarts5
        let bookstarts6
        if (this.$store.state.place !== '中央'){
          bookstarts1 = await axios.get('/api/table_fields/' + 'bookstarts_1' + '?year='+ this.$store.state.year + '&yearPlaceId=' + this.$store.state.yearPlaceId)
          bookstarts2 = await axios.get('/api/table_fields/' + 'bookstarts_2' + '?year='+ this.$store.state.year + '&yearPlaceId=' + this.$store.state.yearPlaceId)
          bookstarts3 = await axios.get('/api/table_fields/' + 'bookstarts_3' + '?year='+ this.$store.state.year + '&yearPlaceId=' + this.$store.state.yearPlaceId)
          bookstarts4 = await axios.get('/api/table_fields/' + 'bookstarts_4' + '?year='+ this.$store.state.year + '&yearPlaceId=' + this.$store.state.yearPlaceId)
          bookstarts5 = await axios.get('/api/table_fields/' + 'bookstarts_5' + '?year='+ this.$store.state.year + '&yearPlaceId=' + this.$store.state.yearPlaceId)
          bookstarts6 = await axios.get('/api/table_fields/' + 'bookstarts_6' + '?year='+ this.$store.state.year + '&yearPlaceId=' + this.$store.state.yearPlaceId)
        } else {
          bookstarts1 = await axios.get('/api/table_fields/all/' + 'bookstarts_1' + '?year='+ this.$store.state.year)
          bookstarts2 = await axios.get('/api/table_fields/all/' + 'bookstarts_2' + '?year='+ this.$store.state.year)
          bookstarts3 = await axios.get('/api/table_fields/all/' + 'bookstarts_3' + '?year='+ this.$store.state.year)
          bookstarts4 = await axios.get('/api/table_fields/all/' + 'bookstarts_4' + '?year='+ this.$store.state.year)
          bookstarts5 = await axios.get('/api/table_fields/all/' + 'bookstarts_5' + '?year='+ this.$store.state.year)
          bookstarts6 = await axios.get('/api/table_fields/all/' + 'bookstarts_6' + '?year='+ this.$store.state.year)
        }
        this.bookstarts_1 = bookstarts1.data
        this.bookstarts_2 = bookstarts2.data
        this.bookstarts_3 = bookstarts3.data
        this.bookstarts_4 = bookstarts4.data
        this.bookstarts_5 = bookstarts5.data
        this.bookstarts_6 = bookstarts6.data
      } catch (e) {
        console.log(e)
      }
    }
  },
  created () {
    this.$store.dispatch('setIsTitle', {
      is_title: "嬰幼兒閱讀活動統計"
    })
    this.getData()
  }
}
</script>
