<template>
<div class="viewBox">
    <slot></slot>
</div>
</template>

<script>
import { getSite } from 'yu-front';
export default {
    name:"viewBox",
    data(){
        return {
            active:false
        }
    },
    methods:{
        scroll(clientHeight,top,height){
            let scrollTop = Math.round(document.documentElement.scrollTop || document.body.scrollTop);
            if(scrollTop+clientHeight>=top && scrollTop<top+height){
                if(this.active) return;
                this.$emit('client-enter',scrollTop);
                this.active = true;
            }else if(scrollTop+clientHeight<top || scrollTop >= top+height){
                if(!this.active) return;
                this.$emit('client-leave',scrollTop);
                this.active = false;
            }
        }
    },
    mounted(){
        let { top,left } = getSite(this.$el);
        let height = this.$el.offsetHeight;
        let clientHeight = document.documentElement.clientHeight;
        this.scroll(clientHeight,top,height);
        window.addEventListener('scroll',e=>{
            this.scroll(clientHeight,top,height);
        });
    }
}
</script>

<style lang="less" scoped>

</style>