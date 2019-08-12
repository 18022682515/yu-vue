<template>
<div class="slideCalendar" @mouseup="upAll">
    <div ref="box" class="box">
        <div class="frame" :style="{ height:'23px' }"></div>
        <ul ref="years" @mousedown="down($event,'year')" @mouseup="up($event,'year')">
            <li v-for="y,i in years">{{y}}</li>
        </ul>
        <ul ref="months" @mousedown="down($event,'month')" @mouseup="up($event,'month')">
            <li v-for="m,i in months">{{m+1}}</li>
        </ul>
        <ul ref="dates" @mousedown="down($event,'date')" @mouseup="up($event,'date')">
            <li v-for="d,i in dates">{{d}}</li>
        </ul>
    </div>
    <div class="btn-group">
        <yu-button @btn-click="reset">重置</yu-button>
        <yu-button @btn-click="$emit('input',`${year}/${month+1}/${date}`)">提交</yu-button>
    </div>
</div>
</template>

<script>

import { animate } from 'yu-front';
function getCounts(start,end){
    let counts = [];
    for(let i=start; i<=end; i++){
        counts.push(i);
    }
    return counts;
}
function getDates(year,month){
    let dateCount = new Date(year,month,0).getDate();
    let dates = getCounts(1,dateCount);
    return dates;
}
export default {
    name:"slideCalendar",
    props:{
        value:{
            type:String
        }
    },
    data(){
        return {
            aLi:0,
            years:getCounts(1970,2070),
            months:getCounts(0,11),
            year:0,
            month:0,
            date:0,
            yearTop:0,
            monthTop:0,
            dateTop:0,
            yearVal:0,
            monthVal:0,
            dateVal:0,
        }
    },
    methods:{
        reset(){
            let time = new Date();
            this.year = time.getFullYear();
            this.month = time.getMonth();
            this.date = time.getDate();
            this.$emit('input',`${this.year}/${this.month+1}/${this.date}`);
        },
        down(e,type){
            let ele = e.currentTarget;
            let height = ele.offsetHeight;
            let aLi = -height/this[type+'s'].length;
            let max = -height-aLi;
            let y = e.pageY;
            this[type+'Val'] = 0;

            ele.onmousemove = (event)=>{
                let my = event.pageY;
                this[type+'Val'] = my-y;
                let top = this[type+'Top'];
                top += this[type+'Val'];
                this[type+'Top'] = top>0? 0: (top<max? max: top);
                ele.style.transform = `translateY(${this[type+'Top']}px)`;
                y = my;
            };
        },
        up(e,type){
            let ele = e.currentTarget;
            ele.onmousemove && this.setVal(ele,type);
        },
        setVal(ele,type){
            let height = ele.offsetHeight;
            let aLi = -height/this[type+'s'].length;
            let max = -height-aLi;
            ele.onmousemove = null;
            
            let top = this[type+'Top'] + this[type+'Val']*10;
            top = top>0? 0: (top<max? max: top);
            let count = Math.round(Math.abs(top/aLi));
            if(this[type] === this[type+'s'][count]){
                animate(ele,[{ transform:{ translateY:count*aLi } }]).then(()=>{
                    this[type+'Top'] = count*aLi;
                });
            }
            this[type] = this[type+'s'][count];
        },
        upAll(){
            let uls = this.$refs.box.querySelectorAll('ul');
            let arr = ['year','month','date'];
            for(let i=0; i<uls.length; i++){
                uls[i].onmousemove && this.setVal(uls[i],arr[i]);
            }
        },
        site(ele,type){
            let height = ele.offsetHeight;
            let arr = this[type+'s'];
            let aLi = -height/arr.length;
            let index = arr.indexOf(this[type]);
            this[type+'Top'] = aLi*index;
            animate(ele,[{ transform:{ translateY:this[type+'Top'] } },{ timing:'cubic-bezier(0.5,0.5,0,1.2)' }]);
        },
        click(e,type,val){
            if(type==='year'){
                this.year = val;
            }else if(type==='month'){
                this.month = val;
            }else{
                this.date = val;
            }
        }
    },
    computed:{
        dates(){
            return getDates(this.year,this.month+1);
        }
    },
    watch:{
        dates(n,o){
            if(n.length<o.length && this.date>n[n.length-1]){
                let ele = this.$refs.dates;
                ele && (this.date = 1);
            }
        },
        value(n,o){
            let time = new Date(n);
            this.year = time.getFullYear();
            this.month = time.getMonth();
            this.date = time.getDate();
        },
        year(){
            let ele = this.$refs.years;
            this.site(ele,'year');
        },
        month(){
            let ele = this.$refs.months;
            this.site(ele,'month');
        },
        date(){
            setTimeout(()=>{
                let ele = this.$refs.dates;
                this.site(ele,'date');
            });
        }
    },
    mounted(){
        let time = this.value ? new Date(this.value): new Date();
        this.year = time.getFullYear();
        this.month = time.getMonth();
        this.date = time.getDate();
    }
}
</script>

<style lang="less" scoped>
.slideCalendar{
    position:relative;
    text-align: center;
    overflow: hidden;
    box-shadow: 0 0 2px #000, 1px 1px 2px #000;
    border-radius: 5px;
    margin:4px 2px;
    height:200px;

    .box{
        position: absolute;
        min-width:165px;
        height:23px;
        top:40%;
        left:50%;
        transform:translateX(-50%);

        .frame{
            position:absolute;
            left:0;
            width:100%;
            box-shadow: 0 0 2px #000, 0 0 1px 100px rgba(255, 255, 255,.8);
            border-radius: 5px;
            pointer-events: none;
            z-index:999;
        }

        >ul{
            float:left;
            user-select:none;
            margin:0 2px;
            li{
                padding:3px 15px;
            }
        }
    }
    .btn-group{
        position:absolute;
        bottom:0;
        right:0;
        padding:10px 20px;
        pointer-events: none;
        button{
            pointer-events: auto;
        }
    }
}
</style>