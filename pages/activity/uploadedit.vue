<template>
    <div>
        <div id="headerBar">
            <div class="stepguide">
                <el-steps :space="180" :active="1" finish-status="success">
                    <el-step title="步骤 1" description="請下載活動表件標準格式" icon="document"></el-step>
                    <el-step title="步骤 2" description="上傳已修改的檔案並預覽確認" icon="upload"></el-step>
                </el-steps>
                <div class="pd20">
                    <nuxt-link class="ftBt buttonL" to="/activity/file"><i class="icon-chevron-thin-left"></i> 上一步</nuxt-link>
                    <el-button type="primary" size="large" class="icon-file-excel-o"> 上傳活動表件</el-button>
                    <nuxt-link class="ftBt buttonR" to="/activity/download">下一步 <i class="icon-chevron-thin-right"></i></nuxt-link>
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
    data() {
      return {
        active: 0
      };
    },
    methods: {
      next() {
        if (this.active++ > 2) this.active = 0;
      }
    },
    created () {
      this.$store.dispatch('setIsTitle', {
        is_title: "活動表件"
      })
    }
  }
</script>
