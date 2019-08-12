<template>
<div class="slideOpacity" @mouseenter="close" @mouseleave="run">
    <slot></slot>
    <div class="point">
        <span v-for="ele,i in eles" @mouseenter="index=i" :class="{ active:index===i }"></span>
    </div>
</div>
</template>

<script>
import front from 'yu-front';
export default {
    name:"slideOpacity",
    props:{
        ms:{
            type:Number,
            default:3000
        }
    },
    data(){
        return {
            timer:null,
            index:0,
            eles:[]
        }
    },
    watch:{
        index(n,o){
            let eles = this.eles;
            eles[o] && eles[o].removeClassName('active');
            eles[n].addClassName('active');
        }
    },
    methods:{
        run(){
            this.timer = setInterval(()=>{
                let index = this.index+1;
                this.index = index>this.eles.length-1 ? 0 : index;
            },this.ms);
        },
        close(){
            clearInterval(this.timer);
        }
    },
    mounted(){
        this.$slots.default.forEach(vNode=>{
            vNode.tag && this.eles.push(vNode.elm);
        });
        this.eles[this.index].addClassName('active');
        this.run();
    }
}
</script>

<style lang="less" scoped>
.slideOpacity{
    position:relative;
    box-shadow: 0 0 1px #000;

    >*:not(.point){
        position:absolute;
        width:100%;
        opacity: 0;
        transition:all 1s;
    }
    >.active{
        position:static;
        opacity: 1;
    }
    .point{
        position:absolute;
        bottom:10%;
        width:100%;
        text-align: center;
        >span{
            display:inline-block;
            width:10px;
            height:10px;
            box-shadow: 1px 1px 1px #000;
            padding:1px;
            background-color: rgba(164, 164, 247, 0.575);
            background-clip: content-box;
            border-radius: 50%;
        }
        >span:not(:first-child){
            margin-left:25px;
        }
        >.active{
            background-color: rgb(168, 54, 50);
        }
    }
    
}
</style>