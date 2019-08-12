<template>
    <ul class="nav">
        <slot></slot>
    </ul>
</template>

<script>
export default {
    name:'yuNav',
    props:{
        value:{
            type:Number,
            default:0
        }
    },
    watch:{
        value(n,o){
            let childs = this.$children;
            childs[o].active = false;
            childs[n].active = true;
        }
    },
    mounted(){
        this.$children[this.value].active = true;
        let childs = this.$children;
        childs.forEach((child,i)=>{
            child.$el.addEventListener('click',(e)=>{
                this.$emit('input',i);
            });
        });
    }
}
</script>

<style lang="less" scoped>
.nav{
    background:rgb(166, 27, 47);
    color:#FFF;
    border:1px solid #999;
    border-radius: 5px;
    padding:0 15px;
    display:flex;
}
</style>