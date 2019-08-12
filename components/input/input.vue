<template>
<input class="input" :type="type" :name="name" :value="value" @input="input" :placeholder="`请输入${name}`" :style="{ width:width }" @blur="$emit('input-blur',$event.currentTarget.value)">
</template>

<script>
export default {
    name:"yuInput",
    props:{
        value:{},
        type:{
            type:String,
            default:'text'
        },
        name:{
            type:String,
            default:''
        },
        width:{
            type:String,
            default:'auto'
        }
    },
    methods:{
        input(e){
            let value = e.currentTarget.value;
            this.$emit('input',value);
        }
    }
}
</script>

<style lang="less" scoped>
input:-webkit-autofill {
    transition:background-color 5000s ease-in-out 0s;
}
.input{
    box-sizing: border-box;
    display:inline-block;
    margin:4px 2px;
    padding:5px 10px;
    outline: none;
    border:none;
    border-radius: 5px;
    box-shadow: inset 0 0 2px #000;
    

    &:focus{
        box-shadow: inset 1px 1px 3px  rgb(12, 3, 90),inset 0 0 2px #000;
    }
}
</style>