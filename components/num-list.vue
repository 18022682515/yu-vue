<template>
    <div id="num-list">
        <my-transition>
            <div v-for="(val,i) in arr" :key="val" class="list border table" @mouseover="remove(i)">
                <span class="table-cell text-center">{{val|newVal}}</span>
            </div>
        </my-transition>
        <button class="btn" @click="add">添加</button>
        <button class="btn" @click="sort">打乱顺序</button>
        <button class="btn" @click="empty">清空</button>
    </div>
</template>

<script>
function fn(){
    let arr = [];
    for(let i=1; i<=100; i++){
        arr.push(i);
    }
    return arr;
}

    export default {
        name:'num-list',
        data(){
            return {
                arr:fn(),
                onOff:true,
                max:0
            }
        },
        watch:{
            arr(newVal){
                if(newVal.length>0) this.max = Math.max.apply(null,this.arr);
            }
        },
        filters:{
            newVal(v){
                let n = v%9;
                return n==0? 9: n;
            }
        },
        methods:{
            empty(){
                let timer = setInterval(()=>{
                    this.arr.pop();
                    if(this.arr.length==0) clearInterval(timer);
                },50)
            },
            add(){
                if(!this.onOff) return;
                this.onOff = false;
                let max = this.max;
                let last = this.arr[this.arr.length-1]|0
                for(let i=1; i<10; i++){
                    let l = last%9;
                    l = l==0? 9: l;
                    let m = (max+i)%9;
                    m = m==0? 9: m;
                    if(m==l){
                        let j = 1;
                        let timer = setInterval(()=>{
                            this.arr.push(max+i+j);
                            j++;
                            if(j>100){
                                clearInterval(timer);
                                this.onOff = true;
                            }
                        },50)
                    }
                }
            },
            remove(i){
                this.arr.splice(i,1);
            },
            sort(){
                this.arr.sort((a,b)=>{
                    let random = Math.floor(Math.random()*100);
                    return random>50? 1: -1;
                })
            }
        },
        mounted(){
            this.max = Math.max.apply(null,this.arr);
        }
    }
</script>

<style lang="less" scoped>
    
    .list{
        transition:all .4s;
        width:1rem;
        height:1rem;
        background:#fff;
    }
    .v-enter{
        transform:translateY(2rem);
    }
    .v-leave-active{
        position:absolute;
        top:0;
    }

</style>