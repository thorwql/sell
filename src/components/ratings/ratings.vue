<template>
<div class="ratingsWrapper" ref="ratingsWrapper">
	<div class="ratings-content">
		<div class="info">
			<div class="mark">
				<div class="num">{{seller.score}}</div>
				<div class="text">综合评分</div>
				<div class="contrast">高于周边商家{{seller.rankRate}}%</div>
			</div>
			<div class="stars">
				<div class="serviceScore">
					<span class="text">服务态度</span>
						<star :size="36" :score="seller.serviceScore"></star>
						<span class="num">{{seller.serviceScore}}</span>
				</div>
				<div class="foodScore">
					<span class="text">服务态度</span>
						<star :size="36" :score="seller.foodScore"></star>
					<span class="num">{{seller.foodScore}}</span>
				</div>
				<div class="deliveryTime">
					<span class="text">送达时间</span>
					<span class="time">{{seller.deliveryTime}}分钟</span>
				</div>
			</div>
		</div>
		<div class="divider"></div>
		<div class="rating">
					<ratingselect :selectType="selectType" :onlyContent="onlyContent" :desc="desc" :ratings="ratings"></ratingselect>
				</div>
		<div class="rating-wrapper">
					<ul v-show="ratings && ratings.length">
						<li v-show="needShow(rating.rateType,rating.text)" v-for="(rating,index) in ratings" :key="index" class="rating-item">
							<div class="avatar">
								<img :src="rating.avatar" width="28" height="28">
							</div>
							<div class="content">
								<div class="user">
									<span class="name">{{rating.username}}</span>
									<span class="rateTime">{{rating.rateTime | time}}</span>
								</div>
								<div class="star-wrapper">
									<star :size="24" :score="rating.score"></star>
									<span class="deliveryTime">{{rating.deliveryTime}}分钟送达</span>
								</div>
								<div class="text">
									{{rating.text}}
								</div>
								<div class="recommend">
									<span class="icon icon-thumb_up" v-show="rating.recommend.length"></span>
									<span class="dish" v-for="(dish,index) in rating.recommend" :key="index">{{dish}}</span>
								</div>
							</div>
						</li>
					</ul>
					<div class="no-ratings" v-show="!ratings || !ratings.length">暂无评价</div>
				</div>
	</div>
</div>
</template>
<script>
import '../../filter/time.js';
import axios from 'axios';
import star from 'components/star/star';
import BScroll from 'better-scroll';
import ratingselect from 'components/ratingselect/ratingselect';
const ALL = 2;
export default {
	created () {
		this.init();
		this.$root.eventHub.$on('ratings.select', (type) => {
		this.selectType = type;
		// console.log(this.selectType);
		});
		this.$root.eventHub.$on('content.toggle', (onlyContent) => {
		this.onlyContent = onlyContent;
		});
	},
	data () {
		return {
			seller: {},
			ratings: [],
			selectType: ALL,
			onlyContent: false,
			desc: {
				all: '全部',
				positive: '满意',
				negative: '不满意'
				}
			};
	},
	methods: {
		init () {
			axios.get('static/data.json').then((res) => {
				this.seller = res.data.seller;
				this.ratings = res.data.ratings;
				this.$nextTick(() => {
					this.scroll = new BScroll(this.$refs.ratingsWrapper, {
						click: true
					});
				});
			});
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
		star,
		ratingselect
	}
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl";
.ratingsWrapper
	position absolute
	top 174px
	left 0
	bottom 0
	width 100%
	overflow hidden
	.ratings-content
		.info
			display flex
			.mark
				flex 0 0 138px
				margin 18px 0
				border-right 1px solid rgba(7,17,27,0.1)
				text-align center
				.num
					font-size 24px
					color rgb(255,153,0)
					line-height 28px
				.text
					padding 6px 0 8px 0
					font-size 12px
					color rgb(7,17,27)
					line-height 12px
				.contrast
					font-size 10px
					color rgb(7,17,27)
					line-height 10px
					margin-bottom 6px
			.stars
				padding 18px 24px
				.serviceScore,.foodScore,.deliveryTime
					display flex
					margin-bottom 8px
					.text
						font-size 12px
						color rgb(7,17,27)
						line-height 18px
						margin-right 12px
					.num
						font-size 12px
						line-height 18px
						color rgb(255,153,0)
						padding-left 12px
				.deliveryTime
					margin-bottom 0
					.time
						font-size 12px
						color rgb(147,153,159)
						line-height 18px
		.divider
			height: 16px;
			width: 100%;
			background: #f3f5f7;
			border-top: 1px solid rgba(7, 17, 27, 0.1);
			border-bottom: 1px solid rgba(7, 17, 27, 0.1);
		.rating
			padding-top 18px
		.rating-wrapper
			padding 0 18px
			.rating-item
				display flex
				padding 18px 0
				// margin 0 18px
				border-bottom 1px solid rgba(7,17,27,0.1)
				.avatar
					flex 0 0 28px
					margin-right 12px
					img
						border-radius 50%
				.content
					flex 1
					.user
						font-size 10px
						color rgb(7,17,27)
						line-height 12px
						.rateTime
							position absolute
							font-weight 200
							right 18px
							color rgb(147,153,159)
					.star-wrapper
						font-size 0
						padding-top 4px
						margin-bottom 6px
						.star
							display inline-block
						.deliveryTime
							font-size 10px
							padding-left 6px
							font-weight 200
							color rgb(147,153,159)
					.text
						font-size 12px
						color rgb(7,17,27)
						line-height 18px
					.recommend
						padding-top 4px
						.icon
							font-size 12px
							color rgb(0,160,220)
							line-height 16px
						.dish
							display inline-block
							font-size 9px
							color rgb(147,153,159)
							line-height 16px
							border 1px solid rgba(7,17,27,0.1)
							padding 2px 6px
							margin-right 8px
							white-space normal
							margin-top 4px
</style>
