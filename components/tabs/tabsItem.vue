<template>
<li class="item">
    <p>{{value}}</p>
    <div ref="ul" class="content" v-show="active">
        <slot></slot>
    </div>  
</li>
</template>

<script>
export default {
    name:"tabsItem",
    data(){
        return {
            active:false
        }
    },
    props:{
        value:{
            type:String
        }
    }
}
</script>

<style lang="less" scoped>
.item{
    >p{
        text-align: center;
        padding:5px 0;
    }
    >.content{
        position:absolute;
        left:0;
        width:100%;
        border-top:1px solid #999;

        >*{
            padding:5px 10px;
            display:block;
        }
        >*:hover{
            background: #abc;
        }
    }
}

</style>