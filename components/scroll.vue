<template>
<div class="scroll" @scroll="scroll">
    <slot></slot>
</div>
</template>

<script>
export default {
    name:"yuScroll",
    methods:{
        scroll(e){
            this.$emit('scroll',e);
            let ele = e.currentTarget;
            let top = ele.scrollTop;
            setTimeout(()=>{
                if(top===ele.scrollTop) this.$emit('scroll-stop',top);
            },80);
        }
    }
}
</script>

<style lang="less" scoped>
.scroll{
    height:100%;
    overflow: scroll;
}
</style>