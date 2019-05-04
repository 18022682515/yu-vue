const obj = {};
obj.names = ['falls', 'my-transition', 'num-list'];

function setComponent(Vue, names){
    names.forEach( name=>{
        Vue.component( name, resolve=>{
            require(['./components/'+name+'.vue'], resolve);
        } );
    } );
}

obj.install = function(Vue, options){
    setComponent(Vue, obj.names);
}

export default obj;