<template>
    <div>
        <div class="nuxtMainPanel" drag >
            <div class="pd20">
                <div class="containerCenter">
                    <el-upload
                            name="xlsxUp"
                            class="upload-demo"
                            drag
                            :action=action
                            list-type=""
                            multiple>
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">將文件拖到此處<br><br>或<em>點擊上傳</em></div>
                        <div class="el-upload__tip" slot="tip">只能上傳xlsx/ods文件</div>
                    </el-upload>
                </div>
            </div>
        </div>
        <div id="footerBar">
            <div class="ftBt"><i class="icon-download3"></i> 下載</div>
        </div>
    </div>
</template>

<script>
  import axios from '~/plugins/axios'
  export default {
    data() {
      return {
        action: '/gift_bag/upload/' + this.$store.state.year + '/' + this.$store.state.place
      };
    },
    created () {
      this.$store.dispatch('setIsTitle', {
        is_title: "領取禮袋資料"
      })
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
    },
    mounted: function () {
//      var y = this.$store.state.year;
//      var p = this.$store.state.place;
//      axios.get("file/"+y+"/"+p).then(function (res) {
//        console.log(res.df);
//        var pd = "sadasd"
//      }).catch(function (error) {
//        console.log(error);
//      })
    }
  }
</script>

<style>
  .containerCenter{
    width: 220px;
    margin: 0 auto;
    /*text-align: center;*/
    .el-upload-dragger{
      margin-top: 110px;
      padding: 0 60px;
      width: auto;
    }
  }
</style>
