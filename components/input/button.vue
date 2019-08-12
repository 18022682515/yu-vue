<template>
<button class="button" @click="$emit('btn-click',$event)" :style="{ backgroundColor:background }" @mouseover="background='#FFF'" @mouseout="background=color">
    <slot></slot>
</button>
</template>

<script>
export default {
    name:"yuButton",
    props:{
        color:{
            type:String,
            default:'rgb(28, 112, 155)'  
            //28, 112, 155  蓝色
            //92, 138, 51  绿色
            //158, 31, 59  红色
        }
    },
    data(){
        return {
            background:this.color
        }
    }
}
</script>

<style lang="less" scoped>
.button{
    box-sizing: border-box;
    display:inline-block;
    transition:all .5s;
    padding:5px 10px;
    outline: none;
    border:none;
    color:#FFF;
    box-shadow: 1px 1px 2px #000,0 0 1px #000;
    border-radius: 5px;
    cursor: pointer;

    &:hover{
        color:#000;
        box-shadow:inset 0 0 2px rgb(2, 64, 158),1px 1px 2px #000,;
    }
    &:active{
       box-shadow:inset 0 0 2px rgb(2, 64, 158),inset 1px 1px 2px #000;
    }
}
</style>