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
      default:'navigateTo'
    },
    link:{//转跳链接
      type:String,
      default:''
    }
  },
  lifetimes:{
    attached(){
      console.log(this.data.imgUrl);
    }
  },
  methods:{
    enterPage(){
      switch(this.data.linkType){
        case 'navigateTo':
          wx.redirectTo({
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