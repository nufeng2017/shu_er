/**
 * 图片预加载组件
 */
Component({
  properties: {
    //默认图片
    defaultImage: {
      type:String,
      value:'/main/assets/img/df-img.png'
    },
    //原始图片
    originalImage: String,
    //图片剪裁mode，同Image组件的mode
    mode: {
      type:String,
      value:'aspectFill'
    }
  },
  data: {
    finishLoadFlag: false
  },
  methods: {
    finishLoad: function (e) {
      this.setData({
        finishLoadFlag: true
      })
    }
  }
})