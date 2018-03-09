<template>

	<div class="cartControl">
		<transition name="fadeRotate">
			<div class="cart-decrease" v-show="food.count > 0" @click.stop.prevent="remove()">
				<span class="icon-remove_circle_outline inner"></span>
			</div>
		</transition>
			<div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
			<div class="cart-add" @click.stop.prevent="addCart($event)">
				<i class="icon-add_circle"></i>
			</div>
	</div>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue';
export default{
	props: {
		food: {
			type: Object
		}
	},
	methods: {
		addCart (evevt) {
			if (!event._constructed) {
				return;
			}
			if (!this.food.count) {
				Vue.set(this.food, 'count', 0);
			}
			this.food.count++;
			this.$root.eventHub.$emit('cart.add', event.target);
		},
		remove (evevt) {
			if (!event._constructed || !this.food.count) {
				return;
			}
			this.food.count--;
		}
	}
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.cartControl
		font-size 0
		.cart-decrease
			display inline-block
			padding 6px
			transition: all .4s linear
			color rgb(0,160,220)
			.inner
				line-height 24px
				color rgb(147, 153, 159)
				font-size 24px
				transition all 0.4s linear
			&.fadeRotate-enter-active, &.fadeRotate-leave-active
				transform translate3d(0,0,0) //定义为3D动画，开启硬件加速
				.inner
					display inline-block
					transform rotate(0)
			&.fadeRotate-enter, &.fadeRotate-leave-active
				opacity 0
				transform translate3d(24px,0,0)
				.inner
					transform rotate(180deg)
		.cart-add
				display inline-block
				padding 6px
				line-height 24px
				font-size 24px
				color rgb(0,160,220)
		.cart-count
				display inline-block
				vertical-align top
				width 12px
				line-height 24px
				text-align center
				padding-top 6px
				color rgb(147, 153, 159)
				font-size 10px
</style>
