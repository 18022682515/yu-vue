<template>
    <transition-group tag="div" class="myTransition flex-row">
        <slot></slot>
    </transition-group>
</template>


<script>
    export default {
        name:"myTransition"
    }
</script>

<style lang="less" scoped>
    .myTransition{
        position:relative;
    }

</style>