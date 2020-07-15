
import './index.css';
import createScript from './lib/createScript.js';
import imageLazyLoad from './lib/imageLazyLoad.js'
import yuTransition from './components/layout/transition.vue'
import yuCache from './components/layout/cache.vue'


class Plugin{
	constructor(url) {
		this.url = url;
		this.componentNames = [
			'echarts/echarts',
			'icon/icon',
			'layout/view',
			'layout/shade',
			'form/button',
			'form/input',
			'form/radio',
			'form/checkbox',
			'slide/slide'
		];
	}
	
	install(Vue,options){
		this.createScript(this.url);
		this.imageLazyLoad(Vue,options);
		this.setComponent(Vue);
	}
}

Plugin.prototype.setComponent = function(Vue){
	Vue.component('yuTransition',yuTransition);
	Vue.component('yuCache',yuCache);
	this.componentNames.forEach( name=>{
		let arr = name.split('/');
		let filename = arr[arr.length-1];
		let component = 'yu'+filename.replace(filename[0],filename[0].toLocaleUpperCase());
		Vue.component(component,resolve => require(['./components/'+name+'.vue'], resolve));
	});
}

Plugin.prototype.imageLazyLoad = imageLazyLoad;
Plugin.prototype.createScript = createScript;

export default Plugin;
