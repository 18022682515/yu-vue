<template>
<div class="scrollBox">
    <slot></slot>
</div>
</template>

<script>
import { getSite } from 'yu-front';
export default {
    name:"scrollBox",
    data(){
        return {
            active:false
        }
    },
    mounted(){
        let { top,left } = getSite(this.$el);
        window.addEventListener('scroll',e=>{
            let clientHeight = document.documentElement.clientHeight;
            let scrollTop = Math.round(document.documentElement.scrollTop || document.body.scrollTop);
            if(scrollTop+clientHeight>=top){
                !this.active && this.$emit('scroll',e);
                this.active = true;
            }else{
                this.active && this.$emit('scroll-no',e);
                this.active = false;
            }
        });
    }
}
</script>

<style lang="less" scoped>

</style>