<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-wrapper">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{'highlight':totalCount>0}">
              <i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
            </div>
            <div class="num" v-show="totalCount>0">{{totalCount}}</div>
          </div>
          <div class="price" :class="{'highlight':totalCount>0}">{{totalPrice}}元</div>
          <div class="desc">另需配送费{{deliveryPrice}}元</div>
        </div>
        <div class="content-right" @click.stop.prevent="pay">
          <div class="pay" :class="payClass"> <!-- 判断结算按钮是否高亮 -->
            {{payDesc}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      // selectFoods所选中的商品，里面的数据信息
      selectFoods: {
        type: Array,
        default() {
          return [
            {
              price: 10,
              count: 2
            }
          ]
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 30
      }
    },
    //  小球数组
    data() {
      return {

      }
    },
    computed: {
      // 总价
      totalPrice() {
        let total = 0
        this.selectFoods.forEach((food) => {
          total += food.price * food.count
        })
        return total
      },
      // 所选总商品数
      totalCount() {
        let count = 0
        this.selectFoods.forEach((food) => {
          count += food.count
        })
        return count
      },
      // 支付描述3种情况
      payDesc() {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice
          return `还差￥${diff}元起送`
        } else {
          return '去结算'
        }
      },
      // 判断结算按钮是否高亮
      payClass() {
        if (this.totalPrice < this.minPrice) {
          return 'not-enough'
        } else {
          return 'enough'
        }
      }

    },

    methods: {

      // 结算支付弹框
      pay() {
        if (this.totalPrice < this.minPrice) {
          return
        }
        window.alert(`你需要支付${this.totalPrice}元`)
      }
    },

    // 动画函数transitions
    transitions: {
      drop: {
        beforeEnter(el) {
          let count = this.balls.length
          while (count--) {
            let ball = this.balls[count]
            if (ball.show) {
              // 获取相对于浏览器视口的位置left ，top
              let rect = ball.el.getBoundingClientRect()
              let x = rect.left - 32
              let y = -(window.innerHeight - rect.top - 22)
              el.style.display = ''
              el.style.webkitTransform = `translate3d(0,${y}px,0)`
              el.style.transform = `translate3d(0,${y}px,0)`
              let inner = el.getElementsByClassName('inner-hook')[0]
              inner.style.webkitTransform = `translate3d(${x}px,0,0)`
              inner.style.transform = `translate3d(${x}px,0,0)`
            }
          }
        },
        enter(el) {
          /* eslint-disable no-unused-vars */
          let rf = el.offsetHeight
          this.$nextTick(() => {
            el.style.webkitTransform = 'translate3d(0,0,0)'
            el.style.transform = 'translate3d(0,0,0)'
            let inner = el.getElementsByClassName('inner-hook')[0]
            inner.style.webkitTransform = 'translate3d(0,0,0)'
            inner.style.transform = 'translate3d(0,0,0)'
          })
        },
        afterEnter(el) {
          let ball = this.dropBalls.shift()
          if (ball) {
            ball.show = false
            el.style.display = 'none'
          }
        }
      }
    },
    components: {

    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/minxin.styl"
.shopcart
  position:fixed
  left:0
  bottom:0
  z-index:50
  width:100%
  height: 48px
  .content
    display: flex
    background: #141d27
    font-size: 0
    color: rgba(255, 255, 255, 0.4)
    .content-left
      flex:1
      color:rgba(255,255,255,0.4)
      .logo-wrapper
        display:inline-block
        vertical-align:middle
        position:relative
        top: -10px
        margin:0 12px
        padding: 6px
        width: 56px
        height: 56px
        box-sizing:border-box
        border-radius:50%
        background:#141d27
        .logo
          width:100%
          height:100%
          border-radius:50%
          text-align:center
          background:#2b343c
          &.highlight
            background:rgb(0,160,220)
          .icon-shopping_cart
            line-height: 44px
            font-size: 24px
            color:#80858a
            &.highlight
              color:#ffffff
        .num
          position:absolute
          top:0
          right:0
          width: 24px
          height: 16px
          line-height:16px
          text-align: center
          border-radius:16px
          font-size: 9px
          font-weight:700
          color: #ffffff
          background:rgb(240,20,20)
          box-shadow :0 4px 8px 0 rgba(0,0,0,0.4)
      .desc
        display:inline-block
        vertical-align:middle
        margin:0 0 8px 12px
        line-height: 24px
        font-size: 10px
      .price
        display:inline-block
        vertical-align :top
        margin-top:12px
        line-height: 24px
        padding-right:12px
        box-sizing:border-box
        border-right:1px solid rgba(255,255,255,0.1)
        font-size:16px
        font-weight:700
        &.highlight
          color:#ffffff
    .content-right
      flex: 0 0 105px
      width: 105px
      position: absolute;
      top: 0;
      right: 0;
      .pay
        height: 48px
        line-height: 48px
        text-align: center
        font-size: 12px
        font-weight: 700
        &.not-enough
          background: #2b333b
        &.enough
          background: #00b43c
          color: #fff
</style>
