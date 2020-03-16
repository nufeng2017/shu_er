Component({
  properties: {
    imgUrl: {//图片地址
      type: String,
    },
    title:{//九宫格标题
      type:String,
    },
    linkType:{//转跳链接类型
      type:String,
      value:'navigateTo'
    },
    link:{//转跳链接
      type:String,
      value:''
    }
  },
  options: {
    styleIsolation: 'apply-shared'
  },
  methods:{
    enterPage(){
      switch(this.data.linkType){
        case 'navigateTo':
          wx.navigateTo({
            url: this.data.link
          })
          break;
        case 'reLaunch':
          wx.reLaunch({
            url: this.data.link
          })
          break;
        case 'switchTab':
          wx.switchTab({
            url: this.data.link
          })
          break;
        case 'redirectTo':
          wx.redirectTo({
            url: this.data.link
          })
          break;
      }
    }
  }
})