<template>
  <div class="home">
    <a-row class="home-a-row">
      <a-col :span="6">左侧栏</a-col>
      <a-col :span="12" class="no-scroll middle-content" :class="{load:loading}" @scroll="loadMore">
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
      page:1,
      isPullLoad:false,
    }
  },
  mounted:function() {
    this.loadData(1)
    this.page += 1;
  },
  methods:{
    loadMore:function(e) {
      let vm = this;
      if (!vm.isPullLoad && e.target.scrollHeight - (e.target.scrollTop + e.target.clientHeight) < 400) {
        vm.isPullLoad = true;
        vm.loadData(vm.page);
        vm.page += 1;
      }
    },
    loadData:function(page) {
      let vm = this;
      axios.get('/get/weibo',{params:{page:page}}).then((resp) =>{
        vm.cardData = vm.cardData.concat(resp.data);
      }).finally(() => {
        vm.loading = false;
        vm.isPullLoad = false;
        vm.$message.info('更新完成！',1);
      })
    }
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
