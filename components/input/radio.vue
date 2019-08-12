<template>
<label class="radio">
    <input type="radio" :name="name" :value="value" :checked="checked===value?true:false" @change="change">
    <span></span>
    <slot></slot>
</label>
</template>

<script>
export default {
    name:"yuRadio",
    model:{
        prop:'checked',
        event:'abc'
    },
    props:{
        name:{
            type:String
        },
        value:{
            type:String
        },
        checked:{
            type:String
        }
    },
    methods:{
        change(e){
            this.$emit('abc',e.target.value);
        }
    }
}
</script>

<style lang="less" scoped>
.radio{
    display:inline-block;
    padding:5px 10px;
    span{
        display: inline-block;
        vertical-align: middle;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        border: 1px solid #abc;
        margin:0 5px;
    }
    input[type="radio"]:checked ~ span {
        background-color: rgb(111,22,33);
        background-clip: content-box;
        padding: 1px;
    }
    input{
        position:absolute;
        opacity: 0;
    }
}
</style>