<template>
<div class="circle">
    <svg xmlns="http://www.w3.org/200/svg" height="120" width="120">

        <circle cx="60" cy="60" r="50" fill="none" stroke="#EEE" stroke-width="10" stroke-linecap="round"/>

        <circle ref="circle" cx="60" cy="60" r="50" fill="none" :stroke="color" stroke-width="10" stroke-linecap="round" :style="{ strokeDashoffset:offset,strokeDasharray:`${length} ${length}` }"/>

        <circle class="white" cx="60" cy="60" r="50" fill="none" stroke="rgb(255,255,255,.5)" stroke-width="2" stroke-linecap="round" :style="{ strokeDashoffset:ani,strokeDasharray:`${length/4} ${length/8}` }"/>

        <text x="60" y="60" style="text-anchor:middle; dominant-baseline: middle;">{{percent>100 ? 100 : (percent<0 ? 0 : percent)}}%</text>
    </svg>
</div>
</template>

<script>
import { animate } from 'yu-front';
export default {
    name:"yuCircle",
    props:{
        color:{
            type:String,
            default:'rgb(105, 158, 104)'
        },
        percent:{
            type:Number,
            default:50
        }
    },
    data(){
        return {
            ele:null,
            length:0,
            max:0,
            ani:0
        }
    },
    computed: {
        offset(){
            let n = this.percent;
            n = n>100 ? 100 : (n<0 ? 0 : n);
            let val =  Math.floor(this.length/100*(100-n));
            this.max = this.length/100*n;
            return val;
        }
    },
    mounted(){
        this.ele = this.$refs.circle;
        this.length = this.ele.getTotalLength();
        let count = 0;
        setInterval(()=>{
            count -= 1;
            if(count>this.max){
                count = 0;
            }
            this.ani = count;
        },20);
    }
}
</script>

<style lang="less" scoped>
.circle{
    margin:4px 2px;
}
</style>