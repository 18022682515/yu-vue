const obj = {};

function setComponent(Vue, names){
    names.forEach( name=>{
        Vue.component( name, resolve=>{
            require(['./components/'+name+'.vue'], resolve);
        } );
    } );
}

obj.install = function(Vue, options){
    const names = ['falls'];
    setComponent(Vue, names);
}

export default obj;