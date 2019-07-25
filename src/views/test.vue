<template>
  <div class="test">
    <template v-for="(row, rowI) in snake">
      <template v-for="(col, colI) in row">
        <snake-item :key="rowI + '-' + colI" :flag="col.flag"></snake-item>
      </template>
    </template>
  </div>
</template>

<script>
// @ is an alias to /src
import snakeItem from '../components/SnakeItem';
export default {
  name: 'test',
  components: {
    snakeItem
  },
  mounted:function() {
    let vm = this;
    vm.show()
    setInterval(() => {
      vm.move()
    }, 100);
  },
  methods:{
    show:function() {
      let arr = this.now;
      for (let index = 0; index < arr.length; index++) {
        let a = arr[index][0];
        let b = arr[index][1];
        this.snake[a][b].flag = true;
      }
    },
    move:function() {
      let head = this.now[3];
      let x = parseInt(head[0]), y = parseInt(head[1]);
      let top = (x) + '' + (y - 1);
      let right = (x + 1) + '' + (y);
      let bottom = (x) + '' + (y + 1);
      let left = (x - 1) + '' + (y);
      let arrowArr = [top,left,bottom,right];
      arrowArr = arrowArr.filter((item, index) => {
        return item.length <= 2 && item != this.now[2]
      })
      let i = Math.floor(Math.random() * arrowArr.length);
      let nextTo = arrowArr[i];
      let end = this.now[0];
      this.now.push(nextTo);
      this.now.shift();
      this.show();
      this.snake[end[0]][end[1]].flag = false;
    }
  },
  data:function() {
    return {
      now:['00','01','02','03'],
      snake:[
        [{flag:false},{flag:false},{flag:false},{flag:false},{flag:false},{flag:false},{flag:false},{flag:false},{flag:false},{flag:false}],
        [{flag:false},{flag:false},{flag:false},{flag:false},{flag:false},{flag:false},{flag:false},{flag:false},{flag:false},{flag:false}],
        [{flag:false},{flag:false},{flag:false},{flag:false},{flag:false},{flag:false},{flag:false},{flag:false},{flag:false},{flag:false}],
        [{flag:false},{flag:false},{flag:false},{flag:false},{flag:false},{flag:false},{flag:false},{flag:false},{flag:false},{flag:false}],
        [{flag:false},{flag:false},{flag:false},{flag:false},{flag:false},{flag:false},{flag:false},{flag:false},{flag:false},{flag:false}],
        [{flag:false},{flag:false},{flag:false},{flag:false},{flag:false},{flag:false},{flag:false},{flag:false},{flag:false},{flag:false}],
        [{flag:false},{flag:false},{flag:false},{flag:false},{flag:false},{flag:false},{flag:false},{flag:false},{flag:false},{flag:false}],
        [{flag:false},{flag:false},{flag:false},{flag:false},{flag:false},{flag:false},{flag:false},{flag:false},{flag:false},{flag:false}],
        [{flag:false},{flag:false},{flag:false},{flag:false},{flag:false},{flag:false},{flag:false},{flag:false},{flag:false},{flag:false}],
        [{flag:false},{flag:false},{flag:false},{flag:false},{flag:false},{flag:false},{flag:false},{flag:false},{flag:false},{flag:false}]
      ]
    }
  }
}
</script>
<style>
.test{
  width: 500px;
  height: 500px;
  display: flex;
  flex-wrap: wrap;
}
.test *{
  transition: all 0.5s;
}
.test .snake-item{
  width: 50px;
  height: 50px;
  /* border: 1px solid #ccc; */
  box-sizing: border-box;
  background: transparent;
}
.test .snake-item.flag{
  /* background: red;
  border-color: red; */
}
</style>
