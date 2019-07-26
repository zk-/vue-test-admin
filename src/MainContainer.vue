<template>
  <a-layout id="main-container">
    <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
      <div class="logo">不知道干啥用的内部系统</div>
      <div class="logout" @click="logout">注销</div>
      <a-menu
        theme="dark"
        mode="horizontal"
        :defaultSelectedKeys="['/']"
        :selectedKeys="[$route.path]"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="/"><router-link to="/">nav 1</router-link></a-menu-item>
        <a-menu-item key="/test"><router-link to="/test">nav 2</router-link></a-menu-item>
        <a-menu-item key="/ex"><router-link to="/ex">ex</router-link></a-menu-item>
        <!-- <a-menu-item key="3"><router-link to="">nav 3</router-link></a-menu-item> -->
      </a-menu>
    </a-layout-header>
    <a-layout-content class="content-container">
        <transition :name="page" mode="out-in">
            <router-view></router-view>
        </transition>
    </a-layout-content>
    <a-layout-footer :style="{ textAlign: 'center' }">
      Ant Design ©2018 Created by Ant UED
    </a-layout-footer>
  </a-layout>
</template>
<script>
export default {
    data:function() {
        return {
            page:''
        }
    },
    watch: {
        '$route' (to, from) {
            const toDepth = to.path.split('/').length
            const fromDepth = from.path.split('/').length
            this.page = toDepth < fromDepth ? 'fade-in' : 'fade-out'
        }
    },
    methods:{
        logout:function() {
            console.log('logout....')
            localStorage.removeItem('name');
            localStorage.removeItem('psw');
            this.$router.replace({path:'/login'});
        }
    }
}
</script>

<style>
.content-container{
  padding: 24px 24px;
  overflow: hidden;
  background: #fff;
  margin: 100px 24px 0 24px;
  min-height: 380px !important;
}
#main-container .logo {
    height: 31px;
    background: rgba(255,255,255,.2);
    margin: 16px 24px 16px 0;
    float: left;
    color: white;
    line-height: 31px;
    font-size: 30px;
}
#main-container {
    height: 100%;
}
.logout{
    float: right;
    color: white;
    cursor: pointer;
    padding: 0 20px;
}
.fade-in-enter-active, .fade-out-leave-active {
  transition: opacity .2s;
}
.fade-in-enter, .fade-out-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
