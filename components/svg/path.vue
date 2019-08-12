<template>
    <path class="path" :d="dVal" :fill="fill" :stroke="stroke" :stroke-width="strokeWidth" :style="{ strokeDasharray:`${length} ${length}`,strokeDashoffset: duration>0?length:0, animationDuration:duration+'s' }"></path>
</template>

<script>
import { getType } from 'yu-util';
    export default {
        name:"yuPath",
        data(){
            return {
                length:0
            }
        },
        props:{
            duration:{
                type:Number,
                default:2
            },
            strokeWidth:{
                type:String,
                default:'10'
            },
            fill:{
                type:String,
                default:'none'
            },
            stroke:{
                type:String,
                default:'#000'
            },
            d:{
                type:[ Array,String ],
                required: true
            }
        },
        computed:{
            dVal(){
                if(getType(this.d)==='Array'){
                    return this.d.join(' ');
                }else{
                    return this.d;
                }
            }
        },
        mounted(){
            let path = this.$el;
            this.length = path.getTotalLength();
            path.getBoundingClientRect();
        }
    }
</script>

<style lang="less" scoped>
@keyframes ani {
    form{
        stroke-dashoffset:100%;
    }
    to{
        stroke-dashoffset:0;
    }
}

.path{
    animation-name: ani;
    animation-timing-function:ease-in-out;
    animation-iteration-count: infinite;
    animation-direction: alternate;
}
</style>