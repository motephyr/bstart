<template>
  <div>
    <div id="leftSide" v-bind:class="{ open: $store.state.isActive }">
      <div class="leftSideHead">
        <nuxt-link class="toindex" to="/" >閱讀推廣與館藏充實</nuxt-link>
        <div class="icon-cancel" @click="menuBtCancel"></div>
      </div>
      <div id="leftSideList">
        <left-side/>
      </div>
      <div class="leftSideBG" @click="menuBtCancel"></div>
    </div>
    <div id="rightSide">
      <div class="rightHead">
        <div id="menuBt" @click="menuBt"><i class="icon-list-menu"></i></div>
        <div class="pagetitle">{{ $store.state.isTitle }}</div>
        <a class="logoW" href="https://www.ntl.edu.tw/" target="_blank">
          <img class="logoW-A" src="/img/logo-w.svg" alt="">
          <img class="logoW-B" src="/img/logo-img.svg" alt="">
        </a>
      </div>
      <div id="Nuxt">
        <div class="containerNuxt">
          <nuxt/>
        </div>
      </div>
    </div>
    <!--<div id="myFooter">-->
      <!--<my-footer/>-->
    <!--</div>-->
  </div>
</template>

<script>
import HeaderA from '~/components/header.vue'
import LeftSide from '~/components/LeftSide.vue'
import MyFooter from '~/components/Footer.vue'
export default {
  components: {
    HeaderA,LeftSide,MyFooter
  },
  middleware: 'auth',
  methods: {
    menuBt(){
      this.$store.dispatch('setIsActive', {
        is_active: true
      })
    },
    menuBtCancel(){
      this.$store.dispatch('setIsActive', {
        is_active: false
      })
    }
  },
  watch: {
    '$route': function () {
      this.$store.dispatch('setIsActive', false)
    }
  }
}
</script>

<style>
  #leftSide{
    width: 256px;
    position: fixed;
    top:0;
    left: 0;
    bottom: 0;
    background-color: #FFF;
    transition: all 0.5s;
    z-index: 10;
    .leftSideHead{
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      background-color: #00908C;
      height: 58px;
      font-weight: 300;
      z-index: 9;
      .toindex{
        line-height: 58px;
        padding: 0 12px;
        font-size: 1.2em;
        color: #FFF;
        &:hover{
          color: #5FE4C3;
        }
      }
      .icon-cancel{
        position: absolute;
        top: 20px;
        right: 12px;
        width: 24px;
        height: 24px;
        font-size: 24px;
        color: #fff;
        display: none;
        cursor: pointer;
        &:hover{
          color: #5FE4C3;
        }
      }
    }
    #leftSideList{
      position: absolute;
      top: 58px;
      left: 0;
      bottom: 0;
      width: 256px;
      overflow-x: hidden;
      overflow-y: auto;
      background: #FFF url("/img/leftSideList-bgimg.svg") bottom center no-repeat;
      background-size: contain;
      z-index:10;
      /*border-right: 1px solid #D9E3E5;*/
      -webkit-overflow-scrolling: touch;
      .nav-list{
        margin-bottom: 58px;
      }
    }
    .leftSideBG{
      display: none;
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.7);
      z-index: 8;
    }
    &.open{
      left: 0;
      .leftSideBG{
        display: block;
      }
    }
  }
  #rightSide{
    position: fixed;
    top:0;
    left: 256px;
    right: 0;
    bottom: 0;
    transition: all 0.5s;
    z-index: 9;
    .rightHead{
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 58px;
      background-color: #2E6CAD;
      #menuBt{
        position: absolute;
        left: 18px;
        top: 18px;
        cursor: pointer;
        .icon-list-menu{
          font-size: 20px;
        }
        &:hover{
          .icon-list-menu:before{
            color: #85D4FF;
          }
        }
      }
      .pagetitle{
        position: absolute;
        left: 58px;
        right: 200px;
        top: 0;
        bottom: 0;
        line-height: 58px;
        text-align: center;
        color: #fff;
        font-size: 1.2em;
        font-weight: 300;
        transition: all 0.5s;
        cursor: default;
        overflow: hidden;
      }
      .logoW{
        position: absolute;
        right: 12px;
        top: 12px;
        img{
          height: 32px;
        }
      }
    }
    #Nuxt{
      position: absolute;
      top: 58px;
      left: 0;
      right: 0;
      bottom: 0;
      /*border-left: 2px solid #F4F6FD;*/
      overflow-x: auto;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      .containerNuxt{
        /*padding: 20px;*/
      }
    }
  }
  #myFooter{

  }
  .title{
    color: #FF2A7D;
    font-weight: 300;
    font-size: 2.5em;
    margin: 0;
  }
  @media (max-width: 800px) {
    #leftSide{
      left: -256px;
    }
    #rightSide{
      left: 0;
    }
    .logoW-A{
      display: none;
    }
    .logoW-B{
      display: block;
    }
    #rightSide .rightHead .pagetitle{
      right: 58px;
    }
    #leftSide.open .leftSideBG {
      content: "";
      position: fixed;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,.7);
      z-index: 8;
    }
    #leftSide.open .leftSideHead .icon-cancel{
      display: block;
    }
  }
  @media (min-width: 800px) {
    #leftSide{
      left: 0;
    }
    #rightSide{
      left: 256px;
    }
    .logoW-A{
      display: block;
    }
    .logoW-B{
      display: none;
    }
    #rightSide .rightHead .pagetitle{
      right: 200px;
    }
    #leftSide.open .leftSideBG {
      content: "";
      position: fixed;
      width: 0;
      height: 0;
      background-color: rgba(0,0,0,.0);
      z-index: 8;
    }
    #leftSide.open .leftSideHead .icon-cancel{
      display: none;
    }
  }
</style>
