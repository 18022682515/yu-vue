<template>
<table class="table" :border="border" :style="{ border:`${border}px solid #CCC` }">
    <slot></slot>
</table>
</template>

<script>
export default {
    name:"yuTable",
    props:{
        border:{
            type:Number,
            default:1
        }
    }
}
</script>

<style lang="less" scoped>
.table{
    border-collapse:collapse;
    text-align: center;
    th{
        font-size:1.1em;
    }
    th,td{
        padding:8px 0;
    }
    tr:first-child{
        border-bottom:2px solid #CCC;
    }
    tr:nth-of-type(2n){
        background: rgba(217, 226, 235, 0.473);
    }
    tr:hover:not(:first-child){
        background: #abc!important;
    }
}
</style>    