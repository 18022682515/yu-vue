<template>
<li class="li" :class="{active}" @mouseenter="enter" @mouseleave="leave">
    <router-link :to="href">{{text}}</router-link>
    <div ref="list" class="list">
        <slot></slot>
    </div>
</li>
</template>

<script>
export default {
    name:"yuNavItem",
    props:{
        href:{
            type:String,
            default:'/'
        },
        text:{
            type:String,
            default:''
        }
    },
    data(){
        return {
            active:false,
            height:0
        }
    },
    methods:{
        enter(){
            this.$refs.list.style.height = this.height+'px';
        },
        leave(){
            this.$refs.list.style.height = 0;
        }
    },
    mounted(){
        let list = this.$refs.list;
        this.height = list.offsetHeight;
        list.style.height = 0;
    }
}
</script>

<style lang="less" scoped>
.active{
    background:rgba(0,0,0,.5);
}
.li{
    position:relative;
    cursor: pointer;
    >a{
        display:block;
        color:#FFF;
        padding:6px 50px;
    }
    &:hover>a{
        color:rgb(245, 247, 129);
    }
}
.list{
    transition:height .2s;
    position:absolute;
    background: #FFF;
    color:#000;
    box-shadow: 0 0 2px #000;
    border-radius: 5px;
    width:100%;
    overflow: hidden;
    z-index:1;

    >*{
        display:block;
        padding:5px 10px;
        &:hover{
            background: #abc;
        }
    }
}
</style>