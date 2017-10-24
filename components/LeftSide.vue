<template>
  <div class="nav-list">
    <ul class="mlist">
      <div v-if="$store.state.authUser.area === '中央'">
        <li class="listLi"><nuxt-link class="listbutton" to="/users/list" ><i class="icon-account"></i>帳號</nuxt-link></li>
      </div>
      <div v-else>
        <li class="listLi"><nuxt-link class="listbutton" :to="personLink" ><i class="icon-account"></i>帳號</nuxt-link></li>
      </div>
    </ul>
    <ul class="mlist bdTopLine">
      <li class="listLi"><nuxt-link class="listbutton" to="/years/edit" ><i class="icon-Calendar-year-plan"></i>歷年計畫</nuxt-link></li>
    </ul>
    <ul class="mlist">
      <li class="year">
        <!--<el-tooltip class="item" effect="dark" placement="top">-->
          <!--<div slot="content">選擇年度分類</div>-->
        <el-select v-model="valueYear" placeholder="年度" @change="getYearPlaceId()">
          <el-option
                  v-for="(item, index) in optionsYear"
                  :key="index"
                  :label="item"
                  :value="item">
          </el-option>
        </el-select>
        <!--</el-tooltip>-->

      </li>
      <li class="place" v-if="$store.state.authUser.area === '中央'">
        <!--<el-tooltip class="item" effect="dark" placement="top">-->
          <!--<div slot="content">選擇縣市分類</div>-->
          <el-select v-model="valuePlace" placeholder="縣市" @change="getYearPlaceId()">
            <el-option
                    v-for="(item, index) in optionsPlace"
                    :key="index"
                    :label="item"
                    :value="item">
            </el-option>
          </el-select>
        <!--</el-tooltip>-->

      </li>
    </ul>
    <!--<ul class="mlist" v-if="$store.place == '">-->
    <ul class="mlist">
      <li class="listLi"><nuxt-link class="listbutton" to="/funding_implementations" >經費執行情形</nuxt-link></li>
      <li class="listLi"><nuxt-link class="listbutton" to="/bookstarts" >嬰幼兒閱讀活動統計</nuxt-link></li>
      <li class="listLi"><nuxt-link class="listbutton" to="/reading_activities" >多元閱讀活動統計</nuxt-link></li>
      <li class="listLi"><nuxt-link class="listbutton" to="/promotion_activities" >本土語言閱讀活動統計</nuxt-link></li>
      <li class="listLi"><nuxt-link class="listbutton" to="/activity/file" >活動表件</nuxt-link></li>
      <li class="listLi"><nuxt-link class="listbutton" to="/gift_bag/file" >領取禮袋資料</nuxt-link></li>
      <li class="listLi"><nuxt-link class="listbutton" to="/activity_img/file" >活動剪影</nuxt-link></li>
      <li class="listLi"><nuxt-link class="listbutton" to="/download/list" >下載</nuxt-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  created () {
    this.$store.dispatch('setIsTitle', {
      is_title: "MMMMMMM"
    })
  },
  mounted: function () {
    $(document).ready(function () {
      // pageUrld = window.location.pathname;
    });
  },
  methods: {
    getYearPlaceId () {
      this.$store.dispatch('setYear', {year: this.valueYear})
      this.$store.dispatch('setPlace', {place: this.valuePlace})
      this.$store.dispatch('getYearPlaceId', {
        place: this.valuePlace,
        year: this.valueYear
      })
    }
  },
  computed: {
    optionsPlace: {
      get: function () {
        var array;
        if (this.$store.state.authUser && this.$store.state.authUser.area === '中央'){
          array = ['中央']
        } else {
          array = []
        }
        var result = array.concat(this.$store.state.yearPlaces.places)
        return result
      }
    }
  },
  data(){
    return {
      optionsYear: this.$store.state.yearPlaces.years,
      valueYear: this.$store.state.year,
      valuePlace: this.$store.state.place,
      personLink: '/users/edit/' + this.$store.state.authUser.id
    }
  }
  // ,
  // data () {
  //   return {
  //     xaxio: ['一月', '二月', '二月', '二月', '二月', '二月', '二月', '二月', '二月', '二月', '二月', '十二月'],
  //     yaxio: ['經常門', '資本門']
  //   }
  // }
}
</script>

<style>
  .nav-list{
    .mlist{
      position: relative;
      &.bdTopLine:before{
        content: "";
        height: 2px;
        width: 90%;
        background-color: #D4EBE3;
        position: absolute;
        left: 5%;
        bottom: 0;
        display: block;
      }
      .year,.place{
        width: 50%;
        display: inline-block;
        text-align: center;
        margin: 6px 0 12px 0;
        .el-select{
          width: 105px;
          .el-input__inner{
            color: #129895;
            text-align: center;
          }
        }
      }
      .year{
        padding-left: 20px;
        .el-select {
          .el-input__inner {
            /*font-size: 1.2em;*/
          }
        }
      }
      .place{
        padding-right: 12px;
      }
      .year:before,.place:before{
        display: block;
        margin: 6px;
        font-size: 11px;
        color: #AAC1B8;
      }
      .year:before{
        content: "年度";
      }
      .place:before{
        content: "地方";
      }
      /*border-top: 1px solid #D4F1E6;*/
      .listLi{
        position: relative;
        display: block;
        width: 100%;
        height: 60px;
        color: #129895;
        /*background: url("/img/listHover.svg") -6px 6px no-repeat;*/
        background-color: rgba(213, 235, 227, 0);
        transition: background 0.5s;
        .listbutton {
          font-size: 1.15em;
          font-weight: 300;
          display: block;
          padding: 0 10px 0 30px;
          height: 100%;
          line-height: 60px;
          color: #129895;
          vertical-align:middle;
          i[class^="icon-"], i[class*=" icon-"]{
            position: relative;
            display:inline-block;
            width: 36px;
            font-size: 24px;
            vertical-align:middle;
          }
        }
        &:hover{
          /*background: url("/img/listHover.svg") 0 6px no-repeat;*/
          background-color: rgba(30, 143, 139, 0.16);
          -webkit-backdrop-filter: blur(10px);
          .listbutton{
            /*color: #FF6500;*/
            /*background: url(/img/listHover.svg) 0 6px no-repeat;*/
          }
        }
        &.active{
          /*background: #D4F1E6 ;*/
          background: url("/img/listHover.svg") 0 6px no-repeat;
          .listbutton{
            /*color: #fff;*/
          }
        }
        .nuxt-link-exact-active{}
        .nuxt-link-active{
          background: url("/img/listHover.svg") 0 6px no-repeat;
        }
      }
    }
  }
</style>
