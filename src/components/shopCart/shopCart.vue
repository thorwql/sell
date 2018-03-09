<template>
<div>
	<div class="shopCart">
		<div class="content">
			<div class="content-left" @click="listToggle()">
				<div class="logo-wrapper">
					<div class="logo" :class="{'highLight':totalCount>0}">
						<span class="icon-shopping_cart" :class="{'highLight':totalCount>0}"></span>
					</div>
					<div class="num" v-show="totalCount">{{totalCount}}</div>
				</div>
				<div class="price" :class="{'highLight':totalCount>0}">¥ {{totalPrice}}</div>
				<div class="desc">另需配送费¥{{deliveryPrice}}元</div>
			</div>
			<div class="content-right">
				<div class="pay" v-if="todelivery == minPrice">
					¥{{minPrice}}元起送
				</div>
				<div class="notenough" v-if="todelivery > 0 && todelivery < minPrice">还差{{todelivery}}元起送</div>
				<div class="enough" v-if="todelivery<= 0">去结算</div>
			</div>
		</div>
		<!-- <div class="ball-container">
			<transition name="drop" @before-enter="beforeEnter()" @enter="Enter()"
			@after-enter="afterEnter()"
			v-for="(ball,index) in balls" :key="index">
				<div class="ball" v-show="ball.show">
					<div class="inner inner-hook"></div>
				</div>
			</transition>
		</div> -->
		<transition name="transHeight">
				<div class="shopCart-list" v-show="listshow">
					<div class="list-header">
						<div class="title">购物车</div>
						<span class="empty" @click="setEmpty()">清空</span>
					</div>
					<div class="list-content" ref="foodlist">
						<ul>
							<li class="food" v-for="(food,index) in selectFoods" :key="index">
								<span class="name">{{food.name}}</span>
								<div class="price">
									<span>￥{{food.price * food.count}}</span>
								</div>
								<div class="cartControl-wrapper">
									<cartControl :food="food"></cartControl>
								</div>
							</li>
						</ul>
					</div>
				</div>
		</transition>
	</div>
	<transition name="fade-backdrop">
		<div class="backdrop" v-show="showBackdrop" @click="hideBackdrop()"></div>
	</transition>
</div>
</template>

<script type="text/ecmascript-6">
import cartControl from 'components/cartControl/cartControl';
import BScroll from 'better-scroll';
export default{
	props: {
		selectFoods: {
			type: Array,
			default () {
				return [];
			}
		},
		deliveryPrice: {
			type: Number,
			default: 0
		},
		minPrice: {
			type: Number,
			default: 0
		}
	},
	data () {
		return {
	// 	balls: [{
	// 			show: false
	// 		},
	// 		{
	// 			show: false
	// 		},
	// 		{
	// 			show: false
	// 		},
	// 		{
	// 			show: false
	// 		},
	// 		{
	// 			show: false
	// 		}],
	// 		dropBalls: [],
			listshow: false
		};
	},
	// created () {
	// 	this.$root.eventHub.$on('cart.add', (target) => {
	// 	this.drop(target);
  //  });
	// },
	computed: {
		showBackdrop () {
			if (this.listshow && this.totalPrice) {
				return true;
			}
			this.listshow = false;
			return false;
		},
		totalPrice () {
			let total = 0;
			this.selectFoods.forEach((food) => {
				total += food.price * food.count;
			});
			return total;
		},
		totalCount () {
			let count = 0;
			this.selectFoods.forEach((food) => {
				count += food.count;
			});
			return count;
		},
		todelivery () {
			let diff = this.minPrice - this.totalPrice;
			return diff;
		}
	},
	methods: {
		_initScroll () {
			this.foodlistScroll = new BScroll(this.$refs.foodlist, {
				click: true
			});
		},
		listToggle () {
			if (!this.selectFoods.length) {
				return;
			}
			this.listshow = !this.listshow;
			if (this.listshow) {
				this.$nextTick(() => {
					if (!this.foodlistScroll) {
						this._initScroll();
					} else {
						this.foodlistScroll.refresh();
					}
				});
			}
		},
		setEmpty () {
			this.selectFoods.forEach((food) => {
				food.count = 0;
			});
		},
		hideBackdrop () {
			this.listshow = false;
		}
		// drop (el) {
		// 	// console.log(el);
		// 	for (let i = 0, l = this.balls.length; i < l; i++) {
		// 		let ball = this.balls[i];
		// 		if (!ball.show) {
		// 			ball.show = true;
		// 			ball.el = el;
		// 			this.dropBalls.push(ball);
		// 			return;
		// 		}
		// 	}
		// },
		// beforeEnter (el) {
		// 	let count = this.balls.length;
		// 	while (count--) {
		// 		let ball = this.balls[count];
		// 		if (ball.show) {
		// 			let rect = ball.el.getBoundingClientRect();
		// 			let x = rect.left - 32;
		// 			let y = -(window.innerHeight - rect.top - 22);
		// 			el.style.display = '';
		// 			el.style.webkitTransform = `translate3d(0,${y}px,0)`;
		// 			el.style.transform = `translate3d(0,${y}px,0)`;
		// 			let inner = el.queryALLSelector('.inner-hook')[0];
		// 			inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
		// 			inner.style.transform = `translate3d(${x}px,0,0)`;
		// 		}
		// 	}
		// },
		// enter (el) {
		// 	/* eslint-disable no-unused-vars */
		// 	let rf = el.offsetHeight; // 触发浏览器重绘，offsetWidth、offsetTop等方法都可以触发
		// 	this.$nextTick(() => {
		// 		el.style.webkitTransform = 'translate3d(0,0,0)';
		// 		el.style.transform = 'translate3d(0,0,0)';
		// 		let inner = el.queryAllSelector('.inner-hook')[0];
		// 		inner.style.webkitTransform = 'translate3d(0,0,0)';
		// 		inner.style.transform = 'translate3d(0,0,0)';
		// 	});
		// },
		// afterEnter (el) {
		// 	let ball = this.dropBalls.shift();
		// 	if (ball) {
		// 		ball.show = false;
		// 		el.style.display = 'none';
		// 	}
	// 	}
	},
	components: {
		cartControl
	}
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.shopCart
		position fixed
		left 0
		bottom 0
		z-index 50
		width 100%
		height 48px
		.content
			font-size 0
			display flex
			background #141d27
			color rgba(255,255,255,0.4)
			.content-left
				flex 1
				.logo-wrapper
					display inline-block
					position relative
					top -10px
					margin 0 12px
					padding 6px
					width 56px
					height 56px
					box-sizing  border-box
					vertical-align top
					border-radius 50%
					background #141d27
					.logo
						width 100%font-size
						height 100%
						border-radius 50%
						background #2b343c
						text-align center
						&.highLight
							background rgb(0, 160, 220)
							color #fff
						.icon-shopping_cart
							line-height 44px
							font-size 24px
							color #80858a
							&.highLight
								color #fff
					.num
						position absolute
						top 0
						right 0
						width 24px
						height 16px
						line-height 16px
						text-align center
						border-radius 16px
						font-size 9px
						font-weight 700
						color #fff
						background rgb(240,20,20)
						box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.4)
				.price
					display inline-block
					vertical-align top
					margin-top 12px
					line-height 24px
					padding-right 12px
					box-sizing border-box
					border-right 1px solid rgba(255,255,255,0.1)
					font-size 16px
					font-weight 700
					&.highLight
						color #fff
				.desc
					display inline-block
					vertical-align top
					line-height 24px
					margin 12px 0 0 12px
					font-size 10px
			.content-right
				flex 0 0 105px
				width 105px
				height 48px
				line-height 48px
				text-align center
				font-size 12px
				font-weight 700
				.pay,.notenough
					background #2b333b
				.enough
					background #00b43c
					color #fff
		// .ball-container
		// 	.ball
		// 		position fixed
		// 		left 32px
		// 		bottom 22px
		// 		z-index 200
		// 		&.drop-enter,&.drop-enter-active
		// 			transition all 0.4s cubic-bezier(0.49,-0.29,0.75,0.41)
		// 			.inner
		// 				width 16px
		// 				height 16px
		// 				border-radius 50%
		// 				background rgb(0,160,220)
		// 				transition all 0.4s linear
		.shopCart-list
			position absolute
			top 0
			left 0
			width 100%
			background white
			transform translate3d(0,-100%,0)
			z-index -1
			&.transHeight-enter-active,&.transHeight-leave-active
				transition all 0.5s
			&.transHeight-enter,&.transHeight-leave-active
				transform translate3d(0,0,0)
			.list-header
				height 40px
				line-height 40px
				background #f3f5f7
				border-bottom 1px solid rgba(7,17,27,0.1)
				.title
					display inline-block
					font-size 14px
					font-weight 200
					color rgb(7,17,27)
					padding-left 18px
				.empty
					position absolute
					right 8px
					font-size 12px
					color rgb(0,160,220)
					padding 0 10px
			.list-content
				max-height 217px
				overflow hidden
				.food
					position relative
					display flex
					height 48px
					margin 0 18px
					border-bottom 1px solid rgba(7,17,27,0.1)
					.name
						flex 1
						font-size 14px
						color rgb(7,17,27)
						line-height 48px
						font-weight 700
					.price
						font-size 14px
						font-weight 700
						color rgb(240,20,20)
						padding 0 12px 0 18px
						line-height 48px
					.cartControl-wrapper
						font-size 14px
						margin-top 6px
	.backdrop
		position fixed
		top 0
		bottom 0
		left 0
		right 0
		background rgba(7,17,27,0.6)
		backdrop-filter blur(10px)
		z-index 40
		&.fade-backdrop-enter-active,&.fade-backdrop-leave-active
			transition opacity 0.5s
		&.fade-backdrop-enter,&.fade-backdrop-leave-active
			opacity 0
</style>
