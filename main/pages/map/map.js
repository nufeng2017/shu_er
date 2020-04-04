// map.js
Page({
  data: {
    markers: [],
    address:'',
  },
  onLoad(options){
    let item = JSON.parse(options.item)
    this.setData({
      markers: [{
        latitude:parseFloat(item.lat),
        longitude: parseFloat(item.lng),
      }],
      address: item.store_address
    });
  },
  checkMap(){
    wx.openLocation({
      latitude: this.data.markers[0].latitude,
      longitude: this.data.markers[0].longitude,
      scale: 18
    })
  }
})