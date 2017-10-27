<template>
  <div>
    <div class="nuxtMainPanel">
      <div class="pd20">
        <vue-form :fields="fields" mode="edit" model="user" :api-url="apiUrl" ref="vueForm"></vue-form>
        <!--<button @click="lock_user(params.id)">啟用/停用</button>-->
        <!--<button @click="delete_user(params.id)">Delete</button>-->
      </div>
    </div>
    <div id="footerBar">
      <!--<div class="ftBt" onClick="javascript:history.back(-1);"><i class="icon-chevron-thin-left"></i>返回</div>-->
      <nuxt-link class="ftBt" to="/users/list"><i class="icon-chevron-thin-left"></i>返回</nuxt-link>
      <el-tooltip class="item" effect="dark" content="刪除該帳號" placement="top">
        <div @click="deleteAccount" class="ftBt"><i class="icon-cancel"></i>刪除</div>
      </el-tooltip>
      <label for="aSwitch">帳號使用</label>
      <el-switch id="aSwitch" v-model="accountSwitch" on-color="#7ed321" off-color="#ff4949" @change="lock_user(params.id)"></el-switch>
      <div class="ftBt" @click="reset_pwdResetToken(params.id)"><i class="icon-rotate_right"></i>更新驗證碼</div>
      <div class="ftBt" @click="saveData"><i class="icon-checkmark5"></i>儲存</div>
    </div>
  </div>
</template>

<script>
import VueForm from '../../../components/VueForm'
import axios from '~/plugins/axios'

// fields definition
var tableColumns = [
  {
    name: 'name',
    type: 'string',
    title: '姓名'
  },
  {
    name: 'email',
    type: 'string',
    title: '電子郵件'
  },
  {
    name: 'account',
    type: 'string',
    title: '帳號'
  },
  {
    name: 'phone',
    type: 'string',
    title: '電話'
  },
  {
    name: 'mobile',
    type: 'string',
    title: '行動'
  }
//  {
//    name: 'pwdResetToken',
//    type: 'string'
//  }
]

export default {
  created () {
    this.$store.dispatch('setIsTitle', {
      is_title: "帳號設定"
    })
  },
  name: 'users',
  components: {
    VueForm
  },
  asyncData ({ params, error }) {
    return {
      params: params,
      apiUrl: '/api/users/' + params.id
    }
  },
  data () {
    return {
      fields: tableColumns,
      accountSwitch: (this.$refs && this.$refs.vueForm) ? !this.$refs.vueForm.newObj.accountLocked : true
    }
  },
  methods: {
    delete_user (id) {
      axios.delete('/api/users/' + id).then((res) => {
        this.$router.replace('/users/list?' + Math.random())
      }).catch((e) => {
        console.log(e)
      })
    },
    lock_user (id) {
      axios.patch('/api/users/lock/' + id).then((res) => {
        // this.$router.replace('/users/list?' + Math.random())
      }).catch((e) => {
        console.log(e)
      })
    },
    guid () {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
    },
    reset_pwdResetToken(id) {
      axios.patch('/api/users/' + id, {_id: id, pwdResetToken: this.guid(), pwdResetTokenExpires: (new Date('9999')).toISOString()}).then((res) => {
        this.$router.replace('/users/edit/' + id + '?' + Math.random())
      }).catch((e) => {
        console.log(e)
      })
    },
    deleteAccount() {
      this.$confirm('此操作將永久刪除[ＸＸＸ]帳號 , 是否繼續?', '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$refs.vueForm.RemoveUser(this.params.id)
      }).then(() => {
        this.$message({
          type: 'success',
          message: '刪除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消刪除,該帳號尚在'
        });
      });
    },
    saveData() {
      this.$refs.vueForm.UpdateUser(this.params.id)
    }
  }
}
</script>
