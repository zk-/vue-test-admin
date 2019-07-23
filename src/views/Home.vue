<template>
  <div class="home">
    <a-row class="home-a-row">
      <a-col :span="6">左侧栏</a-col>
      <a-col :span="12" class="no-scroll middle-content" :class="{load:loading}">
        <a-skeleton active :loading="loading">
          <div>
            <template v-for="card in cardData">
              <Card :data="card" :key="card.id" />
            </template>
          </div>
        </a-skeleton>
      </a-col>
      <a-col :span="6">右侧栏</a-col>
    </a-row>
  </div>
</template>

<script>
// @ is an alias to /src 230, 236, 240
import Card from '../components/Card';
import axios from 'axios';
export default {
  name: 'home',
  components: {
    Card
  },
  data:function() {
    return {
      cardData:[],
      loading:true,
    }
  },
  mounted:function() {
    let vm = this;
    axios.get('/get/weibo').then((resp) =>{
      vm.cardData = resp.data;
    }).finally(() => {
      vm.loading = false;
      vm.$message.info('更新完成！',1);
    })
  }
}
</script>
<style>
.no-scroll::-webkit-scrollbar { width: 0 !important }
.no-scroll { 
  overflow: -moz-scrollbars-none;
  -ms-overflow-style: none;
  overflow-x: hidden;
  overflow-y: scroll;
}
.middle-content{
  max-height: 100%;
  background: rgb(230, 236, 240)
}
.middle-content.load{
  background: white;
}
.home,.home-a-row{
  height: 100% !important;
}
</style>
