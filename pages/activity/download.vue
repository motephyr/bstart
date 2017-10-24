<template>
    <div>
        <div id="headerBar">
            <div class="stepguide">
                <el-steps :space="180" :active="2" finish-status="success">
                    <el-step title="步骤 1" description="請下載活動表件標準格式" icon="document"></el-step>
                    <el-step title="步骤 2" description="上傳已修改的檔案並預覽確認" icon="upload"></el-step>
                </el-steps>
                <div class="pd20">
                    <nuxt-link class="ftBt buttonL" to="/activity/uploadedit"><i class="icon-chevron-thin-left"></i> 上一步</nuxt-link>
                    <el-button type="primary" size="large" class="icon-file-excel-o"> 下載最新活動表件</el-button>
                </div>
            </div>
        </div>
        <div class="spMainPanel">
            dsf
        </div>
    </div>
</template>

<script>
export default {
  created () {
    this.$store.dispatch('setIsTitle', {
      is_title: "活動表件"
    })
  }
}
</script>
