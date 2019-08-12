<template>
<div class="progress">
    <div class="back">
        <div class="bar" :style="{ width:width+'%',background:color }">
            <div v-color class="child"></div>
        </div>
    </div>
    <div class="count">{{width}}%</div>
</div>
</template>

<script>
import { animate } from 'yu-front';
export default {
    name:"yuProgress",
    props:{
        percent:{
            type:Number,
            default:50
        },
        color:{
            type:String,
            default:'rgb(24, 144, 255)'
        }
    },
    computed:{
        width(){
            return this.percent>100 ? 100: (this.percent<0 ? 0 : this.percent);
        }
    },
    directives:{
        color:{
            inserted(el){
                (function fn(){
                    animate(el,[{ width:'100%' },{duration:1000}]).then(res=>{
                        res[0][1].duration = 0;
                        animate(el,...res).then(()=>{
                            fn();
                        });
                    });
                })();
            }
        }
    }
}
</script>

<style lang="less" scoped>
.progress{
    margin:4px 2px;
    display:flex;
    align-items:center;

    .back{
        flex:9;
        height:10px;
        border-radius:10px;
        overflow: hidden;
        background: #EEE;
        box-shadow: 0 0 2px #000;

        .bar{
            height:100%;
            border-radius: 10px;
            .child{
                width:5px;
                height:100%;
                background: rgba(255,255,255,.2);
            }
        }
    }
    .count{
        flex:1;
        text-align: right;
    }
}

</style>