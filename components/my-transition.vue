<template>
    <transition-group tag="div" id="myTransition" class="flex-row">
        <slot></slot>
    </transition-group>
</template>


<script>
    export default {
        name:"myTransition"
    }
</script>

<style lang="less" scoped>
    #myTransition{
        position:relative;
        width:20rem;   
    }

</style>