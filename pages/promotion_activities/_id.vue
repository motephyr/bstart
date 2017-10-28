<template>
  <div>
    <div class="nuxtMainPanel">
      <div class="pd20">
        <h1>promotion_activities</h1>
        <p>If you try to access this URL not connected, you will be redirected to the home page (server-side or client-side)</p>

        <table class="gTable sminputW80">
          <!--<colgroup>-->
            <!--<col style="background-color:red">-->
          <!--</colgroup>-->
          <thead>
          <tr>
            <th></th>
            <th v-for="y in promotion_activities_1.yaxio" :key="y.id">{{y.value}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(x, ix) in promotion_activities_1.xaxio" :key="x.id">
            <td width="128">{{x.value}}</td>
            <td v-for="(y, iy) in promotion_activities_1.yaxio" :key="y.id">
              <div v-if="promotion_activities_1.value.length > ix && promotion_activities_1.value[ix]">
                <el-input type="text" v-model="promotion_activities_1.value[ix][iy]" :disabled="isAdmin"></el-input>
              </div>
            </td>
            <td>{{x.description}}</td>
          </tr>
          </tbody>
        </table>

        <table class="gTable sminputW80">
          <!--<colgroup>-->
            <!--<col style="background-color:red">-->
          <!--</colgroup>-->
          <thead>
          <tr>
            <th></th>
            <th v-for="y in promotion_activities_2.yaxio" :key="y.id">{{y.value}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(x, ix) in promotion_activities_2.xaxio" :key="x.id">
            <td width="128">{{x.value}}</td>
            <td v-for="(y, iy) in promotion_activities_2.yaxio" :key="y.id">
              <div v-if="promotion_activities_2.value.length > ix && promotion_activities_2.value[ix]">
                <el-input type="text" v-model="promotion_activities_2.value[ix][iy]" :disabled="isAdmin"></el-input>
              </div>
            </td>
            <td>{{x.description}}</td>
          </tr>
          </tbody>
        </table>

        <table class="gTable sminputW80">
          <!--<colgroup>-->
            <!--<col style="background-color:red">-->
          <!--</colgroup>-->
          <thead>
          <tr>
            <th>館員志工培訓活動</th>
            <th v-for="y in promotion_activities_3.yaxio" :key="y.id">{{y.value}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(x, ix) in promotion_activities_3.xaxio" :key="x.id">
            <td width="128">{{x.value}}</td>
            <td v-for="(y, iy) in promotion_activities_3.yaxio" :key="y.id">
              <div v-if="promotion_activities_3.value.length > ix && promotion_activities_3.value[ix]">
                <el-input type="text" v-model="promotion_activities_3.value[ix][iy]" :disabled="isAdmin" />
              </div>
            </td>
            <td>{{x.description}}</td>
          </tr>
          </tbody>
        </table>

        <table class="gTable sminputW80">
          <!--<colgroup>-->
            <!--<col style="background-color:red">-->
          <!--</colgroup>-->
          <thead>
          <tr>
            <th>閱讀活動</th>
            <th v-for="y in promotion_activities_4.yaxio" :key="y.id">{{y.value}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(x, ix) in promotion_activities_4.xaxio" :key="x.id">
            <td width="128">{{x.value}}</td>
            <td v-for="(y, iy) in promotion_activities_4.yaxio" :key="y.id">
              <div v-if="promotion_activities_4.value.length > ix && promotion_activities_4.value[ix]">
                <el-input type="text" v-model="promotion_activities_4.value[ix][iy]" :disabled="isAdmin" />
              </div>
            </td>
            <td>{{x.description}}</td>
          </tr>
          </tbody>
        </table>

        <edit :promotion_activities_edit="promotion_activities_edit" v-if="isAdmin" />
        
      </div>
    </div>
    <div id="footerBar">
      <!--<nuxt-link class="ftBt" to="/"><i class="icon-chevron-thin-left"></i> 返回</nuxt-link>-->
      <div class="ftBt"  @click="update_data()"><i class="icon-checkmark5"></i>儲存</div>
    </div>
  </div>
</template>

<script>
import Edit from './edit.vue'

import axios from '~/plugins/axios'
import _ from 'lodash'
export default {
  components: {
    Edit
  },
  data () {
    return {
      promotion_activities_1: {
        xaxio: [],
        yaxio: [],
        value: []
      },
      promotion_activities_2: {},
      promotion_activities_3: {},
      promotion_activities_4: {},
      promotion_activities_edit: {},
      vuexData: this.$store.state,
      isAdmin: (this.$store.state.authUser.area === '中央')
    }
  },
  watch: {
    'vuexData.yearPlaceId': {
      handler: function(newValue, oldValue) { // 可以获取新值与老值两个参数
        this.getData()
      }
    }
  },
  methods: {
    async update_data() {
      var msg
      var updateArray = ['promotion_activities_1', 'promotion_activities_2', 'promotion_activities_3']
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
        let promotionActivitiesEdit = await axios.get('/api/table_fields/' + 'promotion_activities_2' + '?year='+ this.$store.state.year + '&yearPlaceId=' + this.$store.state.yearPlaceId +'&action=edit')

        let promotionActivities1
        let promotionActivities2
        let promotionActivities3
        let promotionActivities4

        if (this.$store.state.place !== '中央'){
          promotionActivities1 = await axios.get('/api/table_fields/' + 'promotion_activities_1' + '?year='+ this.$store.state.year + '&yearPlaceId=' + this.$store.state.yearPlaceId)
          promotionActivities2 = await axios.get('/api/table_fields/' + 'promotion_activities_2' + '?year='+ this.$store.state.year + '&yearPlaceId=' + this.$store.state.yearPlaceId)
          promotionActivities3 = await axios.get('/api/table_fields/' + 'promotion_activities_3' + '?year='+ this.$store.state.year + '&yearPlaceId=' + this.$store.state.yearPlaceId)
          promotionActivities4 = await axios.get('/api/table_fields/' + 'promotion_activities_4' + '?year='+ this.$store.state.year + '&yearPlaceId=' + this.$store.state.yearPlaceId)
        } else {
          promotionActivities1 = await axios.get('/api/table_fields/all/' + 'promotion_activities_1' + '?year='+ this.$store.state.year)
          promotionActivities2 = await axios.get('/api/table_fields/all/' + 'promotion_activities_2' + '?year='+ this.$store.state.year)
          promotionActivities3 = await axios.get('/api/table_fields/all/' + 'promotion_activities_3' + '?year='+ this.$store.state.year)
          promotionActivities4 = await axios.get('/api/table_fields/all/' + 'promotion_activities_4' + '?year='+ this.$store.state.year)
        }
        this.promotion_activities_1 = promotionActivities1.data
        this.promotion_activities_2 = promotionActivities2.data
        this.promotion_activities_3 = promotionActivities3.data
        this.promotion_activities_4 = promotionActivities4.data

        this.promotion_activities_edit = promotionActivitiesEdit.data
      } catch (e) {
        console.log(e)
      }
    }
  },
  created () {
    this.$store.dispatch('setIsTitle', {
      is_title: "本土語言閱讀活動統計"
    })
    this.getData()
  }
}
</script>
