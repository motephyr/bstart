<template>
  <div>
    <div class="nuxtMainPanel">
    <div class="pd20">
      <div class="">
      <div class="fIHeader row">
        <div class="col-6 col-sm-3 col-md-3 col-lg-3 RegularGoor"><br>345,678</div>
        <div class="col-6 col-sm-3 col-md-3 col-lg-3 CapitalGate"><br>345,678</div>
        <div class="col-6 col-sm-3 col-md-3 col-lg-3 Subtotal"><br>345,678</div>
      </div>
      </div>
      <div class="row">
        <div class="addTabName">
          <el-input v-model="newTabName"></el-input>
          <div class="ftBt" @click="addNewTab"><i class="icon-loupe"></i> 新增項目</div></div>
      </div>
        <el-tabs type="border-card" @tab-click="handleClick">
          <el-tab-pane label="總表" v-if="$store.state.authUser.area === '中央'">
            <el-table :data="tableData3" border style="width: 100%" height="400">
              <el-table-column fixed prop="local" label="縣市" width="100"></el-table-column>
              <el-table-column prop="RegularGoor" label="經常門" width="120"></el-table-column>
              <el-table-column prop="CapitalGate" label="資本門" width="120"></el-table-column>
              <el-table-column prop="Subtotal" label="小計" width="120"></el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane :label="struct.sub_field" v-for="struct in structs" :key="struct.sub_field">
            <el-tooltip class="item" effect="dark" content="刪除該經費項目" placement="left" v-if="$store.state.authUser.area === '中央'">
              <div @click="openTabName" class="dlThisYear icon-cancel"></div>
            </el-tooltip>
            <div>
              <table class="gTablefunding noEl">
                <thead>
                <tr>
                  <th></th>
                  <!--<th>{{struct.sub_field}}</th>-->
                  <th v-for="y in struct.yaxio" :key="y.id">{{y.value}}</th>
                  <th>小計</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(x, ix) in struct.xaxio" :key="x.id">
                  <th>{{x.value}}</th>
                  <td v-for="(y, iy) in struct.yaxio" :key="y.id">
                    <div v-if="struct.value && struct.value.length > ix && struct.value[ix]">
                      <!--<input type="text" v-model="struct.value[ix][iy]" />-->
                      <!--<el-input :disabled="true" v-model="struct.value[ix][iy]" placeholder=""></el-input>-->
                      <input type="text" v-model="struct.value[ix][iy]" @keyup="inputChange"/>
                    </div>
                  </td>
                  <td>{{struct.value[ix] | getSum}}</td>
                </tr>
                </tbody>
                <tfoot>
                  <th></th>
                  <td></td>
                  <td></td>
                </tfoot>
              </table>
              <!--<button @click="update_data(struct.sub_field)">Update</button>-->
            </div>
            <!--<nuxt-link to="/">Back to the home page</nuxt-link>-->
          </el-tab-pane>

        </el-tabs>
    </div>
    </div>
    <div id="footerBar">
      <!--<button @click="update_data(struct.sub_field)">Update</button>-->
      <!--<div class="ftBt" onClick="javascript:history.back(-1);"><i class="icon-chevron-thin-left"></i> 返回</div>-->
      <div class="ftBt" @click="update_data()"><i class="icon-checkmark5"></i> 儲存</div>
    </div>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import _ from 'lodash'
export default {
  data () {
    return {
      newTabName: '',
      structs: [],
      chooseTab: '多元閱讀',
      vuexData: this.$store.state,
      tableData3: [
        {local: '基隆市',RegularGoor: '221333',CapitalGate: '3243242',Subtotal: '324324234'},
        {local: '台北市',RegularGoor: '221333',CapitalGate: '3243242',Subtotal: '324324234'},
        {local: '新北市',RegularGoor: '221333',CapitalGate: '3243242',Subtotal: '324324234'},
        {local: '桃園市',RegularGoor: '221333',CapitalGate: '3243242',Subtotal: '324324234'},
        {local: '新竹市',RegularGoor: '221333',CapitalGate: '3243242',Subtotal: '324324234'},
        {local: '新竹縣',RegularGoor: '221333',CapitalGate: '3243242',Subtotal: '324324234'},
        {local: '苗栗縣',RegularGoor: '221333',CapitalGate: '3243242',Subtotal: '324324234'},
        {local: '台中市',RegularGoor: '221333',CapitalGate: '3243242',Subtotal: '324324234'},
        {local: '南投縣市',RegularGoor: '221333',CapitalGate: '3243242',Subtotal: '324324234'},
        {local: '彰化縣市',RegularGoor: '221333',CapitalGate: '3243242',Subtotal: '324324234'},
        {local: '雲林縣市',RegularGoor: '221333',CapitalGate: '3243242',Subtotal: '324324234'},
        {local: '嘉義市',RegularGoor: '221333',CapitalGate: '3243242',Subtotal: '324324234'},
        {local: '嘉義縣',RegularGoor: '221333',CapitalGate: '3243242',Subtotal: '324324234'},
        {local: '台南市',RegularGoor: '221333',CapitalGate: '3243242',Subtotal: '324324234'},
        {local: '高雄市',RegularGoor: '221333',CapitalGate: '3243242',Subtotal: '324324234'},
        {local: '屏東縣市',RegularGoor: '221333',CapitalGate: '3243242',Subtotal: '324324234'},
        {local: '台東縣市',RegularGoor: '221333',CapitalGate: '3243242',Subtotal: '324324234'},
        {local: '花蓮縣市',RegularGoor: '221333',CapitalGate: '3243242',Subtotal: '324324234'},
        {local: '宜蘭縣市',RegularGoor: '221333',CapitalGate: '3243242',Subtotal: '324324234'},
        {local: '澎湖縣',RegularGoor: '221333',CapitalGate: '3243242',Subtotal: '324324234'},
        {local: '金門縣',RegularGoor: '221333',CapitalGate: '3243242',Subtotal: '324324234'},
        {local: '連江縣',RegularGoor: '221333',CapitalGate: '3243242',Subtotal: '324324234'}
      ]
    }
  },
  watch: {
    'vuexData.yearPlaceId': {
      handler: function(newValue, oldValue) { // 可以获取新值与老值两个参数
        this.getData()
      }
    }
  },
  filters: {
    getSum(array) {
      var x = array[0] ? parseInt(array[0]) : 0
      var y = array[1] ? parseInt(array[1]) : 0
      return x + y
    }
  },
  methods: {
    async addNewTab() {
      if (this.newTabName !== '') {
        try {
          let res = await axios.post('/api/table_fields/postSubField/' + 'funding_implementations', {year: this.$store.state.year, subField: this.newTabName})
          this.$router.replace('/funding_implementations?' + Math.random())
        } catch (e) {
          console.log(e)
        }
      } else {
        alert('未輸入帳號')
      }
    },
    handleClick(tab, event) {
      this.chooseTab = event.target.innerHTML
//      console.log(tab, event);
    },
    inputChange(e) {
      e.target.value = e.target.value.replace(/[^\d]/g, '')
    },
    update_data () {
      var name = this.chooseTab
      var struct = _(this.structs).filter((x) => {return x.sub_field === name}).value()[0]
      var changeValue = _(struct.xaxio).map((x, i) => {
        x.table_values = struct.value[i]
        return x
      }).value()
      axios.post('/api/table_values/updateSubField/' + 'funding_implementations', {change_value: changeValue, yearPlaceId: this.$store.state.yearPlaceId, subField: name}).then((res) => {
        //this.$router.replace('/funding_implementations?' + Math.random())
      }).catch((e) => {
//        console.log(e)
      })
    },
    async getData () {
      try {
//        let readingActivitiesEdit = await axios.get('/api/table_fields/' + 'funding_implementations' + '?year='+ this.$store.state.year + '&yearPlaceId=' + this.$store.state.yearPlaceId +'&action=edit')
        let res = await axios.post('/api/table_fields/getSubField/' + 'funding_implementations', {year: this.$store.state.year, yearPlaceId: this.$store.state.yearPlaceId})
        this.structs = res.data
        if (res.data.length > 0) {
          this.chooseTab = res.data[0].sub_field
        }
        if (this.$store.state.place === '中央'){
          let resAll = await axios.post('/api/table_fields/getSubField/all/' + 'funding_implementations', {year: this.$store.state.year, yearPlaceId: this.$store.state.yearPlaceId})
          this.tableData3 = resAll.data
        }
//        console.log(this.structs)
      } catch (e) {
//        console.log(e)
      }
    },
    openTabName() {
      this.$confirm('此操作將永久刪除[ＸＸＸ]該經費項目資料 , 是否繼續?', '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.delete('/api/table_fields/deleteSubField/' + 'funding_implementations', {params: {year: this.$store.state.year, subField: this.chooseTab}})
      }).then(() => {
        this.$message({
          type: 'success',
          message: '刪除成功!'
        });
      }).then(() => {
        this.$router.replace('/funding_implementations?' + Math.random())
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消刪除,資料尚在'
        });
      });
    }
  },
  created () {
    this.$store.dispatch('setIsTitle', {
      is_title: "經費執行情形"
    })
    this.getData()
  },
  mounted: function () {
    $(document).ready(function () {
      //console.log($('body').html());
    });
  }
}
</script>
<style>
  h1{
    color: #009558;
  }
  .el-tabs__content {
    overflow: auto;
    position: relative;
  }
  .fIHeader{
    padding: 0 18px 18px 18px;
    .RegularGoor, .CapitalGate, .Subtotal {
      text-align: right;
      font-size: 24px;
      font-weight: 400;
      color: #4D6373;
      display: inline-block;
      margin: 12px 0;
    }
    .RegularGoor{
      color: #79A300;
    }
    .CapitalGate{
      color: #008BD0;
    }
    .Subtotal{
      color: #00C4C4;
    }
    .RegularGoor,.CapitalGate,.Subtotal{
      color: #00364D;
    }
    .RegularGoor:before, .CapitalGate:before, .Subtotal:before {
      font-size: 14px;
      color: #AFBCD1;
      margin: 2px 0;
      height: 22px;
      line-height: 22px;
    }
    .RegularGoor:before {
      content: '經常門';
    }
    .CapitalGate:before {
      content: '資本門';
    }
    .Subtotal:before {
      content: '總計';
    }
    .RegularGoor:after,.CapitalGate:after,.Subtotal:after {
      content: ' 元';
      font-size: 14px;
      color: #AFBCD1;
    }
  }
  .addTabName{
    margin: 12px auto;
    position: relative;
    .el-input{
      height: 36px;
      width: auto;
      display: inline-block;
      margin-right: 114px;
    }
    .ftBt{
      i:before,i:after{
        vertical-align: middle;
        font-size: 24px;
        padding: 0;
      }
      i:before{}
      i:after{}
      position: absolute;
      right: 3px;
      width: 114px;
      background-color: rgb(30, 143, 139);
      border: 1px solid rgb(30, 143, 139);
      height: 36px;
      line-height: 36px;
      margin: 0 0 0 -5px;
      padding: 0 8px;
      border-radius: 0 5px 5px 0;
      font-size: 15px;
      text-align: center;
      display: inline-block;
      cursor: pointer;
      color: rgb(131, 219, 210);
      transition: all 0.3s;
      i{
        display: inline-block;
        position: relative;
        margin: 0;
        height: 34px;
        line-height: 34px;
        padding: 0 2px;
        &:before{
        }
      }
      &:hover{
        color: rgb(165, 255, 0);
        i{
          &:before{
          }
        }
      }
      &:active{
        box-shadow: 0 0 0 1px rgb(165, 255, 0);
        i:before{
        }
      }
    }
  }
  .dlThisYear{
    display: block;
    position: absolute;
    font-size: 18px;
    right: 2px;
    top: 2px;
    cursor: pointer;
    color: rgba(114, 122, 136, 0.79);;
    &:hover{
      color: #C12A27;
    }
  }
  table.gTablefunding{
    colgroup{
      col:hover{
        background-color: #F4F6FD;
      }
    }
    thead{}
    tbody{
      tr{
        &:hover{
        }
        td{}
      }
    }
    tr{
      td,th{
        color: #9BB6D7;
        padding: 9px 3px;
        text-align: right;
        .el-input{
          .el-input__inner{
            text-align: right;
            font-size: 18px;
            color: #1E8F8B;
          }
        }
      }
    }
  }
  .el-message-box{
    max-width: 280px;
  }
  @media (max-width: 400px) {
    table{
      td,th{
        .el-input{
          width: 100px;
          .el-input__inner{
            font-size: 16px;
          }
        }
      }
    }
    .pd20{
      padding: 0;
    }
  }
</style>
