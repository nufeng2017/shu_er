/**
 * 图片预加载组件
 */
Component({
  properties: {
    //默认图片
    defaultImage: {
      type:String,
    },
    //原始图片
    originalImage: String,
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