<template>
<div 
    class="top" 
    @touchstart="start"
    @touchend="end"
    :style="{ height:height,transform:tranY,display:show ? 'block':'none' }"
>
    <slot></slot>
</div>

</template>

<script>
import Vue from 'vue';
import { getType } from 'yu-util';
import { animate } from 'yu-front';
export default {
    props:{
        size:{
            type:[String,Number],
            default:'100%'
        },
        value:{
            type:Boolean,
            default:false
        }
    },
    data(){
        return {
            top:0,
            show:this.value
        }
    },
    watch:{
        value(nVal){
            if(nVal){
                this.show = true;
                Vue.nextTick(()=>{
                    animate(this.$el,[{ transform:{ translateY:0 } },{duration:300}]).then(()=>{
                        this.top = 0;
                    });
                });
                return;
            }
            animate(this.$el,[{ transform:{ translateY:'-100%' } },{duration:300}]).then(()=>{
                this.top = '-100%';
                this.show = false;
            })
        }
    },
    computed:{
        height(){
            if(getType(this.size)==='String' && this.size.includes('%')){
                return this.size;
            }else{
                return this.size+'px';
            }
        },
        tranY(){
            let type = getType(this.top);
            if( !(type==='String'||type==='Number') ) return `translateY(0)`;
            let top = type==='String' && type.includes('%') ? this.top : this.top+'px';
            return `translateY(${top})`;
        }
    },
    methods:{
        start(e){
            this.top = 0;
            let el = this.$el;
            let y = e.changedTouches[0].clientY;
            el.ontouchmove = (event)=>{
                let my = event.changedTouches[0].clientY;
                this.top += my-y;
                this.top = this.top>0 ? 0 : this.top;
                y = my;
            }
        },
        end(e){
            let el = this.$el;
            el.ontouchmove = null;
            let height = el.offsetHeight;
            if(-this.top>height/3){
                this.$emit('input',false);
            }else{
                this.show = true;
                Vue.nextTick(()=>{
                    animate(this.$el,[{ transform:{ translateY:0 } },{duration:300}]).then(()=>{
                        this.top = 0;
                    });
                });
            }
        }
    }
}
</script>

<style lang="less" scoped>
.top{
    position:fixed;
    top:0;
    width:100%;
    background: #abc;
    z-index:9;
}
</style>