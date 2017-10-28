<template>
    <div>
        <div class="nuxtMainPanel" drag >
            <div class="pd20">
                <div class="containerCenter">
                    <el-upload
                            name="xlsxUp"
                            class="upload-demo"
                            drag
                            :action="action"
                            list-type=""
                            :data="upload_data"
                            multiple>
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">將文件拖到此處<br><br>或<em>點擊上傳</em></div>
                        <div class="el-upload__tip" slot="tip">只能上傳xlsx/ods文件</div>
                    </el-upload>
                </div>
            </div>
        </div>
        <div id="footerBar" v-if="file_name">
            <div class="ftBt"><i class="icon-download3" @click="download"></i> 下載</div>
        </div>
    </div>
</template>

<script>
  import axios from '~/plugins/axios'
  export default {
    data() {
      return {
        action: '/api/send_activities/upload',
        upload_data: {
          year: this.$store.state.year,
          place: this.$store.state.place,
          yearPlaceId: this.$store.state.yearPlaceId
        },
        file_name: null,
        vuexData: this.$store.state
      };
    },
    watch: {
      'vuexData.yearPlaceId': {
        handler: function(newValue, oldValue) { // 可以获取新值与老值两个参数
          this.getData()
        }
      }
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
      },
      async getData() {
        var result = await axios.get('/api/send_activities/' + this.$store.state.yearPlaceId)
        if (result.data.file_name) {
          this.file_name = result.data.file_name
        } else {
          this.file_name = null
        }
      },
      download () {
        window.open('/'+this.file_name)
      }
    },
    mounted: function () {
        this.getData()
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
