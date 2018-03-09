<template lang="html">
	<transition name="move">
		<div class="detailWrapper" v-show="showDetail" ref="detailWrapper">
			<div class="foodDetail">
				<div class="back" @click="showToggle()">
					<i class="icon-arrow_lift"></i>
				</div>
				<img :src="food.image" height="425" width="100%">
				<div class="info">
					<div class="title">{{food.name}}</div>
					<div class="desc">
						<span>月售{{food.sellCount}}份</span>
						<span>好评率{{food.rating}}%</span>
					</div>
					<div class="price">
						<span class="unit">￥</span>{{food.price}}
						<span class="oldPrice" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
					</div>
					<div class="shopCart">
						<transition name="fade">
							<div class="text" @click="addCart()" v-show="!food.count">加入购物车</div>
						</transition>
					</div>
					<cartControl :food="food"></cartControl>
				</div>
				<div class="divider" v-show="food.info"></div>
				<div class="desc" v-show="food.info">
					<div class="title">商品介绍</div>
					<div class="content">{{food.info}}</div>
				</div>
				<div class="divider"></div>
				<div class="rating">
					<h1 class="title">商品评价</h1>
					<ratingselect :selectType="selectType" :onlyContent="onlyContent" :desc="desc" :ratings="food.ratings"></ratingselect>
				</div>
				<div class="rating-wrapper">
					<ul v-show="food.ratings && food.ratings.length">
						<li v-show="needShow(rating.rateType,rating.text)" v-for="(rating,index) in food.ratings" :key="index" class="rating-item">
							<div class="user">
								<span class="name">{{rating.username}}</span>
								<img  class="avatar" :src="rating.avatar" width="12" height="12">
							</div>
							<div class="time">{{rating.rateTime | time}}</div>
							<p class="text">
								<span :class="{'icon-thumb_down':rating.rateType===1,'icon-thumb_up':rating.rateType===0}"></span>{{rating.text}}
							</p>
						</li>
					</ul>
					<div class="no-ratings" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script type="text/ecmascript-6">
import '../../filter/time.js';
import Vue from 'vue';
import ratingselect from 'components/ratingselect/ratingselect';
import BScroll from 'better-scroll';
import cartControl from 'components/cartControl/cartControl';
const ALL = 2;
export default{
	props: {
		food: {
			type: Object
		}
	},
	created () {
		this.$root.eventHub.$on('ratings.select', (type) => {
		this.selectType = type;
		console.log(this.selectType);
		});
		this.$root.eventHub.$on('content.toggle', (onlyContent) => {
		this.onlyContent = onlyContent;
		});
	},
	data () {
		return {
			showDetail: false,
			selectType: ALL,
			onlyContent: false,
			desc: {
				all: '全部',
				positive: '推荐',
				negative: '吐槽'
			}
		};
	},
	methods: {
		showToggle () {
			this.showDetail = !this.showDetail;
			this.selectType = ALL;
			this.onlyContent = true;
			if (this.showDetail) {
				this.$nextTick(() => {
					this._initScroll();
				});
			}
		},
		_initScroll () {
			if (!this.detailWrapper) {
				this.detailWrapper = new BScroll(this.$refs.detailWrapper, {
					click: true
				});
			} else {
				this.detailWrapper.refresh();
			}
		},
		addCart (event) {
			// if (!event._constructed) {
			// 	return;
			// }
			Vue.set(this.food, 'count', 1);
			// console.log(this.food.count);
			// this.$root.eventHub.$emit('cart.add', event.target);
		},
		needShow (type, text) {
			if (this.onlyContent && !text) {
				return false;
			}
			if (this.selectType === ALL) {
				return true;
			} else {
				return type === this.selectType;
			}
		}
	},
	components: {
		cartControl,
		ratingselect
	}
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl";
.detailWrapper
	position fixed
	left 0
	top 0
	bottom 48px
	width 100%
	background white
	transition all 0.4s ease
	&.move-enter-avtive,&.move-leave-active{
		transform translate3d(0,0,0)
	}
	&.move-enter,&.move-leave-active{
		transform translate3d(100%,0,0)
	}
	.foodDetail
		.back
			position absolute
			color white
			top 12px
			left 6px
			font-size 20px
			padding 10px
	.info
		position relative
		box-sizing border-box
		width 100%
		padding 18px
		.title
			font-size 14px
			font-weight 700
			color rgb(7,17,27)
			line-height 14px
		.desc
			display flex
			padding 0
			padding-top 8px
			font-size 10px
			color rgb(147,153,159)
			line-height 10px
			span:last-child
				padding-left 12px
		.price
			display flex
			padding-top 18px
			font-size 16px
			font-weight 700
			color rgb(240,20,20)
			line-height 24px
			.unit
				font-size 10px
				font-weight normal
			.oldPrice
				padding-left 12px
				font-size 10px
				font-weight normal
				color rgb(147,153,159)
				line-height 24px
				text-decoration line-through
		.shopCart
			position absolute
			width 100px
			left 250px
			bottom 18px
			height 24px
			text-align center
			z-index 2
			.text
				box-sizing border-box
				height 100%
				line-height 24px
				color white
				font-size 10px
				padding 0 12px
				border-radius 12px
				background-color #00a0dc
				&.fade-enter-active,&.fade-leave-active{
					transition opacity .2s
				}
				&.fade-enter,&.fade-leave-active{
					opacity 0
				}
		.cartControl
			position absolute
			left 250px
			bottom 12px
	.divider
		height: 16px;
		width: 100%;
		background: #f3f5f7;
		border-top: 1px solid rgba(7, 17, 27, 0.1);
		border-bottom: 1px solid rgba(7, 17, 27, 0.1);
	.desc
		padding 18px
		.title
			font-size 14px
			font-weight 500
			color #07111b
			margin-bottom 6px
		.content
			font-size 12px
			font-weight 200
			color rgb(77,85,93)
			line-height 24px
			padding 0 8px
	.rating
		padding-top 18px
		.title
			line-height 14px
			margin-left 18px
			font-size 14px
			color rgb(7,17,27)
	.rating-wrapper
		padding 0 18px
		.rating-item
			positive relative
			padding 16px 0
			border-1px(rgba(7,17,27,0.1))
			.user
				position absolute
				right 0
				top 16px
				line-height 12px
				font-size 0
				.name
					display inline-block
					margin-right 6px
					vertical-align top
					font-size 10px
					color rgb(147,153,159)
				.avatar
					border-radius 50%
			.time
				margin-bottom 6px
				line-height 12px
				font-size 10px
				color rgb(147,153,159)
			.text
				line-height 16px
				font-size 12px
				color rgb(7,17,27)
				.icon-thumb_up,icon-thumb_down
					margin-right 4px
					line-height 16px
					font-size 12px
				.icon-thumb_up
					color rgb(0,160,220)
				.icon-thumb_down
					color rgb(147,153,159)
		.no-ratings
			padding 16px 0
			font-size 12px
			color rgb(147,153,159)
</style>
