<template>
  <div>
    <div class="nuxtMainPanel">
      <!--<h1>reading_activities</h1>-->
      <!--<p>If you try to access this URL not connected, you will be redirected to the home page (server-side or client-side)</p>-->
      <!--<div id="headerBar">-->
      <!--<div id="newUser" @click="new_user">+</div>-->
      <!--</div>-->
      <table class="usersTb">
        <thead>
        <tr>
          <!--<th v-for="(value, key) in users[0]">{{(key != 'created_at' && key != 'updated_at') ? key : ''}}</th>-->
          <th width="36"></th>
          <th>地方</th>
          <th>帳號</th>
          <th>姓名</th>
          <th>EMAIL</th>
          <th>電話</th>
          <th>行動</th>
        </tr>
        </thead>
        <tbody>
        <tr class="" v-for="user in users" @click="edit_user(user._id)" title="編輯帳號" :class="{ off: user.accountLocked }">
          <td class="icon-checkmark3" :title="user._id"></td>
          <td>{{user.area}}</td>
          <td>{{user.account}}</td>
          <td>{{user.name}}</td>
          <td>{{user.email}}</td>
          <td>{{user.phone}}</td>
          <td>{{user.mobile}}</td>
          <!--<td>{{user.accountLocked}}</td>-->
        </tr>
        </tbody>
      </table>
      <!--<button @click="new_user">New User</button>-->
      <!--<nuxt-link to="/">Back to the home page</nuxt-link>-->
    </div>
    <div id="footerBar">
      <!--<nuxt-link class="ftBt" to="/">取消</nuxt-link>-->
      <div class="ftBt" @click="new_user"><i class="icon-user-plus"></i> 新曾帳號</div>
    </div>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
export default {
  created () {
    this.$store.dispatch('setIsTitle', {
      is_title: "各縣市使用者帳號管理"
    })
  },
  async asyncData ({ params, error }) {
    try {
      let users = await axios.get('/api/users')
      return {users: users.data}
    } catch (e) {
      error({ statusCode: 404, message: 'User not found' })
    }
  },
  data () {
    return {
      reading_activities_1: {
        xaxio: [],
        yaxio: [],
        value: []
      }
    }
  },
  methods: {
    new_user () {
      this.$router.replace('/users/new?' + Math.random())
    },
    edit_user (id) {
      this.$router.replace('/users/edit/'+ id +'?' + Math.random())
    }
  },
  mounted () {
    //var dfsf;
    //function dfg(c) {
    //  alert(c)
    //}
    //dfg("dfdsfdsf");
  }
}
</script>

<style>
  .usersTb{
    border-collapse: collapse;
    width: 100%;
    box-shadow: 0 0 2px rgba(79, 97, 102, 0.6);
    border-radius: 3px;
    overflow: hidden;
    tr{
      th,td{
        padding: 3px 6px;
        height: 33px;
        vertical-align:middle;
        color: #A1A1A1;
        border-right: 1px solid rgba(219, 223, 228, 0.3);
      }
      border-bottom: 1px solid #DBDFE4;
    }
    thead{
      /*position: fixed;*/
      background-color: #F4F6FD;
      z-index: 2;
    }
    tbody{
      /*position: absolute;*/
      margin-top: 40px;
      z-index: 1;
      tr{
        background-color: #FFF;
        cursor: pointer;
        /*&:nth-child(odd){*/
          /*background-color: #FFF;*/
        /*}*/
        /*&:nth-child(even){*/
          /*background-color: #F9F9F9;*/
        /*}*/
        &:hover{
          background-color: #E2F2F9;
        }
        th,td{
          padding: 6px 6px;
          height: 33px;
          vertical-align:middle;
          color: #3E99D2;
        }
        th{}
        td{
          &.icon-checkmark3:before{
            font-size: 26px;
            color: #7ED321;
          }
          &:nth-child(1n+6){
            color: #B3BBC4;
          }
        }
        &.off{
          background-color: #E6E6E6;
          .icon-checkmark3:before{
            color: #BFCDE4;
          }
          th,td{
            color: #B3BBC4;
          }
        }
      }
    }
  }
  @media (max-width: 800px) {
    .usersTb{
      thead{
        th{
          display: table-cell;
        }
        th:nth-child(1n+6){
          display: none;
        }
      }
      tbody{
        td{
          display: table-cell;
        }
        td:nth-child(1n+6){
          display: none;
        }
      }
    }
  }
  @media (max-width: 600px) {
    .usersTb{
      thead{
        th{
          display: table-cell;
        }
        th:nth-child(1n+4){
          display: none;
        }
      }
      tbody{
        td{
          display: table-cell;
        }
        td:nth-child(1n+4){
          display: none;
        }
      }
    }
  }
  /*@media (min-width: 800px) {*/
    /*#footerBar{*/
      /*left: 256px;*/
    /*}*/
  /*}*/
</style>
