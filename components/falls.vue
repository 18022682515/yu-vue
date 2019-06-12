<template>
    <div class='falls'>
        <div 
            ref="box" 
            class="box" 
            :class="{one:i==0}"
            v-for="(img,i) in imgs" 
            :key="i"
            :style="{ width:width+'px',padding:padding+'px' }"
        >
            <img ref="img" :src="img" alt="" width="100%">
        </div>
    </div>
</template>

<script>
import Vue from 'vue';

    export default {
        name:'falls',
        props: {
            imgs: {
                type: Array,
                required: true,
            },
            padding:{
                type: Number,
                default:15
            }
        },
        name:"falls",
        data() {
            return {
                width:0,
                sum:0,
                len:0,
                divide:6,
            }
        },
        watch: {
            imgs(newVal, oldVal) {
                this.run();
            },
        },
        methods: {
            layout(elements) {
                elements.forEach((ele,i)=>{
                    if(i<this.divide){
                        ele.style.left = this.width*i+'px';
                        return;
                    }
                    ele.style.left = this.width*(i%this.divide)+'px';
                    let height = elements[i-this.divide].offsetHeight;
                    let top = elements[i-this.divide].offsetTop;
                    ele.style.top = height+top+'px';
                });
            },
            run(){
                Vue.nextTick(()=>{
                    let imgs = this.$refs.img;
                    imgs.forEach((img,index)=>{
                        img.onload = ()=>{
                            this.sum++;
                            if(this.sum==this.imgs.length) this.layout(this.$refs.box);
                            img.onload = null;
                        };
                    });
                }); 
            }
        },
        mounted () {
            this.width = this.$el.offsetWidth/this.divide;
            this.len = this.imgs.length;
            this.run();
        },
    }
</script>

<style scoped>
    .falls{
        position:relative;
    }
    .box{
        position:absolute;
        box-sizing: border-box;
        border:1px solid #000;
        
        background:#FFF;
    }
    .one{
        z-index:1;
    }
</style>