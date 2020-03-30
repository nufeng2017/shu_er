// map.js
Page({
  data: {
    markers: [{
      latitude: 23.099994,
      longitude: 113.324520,
    }],
  },
  onLoad(options){
    let item = JSON.parse(options.item)
    this.setData({
      markers: [{
        latitude:item.lat,
        longitude: item.lng,
      }],
      address: item.store_address
    });
  },
  checkMap(){
    wx.openLocation({
      latitude: 23.099994,
      longitude,
      scale: 18
    })
  }
})