// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import 'common/stylus/index.styl';
Vue.config.productionTip = false;

let vm = new Vue({
	router,
	el: '#app',
	render: h => h(App),
	data: {
		eventHub: new Vue()
	}
});

Vue.use({
	vm
});
