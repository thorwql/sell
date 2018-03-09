import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
const goods = () => import('components/goods/goods');

const seller = () => import('components/seller/seller');

const ratings = () => import('components/ratings/ratings');
export default new Router({
routes: [
	{
	path: '/',
	component: goods
	},
  {
  path: '/goods',
  component: goods
  },
  {
  path: '/seller',
  component: seller
  },
  {
  path: '/ratings',
  component: ratings
  }
  ]
});
