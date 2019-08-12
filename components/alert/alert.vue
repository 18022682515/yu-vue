<template>
<div class="alert" v-show="value">
    <h3>提示</h3>
    <p class="text">{{text}}</p>
    <p class="btn-group"><yu-button @btn-click="$emit('input',false)">ok</yu-button></p>
</div>
</template>

<script>
export default {
    name:"alert",
    props:{
        value:{
            type:Boolean,
            default:false
        },
        text:{
            type:String,
            default:''
        }
    },
    mounted(){
        document.body.addEventListener('keydown',e=>{
            if(e.code==='Enter'){
                this.$emit('input',false);
            }
        });
    }
}
</script>

<style lang="less" scoped>
.alert{
    position:fixed;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    width:250px;
    height:150px;
    z-index:9;
    background: #FFF;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0 0 2px #000,1px 1px 2px #000;
    display:flex;
    flex-direction: column;
    text-align: center;
    >*{
        &:after{
            content:"";
            display:inline-block;
            vertical-align: middle;
            height:100%;
        }
    }
    h3{
        flex:2;
        height:0;
        background: rgb(28, 112, 155);
        color:#FFF;
    }
    .text{
        flex:5;
        height:0;
        font-size: 25px;
        color:rgba(0,0,0,.5);
    }
    .btn-group{
        flex:3;
        height:0;
        box-shadow: 0 0 2px #000;
        >*{
            padding:5px 30px;
        }
    }
}
</style>