Page({
  data: {
    active:0,
    rechargeItem: [{
      price: 100,
      gift: '赠5元',
      recommend: true
    }, {
      price: 200,
      gift: '赠15元',
      recommend:true
    }, {
      price: 300,
      gift: '赠25元'
    }, {
      price: 400,
      gift: '赠45元'
    }, {
      price: 500,
      gift: '赠55元'
    }, {
      price: 1000,
      gift: '赠125元'
    }]
  },
  selectPrice(e){
    let index = e.currentTarget.dataset.index == this.data.active ? 0 : parseInt(e.currentTarget.dataset.index);
    this.setData({
      active:index
    });
  },
  submit(){
    console.log(111)
  }
});