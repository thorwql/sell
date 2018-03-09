<template lang="html">
  <div class="goods">
		<div class="menu-wrapper" ref="menuWrapper">
			<ul>
				<li v-for="(item,index) in goods" :key="index" :class="index==currentIndex?
				'menu-item-selected':'menu-item'" @click="menuClick(index,$event)">
					<span class="text border-1px">
						<iconMap v-show="item.type > 0" :iconType="item.type"></iconMap>
							{{item.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper" ref="foodsWrapper">
			<ul>
				<li v-for="(item,index1) in goods" class="food-list food-list-hook" :key="index1">
					<h1 class="title">{{item.name}}</h1>
						<ul>
							<li v-for="(food,index2) in item.foods" :key="index2" class="food-item border-1px"
							@click="goDetail(food)">
								<div class="icon">
									<img width="57" height="57" :src="food.icon">
								</div>
								<div class="content">
									<h2 class="name">{{food.name}}</h2>
									<p class="desc">{{food.description}}</p>
									<div class="extra">
										<span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
									</div>
									<div class="price">
										<span class="now">¥{{food.price}}</span><span v-show="food.oldPrice" class="old">¥{{food.oldPrice}}</span>
									</div>
									<div class="cartcontrol-wrapper">
										<cartControl :food="food"></cartControl>
									</div>
								</div>
							</li>
						</ul>
				</li>
			</ul>
		</div>
		<shopCart :selectFoods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopCart>
		<foodDetail :food="selectedFood" v-if="selectedFood" ref="myFood"></foodDetail>
	</div>
</template>
<script>
import BScroll from 'better-scroll';
import iconMap from 'components/iconMap/iconMap';
import shopCart from 'components/shopCart/shopCart';
import cartControl from 'components/cartControl/cartControl';
import foodDetail from 'components/foodDetail/foodDetail';
import axios from 'axios';
export default {
	props: {
		seller: {
			type: Object
		}
	},
	data () {
		return {
			goods: [],
			listHeight: [],
			scrollY: 0,
			selectedFood: ''
		};
	},
	computed: {
		currentIndex () {
			for (let i = 0, l = this.listHeight.length; i < l; i++) {
				let height1 = this.listHeight[i];
				let height2 = this.listHeight[i + 1];
				if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
					return i;
				}
			}
				return 0;
		},
		selectFoods () {
			let foods = [];
			this.goods.forEach((good) => {
				good.foods.forEach((food) => {
					if (food.count > 0) {
						foods.push(food);
					}
				});
			});
			return foods;
		}
	},
	created () {
		axios.get('static/data.json').then((res) => {
			this.goods = res.data.goods;
			this.$nextTick(() => {
				this._initScroll();
				this._calculateHeight();
			});
		});
	},
	methods: {
		_initScroll () {
			this.menuScroll = new BScroll(this.$refs.menuWrapper, {
				click: true
			});
			this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
				click: true,
				probeType: 3
			});
			this.foodsScroll.on('scroll', (pos) => {
				this.scrollY = Math.abs(Math.round(pos.y));
			});
		},
		menuClick (index, event) {
			if (!event._constructed) {
				return;
			}
			console.log(index);
			let foodList = this.$refs.foodsWrapper.querySelectorAll('.food-list-hook');
			let el = foodList[index];
			this.foodsScroll.scrollToElement(el, 300);
		},
		_calculateHeight () {
			let foodlist = this.$refs.foodsWrapper.querySelectorAll('.food-list-hook');
			let height = 0;
			this.listHeight.push(height);
			for (let i = 0, l = foodlist.length; i < l; i++) {
				let item = foodlist[i];
				height += item.clientHeight;
				this.listHeight.push(height);
			}
		},
		goDetail (food) {
			this.selectedFood = food;
			this.$nextTick(() => {
				this.$refs.myFood.showToggle();
			});
		}
	},
	components: {
		iconMap,
		shopCart,
		cartControl,
		foodDetail
	}
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl";
	.goods
		display flex
		position absolute
		top 174px
		bottom 46px
		width 100%
		overflow hidden
		.menu-wrapper
			flex 0 0 80px
			width 80px
			background #f3f5f7
			margin-top: 2px;
			.menu-item
				position relative
				display table
				height 54px
				line-height 14px
				width 56px
				padding 0 12px
				.text
					display table-cell
					vertical-align middle
					white-space normal
					font-size 12px
					border-1px(rgba(7,17,27,0.1))
					&:last-child:after
					content none
					.iconMap
						vertical-align top
						margin-right 0
			.menu-item-selected
				position relative
				display table
				height 54px
				line-height 14px
				width 56px
				padding 0 12px
				background #fff
				font-weight 700
				margin-top -1px
				z-index 10
				.text
					display table-cell
					vertical-align middle
					white-space normal
					font-weight 700
					font-size 12px
					.iconMap
						vertical-align top
						margin-right 0
					&:after
						content none
		.foods-wrapper
			flex 1
			margin-top: 2px;
			.title
				padding-left 14px
				height 26px
				line-height 26px
				border-left 1px solid #d9dde1
				font-size 12px
				color rgb(147,153,159)
				background #f3f5f7
			.food-item
				display flex
				margin 18px
				border-1px(rgba(7,17,27,0.1))
				padding-bottom 18px
				&:last-child
					border-none()
					margin-bottom 0
				.icon
					flex 0 0 57px
					margin-right 10px
				.content
					flex 1
					.name
						margin 2px 0 8px 0
						height 14px
						line-height 14px
						font-size 14px
						color rgb(7,17,27)
						font-weight 700
					.desc,.extra
						line-height: 12px
						font-size 10px
						color rgb(147,153,159)
					.desc
						margin-bottom 8px
					.extra
						line-height 10px
						.count
							margin-right 12px
					.price
						font-weight 700
						line-height 24px
						font-size 10px
						.now
							margin-right 8px
							font-size 14px
							color rgb(240,20,20)
						.old
							text-decoration line-through
							color rgb(147,153,159)
							padding-left 4px
					.cartcontrol-wrapper
						position absolute
						right 0
						bottom 12px
</style>
