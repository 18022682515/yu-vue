
const obj = {};
obj.names = [
    'falls', 
    'myTransition', 
    'numList', 
    'select',
    'scale',
    'fold',
    'pageCode',
    'table',
    'viewBox',
    'scroll',
    'hint',
    'nav',
    'img',
    'icon/load',
    'icon/arrowsUp',
    'icon/arrowsDown',
    'layout/touchX',
    'layout/touchY',
    'layout/screenY',
    'layout/pull',
    'user/signin',
    'user/login',
    'calendar/calendar',
    'calendar/slideCalendar',
    'svg/svg',
    'svg/path',
    'progress/progress',
    'progress/circle',
    'alert/alert',
    'alert/confirm',
    'slide/slide',
    'slide/slideX',
    'slide/slideY',
    'slide/slideOpacity',
    'slide/shapeX',
    'slide/shapeY',
    'sidebar/top',
    'sidebar/right',
    'sidebar/bottom',
    'sidebar/left',
    'input/button',
    'input/input',
    'input/radio',
    'input/checkbox',
    'tabs/tab',
    'tabs/tabs',
    'tabs/tabsItem',
    'tabs/textTabs',
];


function setComponent(Vue, names){
    names.forEach( name=>{
        let arr = name.split('/');
        let filename = arr[arr.length-1];
        let component = 'yu'+filename.replace(filename[0],filename[0].toLocaleUpperCase());
        Vue.component( component, resolve=>{
            require(['./components/'+name+'.vue'], resolve);
        } );
    } );
}

obj.install = function(Vue, options){
    setComponent(Vue, obj.names);
    //Vue.mount('css选择器','组件名'|组件对象,props对象);
    Vue.mount = function(selector,component,props) {
        
        let vm = new Vue({
            el:selector,
            render:h=>h(component,{ props })
        });
        let resArr = selector.match(/^(\.|\#)|\w+/g);
        resArr[0] === '#' && (vm.$el.id = resArr[1]);
        resArr[0] === '.' && (vm.$el.className += ' '+resArr[1]);

        return vm;
    };
}

export default obj;