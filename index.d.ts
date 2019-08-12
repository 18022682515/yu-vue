declare class Vue{
    mount(selector:string, component:string|Vue, props:Object):Vue;
}

interface Plugin{
    names:string[];
    install(Vue:Vue,options:Object):void;
}
export let obj: Plugin;
export default obj;