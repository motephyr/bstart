<template>
  <div>
    <div class="nuxtMainPanel">
      <div class="pd20">
        <h1>promotion_activities</h1>
        <p>If you try to access this URL not connected, you will be redirected to the home page (server-side or client-side)</p>

        <table class="gTable sminputW80">
          <thead>
          <tr>
            <th></th>
            <th v-for="y in promotion_activities_1.yaxio" :key="y.id">{{y.value}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(x, ix) in promotion_activities_1.xaxio" :key="x.id">
            <td>{{x.value}}</td>
            <td v-for="(y, iy) in promotion_activities_1.yaxio" :key="y.id">
              <div v-if="promotion_activities_1.value.length > ix && promotion_activities_1.value[ix]">
                {{promotion_activities_1.value[ix][iy]}}
              </div>
            </td>
            <td><el-input type="text" v-model="x.description" placeholder="描述"></el-input>
              <div class="ftBt"  @click="update_description(x.id, x.description)"><i class="icon-loupe"></i> 修改描述</div>
            </td>
          </tr>
          </tbody>
        </table>

        <table class="gTable sminputW80">
          <thead>
          <tr>
            <th></th>
            <th v-for="y in promotion_activities_2.yaxio" :key="y.id">{{y.value}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(x, ix) in promotion_activities_2.xaxio" :key="x.id">
            <td>{{x.value}}</td>
            <td v-for="(y, iy) in promotion_activities_2.yaxio" :key="y.id">
              <div v-if="promotion_activities_2.value.length > ix && promotion_activities_2.value[ix]">
                {{promotion_activities_2.value[ix][iy]}}
              </div>
            </td>
            <td><el-input type="text" v-model="x.description" placeholder="描述"></el-input>
              <div class="ftBt"  @click="update_description(x.id, x.description)"><i class="icon-loupe"></i> 修改描述</div>
            </td>
          </tr>
          </tbody>
        </table>

        <table class="gTable sminputW80">
          <thead>
          <tr>
            <th></th>
            <th v-for="y in promotion_activities_3.yaxio" :key="y.id">{{y.value}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(x, ix) in promotion_activities_3.xaxio" :key="x.id">
            <td>{{x.value}}</td>
            <td v-for="(y, iy) in promotion_activities_3.yaxio" :key="y.id">
              <div v-if="promotion_activities_3.value.length > ix && promotion_activities_3.value[ix]">
                {{promotion_activities_3.value[ix][iy]}}
              </div>
            </td>
            <td><el-input type="text" v-model="x.description" placeholder="描述"></el-input>
              <div class="ftBt"  @click="update_description(x.id, x.description)"><i class="icon-loupe"></i> 修改描述</div>
            </td>
          </tr>
          </tbody>
        </table>
        <nuxt-link to="/">Back to the home page</nuxt-link>
        <edit :promotion_activities_edit="promotion_activities_edit" />
      </div>
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
        promotion_activities_1: {
          xaxio: [],
          yaxio: [],
          value: []
        },
        promotion_activities_2: {},
        promotion_activities_3: {},
        promotion_activities_edit: {},
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
      update_description (id, description) {
        axios.patch('/api/table_field_xs/' + id,{description: description}).then((res) => {
          this.$router.replace('/promotion_activities?' + Math.random())
        }).catch((e) => {
          console.log(e)
        })
      },
      async getData () {
        try {
          let promotionActivitiesEdit = await axios.get('/api/table_fields/' + 'promotion_activities_2' + '?year='+ this.$store.state.year + '&yearPlaceId=' + this.$store.state.yearPlaceId +'&action=edit')
          let promotionActivities1 = await axios.get('/api/table_fields/' + 'promotion_activities_1' + '?year='+ this.$store.state.year + '&yearPlaceId=' + this.$store.state.yearPlaceId)
          let promotionActivities2 = await axios.get('/api/table_fields/' + 'promotion_activities_2' + '?year='+ this.$store.state.year + '&yearPlaceId=' + this.$store.state.yearPlaceId)
          let promotionActivities3 = await axios.get('/api/table_fields/' + 'promotion_activities_3' + '?year='+ this.$store.state.year + '&yearPlaceId=' + this.$store.state.yearPlaceId)

          this.promotion_activities_1 = promotionActivities1.data
          this.promotion_activities_2 = promotionActivities2.data
          this.promotion_activities_3 = promotionActivities3.data

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