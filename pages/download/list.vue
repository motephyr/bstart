<template>
    <div>
        <div class="nuxtMainPanel">
            <div class="pd20">
                <div class="containerCenter">
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                        <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                    </el-checkbox-group>
                </div>
                <!--<div :value="p.id" v-for="p in years">{{p}}</div>-->
                <!--<button @click="addYear()">addYear</button>-->
                <!--<nuxt-link to="/">Back to the home page</nuxt-link>-->
            </div>
        </div>
        <div id="footerBar">
            <div class="ftBt"><i class="icon-download3"></i> 下載</div>
        </div>
    </div>
</template>

<script>
  const cityOptions = [
    '經費執行情形',
    '嬰幼兒閱讀活動統計',
    '多元閱讀活動統計',
    '本土語言閱讀活動統計',
    '活動表件',
    '領取禮袋資料',
    '活動剪影'
  ];
  export default {
    data() {
      return {
        checkAll: false,
        checkedCities: [
          '經費執行情形',
          '嬰幼兒閱讀活動統計',
          '多元閱讀活動統計',
          '本土語言閱讀活動統計',
          '活動表件',
          '領取禮袋資料'
        ],
        cities: cityOptions,
        isIndeterminate: true
      };
    },
    methods: {
      handleCheckAllChange(event) {
        this.checkedCities = event.target.checked ? cityOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      }
    },
    created () {
      this.$store.dispatch('setIsTitle', {
        is_title: "檔案下載"
      })
    }
  }
</script>

<style>
    .containerCenter{
        max-width: 280px;
        margin: 0 auto;
        .el-checkbox{
            height: 50px;
            display: block;
            margin: 0;
            .el-checkbox__label{
                font-size: 18px;
            }
        }
        .el-checkbox{
            color: #326EAB;
        }
        .el-checkbox__inner {
            margin: 12px;
            border-radius: 4px;
            width: 28px;
            height: 28px;
            background-color: rgb(213, 222, 233);
            border-color: rgb(213, 222, 233);
        }
        .el-checkbox__input.is-checked .el-checkbox__inner{
            background-color: rgb(19, 206, 102);
            border-color: rgb(19, 206, 102);
        }
        .el-checkbox__inner:after {
            -webkit-box-sizing: content-box;
            box-sizing: content-box;
            content: "";
            border: 3px solid #fff;
            border-left: 0;
            border-top: 0;
            height: 16px;
            left: 9px;
            position: absolute;
            top: 1px;
            -webkit-transform: rotate(45deg) scaleY(0);
            transform: rotate(45deg) scaleY(0);
            width: 5px;
            -webkit-transition: -webkit-transform .15s cubic-bezier(.71,-.46,.88,.6) .05s;
            transition: -webkit-transform .15s cubic-bezier(.71,-.46,.88,.6) .05s;
            transition: transform .15s cubic-bezier(.71,-.46,.88,.6) .05s;
            transition: transform .15s cubic-bezier(.71,-.46,.88,.6) .05s,-webkit-transform .15s cubic-bezier(.71,-.46,.88,.6) .05s;
            -webkit-transform-origin: center;
            transform-origin: center;
        }
        .el-checkbox__input.is-indeterminate .el-checkbox__inner {
            background-color: rgb(19, 206, 102);
            border-color: rgb(19, 206, 102);
        }
    }
</style>
