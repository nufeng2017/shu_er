// map.js
Page({
  data: {
    markers: [],
    address:'',
  },
  onLoad(options){
    let item = JSON.parse(options.item)
    console.log(item)
    wx.setNavigationBarTitle({
      title: item.store_name
    })
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