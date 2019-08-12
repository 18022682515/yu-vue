<template>
<div class="select" @mouseenter="show=true" @mouseleave="show=false">
    <p>{{value}}<i></i></p>
    <transition>
        <ul v-show="show">
            <li v-for="item in options" @click="$emit('input',item)">{{item}}</li>
        </ul>
    </transition>
    
</div>
</template>

<script>
export default {
    name:'yuSelect',
    props:{
        value:{
            type:[ String,Number ],
            default:'请选择'
        },
        options:{
            type:Array,
            default:[],
        }
    },
    data(){
        return {
            show:false,
        }
    }
}
</script>

<style lang="less" scoped>
.select{
    position:relative;
    text-align: center;
    min-width:60px;
    box-shadow:1px 1px 2px #000, 0 0 2px #000;
    border-radius:5px;
    background: #FFF;

    &:hover{
        box-shadow:1px 1px 2px #000, 0 0 2px rgb(2, 64, 158);
    }
    &>p{ 
        padding:5px;
        display:inline-block; 
        vertical-align: middle;
        i{
            position:absolute;
            top:50%;
            transform:translateY(-50%);
            width:0;
            height:0;
            margin-left:5px;
            box-sizing: content-box;
            overflow: hidden;
            border-width:4px 4px 0;
            border-color:#000 transparent;
            border-style:solid dashed dashed;
        }
    } 
    &:after{ 
        content:'';
        height:100%; 
        display:inline-block; 
        vertical-align:middle; 
    }
        
    .v-enter,.v-leave-to{
        transform:scaleY(0);
    }
    .v-enter-active,.v-leave-active{
        transition:all .2s;
    }
    >ul{
        transform-origin:center top;
        transform:scaleY(1);
        position:absolute;
        left:0;
        width:100%;
        max-height:200px;
        overflow-y:scroll;
        border:1px solid #999;
        border-radius: 3px;
        background: #FFF;
        z-index:999;
        li{
            padding:5px 0;
            text-align: center;
        }
        li:hover{
            background: #abc;
        }
    }
}
</style>