<template>
  <div>
    <div class="nuxtMainPanel">
      <div class="pd20">
        <h1>reading_activities</h1>
        <p>If you try to access this URL not connected, you will be redirected to the home page (server-side or client-side)</p>

        <table class="gTable sminputW80">
          <!--<colgroup>-->
            <!--<col style="background-color:red">-->
          <!--</colgroup>-->
          <thead>
          <tr>
            <th></th>
            <th v-for="y in reading_activities_1.yaxio" :key="y.id">{{y.value}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(x, ix) in reading_activities_1.xaxio" :key="x.id">
            <td width="128">{{x.value}}</td>
            <td v-for="(y, iy) in reading_activities_1.yaxio" :key="y.id">
              <div v-if="reading_activities_1.value.length > ix && reading_activities_1.value[ix]">
                <el-input type="text" v-model="reading_activities_1.value[ix][iy]" ></el-input>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
        <button @click="update_data('reading_activities_1')">Update</button>
        <table class="gTable sminputW80">
          <!--<colgroup>-->
            <!--<col style="background-color:red">-->
          <!--</colgroup>-->
          <thead>
          <tr>
            <th></th>
            <th v-for="y in reading_activities_2.yaxio" :key="y.id">{{y.value}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(x, ix) in reading_activities_2.xaxio" :key="x.id">
            <td width="128">{{x.value}}</td>
            <td v-for="(y, iy) in reading_activities_2.yaxio" :key="y.id">
              <div v-if="reading_activities_2.value.length > ix && reading_activities_2.value[ix]">
                <el-input type="text" v-model="reading_activities_2.value[ix][iy]" ></el-input>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
            <button @click="update_data('reading_activities_2')">Update</button>

        <!--<nuxt-link to="/">Back to the home page</nuxt-link>-->
        <edit :reading_activities_edit="reading_activities_edit" />
      </div>
    </div>
    <div id="footerBar">
      <!--<nuxt-link class="ftBt" to="/"><i class="icon-reply"></i> 返回</nuxt-link>-->
      <div class="ftBt"  @click="addYear()"><i class="icon-checkmark5"></i>儲存</div>
    </div>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import _ from 'lodash'
import Edit from './edit.vue'
export default {
  components: {
    Edit
  },
  data () {
    return {
      reading_activities_1: {
        xaxio: [],
        yaxio: [],
        value: []
      },
      reading_activities_2: {},
      reading_activities_edit: {},
      vuexData: this.$store.state
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
    update_data (name) {
      console.log(this[name].xaxio[0])
      var changeValue = _(this[name].xaxio).map((x, i) => {
        x.table_values = this[name].value[i]
        return x
      }).value()
//      console.log(changeValue)
//      axios.post('/api/table_values/' + name, {change_value: changeValue, yearPlaceId: this.$store.state.yearPlaceId}).then((res) => {
//        this.$router.replace('/reading_activities?' + Math.random())
//      }).catch((e) => {
//        console.log(e)
//      })
    },
    async getData () {
      try {
        let readingActivitiesEdit = await axios.get('/api/table_fields/' + 'reading_activities_1' + '?year='+ this.$store.state.year + '&yearPlaceId=' + this.$store.state.yearPlaceId +'&action=edit')
//        let readingActivities1 = await axios.get('/api/table_fields/' + 'reading_activities_1' + '?year='+ this.$store.state.year + '&yearPlaceId=' + this.$store.state.yearPlaceId)
//        let readingActivities2 = await axios.get('/api/table_fields/' + 'reading_activities_2' + '?year='+ this.$store.state.year + '&yearPlaceId=' + this.$store.state.yearPlaceId)
        let readingActivities1
        let readingActivities2
        if (this.$store.state.place !== '中央'){
          readingActivities1 = await axios.get('/api/table_fields/' + 'reading_activities_1' + '?year='+ this.$store.state.year + '&yearPlaceId=' + this.$store.state.yearPlaceId)
          readingActivities2 = await axios.get('/api/table_fields/' + 'reading_activities_2' + '?year='+ this.$store.state.year + '&yearPlaceId=' + this.$store.state.yearPlaceId)
        } else {
          readingActivities1 = await axios.get('/api/table_fields/all/' + 'reading_activities_1' + '?year='+ this.$store.state.year)
          readingActivities2 = await axios.get('/api/table_fields/all/' + 'reading_activities_2' + '?year='+ this.$store.state.year)
          console.log(readingActivities1.data.xaxio[0])
        }
        this.reading_activities_1 = readingActivities1.data
        this.reading_activities_2 = readingActivities2.data
        this.reading_activities_edit = readingActivitiesEdit.data
      } catch (e) {
        console.log(e)
      }
    }
  },
  created () {
    this.getData()
    this.$store.dispatch('setIsTitle', {
      is_title: "多元閱讀活動統計"
    })
  }
}
</script>
