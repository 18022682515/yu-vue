<template>
    <div class="yu-img" @mouseenter="over" @mouseleave="out" :style="{ height }">
        <img :src="img" alt="" width="auto" height="100%">
        <transition :name="type">
            <div class="describe" v-show="show">
                <slot></slot>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name:"yuImg",
        props:{
            img:{
                type:String,
                default:''
            },
            height:{
                type:String,
                default:'300px'
            }
        },
        data(){
            return {
                show:false,
                type:"left"
            }
        },
        methods:{
            over(e){
                this.show = true;
                let ele = e.currentTarget;
                let width = ele.offsetWidth;
                let height = ele.offsetHeight;
                let x = e.offsetX;
                let y = e.offsetY;
                let top = y;
                let bottom = height-y;
                let left = x;
                let right = width-x;
                let min = Math.min(...[left,right]);
                if(min===left){
                    this.type = "left";
                // }else if(min===right){
                //     this.type = "right";
                }else{
                    // this.type = "bottom";
                    this.type = "right";
                }
            },
            out(e){
                this.show = false;
                let ele = e.currentTarget;
                let width = ele.offsetWidth;
                let height = ele.offsetHeight;
                let x = e.offsetX;
                let y = e.offsetY;
                let top = y;
                let bottom = height-y;
                let left = x;
                let right = width-x;
                let min = Math.min(...[left,right]);
                if(min===left){
                    this.type = "left";
                // }else if(min===right){
                //     this.type = "right";
                }else{
                    // this.type = "bottom";
                    this.type = "right";
                }
            }
        }
    }
</script>

<style lang="less" scoped>
.yu-img{
    position:relative;
    overflow: hidden;
    text-align: center;
    .describe{
        position:absolute;
        bottom:0;
        width:100%;
        background: rgba(0,0,0,.5);
        color:#FFF;
    }
    .left-enter,.left-leave-to{
        transform:translateX(-100%);
    }
    .right-enter,.right-leave-to{
        transform:translateX(100%);
    }
    .bottom-enter,.bottom-leave-to{
        transform:translateY(100%);
    }
    .left-enter-active,.left-leave-active,
    .right-enter-active,.right-leave-active,
    .bottom-enter-active,.bottom-leave-active{
        transition:all .2s linear;
    }
}
</style>