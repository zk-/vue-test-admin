<template>
  <div class="card">
    <p v-html="data.text"></p>
    <div class="imgs-container">
        <div v-if="toggle.flag" class="gallerys">
            <div class="img-item" v-for="(item, index) in data.pics" :key="index" @click="toggleImg(index)">
                <img :src="item.url" alt="">
            </div>
        </div>
        <div class="large-gallery" v-else @click="toggleImg">
            <img :src="toggle.url" alt="">
        </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  props:['data'],
  data:function() {
      return {
          toggle:{
              flag:true,
              url:''
          }
      }
  },
  methods:{
      toggleImg:function(index) {
          let vm = this;
          if (!isNaN(index)) {
              vm.toggle.flag = false;
              vm.toggle.url = vm.data.pics[index].large.url;
          } else {
              vm.toggle.flag = true;
          }
      }
  }
}
</script>
<style>
.card{
    background: white;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 0 10px 10px 10px;
    padding: 5px;
}
.imgs-container .gallerys{
    display: flex;
    justify-content: space-between;
    width: 260px;
    flex-wrap: wrap;
    height: 260px;
}
.imgs-container .gallerys .img-item{
    width: 80px;
    height: 80px;
    overflow: hidden;
}
.imgs-container .gallerys .img-item img{
    /* max-width: 80px; */
    max-height: 80px;
}
.imgs-container .large-gallery img{
    max-width: 100%;
}
</style>
