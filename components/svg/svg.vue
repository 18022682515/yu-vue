<template>
<svg class="svg" :width="width" :height="height" xmlns="http://www.w3.org/2000/svg" version="1.1" :viewBox="viewBox">
   <slot></slot>
</svg>
</template>

<script>

export default {
    name:"yuSvg",
    props:{
        width:{
            type:String,
            default:'100'
        },
        height:{
            type:String,
            default:'100'
        },
        viewBox:{
            type:String,
            default:'0,0,1024,1024'
        }
    }
    
}
</script>

<style lang="less" scoped>

</style>