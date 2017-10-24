<template>
  <div>
    <div class="nuxtMainPanel">
      <div class="">
        <!--<div :value="p.id" v-for="p in years">{{p}}</div>-->
          <!--<button @click="addYear()">addYear</button>-->
          <!--<nuxt-link to="/">Back to the home page</nuxt-link>-->
        <ul id="allYear" class="mgCenter">
            <li class="single row" :value="p.id" v-for="p in years">
                <div class="col-6 col-sm-5 col-md-4 col-lg-3 year">{{p.year}}</div>
                <div class="col-6 col-sm-5 col-md-4 col-lg-3 dateArrival"><el-date-picker v-model="p.editable_at" type="date" placeholder="已結束" :picker-options="pickerOptions0" @change="setEditableDate(p, p.editable_at)"></el-date-picker></div>
                <div class="col-6 col-sm-5 col-md-4 col-lg-3 showSw"><el-switch v-model="p.is_show" on-color="#13ce66" off-color="#ff4949" @change="isShow(p)"></el-switch></div>
                <!--<div class="col-6 col-sm-5 col-md-4 col-lg-2 RegularGoor">215,345,678</div>-->
                <!--<div class="col-6 col-sm-5 col-md-4 col-lg-2 CapitalGate">345,345,678</div>-->
                <!--<div class="col-6 col-sm-5 col-md-4 col-lg-2 Subtotal">3,945,345,678</div>-->
                <el-tooltip class="item" effect="dark" content="刪除該年度資料" placement="left">
                    <div @click="openDlThisYear(p)" class="dlThisYear icon-cancel"></div>
                </el-tooltip>
            </li>
        </ul>
      </div>
    </div>
    <div id="footerBar">
        <div class="ftBt"  @click="addYear()"><i class="icon-plus4"></i>新增年度計畫</div>
    </div>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
export default {
  created () {
    this.$store.dispatch('setIsTitle', {
      is_title: "歷年計畫"
    })
  },
  //head: {
  //  title: 'Years Edit',
  //  meta: [
  //    { hid: 'description', name: 'description', content: 'Years Edit description' }
  //  ]
  //},
  data() {
    return {
//      pagetitle: "sadsad",
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      valueSw: true,
      valuePicker: '',
      value: ''
    };
  },
  asyncData ({ params, error }) {
    return axios.get('/api/year_places')
      .then((res) => {
        return res.data
      })
      .catch((e) => {
        error({ statusCode: 404, message: 'User not found' })
      })
  },
  methods: {
    addYear (e) {
      axios.post('/api/year_places').then((res) => {
        this.$router.replace('/years/edit' + '?' + Math.random())
      }).catch((e) => {
        console.log(e)
      })
    },
    openDlThisYear(year) {
      this.$confirm('此操作將永久刪除[106]年度計畫資料 , 是否繼續?', '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.delete('/api/year_places',{params: {year: year.year}})
      }).then((res) => {
        this.$message({
          type: 'success',
          message: '刪除成功!'
        });
      }).then(() => {
        this.$router.replace('/years/edit' + '?' + Math.random())
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消刪除,資料尚在'
        });
      });
    },
    isShow(year) {
      axios.patch('/api/year_places/' + year.year,{is_show: year.is_show}).then((res) => {
        // alert('a')
      })
    },
    setEditableDate(year, date) {
      axios.patch('/api/year_places/' + year.year,{editable_at: date}).then((res) => {
        // alert('b')
      })
    }
  },
  mounted: function () {
    //    $("body").append("gggggggggggggg");
  }
}
</script>

<style>
  #allYear{
      &.mgCenter{
          text-align: center;
          margin: 0 auto;
      }
      .single{
          position: relative;
          background-color: #FFF;
          padding: 12px;
          margin: 22px;
          border-radius: 12px;
          box-shadow: 0 1px 3px 0 rgba(134, 168, 194, 0.83);
          .year{
            text-align: center;
            font-size: 36px;
            font-weight: 300;
            color: #37CB6B;
            margin: 6px 0;
            height: 64px;
            line-height: 64px;
          }
          .dateArrival,.showSw,.RegularGoor,.CapitalGate,.Subtotal{
              text-align: right;
              margin: 6px 0;
          }
          .RegularGoor{
              color: #5CA300;
              font-size: 20px;
          }
          .CapitalGate{
              color: #008BD0;
              font-size: 20px;
          }
          .Subtotal{
              color: #E96300;
              font-size: 20px;
          }
          .RegularGoor,.CapitalGate{
              color: #778896;
          }
          .dateArrival{
              text-align: center;
              .el-date-editor{
                  width: 100%;
                  /*margin: 0 10px;*/
              }
          }
          .showSw{
              text-align: center;
          }
          .year:after,.dateArrival:before,.showSw:before,.RegularGoor:before,.CapitalGate:before,.Subtotal:before{
              font-size: 13px;
              color: #929CAE;
              font-weight: 300;
              margin: 4px 0;
          }
          .year:after{
              content: ' 年度';
          }
          .dateArrival:before{
              content: '編輯期間至';
              display: block;
              padding: 0 0 5px 12px;
          }
          .showSw:before{
              content: '顯示狀態';
              display: block;
              padding: 0 0 5px 12px;
          }
          .RegularGoor:before{
              content: '經常門';
          }
          .CapitalGate:before{
              content: '資本門';
          }
          .Subtotal:before{
              content: '總計';
          }
          .RegularGoor:before,.CapitalGate:before,.Subtotal:before{
              display: block;
          }
          .RegularGoor:after,.CapitalGate:after,.Subtotal:after {
              /*content: ' 元';*/
              font-size: 14px;
              color: #AFBCD1;
              padding-left: 2px;
          }
          .dlThisYear{
              display: block;
              position: absolute;
              font-size: 18px;
              right: 2px;
              top: 2px;
              cursor: pointer;
              color: rgba(114, 122, 136, 0.79);
              opacity: 0;
              transition: all 1.2s;
              &:hover{
                  transition: all 0.3s;
                  color: #C12A27;
              }
          }
          &:hover{
              .dlThisYear{
                  opacity: 1;
              }
          }
      }
      .el-input__inner{
          color: #DA5A00;
      }
  }
  .el-message-box{
      max-width: 280px;
  }
  @media (max-width: 400px) {
      #allYear{
          .single{
              padding: 8px 0;
              margin: 10px;
              .RegularGoor,.CapitalGate,.Subtotal {
                  font-size: 18px;
                  padding: 0 12px;
              }
              .RegularGoor:after,.CapitalGate:after,.Subtotal:after {
                  content: '';
              }
          }
      }
  }
  @media (min-width: 680px){
      .col-sm-5{
          -ms-flex: 0 0 41.666667%;
          -webkit-box-flex: 0;
          flex: 0 0 41.666667%;
          max-width: 41.666667%;
      }
  }
  @media (min-width: 768px){
      .col-md-4{
          -ms-flex: 0 0 33.333333%;
          -webkit-box-flex: 0;
          flex: 0 0 33.333333%;
          max-width: 33.333333%;
      }
  }
  @media (min-width: 1024px){
      .col-lg-2{
          -ms-flex: 0 0 16.666667%;
          -webkit-box-flex: 0;
          flex: 0 0 16.666667%;
          max-width: 16.666667%;
      }
  }

</style>
