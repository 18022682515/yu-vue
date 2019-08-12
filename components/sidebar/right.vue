<template>
<div 
    class="right" 
    @touchstart="start"
    @touchend="end"
    :style="{ width:width,transform:tranX,display:show ? 'block':'none' }"
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
            right:0,
            show:this.value
        }
    },
    watch:{
        value(nVal){
            if(nVal){
                this.show = true;
                Vue.nextTick(()=>{
                    animate(this.$el,[{ transform:{ translateX:0 } },{duration:300}]).then(()=>{
                        this.right = 0;
                    });
                });
                return;
            }
            animate(this.$el,[{ transform:{ translateX:'100%' } },{duration:300}]).then(()=>{
                this.right = '100%';
                this.show = false;
            })
        }
    },
    computed:{
        width(){
            if(getType(this.size)==='String' && this.size.includes('%')){
                return this.size;
            }else{
                return this.size+'px';
            }
        },
        tranX(){
            let type = getType(this.right);
            if( !(type==='String'||type==='Number') ) return `translateX(0)`;
            let right = type==='String' && type.includes('%') ? this.right : this.right+'px';
            return `translateX(${right})`;
        }
    },
    methods:{
        start(e){
            this.right = 0;
            let el = this.$el;
            let x = e.changedTouches[0].clientX;
            el.ontouchmove = (event)=>{
                let mx = event.changedTouches[0].clientX;
                this.right += mx-x;
                this.right = this.right<0 ? 0 : this.right;
                x = mx;
            }
        },
        end(e){
            let el = this.$el;
            el.ontouchmove = null;
            let width = el.offsetWidth;
            if(this.right>width/3){
                this.$emit('input',false);
            }else{
                this.show = true;
                Vue.nextTick(()=>{
                    animate(this.$el,[{ transform:{ translateX:0 } },{duration:300}]).then(()=>{
                        this.right = 0;
                    });
                });
            }
        }
    }
}
</script>

<style lang="less" scoped>
.right{
    position:fixed;
    right:0;
    width:100%;
    height:100%;
    background: #abc;
    z-index:9;
}
</style>