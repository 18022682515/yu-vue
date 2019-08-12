<template>
<div class="fold" @click="click">
    <h3>{{value}}</h3>

    <ul ref="content" class="content" @click.stop>
        <slot></slot>
    </ul>
</div>
</template>

<script>
import { animate } from 'yu-front'; 
export default {
    name:"fold",
    props:{
        value:{
            type:String,
            default:'一级菜单'
        },
        active:{
            type:Boolean,
            default:false
        }
    },
    data(){
        return {
            show:true,
            ul:null,
            height:0
        }
    },
    methods:{
        click(){
            if(this.active) return;
            this.show = !this.show;
        }
    },
    watch:{
        show(n,o){
            if(n){
                this.ul.style.display = 'block';
                animate(this.ul,[{ height:this.height },{ duration:200 }]);
            }else{
                animate(this.ul,[{ height:0 },{ duration:200 }]).then(()=>{
                    this.ul.style.display = 'none';
                });
            }
        }
    },
    mounted(){
        this.ul = this.$refs.content;
        this.height = this.ul.offsetHeight;
    }
}
</script>

<style lang="less" scoped>
.fold{
    overflow: hidden;
    margin:4px 2px;
    border-radius: 5px;
    box-shadow: 0 0  2px #000,1px 1px 2px #000;

    >h3{
        padding:5px 20px;
        background:rgb(28, 112, 155);
        color:#FFF;
    }
    >.content{
        overflow-y: hidden;
        >*{
            padding:5px 10px;
        }
        >*:hover{
            background: #abc;
        }
    }
}

</style>