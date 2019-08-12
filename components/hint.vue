<template>
    <transition :enter-class="type" :leave-to-class="type">
        <div class="child" v-show="show" :style="{ [cType]:'100%' }">
            {{text}}<slot></slot>
        </div>
    </transition>
</template>

<script>
export default {
    name:"hint",
    props:{
        text:{
            type:String,
            default:''
        },
        type:{
            type:String,
            default:'left'
        },
        show:{
            type:Boolean,
            default:false
        }
    },
    computed:{
        cType(){
            let val = this.type;
            if(val=='top'){
                return 'bottom';
            }else if(val=='bottom'){
                return 'top';
            }else if(val=='left'){
                return 'right';
            }else{
                return 'left';
            }
        }
    }
}
</script>

<style lang="less" scoped>

.child{
    box-sizing: border-box;
    position:absolute;
    padding:10px;
    background: #000;
    color:#FFF;
}
.top{
    transform:translateY(100%);
    opacity:0;
}
.bottom{
    transform:translateY(-100%);
    opacity:0;
}
.left{
    transform:translateX(100%);
    opacity:0;
}
.right{
    transform:translateX(-100%);
    opacity:0;
}
.v-enter-active,.v-leave-active{
    transition:all .2s;
}

</style>