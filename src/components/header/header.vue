<template lang="html">

<div class="header">
		<div class="content-wrapper">
			<div class="avatar">
				<img :src="seller.avatar" width="64" height="64">
			</div>
			<div class="content">
				<div class="title">
					<div class="brand"></div>
					<div class="name">{{seller.name}}</div>
				</div>
				<div class="description">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
				<div class="supports" v-if="seller.supports">
					<div class="supports_desc">
						<span class="icon" :class="iconClassMap[seller.supports[0].type]"></span>
						<span class="text">{{seller.supports[0].description}}</span>
					</div>
				</div>
				<div v-if="seller.supports" class="support-count" @click="showDetail()">
					<span class="count">{{seller.supports.length}}个</span>
					<i class="icon-keyboard_arrow_right"></i>
				</div>
			</div>
		</div>
		<div class="bulletin-wrapper" @click="showDetail()">
			<span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
			<i class="icon-keyboard_arrow_right"></i>
		</div>
		<div class="background">
			<img :src="seller.avatar" width="100%" height="100%">
		</div>
		<transition name="fade">
			<div class="detail" v-if="detailShow">
				<div class="detail-wrapper">
					<div class="detail-main">
						<h1 class="name">{{seller.name}}</h1>
						<div class="star-wrapper">
							<star :size="48" :score="seller.score"></star>
						</div>
						<div class="title">
							<div class="line"></div>
							<div class="text">优惠信息</div>
							<div class="line"></div>
						</div>
						<ul v-if="seller.supports" class="supports">
							<li class="support-item" v-for="(item,index) in seller.supports" :key="index">
								<span class="icon">
									<iconMap :iconType="item.type"></iconMap>
								</span>
								<span class="text">{{item.description}}</span>
							</li>
						</ul>
						<div class="title">
							<div class="line"></div>
							<div class="text">商家公告</div>
							<div class="line"></div>
						</div>
						<div class="bulletin">{{seller.bulletin}}</div>
					</div>
				</div>
				<div class="detail-close">
						<i class="icon-close" @click="hideDetail()"></i>
				</div>
			</div>
		</transition>
</div>
</template>
<script>
import star from 'components/star/star';
import iconMap from 'components/iconMap/iconMap';
export default {
	props: {
		seller: {
			type: Object
		}
	},
	created () {
    this.iconClassMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  },
  data () {
		return {
			detailShow: false
		};
	},
	methods: {
		showDetail () {
			this.detailShow = true;
		},
		hideDetail () {
			this.detailShow = false;
		}
	},
	components: {
		star,
		iconMap
	}
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin"
.header
	position relative
	color #fff
	background rgba(7,17,27,0.5)
	blur 10px
	overflow hidden
	.content-wrapper
		position relative
		padding 24px 12px 18px 24px
		font-size 0
		.avatar
			display: inline-block
			img
				border-radius 2px
		.content
			display: inline-block
			margin-left 16px
			.title
				margin 2px 0 8px 0
				.brand
					display inline-block
					width 30px
					height 18px
					vertical-align top
					bg-image('brand')
					background-size 30px 18px
					background-repeat no-repeat
				.name
					display inline-block
					margin-left 6px
					font-size 16px
					line-height 18px
					font-weight bold
			.description
				margin-bottom 10px
				line-height 12px
				font-size 12px
			.supports
					.icon
						display inline-block
						vertical-align top
						width 12px
						height 12px
						margin-right 4px
						background-size 12px 12px
						background-repeat no-repeat
						&.decrease
							bg-image('decrease_1')
						&.discount
							bg-image('discount_1')
						&.guarantee
							bg-image('guarantee_1')
						&.invoice
							bg-image('invoice_1')
						&.special
							bg-image('special_1')
					.text
						line-height 12px
						font-size 10px
		.support-count
			position absolute
			right 12px
			bottom 18px
			padding 0 8px
			height 24px
			line-height 24px
			border-radius 14px
			background-color rgba(0,0,0,0.2)
			text-align center
			.count
				font-size 10px
				vertical-align top
			.icon-keyboard_arrow_right
				font-size 10px
				line-height 24px
				margin-left 2px
	.bulletin-wrapper
		position relative
		height 28px
		line-height 28px
		padding 0 22px 0 12px
		white-space nowrap
		overflow hidden
		text-overflow ellipsis
		background rgba(7,17,27,0.2)
		.bulletin-title
			display inline-block
			vertical-align top
			margin-top 8px
			width 22px
			height 12px
			bg-image('bulletin')
			background-size 100% 100%
			background-repeat no-repeat
		.bulletin-text
			font-size 10px
			vertical-align middle
			margin 0 4px
		.icon-keyboard_arrow_right
			position absolute
			font-size 10px
			right 12px
			top 8px
	.background
		position absolute
		top 0
		left 0
		width 100%
		height 100%
		z-index -1
		filter blur(10px)
	.detail
		position fixed
		top 0
		left 0
		height 100%
		width 100%
		overflow auto
		z-index 100
		background rgba(7,17,27,0.8)
		backdrop-filter blur(10px)
		.detail-wrapper
			min-height 100%
			width 100%
			.detail-main
				margin-top 64px
				padding-bottom 64px
				.name
					line-height 16px
					text-align center
					font-size 16px
					width 100%
					color rgb(255,255,255)
					font-weight 700
				.star-wrapper
					margin 16px 11px 28px 0
					text-align center
				.title
					display flex
					width 80%
					margin 0 auto 24px auto;
					.line
						display inline-block
						flex 1
						height 1px
						background rgba(255,255,255,0.2)
						margin auto
					.text
						padding 0 12px
            font-size 14px
            font-weight 700
				.supports
					padding 0 0 28px 36px
					.support-item
						color white
						padding 0 6px 12px 16px
						.text
							vertical-align middle
							font-size 12px
							font-weight 200
							color rgb(255,255,255)
							line-height 12px
						.icon
							vertical-align middle
				.bulletin
					padding 0 48px
					font-size 12px
					font-weight 200
					color rgb(255,255,255)
					line-height 24px
		.detail-close
			position relative
			width 32px
			height 32px
			margin -64px auto 0 auto
			clear both
			font-size 32px
			color rgba(255,255,255,0.5)
		&.fade-enter-active, &.fade-leave-active {
				transition: opacity .5s
		}
		&.fade-enter, &.fade-leave-active {
				opacity: 0
		}
</style>
