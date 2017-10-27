<template>
    <div>
        <div class="nuxtMainPanel">
            <div class="pd20">
                <!--<div class="row">-->
                    <!--<div class="addTabName">-->
                        <!--<el-input></el-input>-->
                        <!--<div class="ftBt"><i class="icon-loupe"></i> 新增項目</div>-->
                    <!--</div>-->
                <!--</div>-->
                <el-tabs type="border-card">
                    <el-tab-pane label="嬰幼兒活動">
                        <!--<el-tooltip class="item" effect="dark" content="刪除「嬰幼兒」活動項目" placement="left">-->
                            <!--<div @click="openTabActives" class="dlThisYear icon-cancel"></div>-->
                        <!--</el-tooltip>-->
                        <el-upload
                                name="logos"
                                action="/upload"
                                list-type="picture-card"
                                :on-preview="handlePictureCardPreview"
                                :on-remove="handleRemove">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog v-model="dialogVisible" size="tiny" class="slidBox">
                            <img width="100%" :src="dialogImageUrl" alt="">
                            <el-input type="text" v-model="dialogImageUrl"></el-input>
                        </el-dialog>
                    </el-tab-pane>
                    <el-tab-pane label="青少年活動">
                        <el-upload
                                name="logos"
                                action="../../upload"
                                list-type="picture-card"
                                :on-preview="handlePictureCardPreview"
                                :on-remove="handleRemove">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                    </el-tab-pane>
                    <el-tab-pane label="樂齡活動">
                        <el-upload
                                name="logos"
                                action="/upload"
                                list-type="picture-card"
                                :on-preview="handlePictureCardPreview"
                                :on-remove="handleRemove">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                    </el-tab-pane>
                    <el-tab-pane label="多元文化活動">
                        <el-upload
                                name="logos"
                                action="/upload"
                                list-type="picture-card"
                                :on-preview="handlePictureCardPreview"
                                :on-remove="handleRemove">
                            <i class="el-icon-plus"></i>
                        </el-upload></el-tab-pane>
                    <el-tab-pane label="原住民活動">
                        <el-upload
                                name="logos"
                                action="/upload"
                                list-type="picture-card"
                                :on-preview="handlePictureCardPreview"
                                :on-remove="handleRemove">
                            <i class="el-icon-plus"></i>
                        </el-upload></el-tab-pane>
                    <el-tab-pane label="其他活動">
                        <el-upload
                                name="logos"
                                action="/upload"
                                list-type="picture-card"
                                :on-preview="handlePictureCardPreview"
                                :on-remove="handleRemove">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <div id="footerBar">
            <div class="ftBt"><i class="icon-download3"></i>下載</div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      dialogImageUrl: 'rrrrrr',
      dialogVisible: false
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    openTabActives() {
      this.$confirm('此操作將永久刪除[嬰幼兒活動剪影] , 是否繼續?', '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '刪除成功!'
        });
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
      is_title: "活動剪影"
    })
  }
}
</script>

<style>
  .containerCenter{
    max-width: 280px;
    margin: 0 auto;
  }
  .addTabName {
    margin: 12px auto;
    position: relative;
    .el-input {
      height: 36px;
      width: auto;
      display: inline-block;
      margin-right: 114px;
    }
    .ftBt {
      i:before, i:after {
        vertical-align: middle;
        font-size: 24px;
        padding: 0;
      }
      i:before { }
      i:after { }
      position: absolute;
      right: 3px;
      width: 114px;
      background-color: rgb(30, 143, 139);
      border: 1px solid rgb(30, 143, 139);
      color: rgba(255, 255, 255, 0.69);
      height: 36px;
      line-height: 36px;
      margin: 0 0 0 -5px;
      padding: 0 8px;
      border-radius: 0 5px 5px 0;
      font-size: 15px;
      text-align: center;
      display: inline-block;
      cursor: pointer;
      transition: all 0.3s;
      &:hover {
        color: rgb(30, 143, 139);
        border: 1px solid rgba(30, 143, 139, 0.6);
        background-color: #FFF;
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
  @media (max-width: 400px){
    .pd20{
      padding: 20px 0;
    }
  }
  .el-dialog__wrapper {
      z-index: 3000 !important;
  }
</style>
