<template>
<label class="checkbox">
    <input type="checkbox" :name="name" :value="value" :checked="checked.includes(value)?true:false" @change="change">
    <span></span>
    <slot></slot>
</label>
</template>

<script>
export default {
    name:"yuCheckbox",
    model:{
        prop:'checked',
        event:'abc'
    },
    props:{
        name:{
            type:String,
            default:''
        },
        value:{
            type:String
        },
        checked:{
            type:Array
        }
    },
    data(){
        return {
            check:this.checked
        }
    },
    methods:{
        change(e){
            let checked = e.target.checked;
            let value = e.target.value;
            if(checked){
                !this.check.includes(value) && this.check.push(value);
            }else{
                let i = this.check.indexOf(value);
                i!==-1 && this.check.splice(i,1);
            }
            
            this.$emit('abc',this.check);
        }
    }
}
</script>

<style lang="less" scoped>
.checkbox{
    display:inline-block;
    padding:5px 10px;

    span{
        display: inline-block;
        vertical-align: middle;
        width: 16px;
        height: 16px;
        border: 1px solid #abc;
        margin:0 5px;
    }
    input[type="checkbox"]:checked ~ span {
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