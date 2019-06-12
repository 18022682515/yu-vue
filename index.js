const { getType } = require('yu-util');
const obj = {};
obj.names = ['falls', 'myTransition', 'numList', 'slide'];


function setComponent(Vue, names){
    names.forEach( name=>{
        let component = 'yu'+name.replace(name[0],name[0].toLocaleUpperCase());
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
    };
}

export default obj;