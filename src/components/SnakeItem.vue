<template>
    <div class="snake-item" :style="bak"></div>
</template>

<script>
export default {
    name:'snake-item',
    props:['flag'],
    data:function() {
        return {
            bak:{
                background:'transparent'
            }
        }
    },
    watch:{
        'flag':function(newVal, oldVal) {
            if (newVal) {
                let rgbaArr = this.getColor();
                this.bak = {
                    background:'rgba(' + rgbaArr.join(',') + ')',
                }
            } else {
                this.bak = {
                    background:'transparent'
                }
            }
        }
    },
    methods:{
        getColor:function() {
            let r = Math.floor(Math.random()*255);
            let g = Math.floor(Math.random()*255);
            let b = Math.floor(Math.random()*255);
            let a = Math.random().toFixed(1);
            return [r,g,b,a];
        }
    }
}
</script>
