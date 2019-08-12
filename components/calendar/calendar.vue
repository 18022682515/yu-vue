<template>
    <div class="calendar">
        <div class="box">
            <yu-button @btn-click="lastMonth">上个月</yu-button>
            <yu-select :options="yearList" v-model="year"></yu-select>
            <yu-select :options="monthList" v-model="month"></yu-select>
            <yu-button @btn-click="nextMonth">下个月</yu-button>
        </div>
        <div class="table-box">
            <yu-table @click.native="clickTd">
                <tr>
                    <th v-for="(val,i) in week" :key="i">{{val}}</th>
                </tr>
                <tr v-for="(date,i) in dates" :key="i">
                    <td v-if="i==0 && date.length!=7" :colspan="7-date.length" ></td>
                    <td v-for="(val,index) in date" :class="{active:toDay===''+year+month+val}">{{val}}</td>
                    <td v-if="i==dates.length-1 && date.length!=7" :colspan="7-date.length"></td>
                </tr>
            </yu-table>
        </div>
    </div>
</template>

<script>
function getToDay(){
    let time = new Date();
    let year = time.getFullYear();
    let month = time.getMonth()+1;
    let date = time.getDate();
    return ''+year+month+date;
}
function getMonthList(){
    let arr = [];
    for(let i=1; i<=12; i++){
        arr.push(i);
    }
    return arr;
}
function getYearList(){
    let length = 2100-1900;
    let arr = [];
    for(let i=0; i<=length; i++){
        arr.push(1900+i);
    }
    return arr;
}
    export default {
        name:'calendar',
        data(){
            return {
                week:["日","一","二","三","四","五","六"],
                yearList:getYearList(),
                monthList:getMonthList(),
                toDay:getToDay(),
                year:new Date().getFullYear(),
                month:new Date().getMonth()+1,
                dates:null
            }
        },
        watch:{
            year(newVal,oldVal){
                this.year = parseFloat(newVal);
                this.setDates();
            },
            month(newVal,oldVal){
                this.month = parseFloat(newVal);
                this.setDates();
            }
        },
        methods:{
            setDates(){
                let time = new Date(this.year,this.month);
                time.setDate(0);
                let length = time.getDate();

                let oneDate = new Date(this.year,this.month-1,1);
                let week = oneDate.getDay();

                this.dates = [[]];
                let index = 0;
                for(let i=1; i<=length; i++){
                    if(week>6){
                        week = 0;
                        index++;
                        this.dates[index] = [];
                    }
                    week++;
                    this.dates[index].push(i);
                }
            },
            clickTd(e){
                let date = parseFloat(e.target.innerHTML);
                if(!date || e.target.tagName!=='TD') return;
                this.$emit('date-click',new Date(this.year,this.month-1,date));
            },
            lastMonth(){
                this.month--;
                if(this.month<1){
                    this.month = 12;
                    this.year--;
                }
                this.setDates();
            },
            nextMonth(){
                this.month++;
                if(this.month>12){
                    this.month = 1;
                    this.year++;
                }
                this.setDates();
            }
        },
        created(){
            this.setDates();
        }
    }
</script>

<style lang="less" scoped>
.calendar{
    min-width:250px;
    margin:4px 2px;
}
.box{
    display:flex;
    margin-bottom:10px;
    >*{
        flex:1;
    }
    >*:not(:last-child){
        margin-right:5px;
    }
}
.table-box{
    display:flex;
    border-radius: 5px;
    box-shadow: inset 0 0 1px #000,1px 1px 2px #000;
    overflow: hidden;

    >table{
        flex:auto;
        tr:hover{
            background: #FFF!important;
        }
        td:not([colspan]):hover{
            background:rgba(33,88,155,.5);
        }
        .active{
            background:rgba(155,66,22,0.5);;
            color:#FFF;
        }
    }
}

</style>