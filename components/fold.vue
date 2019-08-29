<template>
<div class="fold" @click="click">
    <h3>{{title}}</h3>
    <div ref="content" class="content" @click.stop>
        <slot></slot>
    </div>
</div>
</template>

<script>
import { animate } from 'yu-front'; 
export default {
    name:"fold",
    props:{
        title:{
            type:String,
            default:'一级菜单'
        },
        open:{
            type:Boolean,
            default:true
        }
    },
    data(){
        return {
            show:true,
            ele:null,
            height:0,
        }
    },
    watch:{
        show(n,o){
            if(n){
                animate(this.ele,[{ height:this.height },{duration:300}]);
            }else{
                animate(this.ele,[{ height:0 },{duration:300}]);
            }
        }
    },
    methods:{
        click(){
            if(!this.open) return;
            this.show = !this.show;
        }
    },
    mounted(){
        this.ele = this.$refs.content;
        this.height = this.ele.offsetHeight;
    }
}
</script>

<style lang="less" scoped>
.fold{
    border:1px solid #EEE;
    h3{
        padding:8px 20px;
        background: rgb(28, 112, 155);
        color:#FFF;
    }
    .content{
        padding:0 20px;
        transform-origin: center top;
        overflow: hidden;
        >*{
            padding:8px 0;
        }
    }
}

</style>